// Verification Service for Email and SMS
import apiService from './api';
import backendVerificationService from './backend-verification';
import { showNotification } from '../components/NotificationSystem';

class VerificationService {
  constructor() {
    this.pendingVerifications = new Map();
    this.verificationCodes = new Map();
  }

  // Generate a random verification code
  generateCode(length = 6) {
    const chars = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Email Verification Methods
  async sendEmailVerification(email, userData = {}) {
    try {
      const verificationCode = this.generateCode();
      const verificationId = Date.now().toString();
      
      // Store verification data
      this.pendingVerifications.set(verificationId, {
        email,
        userData,
        type: 'email',
        code: verificationCode,
        timestamp: Date.now(),
        attempts: 0,
        maxAttempts: 3
      });

      // In a real app, this would send an actual email
      // For demo purposes, we'll simulate the API call
      await this.simulateEmailSend(email, verificationCode);
      
      showNotification('success', `Verification code sent to ${email}`);
      
      return {
        success: true,
        verificationId,
        message: 'Verification email sent successfully'
      };
    } catch (error) {
      console.error('Email verification error:', error);
      showNotification('error', 'Failed to send verification email');
      throw error;
    }
  }

  async verifyEmail(verificationId, code) {
    try {
      const verification = this.pendingVerifications.get(verificationId);
      
      if (!verification) {
        throw new Error('Verification session expired or invalid');
      }

      if (verification.attempts >= verification.maxAttempts) {
        this.pendingVerifications.delete(verificationId);
        throw new Error('Maximum verification attempts exceeded');
      }

      verification.attempts++;

      if (verification.code !== code) {
        if (verification.attempts >= verification.maxAttempts) {
          this.pendingVerifications.delete(verificationId);
        }
        throw new Error('Invalid verification code');
      }

      // Check if code is expired (10 minutes)
      const isExpired = Date.now() - verification.timestamp > 10 * 60 * 1000;
      if (isExpired) {
        this.pendingVerifications.delete(verificationId);
        throw new Error('Verification code expired');
      }

      // Verification successful
      this.pendingVerifications.delete(verificationId);
      
      return {
        success: true,
        email: verification.email,
        userData: verification.userData
      };
    } catch (error) {
      console.error('Email verification error:', error);
      throw error;
    }
  }

  // SMS Verification Methods
  async sendSMSVerification(phoneNumber, userData = {}) {
    try {
      const verificationCode = this.generateCode();
      const verificationId = Date.now().toString();
      
      // Store verification data
      this.pendingVerifications.set(verificationId, {
        phoneNumber,
        userData,
        type: 'sms',
        code: verificationCode,
        timestamp: Date.now(),
        attempts: 0,
        maxAttempts: 3
      });

      // In a real app, this would send an actual SMS
      await this.simulateSMSSend(phoneNumber, verificationCode);
      
      showNotification('success', `Verification code sent to ${phoneNumber}`);
      
      return {
        success: true,
        verificationId,
        message: 'SMS verification code sent successfully'
      };
    } catch (error) {
      console.error('SMS verification error:', error);
      showNotification('error', 'Failed to send SMS verification');
      throw error;
    }
  }

  async verifySMS(verificationId, code) {
    try {
      const verification = this.pendingVerifications.get(verificationId);
      
      if (!verification) {
        throw new Error('Verification session expired or invalid');
      }

      if (verification.attempts >= verification.maxAttempts) {
        this.pendingVerifications.delete(verificationId);
        throw new Error('Maximum verification attempts exceeded');
      }

      verification.attempts++;

      if (verification.code !== code) {
        if (verification.attempts >= verification.maxAttempts) {
          this.pendingVerifications.delete(verificationId);
        }
        throw new Error('Invalid verification code');
      }

      // Check if code is expired (5 minutes for SMS)
      const isExpired = Date.now() - verification.timestamp > 5 * 60 * 1000;
      if (isExpired) {
        this.pendingVerifications.delete(verificationId);
        throw new Error('Verification code expired');
      }

      // Verification successful
      this.pendingVerifications.delete(verificationId);
      
      return {
        success: true,
        phoneNumber: verification.phoneNumber,
        userData: verification.userData
      };
    } catch (error) {
      console.error('SMS verification error:', error);
      throw error;
    }
  }

  // Resend verification code
  async resendVerification(verificationId) {
    try {
      const verification = this.pendingVerifications.get(verificationId);
      
      if (!verification) {
        throw new Error('Verification session not found');
      }

      // Generate new code
      const newCode = this.generateCode();
      verification.code = newCode;
      verification.timestamp = Date.now();
      verification.attempts = 0;

      if (verification.type === 'email') {
        await this.simulateEmailSend(verification.email, newCode);
        showNotification('success', `New verification code sent to ${verification.email}`);
      } else if (verification.type === 'sms') {
        await this.simulateSMSSend(verification.phoneNumber, newCode);
        showNotification('success', `New verification code sent to ${verification.phoneNumber}`);
      }

      return {
        success: true,
        message: 'Verification code resent successfully'
      };
    } catch (error) {
      console.error('Resend verification error:', error);
      showNotification('error', 'Failed to resend verification code');
      throw error;
    }
  }

  // Simulation methods for development
  async simulateEmailSend(email, code) {
    try {
      // Use backend verification service for email sending
      const result = await backendVerificationService.sendVerificationEmail(email, code);

      // Store in localStorage for easy testing
      localStorage.setItem('lastEmailCode', code);
      localStorage.setItem('lastEmailTarget', email);

      return result;
    } catch (error) {
      console.error('Email send error:', error);
      // Fallback to simple console log
      console.log(`📧 EMAIL VERIFICATION CODE for ${email}: ${code}`);
      localStorage.setItem('lastEmailCode', code);
      localStorage.setItem('lastEmailTarget', email);
      return { success: true };
    }
  }

  async simulateSMSSend(phoneNumber, code) {
    try {
      // Use backend verification service for SMS sending
      const result = await backendVerificationService.sendVerificationSMS(phoneNumber, code);

      // Store in localStorage for easy testing
      localStorage.setItem('lastSMSCode', code);
      localStorage.setItem('lastSMSTarget', phoneNumber);

      return result;
    } catch (error) {
      console.error('SMS send error:', error);
      // Fallback to simple console log
      console.log(`📱 SMS VERIFICATION CODE for ${phoneNumber}: ${code}`);
      localStorage.setItem('lastSMSCode', code);
      localStorage.setItem('lastSMSTarget', phoneNumber);
      return { success: true };
    }
  }

  // Get verification status
  getVerificationStatus(verificationId) {
    const verification = this.pendingVerifications.get(verificationId);
    if (!verification) {
      return { exists: false };
    }

    const timeLeft = Math.max(0, (verification.type === 'sms' ? 5 : 10) * 60 * 1000 - (Date.now() - verification.timestamp));
    
    return {
      exists: true,
      type: verification.type,
      attempts: verification.attempts,
      maxAttempts: verification.maxAttempts,
      timeLeft: Math.ceil(timeLeft / 1000),
      canResend: timeLeft < (verification.type === 'sms' ? 4 : 9) * 60 * 1000
    };
  }

  // Cleanup expired verifications
  cleanupExpiredVerifications() {
    const now = Date.now();
    for (const [id, verification] of this.pendingVerifications.entries()) {
      const maxAge = verification.type === 'sms' ? 5 * 60 * 1000 : 10 * 60 * 1000;
      if (now - verification.timestamp > maxAge) {
        this.pendingVerifications.delete(id);
      }
    }
  }

  // Clear all pending verifications
  clearAllVerifications() {
    this.pendingVerifications.clear();
  }
}

// Create singleton instance
const verificationService = new VerificationService();

// Cleanup expired verifications every minute
setInterval(() => {
  verificationService.cleanupExpiredVerifications();
}, 60000);

export default verificationService;
