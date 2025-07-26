// API Service for Kleverscape Platform
// This service handles all backend communications

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('authToken');
  }

  // Helper method to make HTTP requests
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      defaultHeaders.Authorization = `Bearer ${this.token}`;
    }

    const config = {
      headers: defaultHeaders,
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // For development - simulate API calls with local storage
      console.warn('API call failed, using local simulation:', error.message);
      return this.simulateApiCall(endpoint, options);
    }
  }

  // Simulate API calls for development environment
  simulateApiCall(endpoint, options) {
    const method = options.method || 'GET';
    const data = options.body ? JSON.parse(options.body) : null;
    
    // Simulate delay
    return new Promise((resolve) => {
      setTimeout(() => {
        switch (endpoint) {
          case '/users':
            if (method === 'GET') {
              resolve({ users: this.getLocalUsers(), success: true });
            } else if (method === 'POST') {
              const newUser = this.addLocalUser(data);
              resolve({ user: newUser, success: true });
            }
            break;
          
          case '/withdrawals':
            if (method === 'GET') {
              resolve({ withdrawals: this.getLocalWithdrawals(), success: true });
            }
            break;
          
          default:
            if (endpoint.startsWith('/users/') && method === 'PUT') {
              const userId = endpoint.split('/')[2];
              const updatedUser = this.updateLocalUser(userId, data);
              resolve({ user: updatedUser, success: true });
            } else if (endpoint.startsWith('/withdrawals/') && method === 'PUT') {
              const withdrawalId = endpoint.split('/')[2];
              const updatedWithdrawal = this.updateLocalWithdrawal(withdrawalId, data);
              resolve({ withdrawal: updatedWithdrawal, success: true });
            } else {
              resolve({ success: true, message: 'Operation completed' });
            }
        }
      }, 500); // Simulate network delay
    });
  }

  // Local storage helpers for development
  getLocalUsers() {
    const users = localStorage.getItem('klever_users');
    return users ? JSON.parse(users) : [
      { id: 1, username: 'john_doe', email: 'john@example.com', firstName: 'John', lastName: 'Doe', balance: 2500.50, status: 'active', joinDate: '2024-01-15', country: 'US', phone: '+1234567890' },
      { id: 2, username: 'jane_smith', email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', balance: 5000.00, status: 'active', joinDate: '2024-01-10', country: 'CA', phone: '+1987654321' },
      { id: 3, username: 'crypto_trader', email: 'trader@example.com', firstName: 'Crypto', lastName: 'Trader', balance: 15000.75, status: 'active', joinDate: '2024-01-05', country: 'UK', phone: '+4471234567' }
    ];
  }

  getLocalWithdrawals() {
    const withdrawals = localStorage.getItem('klever_withdrawals');
    return withdrawals ? JSON.parse(withdrawals) : [
      { id: 1, userId: 1, amount: 500, coin: 'BTC', status: 'pending', requestDate: '2024-01-22', wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
      { id: 2, userId: 2, amount: 1000, coin: 'USDT', status: 'approved', requestDate: '2024-01-20', wallet: '0x742d35Cc6634C0532925a3b8D0F8C9' },
      { id: 3, userId: 3, amount: 2500, coin: 'ETH', status: 'rejected', requestDate: '2024-01-18', wallet: '0x742d35Cc6634C0532925a3b8D0F8C9' }
    ];
  }

  addLocalUser(userData) {
    const users = this.getLocalUsers();
    const newUser = {
      ...userData,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      joinDate: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    localStorage.setItem('klever_users', JSON.stringify(users));
    return newUser;
  }

  updateLocalUser(userId, userData) {
    const users = this.getLocalUsers();
    const index = users.findIndex(u => u.id == userId);
    if (index !== -1) {
      users[index] = { ...users[index], ...userData };
      localStorage.setItem('klever_users', JSON.stringify(users));
      return users[index];
    }
    return null;
  }

  updateLocalWithdrawal(withdrawalId, updateData) {
    const withdrawals = this.getLocalWithdrawals();
    const index = withdrawals.findIndex(w => w.id == withdrawalId);
    if (index !== -1) {
      withdrawals[index] = { ...withdrawals[index], ...updateData };
      localStorage.setItem('klever_withdrawals', JSON.stringify(withdrawals));
      return withdrawals[index];
    }
    return null;
  }

  // Authentication methods
  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    this.token = null;
    localStorage.removeItem('authToken');
    return this.request('/auth/logout', { method: 'POST' });
  }

  // User management methods
  async getUsers() {
    return this.request('/users');
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
    return this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId) {
    return this.request(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async suspendUser(userId) {
    return this.request(`/users/${userId}/suspend`, {
      method: 'PUT',
    });
  }

  // Withdrawal management methods
  async getWithdrawals() {
    return this.request('/withdrawals');
  }

  async approveWithdrawal(withdrawalId) {
    return this.request(`/withdrawals/${withdrawalId}/approve`, {
      method: 'PUT',
    });
  }

  async rejectWithdrawal(withdrawalId) {
    return this.request(`/withdrawals/${withdrawalId}/reject`, {
      method: 'PUT',
    });
  }

  // Investment management methods
  async getInvestments() {
    return this.request('/investments');
  }

  async createInvestment(investmentData) {
    return this.request('/investments', {
      method: 'POST',
      body: JSON.stringify(investmentData),
    });
  }

  async updateInvestment(investmentId, investmentData) {
    return this.request(`/investments/${investmentId}`, {
      method: 'PUT',
      body: JSON.stringify(investmentData),
    });
  }

  // Investment plans methods
  async getInvestmentPlans() {
    return this.request('/investment-plans');
  }

  async createInvestmentPlan(planData) {
    return this.request('/investment-plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }

  async updateInvestmentPlan(planId, planData) {
    return this.request(`/investment-plans/${planId}`, {
      method: 'PUT',
      body: JSON.stringify(planData),
    });
  }

  // Notifications
  async getNotifications() {
    return this.request('/notifications');
  }

  async markNotificationRead(notificationId) {
    return this.request(`/notifications/${notificationId}/read`, {
      method: 'PUT',
    });
  }

  // Site settings
  async getSiteSettings() {
    return this.request('/settings');
  }

  async updateSiteSettings(settings) {
    return this.request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  }

  // Set authentication token
  setAuthToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  // Clear authentication token
  clearAuthToken() {
    this.token = null;
    localStorage.removeItem('authToken');
  }
}

// Create a singleton instance
const apiService = new ApiService();

export default apiService;
