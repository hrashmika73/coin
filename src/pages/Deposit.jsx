import { useState } from 'react';
import { Link } from 'react-router-dom';
import { showNotification } from '../components/NotificationSystem';

function Deposit() {
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositAddress, setDepositAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const currencies = {
    BTC: {
      name: 'Bitcoin',
      icon: '₿',
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      network: 'Bitcoin',
      minDeposit: 0.001,
      confirmations: 3,
      fee: 0.0005
    },
    ETH: {
      name: 'Ethereum',
      icon: 'Ξ',
      address: '0x742d35Cc6634C0532925a3b8D0F8C9E6F4D4Ed6B',
      network: 'Ethereum',
      minDeposit: 0.01,
      confirmations: 12,
      fee: 0.005
    },
    USDT: {
      name: 'Tether USDT',
      icon: '₮',
      address: '0x742d35Cc6634C0532925a3b8D0F8C9E6F4D4Ed6B',
      network: 'ERC20',
      minDeposit: 10,
      confirmations: 12,
      fee: 5
    },
    BNB: {
      name: 'Binance Coin',
      icon: '🟡',
      address: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2',
      network: 'BSC',
      minDeposit: 0.1,
      confirmations: 15,
      fee: 0.001
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(currencies[selectedCurrency].address);
    showNotification('success', 'Deposit address copied to clipboard!');
  };

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency);
    setDepositAddress(currencies[currency].address);
  };

  const generateQRCode = (address) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${address}`;
  };

  const handleManualDeposit = async (e) => {
    e.preventDefault();
    
    if (!depositAmount || parseFloat(depositAmount) < currencies[selectedCurrency].minDeposit) {
      showNotification('warning', `Minimum deposit is ${currencies[selectedCurrency].minDeposit} ${selectedCurrency}`);
      return;
    }

    setLoading(true);
    try {
      // Simulate deposit processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showNotification('success', `Deposit of ${depositAmount} ${selectedCurrency} initiated! You will be credited after ${currencies[selectedCurrency].confirmations} confirmations.`);
      setDepositAmount('');
    } catch (error) {
      showNotification('error', 'Failed to process deposit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="deposit-page">
      <div className="page-header">
        <div className="breadcrumb">
          <Link to="/dashboard">Dashboard</Link> / <span>Deposit</span>
        </div>
        <h1>📥 Deposit Funds</h1>
        <p>Add cryptocurrency to your Kleverscape wallet</p>
      </div>

      <div className="deposit-container">
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
                  <div className="currency-network">{currency.network}</div>
                </div>
                <div className="selection-indicator">
                  {selectedCurrency === code ? '✅' : '⚪'}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="deposit-methods">
          {/* QR Code Deposit */}
          <div className="deposit-method">
            <div className="method-header">
              <h3>📱 QR Code Deposit</h3>
              <p>Scan with your wallet app</p>
            </div>
            
            <div className="qr-deposit">
              <div className="qr-code">
                <img 
                  src={generateQRCode(currencies[selectedCurrency].address)} 
                  alt={`${selectedCurrency} Deposit QR Code`} 
                />
              </div>
              
              <div className="qr-info">
                <div className="address-display">
                  <label>Deposit Address ({selectedCurrency})</label>
                  <div className="address-container">
                    <input 
                      type="text" 
                      value={currencies[selectedCurrency].address} 
                      readOnly 
                      className="address-input"
                    />
                    <button className="btn btn-primary copy-btn" onClick={copyAddress}>
                      📋 Copy
                    </button>
                  </div>
                </div>
                
                <div className="deposit-details">
                  <div className="detail-row">
                    <span className="label">Network:</span>
                    <span className="value">{currencies[selectedCurrency].network}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Minimum Deposit:</span>
                    <span className="value">{currencies[selectedCurrency].minDeposit} {selectedCurrency}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Confirmations Required:</span>
                    <span className="value">{currencies[selectedCurrency].confirmations} blocks</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Network Fee:</span>
                    <span className="value">{currencies[selectedCurrency].fee} {selectedCurrency}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="security-notice">
              <div className="notice-icon">⚠️</div>
              <div className="notice-content">
                <strong>Important Security Notice:</strong>
                <ul>
                  <li>Only send {selectedCurrency} to this address</li>
                  <li>Sending other cryptocurrencies may result in permanent loss</li>
                  <li>Ensure you're using the correct network: {currencies[selectedCurrency].network}</li>
                  <li>Allow up to {currencies[selectedCurrency].confirmations} confirmations for deposit to appear</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Manual Deposit Report */}
          <div className="deposit-method">
            <div className="method-header">
              <h3>📋 Manual Deposit Report</h3>
              <p>Report your transaction manually</p>
            </div>

            <form onSubmit={handleManualDeposit} className="manual-deposit-form">
              <div className="form-group">
                <label>Deposit Amount</label>
                <div className="amount-input">
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="form-control"
                    placeholder="0.00"
                    step={selectedCurrency === 'BTC' ? '0.00000001' : '0.000001'}
                    min={currencies[selectedCurrency].minDeposit}
                  />
                  <span className="currency-suffix">{selectedCurrency}</span>
                </div>
              </div>

              <div className="form-group">
                <label>Transaction Hash (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter transaction hash for faster processing"
                />
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Any additional information about your deposit"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={loading || !depositAmount}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner spinner-small"></span>
                    Processing...
                  </>
                ) : (
                  '📤 Submit Deposit Report'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Deposits */}
        <div className="recent-deposits">
          <h3>📋 Recent Deposits</h3>
          <div className="deposits-table">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Currency</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Confirmations</th>
                  <th>Hash</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-01-22</td>
                  <td>BTC</td>
                  <td>0.05000000</td>
                  <td><span className="status-badge status-success">Completed</span></td>
                  <td>6/3</td>
                  <td className="hash-cell">1A1zP1eP5...DivfNa</td>
                </tr>
                <tr>
                  <td>2024-01-20</td>
                  <td>USDT</td>
                  <td>1000.00</td>
                  <td><span className="status-badge status-warning">Pending</span></td>
                  <td>8/12</td>
                  <td className="hash-cell">0x742d35C...8D0F8C9</td>
                </tr>
                <tr>
                  <td>2024-01-18</td>
                  <td>ETH</td>
                  <td>2.50000000</td>
                  <td><span className="status-badge status-success">Completed</span></td>
                  <td>15/12</td>
                  <td className="hash-cell">0x742d35C...8D0F8C9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Section */}
        <div className="deposit-support">
          <div className="support-card">
            <h4>💬 Need Help?</h4>
            <p>Having trouble with your deposit? Our support team is here 24/7</p>
            <div className="support-actions">
              <a href="mailto:support@kleverscape.com" className="btn btn-secondary">
                📧 Email Support
              </a>
              <button className="btn btn-primary" onClick={() => showNotification('info', 'Live chat feature coming soon!')}>
                💬 Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
