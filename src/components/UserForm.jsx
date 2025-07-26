import { useState } from 'react';

function UserForm({ isOpen, onClose, onSubmit, user = null, mode = 'add' }) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    country: user?.country || '',
    balance: user?.balance || 0,
    status: user?.status || 'active',
    role: user?.role || 'user'
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (formData.balance < 0) {
      newErrors.balance = 'Balance cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const userData = {
        ...formData,
        balance: parseFloat(formData.balance),
        id: user?.id || Date.now(),
        joinDate: user?.joinDate || new Date().toISOString().split('T')[0]
      };
      
      await onSubmit(userData);
      onClose();
      
      // Reset form
      setFormData({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
        balance: 0,
        status: 'active',
        role: 'user'
      });
      
    } catch (error) {
      console.error('Error submitting user form:', error);
      setErrors({ submit: 'Failed to save user. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content user-form-modal">
        <div className="modal-header">
          <h2>
            {mode === 'add' ? '👤 Add New User' : '✏️ Edit User'}
          </h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="user-form">
          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}
          
          <div className="form-row">
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className={errors.username ? 'error' : ''}
                placeholder="Enter username"
                disabled={loading}
              />
              {errors.username && <span className="field-error">{errors.username}</span>}
            </div>
            
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="Enter email address"
                disabled={loading}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={errors.firstName ? 'error' : ''}
                placeholder="Enter first name"
                disabled={loading}
              />
              {errors.firstName && <span className="field-error">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={errors.lastName ? 'error' : ''}
                placeholder="Enter last name"
                disabled={loading}
              />
              {errors.lastName && <span className="field-error">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={errors.phone ? 'error' : ''}
                placeholder="Enter phone number"
                disabled={loading}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            
            <div className="form-group">
              <label>Country</label>
              <select
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                disabled={loading}
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="JP">Japan</option>
                <option value="SG">Singapore</option>
                <option value="NG">Nigeria</option>
                <option value="ZA">South Africa</option>
                <option value="IN">India</option>
                <option value="BR">Brazil</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Initial Balance ($)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.balance}
                onChange={(e) => handleChange('balance', e.target.value)}
                className={errors.balance ? 'error' : ''}
                placeholder="0.00"
                disabled={loading}
              />
              {errors.balance && <span className="field-error">{errors.balance}</span>}
            </div>
            
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                disabled={loading}
              >
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Role</label>
            <select
              value={formData.role}
              onChange={(e) => handleChange('role', e.target.value)}
              disabled={loading}
            >
              <option value="user">User</option>
              <option value="vip">VIP User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span>
                  <span className="loading-spinner"></span>
                  {mode === 'add' ? 'Adding...' : 'Updating...'}
                </span>
              ) : (
                mode === 'add' ? 'Add User' : 'Update User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;
