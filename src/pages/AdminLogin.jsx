import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { showNotification } from '../components/NotificationSystem';

function AdminLogin({ onAdminLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError('Account temporarily locked. Please try again in 15 minutes.');
      return;
    }

    setLoading(true);
    setError('');

    // Validation
    if (!formData.email.trim()) {
      setError('Email is required');
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      // Simulate admin authentication
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Admin credentials check
      const isValidAdmin = (
        formData.email === 'admin@kleverscape.com' && 
        formData.password === 'admin123'
      ) || (
        formData.email === 'superadmin@kleverscape.com' && 
        formData.password === 'superadmin123'
      );

      if (!isValidAdmin) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setIsLocked(true);
          setError('Too many failed attempts. Account locked for 15 minutes.');
          
          // Auto unlock after 15 minutes
          setTimeout(() => {
            setIsLocked(false);
            setLoginAttempts(0);
          }, 15 * 60 * 1000);
        } else {
          setError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
        }
        setLoading(false);
        return;
      }

      // Successful admin login
      const adminUser = {
        id: 'admin_' + Date.now(),
        email: formData.email,
        role: formData.email.includes('superadmin') ? 'superadmin' : 'admin',
        isAdmin: true,
        loginTime: new Date().toISOString(),
        permissions: ['users', 'withdrawals', 'investments', 'settings', 'kyc']
      };

      // Store admin session
      localStorage.setItem('adminSession', JSON.stringify({
        ...adminUser,
        rememberMe: formData.rememberMe,
        sessionExpiry: formData.rememberMe 
          ? Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days
          : Date.now() + (8 * 60 * 60 * 1000) // 8 hours
      }));

      showNotification('success', `Welcome back, Admin! Logged in as ${adminUser.role}`);
      onAdminLogin(adminUser);
      navigate('/admin');

    } catch (err) {
      setError('Login failed. Please try again.');
      showNotification('error', 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    showNotification('info', 'Password reset link sent to admin email (demo)');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #667eea 100%)',
      padding: '2rem'
    }}>
      <div className="admin-login-container">
        <div className="admin-login-card">
          {/* Header */}
          <div className="admin-header">
            <div className="admin-icon">🛡️</div>
            <h1>Admin Access</h1>
            <p>Kleverscape Administration Panel</p>
          </div>

          {/* Security Notice */}
          <div className="security-notice">
            <div className="security-icon">🔐</div>
            <div>
              <strong>Secure Login Required</strong>
              <p>This area is restricted to authorized administrators only</p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="error-alert">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          {/* Login Attempts Warning */}
          {loginAttempts > 0 && !isLocked && (
            <div className="warning-alert">
              <span className="warning-icon">⚡</span>
              {loginAttempts} failed attempt{loginAttempts > 1 ? 's' : ''}. 
              {3 - loginAttempts} remaining before lockout.
            </div>
          )}

          {/* Lock Status */}
          {isLocked && (
            <div className="lock-alert">
              <span className="lock-icon">🔒</span>
              Account locked for security. Please wait 15 minutes.
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@kleverscape.com"
                  className="admin-input"
                  disabled={loading || isLocked}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Admin Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔑</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  className="admin-input"
                  disabled={loading || isLocked}
                  required
                />
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  disabled={loading || isLocked}
                />
                <span className="checkmark"></span>
                Remember me for 30 days
              </label>

              <button 
                type="button" 
                className="forgot-password"
                onClick={handleForgotPassword}
                disabled={loading || isLocked}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={loading || isLocked}
            >
              {loading ? (
                <>
                  <span className="loading-spinner spinner-small"></span>
                  Authenticating...
                </>
              ) : (
                <>
                  🔓 Access Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          {process.env.NODE_ENV === 'development' && (
            <div className="demo-credentials">
              <h4>Demo Credentials:</h4>
              <div className="credential-item">
                <strong>Admin:</strong> admin@kleverscape.com / admin123
              </div>
              <div className="credential-item">
                <strong>Super Admin:</strong> superadmin@kleverscape.com / superadmin123
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="admin-footer">
            <Link to="/" className="back-to-site">
              ← Back to Main Site
            </Link>
            <div className="security-info">
              <span>🔒 SSL Secured</span>
              <span>🛡️ 2FA Ready</span>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="admin-side-panel">
          <h3>🚀 Kleverscape Admin</h3>
          <div className="feature-list">
            <div className="feature-item">
              <span className="feature-icon">👥</span>
              <div>
                <strong>User Management</strong>
                <p>Manage all user accounts and permissions</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <strong>Financial Control</strong>
                <p>Monitor withdrawals and investments</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div>
                <strong>Analytics Dashboard</strong>
                <p>Real-time platform statistics</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🆔</span>
              <div>
                <strong>KYC Management</strong>
                <p>Review and approve user verification</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
