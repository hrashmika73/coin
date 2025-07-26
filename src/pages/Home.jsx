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
      <section className="hero-section" style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 30%, #667eea 70%, #764ba2 100%)',
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Animated Background Elements */}
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1">₿</div>
            <div className="shape shape-2">💎</div>
            <div className="shape shape-3">🚀</div>
            <div className="shape shape-4">₿</div>
            <div className="shape shape-5">💎</div>
            <div className="shape shape-6">🚀</div>
          </div>
          <div className="gradient-orbs">
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
          </div>
        </div>
        
        <div className="hero-content" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          position: 'relative', 
          zIndex: 1,
          width: '100%'
        }}>
          <h1 className="hero-title" style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '800',
            marginBottom: 'clamp(1rem, 3vw, 2rem)',
            background: 'linear-gradient(135deg, #ffd700, #ff6b35, #f093fb)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            lineHeight: '1.2',
            letterSpacing: '-0.02em'
          }}>
            🚀 Welcome to {siteSettings.siteName}
          </h1>
          
          <p className="hero-subtitle" style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            maxWidth: '900px',
            margin: '0 auto 2rem',
            lineHeight: '1.7',
            opacity: '0.95',
            fontWeight: '400'
          }}>
            💎 The World's Most Trusted Bitcoin Exchange & Investment Platform
            <br />
            🌟 Join 100,000+ investors earning daily profits with cryptocurrency
          </p>
          
          {/* Live BTC Price */}
          <div className="price-display" style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--border-radius)',
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            margin: 'clamp(2rem, 4vw, 3rem) auto',
            maxWidth: '700px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: 'var(--shadow-soft)'
          }}>
            <h3 style={{ marginBottom: '1rem', color: '#ffd700' }}>
              ₿ Live Bitcoin Price
            </h3>
            <div className="price-value" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '700',
              color: priceChange >= 0 ? '#4ade80' : '#f87171',
              fontFamily: 'SF Mono, Monaco, monospace',
              letterSpacing: '-0.02em'
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
          
          <div className="hero-actions" style={{ 
            display: 'flex', 
            gap: 'clamp(1rem, 3vw, 2rem)', 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            marginTop: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'center'
          }}>
            <Link to="/register" className="btn btn-primary hero-btn-primary" style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              padding: 'clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem)',
              background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
              color: '#333',
              fontWeight: '700',
              minWidth: '200px',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              🚀 Start Investing Now
            </Link>
            <Link to="/plans" className="btn btn-secondary hero-btn-secondary" style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              padding: 'clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              minWidth: '200px'
            }}>
              💰 View Investment Plans
            </Link>
          </div>
        </div>
      </section>

      {/* TradingView Chart Section */}
      <section className="chart-section" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 className="section-title" style={{
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            📈 Live Bitcoin Trading Chart
          </h2>
          
          <div className="trading-view-container" style={{
            borderRadius: 'var(--border-radius)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-medium)'
          }}>
            <div className="chart-placeholder" style={{
              width: '100%',
              height: 'clamp(400px, 50vw, 600px)',
              background: 'linear-gradient(135deg, #f6f9fc 0%, #e9ecef 100%)',
              borderRadius: 'var(--border-radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 0, 0, 0.1)',
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
      <section className="features-section" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        color: 'white',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            color: '#ffd700',
            fontWeight: '700'
          }}>
            🌟 Why Choose {siteSettings.siteName}?
          </h2>
          
          <div className="features-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)'
          }}>
            <div className="feature-card" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              textAlign: 'center',
              borderRadius: 'var(--border-radius)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
              <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Bank-Level Security</h3>
              <p>Your investments are protected with military-grade encryption and multi-layer security protocols.</p>
            </div>
            
            <div className="feature-card" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              textAlign: 'center',
              borderRadius: 'var(--border-radius)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Instant Transactions</h3>
              <p>Lightning-fast deposits and withdrawals with real-time processing and immediate confirmations.</p>
            </div>
            
            <div className="feature-card" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              textAlign: 'center',
              borderRadius: 'var(--border-radius)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
              <h3 style={{ color: '#ffd700', marginBottom: '1rem' }}>Global Access</h3>
              <p>Available worldwide with support for 150+ countries and multiple payment methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '700'
          }}>
            📊 Our Achievements
          </h2>
          
          <div className="stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)'
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
      <section className="cta-section" style={{
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffd700 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: '1rem',
            color: '#ffd700',
            fontWeight: '700'
          }}>
            🚀 Ready to Start Your Crypto Journey?
          </h2>
          <p style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Join thousands of successful investors who are already earning daily profits with {siteSettings.siteName}. 
            Start with as little as $100 and watch your investment grow!
          </p>
          <Link to="/register" className="btn" style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
            padding: 'clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem)',
            background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
            color: '#333',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            minWidth: '250px'
          }}>
            💎 Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

// Add modern animations and styles
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(10deg); }
  }
  
  @keyframes orbit {
    0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
    100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
  }
  
  .floating-shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    overflow: hidden;
  }
  
  .shape {
    position: absolute;
    font-size: clamp(3rem, 8vw, 6rem);
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
  }
  
  .shape-1 { top: 10%; left: 10%; animation-delay: 0s; }
  .shape-2 { top: 20%; right: 10%; animation-delay: 1s; }
  .shape-3 { bottom: 30%; left: 15%; animation-delay: 2s; }
  .shape-4 { bottom: 10%; right: 20%; animation-delay: 3s; }
  .shape-5 { top: 50%; left: 5%; animation-delay: 4s; }
  .shape-6 { top: 70%; right: 5%; animation-delay: 5s; }
  
  .gradient-orbs {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
  
  .orb {
    position: absolute;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 107, 53, 0.2));
    filter: blur(20px);
    animation: orbit 20s linear infinite;
  }
  
  .orb-1 {
    width: 200px;
    height: 200px;
    top: 20%;
    left: 20%;
    animation-delay: 0s;
  }
  
  .orb-2 {
    width: 150px;
    height: 150px;
    bottom: 30%;
    right: 20%;
    animation-delay: 7s;
  }
  
  .orb-3 {
    width: 100px;
    height: 100px;
    top: 60%;
    left: 60%;
    animation-delay: 14s;
  }
  
  .hero-btn-primary:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 15px 35px rgba(255, 215, 0, 0.4);
  }
  
  .hero-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  .feature-card:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .hero-actions {
      flex-direction: column;
      gap: 1rem;
    }
    
    .hero-btn-primary,
    .hero-btn-secondary {
      width: 100%;
      max-width: 300px;
    }
    
    .shape {
      font-size: clamp(2rem, 6vw, 4rem);
    }
    
    .orb-1, .orb-2, .orb-3 {
      width: 100px;
      height: 100px;
    }
  }
  
  @media (max-width: 480px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;
document.head.appendChild(style);

export default Home;
