import { useState } from 'react';
import { Link } from 'react-router-dom';
import VerificationForm from '../components/VerificationForm';
import { showNotification } from '../components/NotificationSystem';

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
  const [currentStep, setCurrentStep] = useState(1); // 1: Form, 2: Email Verification, 3: SMS Verification, 4: Complete
  const [verificationData, setVerificationData] = useState(null);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showSMSVerification, setShowSMSVerification] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!formData.phone.trim() || !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

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

    // Start verification process
    setVerificationData(formData);
    setCurrentStep(2);
    setShowEmailVerification(true);
    setLoading(false);
    showNotification('info', 'Starting verification process...');
  };

  const handleEmailVerificationSuccess = (result) => {
    setEmailVerified(true);
    setShowEmailVerification(false);
    setCurrentStep(3);
    setShowSMSVerification(true);
    showNotification('success', 'Email verified! Now verifying phone number...');
  };

  const handleSMSVerificationSuccess = (result) => {
    setSmsVerified(true);
    setShowSMSVerification(false);
    setCurrentStep(4);
    
    // Complete registration
    completeRegistration();
  };

  const completeRegistration = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user account
      const user = {
        id: Date.now(),
        username: verificationData.username,
        email: verificationData.email,
        phone: verificationData.phone,
        isAdmin: false,
        emailVerified: true,
        phoneVerified: true,
        balance: 10, // Welcome bonus
        joinDate: new Date().toISOString().split('T')[0]
      };
      
      showNotification('success', 'Account created successfully! Welcome to Kleverscape!');
      onRegister(user);
    } catch (err) {
      setError('Registration failed. Please try again.');
      showNotification('error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificationCancel = () => {
    setShowEmailVerification(false);
    setShowSMSVerification(false);
    setCurrentStep(1);
    setVerificationData(null);
    setEmailVerified(false);
    setSmsVerified(false);
    showNotification('info', 'Verification cancelled. Please try again.');
  };

  const getStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Account Info', icon: '📝' },
      { number: 2, title: 'Email Verification', icon: '📧' },
      { number: 3, title: 'SMS Verification', icon: '📱' },
      { number: 4, title: 'Complete', icon: '✅' }
    ];

    return (
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={step.number} className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
            <div className="step-number">
              {currentStep > step.number ? '✓' : step.icon}
            </div>
            <div className="step-title">{step.title}</div>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </div>
        ))}
      </div>
    );
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
      <div className="form-container" style={{ maxWidth: '700px' }}>
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

        {/* Step Indicator */}
        {getStepIndicator()}

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

        {currentStep === 1 && (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="username">👤 Username *</label>
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
                <label htmlFor="email">📧 Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
                <small className="form-text">We'll send a verification code to this email</small>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">📱 Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="form-control"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                required
              />
              <small className="form-text">We'll send a verification code to this number</small>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="password">🔒 Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">🔐 Confirm Password *</label>
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
                <li>📧 Email verification required</li>
                <li>📱 SMS verification required</li>
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
              {loading ? '🔄 Processing...' : '📧 Continue to Verification'}
            </button>
          </form>
        )}

        {currentStep === 4 && !loading && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h3 style={{ color: '#28a745', marginBottom: '1rem' }}>
              Account Created Successfully!
            </h3>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Welcome to Kleverscape! Your account has been verified and you've received a $10 welcome bonus.
            </p>
            <div className="loading-spinner spinner-large"></div>
          </div>
        )}

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
          <h4 style={{ marginBottom: '1rem', color: '#333' }}>🛡️ Trusted & Verified Platform</h4>
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
              📧 Email Verified
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📱 SMS Verified
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📞 24/7 Support
            </div>
          </div>
        </div>
      </div>

      {/* Verification Modals */}
      <VerificationForm
        verificationType="email"
        target={verificationData?.email}
        onVerificationSuccess={handleEmailVerificationSuccess}
        onCancel={handleVerificationCancel}
        userData={verificationData}
        isOpen={showEmailVerification}
      />

      <VerificationForm
        verificationType="sms"
        target={verificationData?.phone}
        onVerificationSuccess={handleSMSVerificationSuccess}
        onCancel={handleVerificationCancel}
        userData={verificationData}
        isOpen={showSMSVerification}
      />
    </div>
  );
}

export default Register;
