import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WalletBalance from '../components/WalletBalance';
import CryptoNewsFeed from '../components/CryptoNewsFeed';
import PDFReportGenerator from '../components/PDFReportGenerator';
import { showNotification } from '../components/NotificationSystem';

function Dashboard({ user, siteSettings }) {
  const [stats, setStats] = useState({
    balance: 2500.50,
    totalInvested: 5000.00,
    totalProfit: 1250.75,
    activeInvestments: 3,
    pendingWithdrawals: 1
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

  const [activeTab, setActiveTab] = useState('overview');
  const [showReferralModal, setShowReferralModal] = useState(false);

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
    }
  ]);

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

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🏆 Welcome back, {user.username}!</h1>
        <p>Manage your investments and track your crypto portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{formatCurrency(stats.balance)}</div>
          <div className="stat-label">💰 Available Balance</div>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/invest" className="btn btn-primary" style={{ fontSize: '0.9rem' }}>
              💎 Invest Now
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
          <div className="stat-label">���� Total Profit</div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#28a745' }}>
            +{((stats.totalProfit / stats.totalInvested) * 100).toFixed(1)}% ROI
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-value">{stats.activeInvestments}</div>
          <div className="stat-label">🚀 Active Plans</div>
          <div style={{ marginTop: '1rem' }}>
            <Link to="/plans" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
              View Plans
            </Link>
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
            <button className="btn btn-success">Buy BTC</button>
            <button className="btn btn-warning">Sell BTC</button>
          </div>
        </div>
      </div>

      {/* Active Investments */}
      <div className="card card-gradient" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>📊 Your Active Investments</h3>
        
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
                    <td>
                      <strong>{investment.plan}</strong>
                    </td>
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
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <h4>No Active Investments</h4>
            <p style={{ marginBottom: '1rem' }}>Start investing to see your portfolio grow!</p>
            <Link to="/plans" className="btn btn-primary">
              View Investment Plans
            </Link>
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="card card-gradient" style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3>📋 Recent Transactions</h3>
          <Link to="/transactions" className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>
            View All
          </Link>
        </div>
        
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
              {transactions.slice(0, 5).map(transaction => (
                <tr key={transaction.id}>
                  <td>
                    <span style={{ 
                      background: transaction.type === 'deposit' ? '#28a745' : 
                                 transaction.type === 'profit' ? '#ffd700' : '#667eea',
                      color: transaction.type === 'profit' ? '#333' : 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      textTransform: 'capitalize'
                    }}>
                      {transaction.type === 'deposit' ? '📥' : 
                       transaction.type === 'profit' ? '💰' : '📤'} {transaction.type}
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

      {/* Quick Actions */}
      <div className="card card-gradient">
        <h3 style={{ marginBottom: '1.5rem' }}>⚡ Quick Actions</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <Link to="/deposit" className="btn btn-success" style={{ padding: '1rem', fontSize: '1rem' }}>
            📥 Deposit Funds
          </Link>
          <Link to="/withdraw" className="btn btn-warning" style={{ padding: '1rem', fontSize: '1rem' }}>
            📤 Request Withdrawal
          </Link>
          <Link to="/invest" className="btn btn-primary" style={{ padding: '1rem', fontSize: '1rem' }}>
            💎 New Investment
          </Link>
          <Link to="/referral" className="btn btn-secondary" style={{ padding: '1rem', fontSize: '1rem' }}>
            🤝 Refer Friends
          </Link>
        </div>
      </div>

      {/* Support Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        padding: '2rem',
        borderRadius: '20px',
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>🎧 Need Help?</h3>
        <p style={{ marginBottom: '1rem' }}>
          Our 24/7 support team is here to assist you with any questions or concerns.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`mailto:${siteSettings.contactEmail}`} className="btn" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            📧 Email Support
          </a>
          <a href={`tel:${siteSettings.supportPhone}`} className="btn" style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            📱 Call Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
