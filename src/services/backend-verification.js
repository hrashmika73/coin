// Backend Verification Services
// This simulates backend email and SMS verification services

class BackendVerificationService {
  constructor() {
    this.emailTemplates = {
      verification: {
        subject: 'Verify Your Kleverscape Account',
        template: this.getEmailVerificationTemplate()
      },
      welcome: {
        subject: 'Welcome to Kleverscape!',
        template: this.getWelcomeEmailTemplate()
      }
    };
  }

  // Email verification template
  getEmailVerificationTemplate() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Kleverscape Account</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { padding: 30px; }
        .verification-code { background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; border-left: 5px solid #667eea; }
        .code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; font-family: monospace; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚀 Kleverscape</h1>
            <h2>Email Verification</h2>
        </div>
        <div class="content">
            <h3>Welcome to Kleverscape!</h3>
            <p>Thank you for signing up for Kleverscape, the premier cryptocurrency investment platform. To complete your registration, please verify your email address using the code below:</p>
            
            <div class="verification-code">
                <p><strong>Your Verification Code:</strong></p>
                <div class="code">{{VERIFICATION_CODE}}</div>
                <p><small>This code will expire in 10 minutes</small></p>
            </div>
            
            <p>If you didn't create an account with Kleverscape, please ignore this email.</p>
            
            <p>Once verified, you'll receive:</p>
            <ul>
                <li>💰 $10 welcome bonus</li>
                <li>📈 Access to premium investment plans</li>
                <li>🔒 Secure wallet management</li>
                <li>📞 24/7 customer support</li>
            </ul>
        </div>
        <div class="footer">
            <p>© 2024 Kleverscape. All rights reserved.</p>
            <p>If you have any questions, contact us at support@kleverscape.com</p>
        </div>
    </div>
</body>
</html>`;
  }

  // Welcome email template
  getWelcomeEmailTemplate() {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Kleverscape!</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { padding: 30px; }
        .welcome-bonus { background: linear-gradient(135deg, #28a745, #66bb6a); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; color: #666; }
        .button { display: inline-block; background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Welcome to Kleverscape!</h1>
        </div>
        <div class="content">
            <h3>Hello {{USERNAME}},</h3>
            <p>Congratulations! Your Kleverscape account has been successfully created and verified.</p>
            
            <div class="welcome-bonus">
                <h3>🎁 Welcome Bonus Credited!</h3>
                <p>$10.00 has been added to your account</p>
            </div>
            
            <p>You can now access all features of our platform:</p>
            <ul>
                <li>📈 Investment Plans (Starter, Pro, Elite)</li>
                <li>💼 Secure Wallet Management</li>
                <li>📊 Real-time Market Data</li>
                <li>📱 Mobile App Access</li>
                <li>🎯 24/7 Customer Support</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="{{DASHBOARD_URL}}" class="button">Access Your Dashboard</a>
                <a href="{{PLANS_URL}}" class="button">View Investment Plans</a>
            </div>
            
            <p>If you have any questions, our support team is available 24/7 via live chat or email.</p>
        </div>
        <div class="footer">
            <p>© 2024 Kleverscape. All rights reserved.</p>
            <p>Need help? Contact us at support@kleverscape.com</p>
        </div>
    </div>
</body>
</html>`;
  }

  // SMS templates
  getSMSVerificationMessage(code) {
    return `Kleverscape verification code: ${code}. This code expires in 5 minutes. Do not share this code with anyone.`;
  }

  getWelcomeSMSMessage(username) {
    return `Welcome to Kleverscape, ${username}! Your account is verified and $10 bonus has been credited. Start investing now!`;
  }

  // Simulate email sending
  async sendVerificationEmail(email, verificationCode, userData = {}) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const emailContent = this.emailTemplates.verification.template
        .replace('{{VERIFICATION_CODE}}', verificationCode)
        .replace('{{USERNAME}}', userData.username || 'User');

      // In production, this would integrate with email service (SendGrid, AWS SES, etc.)
      console.log('📧 EMAIL SENT:');
      console.log('To:', email);
      console.log('Subject:', this.emailTemplates.verification.subject);
      console.log('Verification Code:', verificationCode);

      // Store in localStorage for development
      localStorage.setItem('lastEmailVerification', JSON.stringify({
        email,
        code: verificationCode,
        timestamp: Date.now(),
        content: emailContent
      }));

