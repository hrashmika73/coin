// API Service for Kleverscape
// Handles all API calls to the PHP backend

const API_BASE_URL = window.location.origin + '/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to make API requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      credentials: 'include', // Include cookies for session management
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const finalOptions = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, finalOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Request failed');
      }

      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials) {
    return this.makeRequest('/auth.php?action=login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(userData) {
    return this.makeRequest('/auth.php?action=register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.makeRequest('/auth.php?action=logout', {
      method: 'POST',
    });
  }

  async verifySession() {
    return this.makeRequest('/auth.php?action=verify-session');
  }

  async getUserProfile() {
    return this.makeRequest('/auth.php?action=profile');
  }

  async updateUserProfile(profileData) {
    return this.makeRequest('/auth.php?action=profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }

  // Site settings methods
  async getSiteSettings() {
    return this.makeRequest('/settings.php');
  }

  async updateSiteSettings(settings) {
    return this.makeRequest('/settings.php', {
      method: 'POST',
      body: JSON.stringify(settings),
    });
  }

  // Investment plans methods
  async getInvestmentPlans() {
    return this.makeRequest('/investment-plans.php');
  }

  async createInvestmentPlan(planData) {
    return this.makeRequest('/investment-plans.php', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  }

  async updateInvestmentPlan(planId, planData) {
    return this.makeRequest(`/investment-plans.php?id=${planId}`, {
      method: 'PUT',
      body: JSON.stringify(planData),
    });
  }

  async deleteInvestmentPlan(planId) {
    return this.makeRequest(`/investment-plans.php?id=${planId}`, {
      method: 'DELETE',
    });
  }

  // User investments methods
  async getUserInvestments(userId) {
    return this.makeRequest(`/investments.php?user_id=${userId}`);
  }

  async createInvestment(investmentData) {
    return this.makeRequest('/investments.php', {
      method: 'POST',
      body: JSON.stringify(investmentData),
    });
  }

  // Deposit methods
  async createDeposit(depositData) {
    return this.makeRequest('/deposits.php', {
      method: 'POST',
      body: JSON.stringify(depositData),
    });
  }

  async getUserDeposits(userId) {
    return this.makeRequest(`/deposits.php?user_id=${userId}`);
  }

  async getDeposits() {
    return this.makeRequest('/deposits.php');
  }

  async approveDeposit(depositId) {
    return this.makeRequest(`/deposits.php?id=${depositId}&action=approve`, {
      method: 'POST',
    });
  }

  async rejectDeposit(depositId) {
    return this.makeRequest(`/deposits.php?id=${depositId}&action=reject`, {
      method: 'POST',
    });
  }

  // Withdrawal methods
  async createWithdrawal(withdrawalData) {
    return this.makeRequest('/withdrawals.php', {
      method: 'POST',
      body: JSON.stringify(withdrawalData),
    });
  }

  async getUserWithdrawals(userId) {
    return this.makeRequest(`/withdrawals.php?user_id=${userId}`);
  }

  async getWithdrawals() {
    return this.makeRequest('/withdrawals.php');
  }

  async approveWithdrawal(withdrawalId) {
    return this.makeRequest(`/withdrawals.php?id=${withdrawalId}&action=approve`, {
      method: 'POST',
    });
  }

  async rejectWithdrawal(withdrawalId) {
    return this.makeRequest(`/withdrawals.php?id=${withdrawalId}&action=reject`, {
      method: 'POST',
    });
  }

  // User management methods (admin only)
  async getUsers() {
    return this.makeRequest('/users.php');
  }

  async createUser(userData) {
    return this.makeRequest('/users.php', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId, userData) {
    return this.makeRequest(`/users.php?id=${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async suspendUser(userId) {
    return this.makeRequest(`/users.php?id=${userId}&action=suspend`, {
      method: 'POST',
    });
  }

  // Transactions methods
  async getTransactions(userId = null) {
    const url = userId ? `/transactions.php?user_id=${userId}` : '/transactions.php';
    return this.makeRequest(url);
  }

  // Admin statistics
  async getAdminStats() {
    return this.makeRequest('/admin-stats.php');
  }

  // Crypto verification
  async triggerVerification() {
    return this.makeRequest('/verify-deposits.php', {
      method: 'POST',
    });
  }

  // Mock data methods (fallback when API is not available)
  async getMockData(endpoint) {
    const mockData = {
      users: [
        { 
          id: 1, 
          username: 'john_doe', 
          email: 'john@example.com', 
          balance: 2500.50, 
          status: 'active', 
          joinDate: '2024-01-15' 
        },
        { 
          id: 2, 
          username: 'jane_smith', 
          email: 'jane@example.com', 
          balance: 5000.00, 
          status: 'active', 
          joinDate: '2024-01-10' 
        }
      ],
      withdrawals: [
        { 
          id: 1, 
          userId: 1, 
          amount: 500, 
          coin: 'BTC', 
          status: 'pending', 
          requestDate: '2024-01-22', 
          wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' 
        },
        { 
          id: 2, 
          userId: 2, 
          amount: 1000, 
          coin: 'USDT', 
          status: 'approved', 
          requestDate: '2024-01-20', 
          wallet: '0x742d35Cc6634C0532925a3b8D0F8C9' 
        }
      ],
      investments: [
        { 
          id: 1, 
          userId: 1, 
          plan: 'Starter Plan', 
          amount: 1000, 
          profit: 125.50, 
          status: 'active', 
          startDate: '2024-01-15' 
        },
        { 
          id: 2, 
          userId: 2, 
          plan: 'Pro Plan', 
          amount: 2500, 
          profit: 875.25, 
          status: 'active', 
          startDate: '2024-01-10' 
        }
      ]
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, [endpoint]: mockData[endpoint] || [] });
      }, 500);
    });
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
