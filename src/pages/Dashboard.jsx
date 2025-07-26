import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WalletBalance from '../components/WalletBalance';
import CryptoNewsFeed from '../components/CryptoNewsFeed';
import PDFReportGenerator from '../components/PDFReportGenerator';
import { showNotification } from '../components/NotificationSystem';

function Dashboard({ user, siteSettings }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    balance: 2500.50,
    totalInvested: 5000.00,
    totalProfit: 1250.75,
    activeInvestments: 3,
    pendingWithdrawals: 1,
    referralBonus: 150.00,
    totalReferrals: 5
  });

  const [investments, setInvestments] = useState([
    {
      id: 1,
      plan: 'Starter Plan',
      amount: 1000,
      profit: 125.50,
      startDate: '2024-01-15',
      status: 'active',
      dailyReturn: 2.5
    },
    {
      id: 2,
      plan: 'Pro Plan',
      amount: 2500,
      profit: 875.25,
      startDate: '2024-01-10',
      status: 'active',
      dailyReturn: 5.0
    },
    {
      id: 3,
      plan: 'Elite Plan',
      amount: 1500,
      profit: 250.00,
      startDate: '2024-01-20',
      status: 'active',
      dailyReturn: 7.5
    }
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'deposit',
      amount: 1000,
      coin: 'BTC',
      status: 'completed',
      date: '2024-01-15',
      hash: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
    },
    {
      id: 2,
      type: 'profit',
      amount: 125.50,
      coin: 'USD',
      status: 'completed',
      date: '2024-01-20',
      hash: 'profit_payout_001'
    },
    {
      id: 3,
      type: 'withdrawal',
      amount: 500,
      coin: 'BTC',
      status: 'pending',
      date: '2024-01-22',
      hash: 'pending_withdrawal_001'
    },
    {
      id: 4,
      type: 'referral_bonus',
      amount: 50.00,
      coin: 'USD',
      status: 'completed',
      date: '2024-01-18',
      hash: 'referral_bonus_001'
    },
    {
      id: 5,
      type: 'deposit',
      amount: 2500,
      coin: 'USDT',
      status: 'completed',
      date: '2024-01-12',
      hash: 'deposit_usdt_001'
    }
  ]);

  const [referralData, setReferralData] = useState({
    referralCode: 'KLEVER' + user?.username?.toUpperCase() || 'DEMO',
    referralLink: `https://kleverscape.com/register?ref=${'KLEVER' + (user?.username?.toUpperCase() || 'DEMO')}`,
    totalReferrals: 5,
    totalEarnings: 150.00,
    referrals: [
      { id: 1, email: 'friend1@example.com', joinDate: '2024-01-10', bonus: 50.00, status: 'active' },
      { id: 2, email: 'friend2@example.com', joinDate: '2024-01-15', bonus: 30.00, status: 'active' },
      { id: 3, email: 'friend3@example.com', joinDate: '2024-01-18', bonus: 40.00, status: 'active' },
      { id: 4, email: 'friend4@example.com', joinDate: '2024-01-20', bonus: 30.00, status: 'pending' },
      { id: 5, email: 'friend5@example.com', joinDate: '2024-01-22', bonus: 0.00, status: 'pending' }
    ]
  });

  const [btcPrice, setBtcPrice] = useState(45000);

  useEffect(() => {
    // Simulate live price updates
    const interval = setInterval(() => {
      setBtcPrice(prev => prev + (Math.random() - 0.5) * 100);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      active: 'success',
      completed: 'success',
      pending: 'warning',
      cancelled: 'danger'
    };
    
    return (
      <span className={`status-badge status-${statusColors[status]}`}>
        {status}
      </span>
    );
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    showNotification('success', 'Referral link copied to clipboard!');
  };

  const downloadTransactionHistory = () => {
    const csvContent = [
      ['Date', 'Type', 'Amount', 'Coin', 'Status', 'Hash'],
      ...transactions.map(tx => [
        tx.date,
        tx.type,
        tx.amount,
        tx.coin,
        tx.status,
        tx.hash
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kleverscape-transactions-${Date.now()}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    showNotification('success', 'Transaction history downloaded!');
  };

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'wallet', label: '💰 Wallet', icon: '💰' },
    { id: 'investments', label: '📈 Investments', icon: '📈' },
    { id: 'transactions', label: '📋 Transactions', icon: '📋' },
    { id: 'referrals', label: '🤝 Referrals', icon: '🤝' },
    { id: 'reports', label: '📄 Reports', icon: '📄' },
    { id: 'news', label: '📰 News', icon: '📰' }
  ];

  const renderOverview = () => (
    <div>
      {/* Welcome Header */}
      <div className="dashboard-welcome">
        <h1>🏆 Welcome back, {user?.username || 'User'}!</h1>
        <p>Manage your investments and track your crypto portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{formatCurrency(stats.balance)}</div>
          <div className="stat-label">💰 Available Balance</div>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/deposit" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
              📥 Deposit
            </Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{formatCurrency(stats.totalInvested)}</div>
          <div className="stat-label">📈 Total Invested</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
            Across {stats.activeInvestments} active plans
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{formatCurrency(stats.totalProfit)}</div>
          <div className="stat-label">💵 Total Profit</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#28a745' }}>
            +{((stats.totalProfit / stats.totalInvested) * 100).toFixed(1)}% ROI
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.totalReferrals}</div>
          <div className="stat-label">🤝 Referrals</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#667eea' }}>
            {formatCurrency(stats.referralBonus)} earned
          </div>
        </div>
      </div>

      {/* Live BTC Price */}
      <div className="card card-gradient" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ₿ Live Bitcoin Price
          <span style={{ fontSize: '0.8rem', background: '#28a745', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>
            LIVE
          </span>
        </h3>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              {formatCurrency(btcPrice)}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-success" onClick={() => setActiveTab('wallet')}>Buy BTC</button>
            <button className="btn btn-warning" onClick={() => setActiveTab('wallet')}>Sell BTC</button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card card-gradient">
        <h3 style={{ marginBottom: '1.5rem' }}>⚡ Quick Actions</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <button className="btn btn-success" style={{ padding: '1rem', fontSize: '1rem' }} onClick={() => setActiveTab('wallet')}>
            📥 Deposit Funds
          </button>
          <button className="btn btn-warning" style={{ padding: '1rem', fontSize: '1rem' }} onClick={() => setActiveTab('wallet')}>
            📤 Withdraw
          </button>
          <Link to="/plans" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem' }}>
            💎 New Investment
          </Link>
          <button className="btn btn-secondary" style={{ padding: '1rem', fontSize: '1rem' }} onClick={() => setActiveTab('referrals')}>
            🤝 Refer Friends
          </button>
        </div>
      </div>
    </div>
  );

  const renderInvestments = () => (
    <div>
      <div className="section-header">
        <h2>📈 Your Investments</h2>
        <Link to="/plans" className="btn btn-primary">
          💎 New Investment
        </Link>
      </div>
      
      <div className="card card-gradient">
        {investments.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Amount</th>
                  <th>Current Profit</th>
                  <th>Daily Return</th>
                  <th>Start Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {investments.map(investment => (
                  <tr key={investment.id}>
                    <td><strong>{investment.plan}</strong></td>
                    <td>{formatCurrency(investment.amount)}</td>
                    <td style={{ color: '#28a745', fontWeight: 'bold' }}>
                      +{formatCurrency(investment.profit)}
                    </td>
                    <td>
                      <span style={{ 
                        background: 'linear-gradient(135deg, #28a745, #66bb6a)',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.8rem'
                      }}>
                        {investment.dailyReturn}%/day
                      </span>
                    </td>
                    <td>{investment.startDate}</td>
                    <td>{getStatusBadge(investment.status)}</td>
                    <td>
                      <button className="btn btn-primary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}>
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <h3>No Active Investments</h3>
            <p style={{ marginBottom: '1rem' }}>Start investing to see your portfolio grow!</p>
            <Link to="/plans" className="btn btn-primary">
              View Investment Plans
            </Link>
          </div>
        )}
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div>
      <div className="section-header">
        <h2>📋 Transaction History</h2>
        <button className="btn btn-secondary" onClick={downloadTransactionHistory}>
          📥 Download CSV
        </button>
      </div>
      
      <div className="card card-gradient">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Coin</th>
                <th>Status</th>
                <th>Date</th>
                <th>Hash/ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>
                    <span style={{ 
                      background: transaction.type === 'deposit' ? '#28a745' : 
                                 transaction.type === 'profit' ? '#ffd700' : 
                                 transaction.type === 'referral_bonus' ? '#6f42c1' : '#667eea',
                      color: transaction.type === 'profit' ? '#333' : 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      textTransform: 'capitalize'
                    }}>
                      {transaction.type === 'deposit' ? '📥' : 
                       transaction.type === 'profit' ? '💰' : 
                       transaction.type === 'referral_bonus' ? '🤝' : '📤'} {transaction.type.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ fontWeight: 'bold' }}>
                    {transaction.type === 'withdrawal' ? '-' : '+'}{formatCurrency(transaction.amount)}
                  </td>
                  <td>{transaction.coin}</td>
                  <td>{getStatusBadge(transaction.status)}</td>
                  <td>{transaction.date}</td>
                  <td style={{ fontSize: '0.8rem', fontFamily: 'monospace' }}>
                    {transaction.hash.substring(0, 20)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReferrals = () => (
    <div>
      <div className="section-header">
        <h2>🤝 Referral Program</h2>
        <div className="referral-stats">
          <span className="stat-item">
            <strong>{referralData.totalReferrals}</strong> Referrals
          </span>
          <span className="stat-item">
            <strong>{formatCurrency(referralData.totalEarnings)}</strong> Earned
          </span>
        </div>
      </div>

      {/* Referral Link */}
      <div className="card card-gradient" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>🔗 Your Referral Link</h3>
        <div className="referral-link-container">
          <div className="referral-code">
            <label>Referral Code</label>
            <div className="code-display">
              <span className="code">{referralData.referralCode}</span>
              <button className="btn btn-primary copy-btn" onClick={() => {
                navigator.clipboard.writeText(referralData.referralCode);
                showNotification('success', 'Referral code copied!');
              }}>
                📋 Copy
              </button>
            </div>
          </div>
          <div className="referral-link">
            <label>Referral Link</label>
            <div className="link-display">
              <input type="text" value={referralData.referralLink} readOnly className="link-input" />
              <button className="btn btn-primary copy-btn" onClick={copyReferralLink}>
                📋 Copy Link
              </button>
            </div>
          </div>
        </div>
        
        <div className="referral-info">
          <h4>💰 How It Works</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">🤝</span>
              <div>
                <strong>Invite Friends</strong>
                <p>Share your referral link with friends</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💎</span>
              <div>
                <strong>They Invest</strong>
                <p>Friends sign up and make their first investment</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">💰</span>
              <div>
                <strong>Earn 5%</strong>
                <p>Get 5% of their investment as bonus</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral List */}
      <div className="card card-gradient">
        <h3 style={{ marginBottom: '1.5rem' }}>👥 Your Referrals</h3>
        {referralData.referrals.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Join Date</th>
                  <th>Bonus Earned</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {referralData.referrals.map(referral => (
                  <tr key={referral.id}>
                    <td>{referral.email}</td>
                    <td>{referral.joinDate}</td>
                    <td style={{ color: '#28a745', fontWeight: 'bold' }}>
                      {formatCurrency(referral.bonus)}
                    </td>
                    <td>{getStatusBadge(referral.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
            <h3>No Referrals Yet</h3>
            <p style={{ marginBottom: '1rem' }}>Start sharing your referral link to earn bonuses!</p>
            <button className="btn btn-primary" onClick={copyReferralLink}>
              📋 Copy Referral Link
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'wallet' && <WalletBalance user={user} />}
        {activeTab === 'investments' && renderInvestments()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'referrals' && renderReferrals()}
        {activeTab === 'reports' && <PDFReportGenerator user={user} investments={investments} transactions={transactions} />}
        {activeTab === 'news' && <CryptoNewsFeed />}
      </div>

      {/* Support Banner */}
      <div className="support-banner">
        <h3>🎧 Need Help?</h3>
        <p>Our 24/7 support team is here to assist you with any questions or concerns.</p>
        <div className="support-actions">
          <a href={`mailto:${siteSettings?.contactEmail || 'support@kleverscape.com'}`} className="btn support-btn">
            📧 Email Support
          </a>
          <a href={`tel:${siteSettings?.supportPhone || '+1234567890'}`} className="btn support-btn">
            📱 Call Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
