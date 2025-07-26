import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { showNotification } from '../components/NotificationSystem';
import LoadingSpinner from '../components/LoadingSpinner';

function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // verifying, success, error, expired
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  useEffect(() => {
    if (!token) {
      setVerificationStatus('error');
      setError('Invalid verification link. No token provided.');
      setLoading(false);
      return;
    }

    verifyEmailToken();
  }, [token]);

  const verifyEmailToken = async () => {
    try {
      setLoading(true);
      
      // Simulate API call to verify token
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate token verification logic
      const isValidToken = token && token.length >= 32;
      const isTokenExpired = false; // In real app, check against DB timestamp

      if (!isValidToken) {
        setVerificationStatus('error');
        setError('Invalid verification token.');
        return;
      }

      if (isTokenExpired) {
        setVerificationStatus('expired');
        setError('Verification link has expired. Please request a new one.');
        return;
      }

      // Successful verification
      setVerificationStatus('success');
      setUserInfo({
        email: email || 'user@kleverscape.com',
        username: 'KleverUser',
        joinDate: new Date().toLocaleDateString(),
        welcomeBonus: 10
      });

      showNotification('success', 'Email verified successfully! Welcome to Kleverscape!');

    } catch (err) {
      setVerificationStatus('error');
      setError('Verification failed. Please try again or contact support.');
      showNotification('error', 'Email verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      
      // Simulate resending verification email
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showNotification('success', 'New verification email sent! Please check your inbox.');
      
    } catch (err) {
      showNotification('error', 'Failed to resend verification email');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToDashboard = () => {
    navigate('/login');
  };

  const renderVerifyingState = () => (
    <div className="verification-state verifying">
      <div className="verification-icon">
        <LoadingSpinner size="large" />
      </div>
      <h2>Verifying Your Email</h2>
      <p>Please wait while we verify your email address...</p>
      <div className="verification-details">
        <div className="detail-item">
          <span className="detail-icon">📧</span>
          <span>Checking verification token</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">🔐</span>
          <span>Validating security credentials</span>
        </div>
        <div className="detail-item">
          <span className="detail-icon">✅</span>
          <span>Activating your account</span>
        </div>
      </div>
    </div>
  );

  const renderSuccessState = () => (
    <div className="verification-state success">
      <div className="verification-icon success-icon">
        <div className="checkmark-animation">✓</div>
      </div>
      <h2>Email Verified Successfully!</h2>
      <p>Welcome to Kleverscape! Your account is now active.</p>
      
      {userInfo && (
        <div className="user-welcome-card">
          <div className="welcome-header">
            <span className="welcome-icon">🎉</span>
            <h3>Welcome, {userInfo.username}!</h3>
          </div>
          <div className="welcome-details">
            <div className="detail-row">
              <span className="label">Email:</span>
              <span className="value">{userInfo.email}</span>
            </div>
            <div className="detail-row">
              <span className="label">Member Since:</span>
              <span className="value">{userInfo.joinDate}</span>
            </div>
            <div className="detail-row bonus-row">
              <span className="label">Welcome Bonus:</span>
              <span className="value bonus">+${userInfo.welcomeBonus}.00</span>
            </div>
          </div>
        </div>
      )}

      <div className="success-benefits">
        <h4>🎁 Account Benefits Unlocked:</h4>
        <div className="benefits-grid">
          <div className="benefit-item">
            <span className="benefit-icon">💰</span>
            <span>$10 Welcome Bonus</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📈</span>
            <span>Investment Plans Access</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">🔒</span>
            <span>Secure Wallet</span>
          </div>
          <div className="benefit-item">
            <span className="benefit-icon">📞</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="btn btn-primary large"
          onClick={handleContinueToDashboard}
        >
          🚀 Continue to Login
        </button>
        <Link to="/" className="btn btn-secondary large">
          🏠 Go to Homepage
        </Link>
      </div>
    </div>
  );

  const renderErrorState = () => (
    <div className="verification-state error">
      <div className="verification-icon error-icon">❌</div>
      <h2>Verification Failed</h2>
      <p>{error}</p>
      
      <div className="error-help">
        <h4>What can you do?</h4>
        <div className="help-options">
          <div className="help-option">
            <span className="help-icon">📧</span>
            <div>
              <strong>Resend Verification Email</strong>
              <p>Get a new verification link sent to your email</p>
            </div>
          </div>
          <div className="help-option">
            <span className="help-icon">📞</span>
            <div>
              <strong>Contact Support</strong>
              <p>Our team is available 24/7 to help</p>
            </div>
          </div>
          <div className="help-option">
            <span className="help-icon">🔄</span>
            <div>
              <strong>Try Again</strong>
              <p>Refresh the page or use a different link</p>
            </div>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="btn btn-primary large"
          onClick={handleResendVerification}
          disabled={loading}
        >
          {loading ? 'Sending...' : '📧 Resend Verification'}
        </button>
        <Link to="/register" className="btn btn-secondary large">
          🔄 Try Registration Again
        </Link>
      </div>
    </div>
  );

  const renderExpiredState = () => (
    <div className="verification-state expired">
      <div className="verification-icon expired-icon">⏰</div>
      <h2>Verification Link Expired</h2>
      <p>This verification link has expired for security reasons.</p>
      
      <div className="expired-info">
        <div className="info-card">
          <span className="info-icon">⏱️</span>
          <div>
            <strong>Verification links expire after 24 hours</strong>
            <p>This ensures your account security and prevents unauthorized access</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="btn btn-primary large"
          onClick={handleResendVerification}
          disabled={loading}
        >
          {loading ? 'Sending...' : '📧 Get New Verification Link'}
        </button>
        <Link to="/login" className="btn btn-secondary large">
          🔑 Already Verified? Login
        </Link>
      </div>
    </div>
  );

  return (
    <div className="email-verification-page">
      <div className="verification-container">
        {/* Header */}
        <div className="verification-header">
          <Link to="/" className="logo-link">
            <div className="logo">🚀 Kleverscape</div>
          </Link>
        </div>

        {/* Main Content */}
        <div className="verification-content">
          {loading && verificationStatus === 'verifying' && renderVerifyingState()}
          {!loading && verificationStatus === 'success' && renderSuccessState()}
          {!loading && verificationStatus === 'error' && renderErrorState()}
          {!loading && verificationStatus === 'expired' && renderExpiredState()}
        </div>

        {/* Footer */}
        <div className="verification-footer">
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/plans">Plans</Link>
            <a href="mailto:support@kleverscape.com">Support</a>
          </div>
          <div className="footer-text">
            <p>© 2024 Kleverscape. All rights reserved.</p>
            <p>Secure • Reliable • Trusted</p>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <div className="verification-background">
        <div className="floating-shapes">
          <div className="shape shape-1">🔐</div>
          <div className="shape shape-2">📧</div>
          <div className="shape shape-3">✅</div>
          <div className="shape shape-4">🚀</div>
          <div className="shape shape-5">💎</div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
