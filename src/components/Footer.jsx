function Footer({ siteSettings }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>💎 {siteSettings.siteName}</h3>
          <p>Your trusted partner in cryptocurrency investment and trading. Join thousands of investors worldwide who have chosen our platform for secure and profitable Bitcoin trading.</p>
          <div style={{ marginTop: '1rem' }}>
            <span style={{ color: '#ffd700' }}>⭐⭐⭐⭐⭐</span>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Rated 4.9/5 by 10,000+ users</p>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>🚀 Quick Links</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/about" style={{ color: 'white', textDecoration: 'none' }}>📖 About Us</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/plans" style={{ color: 'white', textDecoration: 'none' }}>💰 Investment Plans</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/how-it-works" style={{ color: 'white', textDecoration: 'none' }}>⚙️ How It Works</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/faq" style={{ color: 'white', textDecoration: 'none' }}>❓ FAQ</a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a href="/testimonials" style={{ color: 'white', textDecoration: 'none' }}>💬 Testimonials</a>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>💼 Services</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'white' }}>₿ Bitcoin Trading</span>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'white' }}>💎 Cryptocurrency Investment</span>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'white' }}>📈 Portfolio Management</span>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'white' }}>💰 Profit Maximization</span>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <span style={{ color: 'white' }}>🔒 Secure Transactions</span>
            </li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>📞 Contact Info</h3>
          <div style={{ marginBottom: '1rem' }}>
            <p>
              <strong>📧 Email:</strong><br />
              <a href={`mailto:${siteSettings.contactEmail}`} style={{ color: '#ffd700' }}>
                {siteSettings.contactEmail}
              </a>
            </p>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <p>
              <strong>📱 Phone:</strong><br />
              <a href={`tel:${siteSettings.supportPhone}`} style={{ color: '#ffd700' }}>
                {siteSettings.supportPhone}
              </a>
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ffd700', marginBottom: '0.5rem' }}>🌐 Follow Us</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>📘</a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>🐦</a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>📸</a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>💼</a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem' }}>📱</a>
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
