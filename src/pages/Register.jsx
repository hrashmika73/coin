import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
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

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo registration - in real app, this would be an API call
      onRegister({ 
        id: Date.now(), 
        username: formData.username, 
        email: formData.email,
        phone: formData.phone,
        isAdmin: false 
      });
    } catch (err) {
      setError('Registration failed. Please try again.');
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
      <div className="form-container" style={{ maxWidth: '600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
          <h2 style={{ 
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Join Kleverscape
          </h2>
          <p style={{ color: '#666' }}>Start your crypto investment journey today</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="username">👤 Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </div>

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
          </div>

          <div className="form-group">
            <label htmlFor="phone">📱 Phone Number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="password">🔒 Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">🔐 Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
            padding: '1.5rem',
            borderRadius: '15px',
            marginBottom: '1.5rem'
          }}>
            <h4 style={{ marginBottom: '1rem', color: '#333', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🎁 Welcome Bonus
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#666' }}>
              <li>💰 $10 signup bonus</li>
              <li>📈 Free investment guide</li>
              <li>🎯 24/7 customer support</li>
              <li>🔒 Bank-level security</li>
            </ul>
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
            {loading ? '🔄 Creating Account...' : '🚀 Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#667eea', fontWeight: 'bold' }}>
              Sign In
            </Link>
          </p>
          
          <div style={{ fontSize: '0.85rem', color: '#999', lineHeight: '1.5' }}>
            By creating an account, you agree to our{' '}
            <a href="#" style={{ color: '#667eea' }}>Terms of Service</a> and{' '}
            <a href="#" style={{ color: '#667eea' }}>Privacy Policy</a>
          </div>
        </div>

        {/* Trust Indicators */}
        <div style={{
          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
          padding: '1.5rem',
          borderRadius: '15px',
          marginTop: '2rem',
          textAlign: 'center'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#333' }}>🛡️ Trusted by 100,000+ Users</h4>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            fontSize: '0.9rem',
            color: '#666'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🔒 SSL Secured
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🌍 150+ Countries
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ⭐ 4.9/5 Rating
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📞 24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
