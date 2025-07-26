import { useState } from 'react';
import { Link } from 'react-router-dom';
import { showNotification } from '../components/NotificationSystem';

function Withdraw() {
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [withdrawForm, setWithdrawForm] = useState({
    amount: '',
    address: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');

  const walletBalances = {
    BTC: { balance: 0.15420000, usdValue: 6850.45 },
    ETH: { balance: 2.45600000, usdValue: 3875.20 },
    USDT: { balance: 1250.00, usdValue: 1250.00 },
    BNB: { balance: 15.75000000, usdValue: 3937.50 }
  };

  const currencies = {
    BTC: {
      name: 'Bitcoin',
      icon: '₿',
      network: 'Bitcoin',
      minWithdraw: 0.002,
      maxWithdraw: 10,
      fee: 0.0005,
      processingTime: '10-30 minutes'
    },
    ETH: {
      name: 'Ethereum',
      icon: 'Ξ',
      network: 'Ethereum',
      minWithdraw: 0.05,
      maxWithdraw: 100,
      fee: 0.01,
      processingTime: '5-15 minutes'
    },
    USDT: {
      name: 'Tether USDT',
      icon: '₮',
      network: 'ERC20',
      minWithdraw: 20,
      maxWithdraw: 50000,
      fee: 10,
      processingTime: '5-15 minutes'
    },
    BNB: {
      name: 'Binance Coin',
      icon: '🟡',
      network: 'BSC',
      minWithdraw: 0.2,
      maxWithdraw: 1000,
      fee: 0.002,
      processingTime: '2-10 minutes'
    }
  };

  const handleInputChange = (field, value) => {
    setWithdrawForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setWithdrawForm({
      amount: '',
      address: '',
      note: ''
    });
  };

  const validateWithdrawal = () => {
    const currency = currencies[selectedCurrency];
    const balance = walletBalances[selectedCurrency].balance;
    const amount = parseFloat(withdrawForm.amount);

    if (!withdrawForm.amount || amount <= 0) {
      showNotification('warning', 'Please enter a valid amount');
      return false;
    }

    if (amount < currency.minWithdraw) {
      showNotification('warning', `Minimum withdrawal is ${currency.minWithdraw} ${selectedCurrency}`);
      return false;
    }

    if (amount > currency.maxWithdraw) {
      showNotification('warning', `Maximum withdrawal is ${currency.maxWithdraw} ${selectedCurrency}`);
      return false;
    }

    if (amount + currency.fee > balance) {
      showNotification('error', 'Insufficient balance including network fees');
      return false;
    }

    if (!withdrawForm.address.trim()) {
      showNotification('warning', 'Please enter a valid withdrawal address');
      return false;
    }

    return true;
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    
    if (!validateWithdrawal()) {
      return;
    }

    // Show 2FA verification
    setShow2FA(true);
  };

  const handleConfirmWithdrawal = async () => {
    if (!twoFACode || twoFACode.length !== 6) {
      showNotification('warning', 'Please enter a valid 6-digit 2FA code');
      return;
    }

    setLoading(true);
    try {
      // Simulate withdrawal processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const currency = currencies[selectedCurrency];
      showNotification('success', `Withdrawal request submitted! Your ${withdrawForm.amount} ${selectedCurrency} will be processed within ${currency.processingTime}.`);
      
      // Reset form
      setWithdrawForm({
        amount: '',
        address: '',
        note: ''
      });
      setShow2FA(false);
      setTwoFACode('');
    } catch (error) {
      showNotification('error', 'Failed to process withdrawal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const calculateReceiveAmount = () => {
    const amount = parseFloat(withdrawForm.amount) || 0;
    const fee = currencies[selectedCurrency].fee;
    return Math.max(0, amount - fee);
  };

  return (
    <div className="withdraw-page">
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link> / <span>Withdraw</span>
        </div>
        <h1>📤 Withdraw Funds</h1>
        <p>Withdraw cryptocurrency from your Kleverscape wallet</p>
      </div>

      <div className="withdraw-container">
        {/* Currency Selection */}
        <div className="currency-selection">
          <h3>💰 Select Currency</h3>
          <div className="currency-grid">
            {Object.entries(currencies).map(([code, currency]) => (
              <div
                key={code}
                className={`currency-option ${selectedCurrency === code ? 'selected' : ''}`}
                onClick={() => handleCurrencySelect(code)}
              >
                <div className="currency-icon">{currency.icon}</div>
                <div className="currency-info">
                  <div className="currency-name">{currency.name}</div>
                  <div className="currency-code">{code}</div>
                  <div className="currency-balance">
                    Balance: {walletBalances[code].balance.toFixed(8)} {code}
                  </div>
                  <div className="currency-usd">
                    ≈ {formatCurrency(walletBalances[code].usdValue)}
                  </div>
                </div>
                <div className="selection-indicator">
                  {selectedCurrency === code ? '✅' : '⚪'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Form */}
        <div className="withdrawal-form-section">
          <div className="form-header">
            <h3>📋 Withdrawal Details</h3>
            <div className="selected-currency-info">
              <span className="currency-icon">{currencies[selectedCurrency].icon}</span>
              <span className="currency-name">{currencies[selectedCurrency].name}</span>
              <span className="network-badge">{currencies[selectedCurrency].network}</span>
            </div>
          </div>

          <form onSubmit={handleWithdraw} className="withdrawal-form">
            <div className="form-group">
              <label>Withdrawal Address</label>
              <input
                type="text"
                value={withdrawForm.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="form-control"
                placeholder={`Enter ${selectedCurrency} address`}
                required
              />
              <small className="form-help">
                Make sure this is a valid {currencies[selectedCurrency].network} address
              </small>
            </div>

            <div className="form-group">
              <label>Withdrawal Amount</label>
              <div className="amount-input-group">
                <input
                  type="number"
                  value={withdrawForm.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className="form-control amount-input"
                  placeholder="0.00000000"
                  step={selectedCurrency === 'BTC' ? '0.00000001' : '0.000001'}
                  min={currencies[selectedCurrency].minWithdraw}
                  max={Math.min(currencies[selectedCurrency].maxWithdraw, walletBalances[selectedCurrency].balance)}
                />
                <span className="currency-suffix">{selectedCurrency}</span>
                <button
                  type="button"
                  className="btn btn-secondary max-btn"
                  onClick={() => {
                    const maxAmount = walletBalances[selectedCurrency].balance - currencies[selectedCurrency].fee;
                    handleInputChange('amount', Math.max(0, maxAmount).toString());
                  }}
                >
                  MAX
                </button>
              </div>
              <div className="amount-limits">
                Min: {currencies[selectedCurrency].minWithdraw} {selectedCurrency} | 
                Max: {currencies[selectedCurrency].maxWithdraw} {selectedCurrency}
              </div>
            </div>

            <div className="form-group">
              <label>Note (Optional)</label>
              <textarea
                value={withdrawForm.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className="form-control"
                rows="3"
                placeholder="Add a note for this withdrawal"
              />
            </div>

            {/* Transaction Summary */}
            {withdrawForm.amount && (
              <div className="transaction-summary">
                <h4>📊 Transaction Summary</h4>
                <div className="summary-row">
                  <span className="label">Withdrawal Amount:</span>
                  <span className="value">{withdrawForm.amount} {selectedCurrency}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Network Fee:</span>
                  <span className="value fee">{currencies[selectedCurrency].fee} {selectedCurrency}</span>
                </div>
                <div className="summary-row total">
                  <span className="label">You will receive:</span>
                  <span className="value">{calculateReceiveAmount().toFixed(8)} {selectedCurrency}</span>
                </div>
                <div className="summary-row">
                  <span className="label">Processing Time:</span>
                  <span className="value">{currencies[selectedCurrency].processingTime}</span>
                </div>
              </div>
            )}

            <div className="security-warning">
              <div className="warning-icon">⚠️</div>
              <div className="warning-content">
                <strong>Security Notice:</strong>
                <ul>
                  <li>Double-check the withdrawal address before confirming</li>
                  <li>Withdrawals cannot be reversed once processed</li>
                  <li>You'll need to verify with 2FA before withdrawal is processed</li>
                  <li>Allow processing time before contacting support</li>
                </ul>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={loading || !withdrawForm.amount || !withdrawForm.address}
            >
              🚀 Initiate Withdrawal
            </button>
          </form>
        </div>

        {/* Recent Withdrawals */}
        <div className="recent-withdrawals">
          <h3>📋 Recent Withdrawals</h3>
          <div className="withdrawals-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Currency</th>
                  <th>Amount</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-01-22</td>
                  <td>BTC</td>
                  <td>0.02500000</td>
                  <td className="address-cell">1A1zP1eP...DivfNa</td>
                  <td><span className="status-badge status-warning">Processing</span></td>
                  <td>
                    <button className="btn btn-link">View</button>
                  </td>
                </tr>
                <tr>
                  <td>2024-01-20</td>
                  <td>USDT</td>
                  <td>500.00</td>
                  <td className="address-cell">0x742d35C...8D0F8C9</td>
                  <td><span className="status-badge status-success">Completed</span></td>
                  <td>
                    <button className="btn btn-link">View</button>
                  </td>
                </tr>
                <tr>
                  <td>2024-01-18</td>
                  <td>ETH</td>
                  <td>1.50000000</td>
                  <td className="address-cell">0x742d35C...8D0F8C9</td>
                  <td><span className="status-badge status-success">Completed</span></td>
                  <td>
                    <button className="btn btn-link">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 2FA Verification Modal */}
      {show2FA && (
        <div className="modal-overlay">
          <div className="modal-content twofa-modal">
            <div className="modal-header">
              <h3>🔐 Security Verification</h3>
              <button className="modal-close" onClick={() => setShow2FA(false)}>×</button>
            </div>
            
            <div className="twofa-content">
              <div className="verification-info">
                <div className="info-icon">📱</div>
                <h4>Enter 2FA Code</h4>
                <p>Please enter the 6-digit code from your authenticator app to confirm this withdrawal.</p>
              </div>

              <div className="withdrawal-summary">
                <h5>Withdrawal Summary:</h5>
                <div className="summary-item">
                  <span>Amount:</span>
                  <span>{withdrawForm.amount} {selectedCurrency}</span>
                </div>
                <div className="summary-item">
                  <span>To Address:</span>
                  <span className="address-preview">
                    {withdrawForm.address.substring(0, 10)}...{withdrawForm.address.substring(withdrawForm.address.length - 10)}
                  </span>
                </div>
                <div className="summary-item">
                  <span>You'll Receive:</span>
                  <span>{calculateReceiveAmount().toFixed(8)} {selectedCurrency}</span>
                </div>
              </div>

              <div className="twofa-input">
                <label>Verification Code</label>
                <input
                  type="text"
                  value={twoFACode}
                  onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="code-input"
                  placeholder="000000"
                  maxLength="6"
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShow2FA(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleConfirmWithdrawal}
                disabled={loading || twoFACode.length !== 6}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner spinner-small"></span>
                    Processing...
                  </>
                ) : (
                  '✅ Confirm Withdrawal'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Withdraw;
