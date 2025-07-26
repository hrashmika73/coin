import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login logic - in real app, this would be an API call
      if (formData.email === 'admin@kleverscape.com' && formData.password === 'admin123') {
        onLogin({ 
          id: 1, 
          username: 'admin', 
          email: formData.email, 
          isAdmin: true 
        });
      } else if (formData.email && formData.password.length >= 6) {
        onLogin({ 
          id: 2, 
          username: formData.email.split('@')[0], 
          email: formData.email, 
          isAdmin: false 
        });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 160px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div className="form-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔐</div>
          <h2 style={{ 
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Welcome Back!
          </h2>
          <p style={{ color: '#666' }}>Sign in to your Kleverscape account</p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            color: '#c33',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">📧 Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">🔒 Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}
          >
            {loading ? '🔄 Signing In...' : '🚀 Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#667eea', fontWeight: 'bold' }}>
              Create Account
            </Link>
          </p>
          
          <div style={{
            background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
            padding: '1.5rem',
            borderRadius: '15px',
            marginTop: '2rem'
          }}>
            <h4 style={{ marginBottom: '1rem', color: '#333' }}>🎯 Demo Accounts</h4>
            <div style={{ fontSize: '0.9rem', color: '#666', textAlign: 'left' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Admin:</strong> admin@kleverscape.com / admin123
              </div>
              <div>
                <strong>User:</strong> Any valid email / any password (6+ chars)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
