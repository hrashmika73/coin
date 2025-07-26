import { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import LoadingSpinner from '../components/LoadingSpinner';
import apiService from '../services/api';
import { showNotification } from '../components/NotificationSystem';

function AdminPanel({ siteSettings, updateSiteSettings }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [localSettings, setLocalSettings] = useState(siteSettings);
  const [userFormOpen, setUserFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormMode, setUserFormMode] = useState('add');
  const [loading, setLoading] = useState(false);
  const [recentActivity, setRecentActivity] = useState([
    { type: 'New user registration', description: 'john_doe joined 2 hours ago', time: '2 hours ago' },
    { type: 'Investment created', description: '$2,500 Pro Plan investment by jane_smith', time: '4 hours ago' },
    { type: 'Withdrawal request', description: '$500 BTC withdrawal pending approval', time: '6 hours ago' },
    { type: 'KYC submission', description: 'crypto_trader submitted KYC documents', time: '8 hours ago' }
  ]);

  const [kycSubmissions, setKycSubmissions] = useState([
    {
      id: 1,
      userId: 1,
      username: 'john_doe',
      email: 'john@example.com',
      fullName: 'John Doe',
      documentType: 'passport',
      documentNumber: 'P123456789',
      frontImage: 'https://via.placeholder.com/300x200/667eea/ffffff?text=ID+Front',
      backImage: 'https://via.placeholder.com/300x200/667eea/ffffff?text=ID+Back',
      selfieImage: 'https://via.placeholder.com/300x200/667eea/ffffff?text=Selfie',
      status: 'pending',
      submissionDate: '2024-01-20',
      reviewDate: null,
      reviewNotes: ''
    },
    {
      id: 2,
      userId: 2,
      username: 'jane_smith',
      email: 'jane@example.com',
      fullName: 'Jane Smith',
      documentType: 'driver_license',
      documentNumber: 'DL987654321',
      frontImage: 'https://via.placeholder.com/300x200/28a745/ffffff?text=ID+Front',
      backImage: 'https://via.placeholder.com/300x200/28a745/ffffff?text=ID+Back',
      selfieImage: 'https://via.placeholder.com/300x200/28a745/ffffff?text=Selfie',
      status: 'approved',
      submissionDate: '2024-01-18',
      reviewDate: '2024-01-19',
      reviewNotes: 'All documents verified successfully'
    },
    {
      id: 3,
      userId: 3,
      username: 'crypto_trader',
      email: 'trader@example.com',
      fullName: 'Alex Johnson',
      documentType: 'national_id',
      documentNumber: 'ID456789123',
      frontImage: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=ID+Front',
      backImage: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=ID+Back',
      selfieImage: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=Selfie',
      status: 'rejected',
      submissionDate: '2024-01-15',
      reviewDate: '2024-01-16',
      reviewNotes: 'Document quality too poor, please resubmit with clearer images'
    }
  ]);


  const [withdrawals, setWithdrawals] = useState([
    { id: 1, userId: 1, amount: 500, coin: 'BTC', status: 'pending', requestDate: '2024-01-22', wallet: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { id: 2, userId: 2, amount: 1000, coin: 'USDT', status: 'approved', requestDate: '2024-01-20', wallet: '0x742d35Cc6634C0532925a3b8D0F8C9' },
    { id: 3, userId: 3, amount: 2500, coin: 'ETH', status: 'rejected', requestDate: '2024-01-18', wallet: '0x742d35Cc6634C0532925a3b8D0F8C9' }
  ]);

  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', email: 'john@example.com', balance: 2500.50, status: 'active', joinDate: '2024-01-15' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', balance: 5000.00, status: 'active', joinDate: '2024-01-10' },
    { id: 3, username: 'crypto_trader', email: 'trader@example.com', balance: 15000.75, status: 'active', joinDate: '2024-01-05' }
  ]);

  const [investments, setInvestments] = useState([
    { id: 1, userId: 1, plan: 'Starter Plan', amount: 1000, profit: 125.50, status: 'active', startDate: '2024-01-15' },
    { id: 2, userId: 2, plan: 'Pro Plan', amount: 2500, profit: 875.25, status: 'active', startDate: '2024-01-10' },
    { id: 3, userId: 3, plan: 'Elite Plan', amount: 5000, profit: 1250.00, status: 'completed', startDate: '2024-01-05' }
  ]);

  // Load data on component mount
  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Load users, withdrawals, and other data from API
      const [usersResponse, withdrawalsResponse] = await Promise.all([
        apiService.getUsers(),
        apiService.getWithdrawals()
      ]);

      if (usersResponse.users) {
        setUsers(usersResponse.users);
      }

      if (withdrawalsResponse.withdrawals) {
        setWithdrawals(withdrawalsResponse.withdrawals);
      }

      showNotification('success', 'Admin data loaded successfully!');
    } catch (error) {
      console.error('Error loading admin data:', error);
      showNotification('warning', 'Using local data - API connection failed');
    } finally {
      setLoading(false);
    }
  };

  const [investmentPlans, setInvestmentPlans] = useState([
    { id: 1, name: 'Starter Plan', minAmount: 100, maxAmount: 999, dailyReturn: 2.5, duration: 30, status: 'active' },
    { id: 2, name: 'Pro Plan', minAmount: 1000, maxAmount: 4999, dailyReturn: 5.0, duration: 60, status: 'active' },
    { id: 3, name: 'Elite Plan', minAmount: 5000, maxAmount: 50000, dailyReturn: 7.5, duration: 90, status: 'active' }
  ]);

  const handleSettingsChange = (field, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoinSettingChange = (coin, field, value) => {
    setLocalSettings(prev => ({
      ...prev,
      coins: {
        ...prev.coins,
        [coin]: {
          ...prev.coins[coin],
          [field]: value
        }
      }
    }));
  };

  const saveSettings = async () => {
    try {
      await apiService.updateSiteSettings(localSettings);
      updateSiteSettings(localSettings);
      showNotification('success', 'Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      showNotification('error', 'Failed to save settings. Please try again.');
    }
  };

  // Button handler functions
  const handleApproveWithdrawal = async (withdrawalId) => {
    try {
      await apiService.approveWithdrawal(withdrawalId);
      setWithdrawals(prev => prev.map(w =>
        w.id === withdrawalId ? { ...w, status: 'approved' } : w
      ));
      showNotification('success', 'Withdrawal approved successfully!');
    } catch (error) {
      console.error('Error approving withdrawal:', error);
      showNotification('error', 'Failed to approve withdrawal. Please try again.');
    }
  };

  const handleRejectWithdrawal = async (withdrawalId) => {
    try {
      await apiService.rejectWithdrawal(withdrawalId);
      setWithdrawals(prev => prev.map(w =>
        w.id === withdrawalId ? { ...w, status: 'rejected' } : w
      ));
      showNotification('warning', 'Withdrawal rejected.');
    } catch (error) {
      console.error('Error rejecting withdrawal:', error);
      showNotification('error', 'Failed to reject withdrawal. Please try again.');
    }
  };

  const handleSuspendUser = async (userId) => {
    try {
      const user = users.find(u => u.id === userId);
      const newStatus = user.status === 'active' ? 'suspended' : 'active';

      await apiService.updateUser(userId, { status: newStatus });
      setUsers(prev => prev.map(u =>
        u.id === userId ? { ...u, status: newStatus } : u
      ));
      showNotification('success', `User ${newStatus === 'suspended' ? 'suspended' : 'activated'} successfully!`);
    } catch (error) {
      console.error('Error updating user status:', error);
      showNotification('error', 'Failed to update user status. Please try again.');
    }
  };

  const handleEditUser = (userId) => {
    const user = users.find(u => u.id === userId);
    setEditingUser(user);
    setUserFormMode('edit');
    setUserFormOpen(true);
  };

  const handleAddNewUser = () => {
    setEditingUser(null);
    setUserFormMode('add');
    setUserFormOpen(true);
  };

  const handleUserFormSubmit = async (userData) => {
    try {
      if (userFormMode === 'add') {
        // Add new user
        const response = await apiService.createUser(userData);
        const newUser = response.user;
        setUsers(prev => [...prev, newUser]);
        showNotification('success', 'User added successfully!');
      } else {
        // Update existing user
        const response = await apiService.updateUser(editingUser.id, userData);
        const updatedUser = response.user;
        setUsers(prev => prev.map(u =>
          u.id === editingUser.id ? updatedUser : u
        ));
        showNotification('success', 'User updated successfully!');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      showNotification('error', `Failed to ${userFormMode === 'add' ? 'add' : 'update'} user. Please try again.`);
      throw error;
    }
  };

  const handleCloseUserForm = () => {
    setUserFormOpen(false);
    setEditingUser(null);
    setUserFormMode('add');
  };

  const handleViewInvestmentDetails = (investmentId) => {
    const investment = investments.find(i => i.id === investmentId);
    showNotification('info', `Investment: ${investment.plan} | Amount: ${formatCurrency(investment.amount)} | Profit: ${formatCurrency(investment.profit)}`);
  };

  const handleEditPlan = (planId) => {
    const plan = investmentPlans.find(p => p.id === planId);
    const newReturn = prompt('Enter new daily return %:', plan.dailyReturn);
    if (newReturn && !isNaN(newReturn)) {
      setInvestmentPlans(prev => prev.map(p =>
        p.id === planId ? { ...p, dailyReturn: parseFloat(newReturn) } : p
      ));
      showNotification('success', 'Plan updated successfully!');
    }
  };

  const handleTogglePlan = (planId) => {
    setInvestmentPlans(prev => prev.map(p =>
      p.id === planId ? { ...p, status: p.status === 'active' ? 'disabled' : 'active' } : p
    ));
    showNotification('success', 'Plan status updated!');
  };

  const handleAddNewPlan = () => {
    const name = prompt('Enter plan name:');
    const minAmount = prompt('Enter minimum amount:');
    const maxAmount = prompt('Enter maximum amount:');
    const dailyReturn = prompt('Enter daily return %:');
    const duration = prompt('Enter duration in days:');

    if (name && minAmount && maxAmount && dailyReturn && duration) {
      const newPlan = {
        id: investmentPlans.length + 1,
        name,
        minAmount: parseFloat(minAmount),
        maxAmount: parseFloat(maxAmount),
        dailyReturn: parseFloat(dailyReturn),
        duration: parseInt(duration),
        status: 'active'
      };
      setInvestmentPlans(prev => [...prev, newPlan]);
      showNotification('success', 'New plan added successfully!');
    }
  };

  // KYC Management Functions
  const handleApproveKYC = async (kycId) => {
    try {
      setKycSubmissions(prev => prev.map(kyc =>
        kyc.id === kycId ? {
          ...kyc,
          status: 'approved',
          reviewDate: new Date().toISOString().split('T')[0],
          reviewNotes: 'Documents verified and approved'
        } : kyc
      ));
      showNotification('success', 'KYC approved successfully!');
    } catch (error) {
      showNotification('error', 'Failed to approve KYC');
    }
  };

  const handleRejectKYC = async (kycId) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      setKycSubmissions(prev => prev.map(kyc =>
        kyc.id === kycId ? {
          ...kyc,
          status: 'rejected',
          reviewDate: new Date().toISOString().split('T')[0],
          reviewNotes: reason
        } : kyc
      ));
      showNotification('warning', 'KYC rejected');
    } catch (error) {
      showNotification('error', 'Failed to reject KYC');
    }
  };

  const handleViewKYCDetails = (kyc) => {
    // In a real app, this would open a detailed modal
    const details = `
KYC Details for ${kyc.fullName}:

Document Type: ${kyc.documentType.replace('_', ' ').toUpperCase()}
Document Number: ${kyc.documentNumber}
Submission Date: ${kyc.submissionDate}
Status: ${kyc.status.toUpperCase()}

${kyc.reviewNotes ? 'Review Notes: ' + kyc.reviewNotes : 'No review notes yet'}`;

    alert(details);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'success',
      pending: 'warning',
      approved: 'success',
      rejected: 'danger',
      completed: 'success'
    };
    
    return (
      <span className={`status-badge status-${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  const renderDashboard = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>📊 Admin Dashboard</h2>
      
      <div className="stats-grid" style={{ marginBottom: '3rem' }}>
        <div className="stat-card">
          <div className="stat-value">{users.length}</div>
          <div className="stat-label">👥 Total Users</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatCurrency(investments.reduce((sum, inv) => sum + inv.amount, 0))}</div>
          <div className="stat-label">💰 Total Investments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatCurrency(investments.reduce((sum, inv) => sum + inv.profit, 0))}</div>
          <div className="stat-label">📈 Total Profits</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{withdrawals.filter(w => w.status === 'pending').length}</div>
          <div className="stat-label">⏳ Pending Withdrawals</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>🔄 Recent Activity</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {recentActivity.map((activity, index) => (
              <div key={index} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 'bold' }}>{activity.type}</div>
                <div style={{ fontSize: '0.9rem', color: '#666' }}>{activity.description}</div>
                <div style={{ fontSize: '0.8rem', color: '#999' }}>{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem' }}>📈 Quick Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Active Users:</span>
              <strong>{users.filter(u => u.status === 'active').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Active Investments:</span>
              <strong>{investments.filter(i => i.status === 'active').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Pending Withdrawals:</span>
              <strong style={{ color: '#ffc107' }}>{withdrawals.filter(w => w.status === 'pending').length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Success Rate:</span>
              <strong style={{ color: '#28a745' }}>98.5%</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>👥 User Management</h2>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>All Users</h3>
          <button className="btn btn-primary" onClick={handleAddNewUser}>
            ➕ Add New User
          </button>
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td><strong>{user.username}</strong></td>
                  <td>{user.email}</td>
                  <td>{formatCurrency(user.balance)}</td>
                  <td>{getStatusBadge(user.status)}</td>
                  <td>{user.joinDate}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                        onClick={() => handleEditUser(user.id)}
                        title={`Edit ${user.username}`}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-warning"
                        style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                        onClick={() => handleSuspendUser(user.id)}
                        title={`${user.status === 'active' ? 'Suspend' : 'Activate'} ${user.username}`}
                      >
                        {user.status === 'active' ? '🚫 Suspend' : '✅ Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderWithdrawals = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>💸 Withdrawal Management</h2>
      
      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Withdrawal Requests</h3>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Coin</th>
                <th>Wallet Address</th>
                <th>Status</th>
                <th>Request Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map(withdrawal => (
                <tr key={withdrawal.id}>
                  <td>{withdrawal.id}</td>
                  <td>{withdrawal.userId}</td>
                  <td>{formatCurrency(withdrawal.amount)}</td>
                  <td>{withdrawal.coin}</td>
                  <td style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    {withdrawal.wallet.substring(0, 20)}...
                  </td>
                  <td>{getStatusBadge(withdrawal.status)}</td>
                  <td>{withdrawal.requestDate}</td>
                  <td>
                    {withdrawal.status === 'pending' ? (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          className="btn btn-success"
                          style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                          onClick={() => handleApproveWithdrawal(withdrawal.id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger"
                          style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                          onClick={() => handleRejectWithdrawal(withdrawal.id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: '#666' }}>No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInvestments = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>📊 Investment Management</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>All Investments</h3>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Plan</th>
                <th>Amount</th>
                <th>Current Profit</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {investments.map(investment => (
                <tr key={investment.id}>
                  <td>{investment.id}</td>
                  <td>{investment.userId}</td>
                  <td><strong>{investment.plan}</strong></td>
                  <td>{formatCurrency(investment.amount)}</td>
                  <td style={{ color: '#28a745', fontWeight: 'bold' }}>
                    +{formatCurrency(investment.profit)}
                  </td>
                  <td>{getStatusBadge(investment.status)}</td>
                  <td>{investment.startDate}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                      onClick={() => handleViewInvestmentDetails(investment.id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '1.5rem' }}>Investment Plans</h3>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Min Amount</th>
                <th>Max Amount</th>
                <th>Daily Return</th>
                <th>Duration (Days)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {investmentPlans.map(plan => (
                <tr key={plan.id}>
                  <td><strong>{plan.name}</strong></td>
                  <td>{formatCurrency(plan.minAmount)}</td>
                  <td>{formatCurrency(plan.maxAmount)}</td>
                  <td>
                    <span style={{ 
                      background: 'linear-gradient(135deg, #28a745, #66bb6a)',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem'
                    }}>
                      {plan.dailyReturn}%
                    </span>
                  </td>
                  <td>{plan.duration} days</td>
                  <td>{getStatusBadge(plan.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        className="btn btn-primary"
                        style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                        onClick={() => handleEditPlan(plan.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-warning"
                        style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                        onClick={() => handleTogglePlan(plan.id)}
                      >
                        {plan.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <button className="btn btn-success" onClick={handleAddNewPlan}>Add New Plan</button>
        </div>
      </div>
    </div>
  );

  const renderKYC = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>🆔 KYC Management</h2>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>KYC Submissions</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-warning" style={{ fontSize: '0.9rem' }}>
              📊 Export Report
            </button>
            <button className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
              🔄 Refresh
            </button>
          </div>
        </div>

        <div className="kyc-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #ffc107, #ffb74d)', color: 'white' }}>
            <div className="stat-value">{kycSubmissions.filter(k => k.status === 'pending').length}</div>
            <div className="stat-label">⏳ Pending Review</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #28a745, #66bb6a)', color: 'white' }}>
            <div className="stat-value">{kycSubmissions.filter(k => k.status === 'approved').length}</div>
            <div className="stat-label">✅ Approved</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #dc3545, #e57373)', color: 'white' }}>
            <div className="stat-value">{kycSubmissions.filter(k => k.status === 'rejected').length}</div>
            <div className="stat-label">❌ Rejected</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
            <div className="stat-value">{kycSubmissions.length}</div>
            <div className="stat-label">📄 Total Submissions</div>
          </div>
        </div>

        <div className="kyc-submissions-grid">
          {kycSubmissions.map(kyc => (
            <div key={kyc.id} className="kyc-card">
              <div className="kyc-header">
                <div className="kyc-user-info">
                  <div className="kyc-avatar">
                    <img src={kyc.selfieImage} alt="User" onError={(e) => e.target.src = 'https://via.placeholder.com/60x60/667eea/ffffff?text=👤'} />
                  </div>
                  <div>
                    <h4>{kyc.fullName}</h4>
                    <p className="kyc-username">@{kyc.username}</p>
                    <p className="kyc-email">{kyc.email}</p>
                  </div>
                </div>
                <div className="kyc-status">
                  {getStatusBadge(kyc.status)}
                </div>
              </div>

              <div className="kyc-details">
                <div className="kyc-detail-row">
                  <span className="label">Document Type:</span>
                  <span className="value">{kyc.documentType.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div className="kyc-detail-row">
                  <span className="label">Document Number:</span>
                  <span className="value kyc-doc-number">{kyc.documentNumber}</span>
                </div>
                <div className="kyc-detail-row">
                  <span className="label">Submitted:</span>
                  <span className="value">{kyc.submissionDate}</span>
                </div>
                {kyc.reviewDate && (
                  <div className="kyc-detail-row">
                    <span className="label">Reviewed:</span>
                    <span className="value">{kyc.reviewDate}</span>
                  </div>
                )}
              </div>

              <div className="kyc-documents">
                <h5>📄 Documents</h5>
                <div className="kyc-images">
                  <div className="kyc-image-item">
                    <img src={kyc.frontImage} alt="ID Front" />
                    <span>Front</span>
                  </div>
                  <div className="kyc-image-item">
                    <img src={kyc.backImage} alt="ID Back" />
                    <span>Back</span>
                  </div>
                  <div className="kyc-image-item">
                    <img src={kyc.selfieImage} alt="Selfie" />
                    <span>Selfie</span>
                  </div>
                </div>
              </div>

              {kyc.reviewNotes && (
                <div className="kyc-notes">
                  <h5>📝 Review Notes</h5>
                  <p>{kyc.reviewNotes}</p>
                </div>
              )}

              <div className="kyc-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewKYCDetails(kyc)}
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                >
                  👁️ View Details
                </button>

                {kyc.status === 'pending' && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() => handleApproveKYC(kyc.id)}
                      style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleRejectKYC(kyc.id)}
                      style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                    >
                      ❌ Reject
                    </button>
                  </>
                )}

                {kyc.status === 'rejected' && (
                  <button
                    className="btn btn-warning"
                    onClick={() => handleApproveKYC(kyc.id)}
                    style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}
                  >
                    🔄 Re-approve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {kycSubmissions.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📄</div>
            <h3>No KYC Submissions</h3>
            <p>No KYC submissions to review at this time.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#667eea' }}>⚙️ Site Settings</h2>
      
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>General Settings</h3>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Site Name</label>
            <input
              type="text"
              className="form-control"
              value={localSettings.siteName}
              onChange={(e) => handleSettingsChange('siteName', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Primary Color</label>
            <input
              type="color"
              className="form-control"
              value={localSettings.primaryColor}
              onChange={(e) => handleSettingsChange('primaryColor', e.target.value)}
              style={{ height: '50px' }}
            />
          </div>
          
          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              className="form-control"
              value={localSettings.contactEmail}
              onChange={(e) => handleSettingsChange('contactEmail', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Support Phone</label>
            <input
              type="text"
              className="form-control"
              value={localSettings.supportPhone}
              onChange={(e) => handleSettingsChange('supportPhone', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Cryptocurrency Settings</h3>
        
        {Object.entries(localSettings.coins).map(([coinCode, coinData]) => (
          <div key={coinCode} style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '15px', 
            padding: '1.5rem', 
            marginBottom: '1rem' 
          }}>
            <h4 style={{ marginBottom: '1rem', textTransform: 'uppercase', color: '#667eea' }}>
              {coinCode} Settings
            </h4>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="checkbox"
                  id={`${coinCode}-enabled`}
                  checked={coinData.enabled}
                  onChange={(e) => handleCoinSettingChange(coinCode, 'enabled', e.target.checked)}
                />
                <label htmlFor={`${coinCode}-enabled`}>Enable {coinCode.toUpperCase()}</label>
              </div>
              
              <div className="form-group">
                <label>Wallet Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={coinData.address}
                  onChange={(e) => handleCoinSettingChange(coinCode, 'address', e.target.value)}
                  placeholder={`Enter ${coinCode.toUpperCase()} wallet address`}
                />
              </div>
              
              <div className="form-group">
                <label>Network</label>
                <input
                  type="text"
                  className="form-control"
                  value={coinData.network}
                  onChange={(e) => handleCoinSettingChange(coinCode, 'network', e.target.value)}
                  placeholder="e.g., ERC20, BEP20, TRC20"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn btn-success" onClick={saveSettings}>
          💾 Save All Settings
        </button>
        <button className="btn btn-secondary" onClick={() => setLocalSettings(siteSettings)}>
          🔄 Reset Changes
        </button>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'users', label: '👥 Users', icon: '👥' },
    { id: 'investments', label: '📈 Investments', icon: '📈' },
    { id: 'withdrawals', label: '💸 Withdrawals', icon: '💸' },
    { id: 'kyc', label: '🆔 KYC Management', icon: '🆔' },
    { id: 'settings', label: '⚙️ Settings', icon: '⚙️' }
  ];

  return (
    <div className="admin-panel">
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        borderRadius: '20px',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '0.5rem' }}>🛡️ Admin Panel</h1>
        <p>Manage your {siteSettings.siteName} platform</p>
      </div>

      {loading && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <LoadingSpinner size="large" message="Loading admin data..." />
        </div>
      )}

      {!loading && (
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Sidebar */}
          <div style={{
            minWidth: '250px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '1.5rem',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ marginBottom: '1.5rem', color: '#667eea' }}>Navigation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    background: activeTab === tab.id ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                    color: activeTab === tab.id ? 'white' : '#333',
                    border: 'none',
                    padding: '1rem',
                    borderRadius: '15px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontWeight: activeTab === tab.id ? 'bold' : 'normal'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1 }} className="admin-content">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'investments' && renderInvestments()}
            {activeTab === 'withdrawals' && renderWithdrawals()}
            {activeTab === 'kyc' && renderKYC()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      )}

      {/* User Form Modal */}
      <UserForm
        isOpen={userFormOpen}
        onClose={handleCloseUserForm}
        onSubmit={handleUserFormSubmit}
        user={editingUser}
        mode={userFormMode}
      />
    </div>
  );
}

export default AdminPanel;
