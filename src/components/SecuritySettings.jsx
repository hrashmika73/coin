import { useState } from 'react';
import { showNotification } from './NotificationSystem';

function SecuritySettings({ user }) {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(user?.twoFAEnabled || false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      showNotification('warning', 'Please fill all password fields');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showNotification('error', 'New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      showNotification('error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate password change
      showNotification('success', 'Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      showNotification('error', 'Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = () => {
    // In a real app, this would generate a proper QR code with TOTP secret
    return 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + 
           encodeURIComponent(`otpauth://totp/Kleverscape:${user?.email || 'user@example.com'}?secret=JBSWY3DPEHPK3PXP&issuer=Kleverscape`);
  };

  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 8; i++) {
      codes.push(Math.random().toString(36).substr(2, 4).toUpperCase() + '-' + 
                  Math.random().toString(36).substr(2, 4).toUpperCase());
    }
    return codes;
  };

  const handleEnable2FA = async () => {
    if (!twoFAEnabled) {
      setShowQRCode(true);
      setBackupCodes(generateBackupCodes());
    } else {
      // Disable 2FA
      const confirm = window.confirm('Are you sure you want to disable Two-Factor Authentication? This will make your account less secure.');
      if (confirm) {
        setLoading(true);
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          setTwoFAEnabled(false);
          setShowQRCode(false);
          setBackupCodes([]);
          showNotification('warning', '2FA has been disabled');
        } catch (error) {
          showNotification('error', 'Failed to disable 2FA');
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleVerify2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      showNotification('warning', 'Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate verification
      setTwoFAEnabled(true);
      setShowQRCode(false);
      showNotification('success', '2FA enabled successfully! Save your backup codes.');
      setVerificationCode('');
    } catch (error) {
      showNotification('error', 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const downloadBackupCodes = () => {
    const content = `Kleverscape Backup Codes
Generated: ${new Date().toLocaleString()}
User: ${user?.email || 'user@example.com'}

These codes can be used to access your account if you lose your phone.
Each code can only be used once. Store them in a safe place.

${backupCodes.map((code, index) => `${index + 1}. ${code}`).join('\n')}

Important Notes:
- Keep these codes secure and private
- Do not share them with anyone
- Each code can only be used once
- Generate new codes if you suspect they've been compromised
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kleverscape-backup-codes-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showNotification('success', 'Backup codes downloaded!');
  };

  const handleSessionTimeoutChange = (minutes) => {
    setSessionTimeout(minutes);
    showNotification('info', `Session timeout set to ${minutes} minutes`);
  };

  return (
    <div className="security-settings">
      <div className="security-header">
        <h2>🔒 Security Settings</h2>
        <p>Manage your account security and privacy settings</p>
      </div>

      {/* Password Change */}
      <div className="security-section">
        <div className="section-title">
          <h3>🔑 Change Password</h3>
          <p>Update your account password regularly for better security</p>
        </div>
        
        <form onSubmit={handlePasswordReset} className="password-form">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handlePasswordChange}
              className="form-control"
              placeholder="Enter current password"
              required
            />
          </div>
          
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="form-control"
              placeholder="Enter new password (min 8 characters)"
              minLength="8"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="form-control"
              placeholder="Confirm new password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? '🔄 Updating...' : '🔑 Change Password'}
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="security-section">
        <div className="section-title">
          <h3>📱 Two-Factor Authentication (2FA)</h3>
          <p>Add an extra layer of security to your account</p>
          <div className="status-indicator">
            <span className={`status-dot ${twoFAEnabled ? 'enabled' : 'disabled'}`}></span>
            <span className="status-text">
              {twoFAEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>

        <div className="twofa-content">
          {!twoFAEnabled && !showQRCode && (
            <div className="twofa-setup">
              <div className="setup-info">
                <h4>📲 Enable 2FA</h4>
                <p>Two-factor authentication provides an additional layer of security by requiring a second form of verification.</p>
                <ul>
                  <li>🔐 Protect against unauthorized access</li>
                  <li>📱 Use your smartphone as a security key</li>
                  <li>🛡️ Backup codes for emergency access</li>
                </ul>
              </div>
              
              <button 
                className="btn btn-success enable-2fa-btn"
                onClick={handleEnable2FA}
                disabled={loading}
              >
                📱 Enable 2FA
              </button>
            </div>
          )}

          {showQRCode && (
            <div className="qr-setup">
              <div className="qr-steps">
                <h4>📱 Setup 2FA</h4>
                <div className="step">
                  <strong>Step 1:</strong> Download an authenticator app (Google Authenticator, Authy, etc.)
                </div>
                <div className="step">
                  <strong>Step 2:</strong> Scan this QR code with your app
                </div>
                <div className="step">
                  <strong>Step 3:</strong> Enter the 6-digit code from your app below
                </div>
              </div>

              <div className="qr-code">
                <img src={generateQRCode()} alt="2FA QR Code" />
              </div>

              <div className="verification-input">
                <label>Verification Code</label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="code-input"
                  placeholder="000000"
                  maxLength="6"
                />
                <button 
                  className="btn btn-primary"
                  onClick={handleVerify2FA}
                  disabled={loading || verificationCode.length !== 6}
                >
                  {loading ? 'Verifying...' : 'Verify & Enable'}
                </button>
              </div>

              {backupCodes.length > 0 && (
                <div className="backup-codes">
                  <h4>🔑 Backup Codes</h4>
                  <p>Save these codes in a safe place. You can use them to access your account if you lose your phone.</p>
                  <div className="codes-grid">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="backup-code">
                        {code}
                      </div>
                    ))}
                  </div>
                  <button 
                    className="btn btn-secondary download-codes-btn"
                    onClick={downloadBackupCodes}
                  >
                    📥 Download Codes
                  </button>
                </div>
              )}
            </div>
          )}

          {twoFAEnabled && (
            <div className="twofa-enabled">
              <div className="enabled-status">
                <div className="status-icon">✅</div>
                <div>
                  <h4>2FA is Active</h4>
                  <p>Your account is protected with two-factor authentication</p>
                </div>
              </div>
              
              <div className="twofa-actions">
                <button 
                  className="btn btn-warning"
                  onClick={() => setBackupCodes(generateBackupCodes())}
                >
                  🔄 Generate New Backup Codes
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={handleEnable2FA}
                  disabled={loading}
                >
                  ❌ Disable 2FA
                </button>
              </div>

              {backupCodes.length > 0 && (
                <div className="backup-codes">
                  <h4>🔑 New Backup Codes</h4>
                  <div className="codes-grid">
                    {backupCodes.map((code, index) => (
                      <div key={index} className="backup-code">
                        {code}
                      </div>
                    ))}
                  </div>
                  <button 
                    className="btn btn-secondary download-codes-btn"
                    onClick={downloadBackupCodes}
                  >
                    📥 Download Codes
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Session Management */}
      <div className="security-section">
        <div className="section-title">
          <h3>⏰ Session Management</h3>
          <p>Control how long you stay logged in</p>
        </div>

        <div className="session-settings">
          <div className="timeout-options">
            <label>Auto-logout after inactivity:</label>
            <div className="timeout-buttons">
              {[15, 30, 60, 120].map(minutes => (
                <button
                  key={minutes}
                  className={`btn timeout-btn ${sessionTimeout === minutes ? 'active' : 'secondary'}`}
                  onClick={() => handleSessionTimeoutChange(minutes)}
                >
                  {minutes} min
                </button>
              ))}
            </div>
          </div>

          <div className="session-info">
            <div className="info-item">
              <span className="info-label">Current Session:</span>
              <span className="info-value">Active since {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Login:</span>
              <span className="info-value">{new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Login IP:</span>
              <span className="info-value">192.168.1.1 (Your current IP)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="security-section">
        <div className="section-title">
          <h3>💡 Security Tips</h3>
        </div>

        <div className="security-tips">
          <div className="tip-item">
            <span className="tip-icon">🔐</span>
            <div>
              <strong>Use Strong Passwords</strong>
              <p>Create passwords with at least 8 characters, including numbers and symbols</p>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-icon">📱</span>
            <div>
              <strong>Enable 2FA</strong>
              <p>Two-factor authentication significantly improves your account security</p>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🚫</span>
            <div>
              <strong>Avoid Public WiFi</strong>
              <p>Don't access your account from public or unsecured networks</p>
            </div>
          </div>
          <div className="tip-item">
            <span className="tip-icon">🔄</span>
            <div>
              <strong>Regular Updates</strong>
              <p>Keep your passwords updated and review account activity regularly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;