      return {
        success: true,
        messageId: `email_${Date.now()}`,
        message: 'Verification email sent successfully'
      };
    } catch (error) {
      console.error('Email sending error:', error);
      throw new Error('Failed to send verification email');
    }
  }

  // Simulate SMS sending
  async sendVerificationSMS(phoneNumber, verificationCode, userData = {}) {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const smsContent = this.getSMSVerificationMessage(verificationCode);

      // In production, this would integrate with SMS service (Twilio, AWS SNS, etc.)
      console.log('📱 SMS SENT:');
      console.log('To:', phoneNumber);
      console.log('Message:', smsContent);
      console.log('Verification Code:', verificationCode);

      // Store in localStorage for development
      localStorage.setItem('lastSMSVerification', JSON.stringify({
        phoneNumber,
        code: verificationCode,
        timestamp: Date.now(),
        content: smsContent
      }));

      return {
        success: true,
        messageId: `sms_${Date.now()}`,
        message: 'Verification SMS sent successfully'
      };
    } catch (error) {
      console.error('SMS sending error:', error);
      throw new Error('Failed to send verification SMS');
    }
  }

  // Send welcome email after successful registration
  async sendWelcomeEmail(email, userData = {}) {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const emailContent = this.emailTemplates.welcome.template
        .replace('{{USERNAME}}', userData.username || 'User')
        .replace('{{DASHBOARD_URL}}', `${window.location.origin}/dashboard`)
        .replace('{{PLANS_URL}}', `${window.location.origin}/plans`);

      console.log('🎉 WELCOME EMAIL SENT:');
      console.log('To:', email);
      console.log('Subject:', this.emailTemplates.welcome.subject);

      return {
        success: true,
        messageId: `welcome_${Date.now()}`,
        message: 'Welcome email sent successfully'
      };
    } catch (error) {
      console.error('Welcome email error:', error);
      throw new Error('Failed to send welcome email');
    }
  }

  // Send welcome SMS
  async sendWelcomeSMS(phoneNumber, userData = {}) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const smsContent = this.getWelcomeSMSMessage(userData.username || 'User');

      console.log('🎉 WELCOME SMS SENT:');
      console.log('To:', phoneNumber);
      console.log('Message:', smsContent);

      return {
        success: true,
        messageId: `welcome_sms_${Date.now()}`,
        message: 'Welcome SMS sent successfully'
      };
    } catch (error) {
      console.error('Welcome SMS error:', error);
      throw new Error('Failed to send welcome SMS');
    }
  }

  // Validate verification code (backend simulation)
  async validateVerificationCode(identifier, code, type = 'email') {
    try {
      // Simulate backend validation delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const storageKey = type === 'email' ? 'lastEmailVerification' : 'lastSMSVerification';
      const stored = localStorage.getItem(storageKey);
      
      if (!stored) {
        throw new Error('No verification code found');
      }

      const verification = JSON.parse(stored);
      const isExpired = Date.now() - verification.timestamp > (type === 'email' ? 10 : 5) * 60 * 1000;
      
      if (isExpired) {
        localStorage.removeItem(storageKey);
        throw new Error('Verification code expired');
      }

      if (verification.code !== code) {
        throw new Error('Invalid verification code');
      }

      // Remove used verification code
      localStorage.removeItem(storageKey);

      return {
        success: true,
        verified: true,
        message: 'Code verified successfully'
      };
    } catch (error) {
      throw error;
    }
  }

  // Get verification status
  getVerificationStatus(identifier, type = 'email') {
    const storageKey = type === 'email' ? 'lastEmailVerification' : 'lastSMSVerification';
    const stored = localStorage.getItem(storageKey);
    
    if (!stored) {
      return { exists: false };
    }

    const verification = JSON.parse(stored);
    const maxAge = (type === 'email' ? 10 : 5) * 60 * 1000;
    const timeLeft = Math.max(0, maxAge - (Date.now() - verification.timestamp));
    
    return {
      exists: true,
      timeLeft: Math.ceil(timeLeft / 1000),
      expired: timeLeft <= 0
    };
  }
}

// Export singleton instance
const backendVerificationService = new BackendVerificationService();
export default backendVerificationService;

// Export for testing and development
export { BackendVerificationService };
