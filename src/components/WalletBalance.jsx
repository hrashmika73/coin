import { useState, useEffect } from 'react';
import { showNotification } from './NotificationSystem';

function WalletBalance({ user }) {
  const [walletData, setWalletData] = useState({
    totalBalance: 1250.75,
    availableBalance: 1050.25,
    lockedBalance: 200.50,
    currencies: {
      BTC: { balance: 0.0234, usdValue: 850.45, price: 36322.50 },
      ETH: { balance: 0.156, usdValue: 245.78, price: 1575.12 },
      USDT: { balance: 154.52, usdValue: 154.52, price: 1.00 },
      BNB: { balance: 0, usdValue: 0, price: 245.67 }
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [depositAddress, setDepositAddress] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setWalletData(prev => ({
        ...prev,
        currencies: {
          ...prev.currencies,
          BTC: {
            ...prev.currencies.BTC,
            price: prev.currencies.BTC.price * (0.995 + Math.random() * 0.01),
            usdValue: prev.currencies.BTC.balance * prev.currencies.BTC.price
          },
          ETH: {
            ...prev.currencies.ETH,
            price: prev.currencies.ETH.price * (0.995 + Math.random() * 0.01),
            usdValue: prev.currencies.ETH.balance * prev.currencies.ETH.price
          }
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount, currency = 'USD') => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount);
    }
    return amount.toFixed(currency === 'BTC' ? 8 : 6);
  };

  const generateDepositAddress = (currency) => {
    const addresses = {
      BTC: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      ETH: '0x742d35Cc6634C0532925a3b8D0F8C9E6F4D4Ed6B',
      USDT: '0x742d35Cc6634C0532925a3b8D0F8C9E6F4D4Ed6B',
      BNB: 'bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2'
    };
    return addresses[currency] || 'Address not available';
  };

  const handleDeposit = () => {
    setDepositAddress(generateDepositAddress(selectedCurrency));
    setShowDepositModal(true);
  };

  const handleWithdraw = () => {
    setShowWithdrawModal(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('success', 'Address copied to clipboard!');
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Simulate API call to refresh balances
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update balances with small random changes
      setWalletData(prev => ({
        ...prev,
        totalBalance: prev.totalBalance * (0.99 + Math.random() * 0.02),
        availableBalance: prev.availableBalance * (0.99 + Math.random() * 0.02)
      }));
      
      showNotification('success', 'Wallet balances refreshed!');
    } catch (error) {
      showNotification('error', 'Failed to refresh balances');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wallet-balance-container">
      {/* Header */}
      <div className="wallet-header">
        <div className="wallet-title">
          <h3>💰 My Wallet</h3>
          <p>Manage your cryptocurrency portfolio</p>
        </div>
        <div className="wallet-actions">
          <button 
            className="btn btn-secondary"
            onClick={handleRefresh}
            disabled={loading}
          >
            {loading ? '🔄' : '🔄'} Refresh
          </button>
          <button className="btn btn-success" onClick={handleDeposit}>
            📥 Deposit
          </button>
          <button className="btn btn-warning" onClick={handleWithdraw}>
            📤 Withdraw
          </button>
        </div>
      </div>

      {/* Balance Overview */}
      <div className="balance-overview">
        <div className="balance-card main-balance">
          <div className="balance-label">Total Portfolio Value</div>
          <div className="balance-amount">{formatCurrency(walletData.totalBalance)}</div>
          <div className="balance-change positive">+2.4% (24h)</div>
        </div>
        
        <div className="balance-card">
          <div className="balance-label">Available Balance</div>
          <div className="balance-amount">{formatCurrency(walletData.availableBalance)}</div>
          <div className="balance-note">Ready for trading</div>
        </div>
        
        <div className="balance-card">
          <div className="balance-label">Locked in Investments</div>
          <div className="balance-amount">{formatCurrency(walletData.lockedBalance)}</div>
          <div className="balance-note">Earning profits</div>
        </div>
      </div>

      {/* Currency Balances */}
      <div className="currency-balances">
        <h4>💎 Asset Holdings</h4>
        <div className="currency-grid">
          {Object.entries(walletData.currencies).map(([currency, data]) => (
            <div key={currency} className="currency-card">
              <div className="currency-header">
                <div className="currency-info">
                  <div className="currency-icon">
                    {currency === 'BTC' && '₿'}
                    {currency === 'ETH' && 'Ξ'}
                    {currency === 'USDT' && '₮'}
                    {currency === 'BNB' && '🟡'}
                  </div>
                  <div>
                    <div className="currency-name">{currency}</div>
                    <div className="currency-price">{formatCurrency(data.price)}</div>
                  </div>
                </div>
                <div className="currency-balance">
                  <div className="balance-crypto">
                    {formatCurrency(data.balance, currency)} {currency}
                  </div>
                  <div className="balance-usd">
                    {formatCurrency(data.usdValue)}
                  </div>
                </div>
              </div>
              
              <div className="currency-actions">
                <button 
                  className="btn btn-primary small"
                  onClick={() => {
                    setSelectedCurrency(currency);
                    handleDeposit();
                  }}
                >
                  📥 Deposit
                </button>
                <button 
                  className="btn btn-secondary small"
                  onClick={() => {
                    setSelectedCurrency(currency);
                    handleWithdraw();
                  }}
                  disabled={data.balance === 0}
                >
                  📤 Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="modal-overlay">
          <div className="modal-content deposit-modal">
            <div className="modal-header">
              <h3>📥 Deposit {selectedCurrency}</h3>
              <button className="modal-close" onClick={() => setShowDepositModal(false)}>×</button>
            </div>
            
            <div className="deposit-content">
              <div className="deposit-warning">
                <div className="warning-icon">⚠️</div>
                <div>
                  <strong>Important:</strong> Only send {selectedCurrency} to this address. 
                  Sending other cryptocurrencies may result in permanent loss.
                </div>
              </div>
              
              <div className="deposit-address">
                <label>Deposit Address</label>
                <div className="address-container">
                  <input 
                    type="text" 
                    value={depositAddress} 
                    readOnly 
                    className="address-input"
                  />
                  <button 
                    className="btn btn-primary copy-btn"
                    onClick={() => copyToClipboard(depositAddress)}
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
              
              <div className="deposit-info">
                <div className="info-item">
                  <span className="info-label">Network:</span>
                  <span className="info-value">
                    {selectedCurrency === 'USDT' ? 'ERC20' : selectedCurrency}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Minimum Deposit:</span>
                  <span className="info-value">
                    {selectedCurrency === 'BTC' ? '0.001 BTC' : 
                     selectedCurrency === 'ETH' ? '0.01 ETH' : 
                     selectedCurrency === 'USDT' ? '10 USDT' : '0.1 BNB'}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Confirmations:</span>
                  <span className="info-value">
                    {selectedCurrency === 'BTC' ? '3 blocks' : 
                     selectedCurrency === 'ETH' ? '12 blocks' : '12 blocks'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDepositModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="modal-overlay">
          <div className="modal-content withdraw-modal">
            <div className="modal-header">
              <h3>📤 Withdraw {selectedCurrency}</h3>
              <button className="modal-close" onClick={() => setShowWithdrawModal(false)}>×</button>
            </div>
            
            <div className="withdraw-content">
              <div className="available-balance">
                <span>Available: </span>
                <strong>{formatCurrency(walletData.currencies[selectedCurrency]?.balance || 0, selectedCurrency)} {selectedCurrency}</strong>
              </div>
              
              <div className="form-group">
                <label>Withdrawal Address</label>
                <input 
                  type="text" 
                  placeholder={`Enter ${selectedCurrency} address`}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Amount</label>
                <div className="amount-input">
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="form-control"
                    step={selectedCurrency === 'BTC' ? '0.00000001' : '0.000001'}
                  />
                  <span className="currency-suffix">{selectedCurrency}</span>
                </div>
              </div>
              
              <div className="withdrawal-fee">
                <div className="fee-info">
                  <span>Network Fee:</span>
                  <span>
                    {selectedCurrency === 'BTC' ? '0.0005 BTC' : 
                     selectedCurrency === 'ETH' ? '0.005 ETH' : 
                     selectedCurrency === 'USDT' ? '1 USDT' : '0.001 BNB'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowWithdrawModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => {
                  showNotification('success', 'Withdrawal request submitted for review');
                  setShowWithdrawModal(false);
                }}
              >
                Submit Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WalletBalance;
