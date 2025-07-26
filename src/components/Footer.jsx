function Footer({ siteSettings }) {
  return (
    <footer className="footer" style={{
      background: 'linear-gradient(135deg, var(--dark-color) 0%, #2c3e50 50%, var(--primary-color) 100%)',
      color: 'white',
      padding: 'clamp(2rem, 4vw, 4rem) 0 var(--spacing-sm)',
      marginTop: 'var(--spacing-xxl)'
    }}>
      <div className="footer-content" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(1rem, 4vw, 2rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'clamp(1.5rem, 3vw, 2rem)'
      }}>
        <div className="footer-section">
          <h3 style={{ color: 'var(--accent-color)', marginBottom: 'var(--spacing-sm)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>
            💎 {siteSettings.siteName}
          </h3>
          <p style={{ lineHeight: '1.6', fontSize: 'clamp(0.9rem, 2vw, 1rem)' }}>
            Your trusted partner in cryptocurrency investment and trading. Join thousands of investors worldwide who have chosen our platform for secure and profitable Bitcoin trading.
          </p>
          <div style={{ marginTop: 'var(--spacing-sm)' }}>
            <span style={{ color: '#ffd700', fontSize: '1.2rem' }}>⭐⭐⭐⭐⭐</span>
            <p style={{ fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)', marginTop: 'var(--spacing-xs)', opacity: '0.9' }}>
              Rated 4.9/5 by 10,000+ users
            </p>
          </div>
        </div>
        
        <div className="footer-section">
          <h3 style={{ color: 'var(--accent-color)', marginBottom: 'var(--spacing-sm)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>
            🚀 Quick Links
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <a href="/about" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                transition: 'color 0.3s ease',
                opacity: '0.9'
              }}>📖 About Us</a>
            </li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <a href="/plans" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                transition: 'color 0.3s ease',
                opacity: '0.9'
              }}>💰 Investment Plans</a>
            </li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <a href="/how-it-works" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                transition: 'color 0.3s ease',
                opacity: '0.9'
              }}>⚙️ How It Works</a>
            </li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <a href="/faq" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                transition: 'color 0.3s ease',
                opacity: '0.9'
              }}>❓ FAQ</a>
            </li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <a href="/testimonials" style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                transition: 'color 0.3s ease',
                opacity: '0.9'
              }}>💬 Testimonials</a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 style={{ color: 'var(--accent-color)', marginBottom: 'var(--spacing-sm)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>
            💼 Services
          </h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <span style={{ color: 'white', fontSize: 'clamp(0.9rem, 2vw, 1rem)', opacity: '0.9' }}>₿ Bitcoin Trading</span>
            </li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <span style={{ color: 'white', fontSize: 'clamp(0.9rem, 2vw, 1rem)', opacity: '0.9' }}>💎 Cryptocurrency Investment</span>
            </li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <span style={{ color: 'white', fontSize: 'clamp(0.9rem, 2vw, 1rem)', opacity: '0.9' }}>📈 Portfolio Management</span>
            </li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <span style={{ color: 'white', fontSize: 'clamp(0.9rem, 2vw, 1rem)', opacity: '0.9' }}>💰 Profit Maximization</span>
            </li>
            <li style={{ marginBottom: 'var(--spacing-xs)' }}>
              <span style={{ color: 'white', fontSize: 'clamp(0.9rem, 2vw, 1rem)', opacity: '0.9' }}>🔒 Secure Transactions</span>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3 style={{ color: 'var(--accent-color)', marginBottom: 'var(--spacing-sm)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}>
            📞 Contact Info
          </h3>
          <div style={{ marginBottom: 'var(--spacing-sm)' }}>
            <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', marginBottom: 'var(--spacing-xs)' }}>
              <strong>📧 Email:</strong><br />
              <a href={`mailto:${siteSettings.contactEmail}`} style={{
                color: '#ffd700',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}>
                {siteSettings.contactEmail}
              </a>
            </p>
          </div>
          <div style={{ marginBottom: 'var(--spacing-sm)' }}>
            <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', marginBottom: 'var(--spacing-xs)' }}>
              <strong>📱 Phone:</strong><br />
              <a href={`tel:${siteSettings.supportPhone}`} style={{
                color: '#ffd700',
                textDecoration: 'none',
                transition: 'color 0.3s ease'
              }}>
                {siteSettings.supportPhone}
              </a>
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ffd700', marginBottom: 'var(--spacing-xs)', fontSize: 'clamp(1rem, 2.2vw, 1.2rem)' }}>
              🌐 Follow Us
            </h4>
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-sm)',
              flexWrap: 'wrap',
              justifyContent: 'flex-start'
            }}>
              <a href="#" style={{
                color: 'white',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                transition: 'transform 0.3s ease'
              }}>📘</a>
              <a href="#" style={{
                color: 'white',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                transition: 'transform 0.3s ease'
              }}>🐦</a>
              <a href="#" style={{
                color: 'white',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                transition: 'transform 0.3s ease'
              }}>📸</a>
              <a href="#" style={{
                color: 'white',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                transition: 'transform 0.3s ease'
              }}>💼</a>
              <a href="#" style={{
                color: 'white',
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                transition: 'transform 0.3s ease'
              }}>📱</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p>
            © 2024 {siteSettings.siteName}. All rights reserved. 
            <span style={{ color: '#ffd700' }}> Made with ❤️ for crypto enthusiasts worldwide</span>
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Risk Disclosure</a>
          </div>
        </div>
        
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            🔒 <strong>Security Notice:</strong> Your investments are protected by bank-level security
          </p>
          <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
            🌍 <strong>Global Reach:</strong> Serving clients in 150+ countries worldwide
          </p>
          <p style={{ fontSize: '0.9rem' }}>
            ⚡ <strong>24/7 Support:</strong> Round-the-clock customer service in multiple languages
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
