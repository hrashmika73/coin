import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home({ siteSettings }) {
  const [btcPrice, setBtcPrice] = useState(45000);
  const [priceChange, setPriceChange] = useState(2.5);

  useEffect(() => {
    // Simulate live BTC price updates
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 1000;
      setBtcPrice(prev => Math.max(30000, prev + change));
      setPriceChange((Math.random() - 0.5) * 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)',
        padding: '4rem 2rem',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Bitcoin Icons */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          fontSize: '8rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          animation: 'float 6s ease-in-out infinite'
        }}>
          ₿ 💎 🚀 ₿ 💎 🚀
        </div>
        
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            🚀 Welcome to {siteSettings.siteName}
          </h1>
          
          <p style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: '1.6'
          }}>
            💎 The World's Most Trusted Bitcoin Exchange & Investment Platform
            <br />
            🌟 Join 100,000+ investors earning daily profits with cryptocurrency
          </p>
          
          {/* Live BTC Price */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '25px',
            padding: '2rem',
            margin: '2rem auto',
            maxWidth: '600px',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#ffd700' }}>
              ₿ Live Bitcoin Price
            </h3>
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: priceChange >= 0 ? '#4ade80' : '#f87171'
            }}>
              {formatPrice(btcPrice)}
            </div>
            <div style={{
              fontSize: '1.2rem',
              color: priceChange >= 0 ? '#4ade80' : '#f87171',
              marginTop: '0.5rem'
            }}>
              {priceChange >= 0 ? '📈' : '📉'} {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
            </div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            marginTop: '3rem'
          }}>
            <Link to="/register" className="btn btn-primary" style={{
              fontSize: '1.2rem',
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
              color: '#333',
              fontWeight: 'bold'
            }}>
              🚀 Start Investing Now
            </Link>
            <Link to="/plans" className="btn btn-secondary" style={{
              fontSize: '1.2rem',
              padding: '1rem 2rem'
            }}>
              💰 View Investment Plans
            </Link>
          </div>
        </div>
      </section>

      {/* TradingView Chart Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📈 Live Bitcoin Trading Chart
          </h2>
          
          <div className="trading-view-container">
            <div style={{
              width: '100%',
              height: '500px',
              background: 'linear-gradient(135deg, #f6f9fc 0%, #e9ecef 100%)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #e0e0e0',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Simulated Chart */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1200 500\'%3E%3Cpath d=\'M0,400 Q300,200 600,250 T1200,100\' stroke=\'%23667eea\' stroke-width=\'3\' fill=\'none\'/%3E%3C/svg%3E") center/cover',
                opacity: 0.3
              }} />
              
              <div style={{ textAlign: 'center', zIndex: 1 }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
                <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>
                  TradingView Integration
                </h3>
                <p style={{ color: '#666', maxWidth: '400px' }}>
                  Real-time Bitcoin price charts with advanced technical indicators. 
                  Monitor market trends and make informed investment decisions.
                </p>
                <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#999' }}>
                  🔄 Updates every second • 📱 Mobile friendly • 🎯 Professional tools
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            color: '#ffd700'
          }}>
            🌟 Why Choose {siteSettings.siteName}?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            <div className="card" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Bank-Level Security</h3>
              <p>Your investments are protected with military-grade encryption and multi-layer security protocols.</p>
            </div>
            
            <div className="card" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Instant Transactions</h3>
              <p>Lightning-fast deposits and withdrawals with real-time processing and immediate confirmations.</p>
            </div>
            
            <div className="card" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Global Access</h3>
              <p>Available worldwide with support for 150+ countries and multiple payment methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{
        padding: '4rem 2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            📊 Our Achievements
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div className="stat-card">
              <div className="stat-value">100K+</div>
              <div className="stat-label">👥 Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">$500M+</div>
              <div className="stat-label">💰 Total Invested</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">150+</div>
              <div className="stat-label">🌍 Countries</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">24/7</div>
              <div className="stat-label">🔧 Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#ffd700'
          }}>
            🚀 Ready to Start Your Crypto Journey?
          </h2>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Join thousands of successful investors who are already earning daily profits with {siteSettings.siteName}. 
            Start with as little as $100 and watch your investment grow!
          </p>
          <Link to="/register" className="btn" style={{
            fontSize: '1.3rem',
            padding: '1.2rem 3rem',
            background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
            color: '#333',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}>
            💎 Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;
document.head.appendChild(style);

export default Home;
