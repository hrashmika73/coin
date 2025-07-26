import { useState, useEffect } from 'react';
import verificationService from '../services/verification';
import { showNotification } from './NotificationSystem';

function VerificationForm({ 
  verificationType, 
  target, 
  onVerificationSuccess, 
  onCancel,
  userData = {},
  isOpen = false 
}) {
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(3);

  // Send initial verification when component opens
  useEffect(() => {
    if (isOpen && target && !verificationId) {
      sendVerification();
    }
  }, [isOpen, target]);

  // Update countdown timer
  useEffect(() => {
    if (verificationId) {
      const interval = setInterval(() => {
        const status = verificationService.getVerificationStatus(verificationId);
        if (status.exists) {
          setTimeLeft(status.timeLeft);
          setCanResend(status.canResend);
          setAttempts(status.attempts);
          setMaxAttempts(status.maxAttempts);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [verificationId]);

  const sendVerification = async () => {
    setSending(true);
    try {
      let result;
      if (verificationType === 'email') {
        result = await verificationService.sendEmailVerification(target, userData);
      } else if (verificationType === 'sms') {
        result = await verificationService.sendSMSVerification(target, userData);
      }
      
      setVerificationId(result.verificationId);
    } catch (error) {
      console.error('Send verification error:', error);
      showNotification('error', error.message || 'Failed to send verification code');
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!code.trim()) {
      showNotification('warning', 'Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      let result;
      if (verificationType === 'email') {
        result = await verificationService.verifyEmail(verificationId, code);
      } else if (verificationType === 'sms') {
        result = await verificationService.verifySMS(verificationId, code);
      }
      
      showNotification('success', 'Verification successful!');
      onVerificationSuccess(result);
    } catch (error) {
      console.error('Verification error:', error);
      showNotification('error', error.message || 'Verification failed');
      setCode('');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setSending(true);
    try {
      await verificationService.resendVerification(verificationId);
    } catch (error) {
      console.error('Resend error:', error);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTargetDisplay = () => {
    if (verificationType === 'email') return target;
    if (verificationType === 'sms') {
      // Mask phone number for privacy
      return target.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
    }
    return target;
  };

  const getIcon = () => {
    return verificationType === 'email' ? '📧' : '📱';
  };

  const getTitle = () => {
    return verificationType === 'email' ? 'Email Verification' : 'SMS Verification';
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content verification-modal">
        <div className="modal-header">
          <h2>{getIcon()} {getTitle()}</h2>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>
        
        <div className="verification-content">
          {sending ? (
            <div className="verification-sending">
              <div className="loading-spinner spinner-medium"></div>
              <h3>Sending verification code...</h3>
              <p>Please wait while we send the code to {getTargetDisplay()}</p>
            </div>
          ) : (
            <>
              <div className="verification-info">
                <div className="verification-icon">{getIcon()}</div>
                <h3>Enter Verification Code</h3>
                <p>
                  We've sent a {verificationType === 'email' ? '6-digit' : '6-digit'} verification code to:
                </p>
                <div className="verification-target">{getTargetDisplay()}</div>
                
                {timeLeft > 0 && (
                  <div className="verification-timer">
                    Code expires in: <span className="timer">{formatTime(timeLeft)}</span>
                  </div>
                )}
                
                {attempts > 0 && (
                  <div className="verification-attempts">
                    Attempts: {attempts}/{maxAttempts}
                  </div>
                )}
              </div>

              <form onSubmit={handleVerify} className="verification-form">
                <div className="form-group">
                  <label>Verification Code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className="verification-input"
                    maxLength="6"
                    disabled={loading}
                    autoComplete="one-time-code"
                  />
                </div>

                <div className="verification-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={onCancel}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={loading || code.length !== 6}
                  >
                    {loading ? (
                      <>
                        <span className="loading-spinner spinner-small"></span>
                        Verifying...
                      </>
                    ) : (
                      'Verify Code'
                    )}
                  </button>
                </div>
              </form>

              <div className="verification-footer">
                <p>Didn't receive the code?</p>
                <button 
                  type="button"
                  className={`btn-link ${!canResend ? 'disabled' : ''}`}
                  onClick={handleResend}
                  disabled={!canResend || sending}
                >
                  {sending ? 'Sending...' : canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
                </button>
              </div>

              {/* Development helper */}
              {process.env.NODE_ENV === 'development' && (
                <div className="dev-helper">
                  <p><strong>Development Mode:</strong></p>
                  <p>Check console or localStorage for the verification code</p>
                  <button 
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      const lastCode = verificationType === 'email' 
                        ? localStorage.getItem('lastEmailCode')
                        : localStorage.getItem('lastSMSCode');
                      if (lastCode) setCode(lastCode);
                    }}
                  >
                    Auto-fill Last Code (Dev)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerificationForm;
