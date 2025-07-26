function WhyChoose() {
  const advantages = [
    {
      icon: '🔒',
      title: 'Bank-Level Security',
      description: 'Military-grade encryption, cold storage, and multi-factor authentication protect your investments.',
      features: ['256-bit SSL encryption', 'Cold storage wallets', '2FA authentication', 'Regular security audits'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '💰',
      title: 'Guaranteed Daily Returns',
      description: 'Consistent daily profits with transparent performance tracking and automatic payouts.',
      features: ['2.5% - 7.5% daily returns', 'Automatic payouts', 'Real-time tracking', 'No hidden fees'],
      gradient: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)'
    },
    {
      icon: '⚡',
      title: 'Instant Transactions',
      description: 'Lightning-fast deposits and withdrawals with real-time processing and confirmation.',
      features: ['Instant deposits', 'Fast withdrawals', 'Real-time processing', 'Multiple payment methods'],
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
    },
    {
      icon: '🌍',
      title: 'Global Accessibility',
      description: 'Available worldwide with support for 150+ countries and multiple languages.',
      features: ['150+ countries', 'Multi-language support', 'Local payment methods', 'Regional compliance'],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: '📱',
      title: 'Advanced Technology',
      description: 'Cutting-edge trading algorithms and AI-powered market analysis for optimal returns.',
      features: ['AI trading bots', 'Market analysis', 'Mobile app', 'Advanced charts'],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    },
    {
      icon: '🎧',
      title: '24/7 Expert Support',
      description: 'Round-the-clock customer support from cryptocurrency and investment experts.',
      features: ['24/7 availability', 'Expert team', 'Multiple channels', 'Quick response time'],
      gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)'
    }
  ];

  const comparisons = [
    {
      feature: 'Daily Returns',
      kleverscape: '2.5% - 7.5%',
      traditional: '0.01% - 0.1%',
      others: '1% - 3%'
    },
    {
      feature: 'Minimum Investment',
      kleverscape: '$100',
      traditional: '$10,000+',
      others: '$500+'
    },
    {
      feature: 'Processing Time',
      kleverscape: 'Instant',
      traditional: '3-5 business days',
      others: '24-48 hours'
    },
    {
      feature: 'Security Level',
      kleverscape: 'Military-grade',
      traditional: 'Standard',
      others: 'Basic-Standard'
    },
    {
      feature: 'Customer Support',
      kleverscape: '24/7 Expert',
      traditional: 'Business hours',
      others: 'Limited hours'
    },
    {
      feature: 'Global Access',
      kleverscape: '150+ countries',
      traditional: 'Limited regions',
      others: '20-50 countries'
    }
  ];

  const testimonialStats = [
    { value: '98.5%', label: 'Customer Satisfaction' },
    { value: '100K+', label: 'Active Investors' },
    { value: '$500M+', label: 'Total Invested' },
    { value: '150+', label: 'Countries Served' },
    { value: '24/7', label: 'Support Available' },
    { value: '99.9%', label: 'Uptime Guarantee' }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '25px',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌟</div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Why Choose Kleverscape?
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Discover why over 100,000 investors worldwide trust Kleverscape 
          as their preferred Bitcoin investment platform.
        </p>
      </div>

      {/* Key Advantages */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {advantages.map((advantage, index) => (
          <div
            key={index}
            style={{
              background: advantage.gradient,
              color: 'white',
              padding: '2.5rem',
              borderRadius: '25px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
              pointerEvents: 'none'
            }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: '4rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                {advantage.icon}
              </div>
              
              <h3 style={{ 
                fontSize: '1.8rem', 
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {advantage.title}
              </h3>
              
              <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6', 
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                {advantage.description}
              </p>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '1.5rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#ffd700' }}>✨ Key Features:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {advantage.features.map((feature, idx) => (
                    <li key={idx} style={{
                      padding: '0.5rem 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <span style={{ color: '#ffd700' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="card card-gradient" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          📊 How We Compare
        </h2>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Feature</th>
                <th style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' }}>
                  🏆 Kleverscape
                </th>
                <th>Traditional Banks</th>
                <th>Other Crypto Platforms</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comparison, index) => (
                <tr key={index}>
                  <td style={{ fontWeight: 'bold' }}>{comparison.feature}</td>
                  <td style={{ 
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    fontWeight: 'bold',
                    color: '#667eea'
                  }}>
                    {comparison.kleverscape}
                  </td>
                  <td style={{ color: '#999' }}>{comparison.traditional}</td>
                  <td style={{ color: '#666' }}>{comparison.others}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Statistics */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '25px',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: '#ffd700' }}>
          📈 Our Track Record Speaks
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          {testimonialStats.map((stat, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#ffd700',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="card card-gradient" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎯 Real Success Stories
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '2rem',
            borderRadius: '20px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍💼</div>
            <h4 style={{ marginBottom: '1rem', color: '#ffd700' }}>John M. from USA</h4>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
              "Started with $1,000 and earned $15,000 in 6 months. 
              The daily returns are exactly as promised!"
            </p>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>
              1,500% ROI
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            color: 'white',
            padding: '2rem',
            borderRadius: '20px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👩‍💻</div>
            <h4 style={{ marginBottom: '1rem', color: '#ffd700' }}>Maria S. from Spain</h4>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
              "Kleverscape helped me achieve financial freedom. 
              Now I earn more from crypto than my regular job!"
            </p>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>
              2,300% ROI
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
            color: '#333',
            padding: '2rem',
            borderRadius: '20px'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👨‍🎓</div>
            <h4 style={{ marginBottom: '1rem', color: '#667eea' }}>Ahmed K. from UAE</h4>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
              "The best investment decision I ever made. 
              Consistent daily profits and excellent support!"
            </p>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              1,800% ROI
            </div>
          </div>
        </div>
      </div>

      {/* Security & Trust */}
      <div className="card card-gradient" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🛡️ Security & Trust
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏛️</div>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Regulatory Compliance</h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Fully licensed and regulated in multiple jurisdictions. 
              Compliant with international financial regulations and standards.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Advanced Encryption</h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              256-bit SSL encryption, multi-signature wallets, and cold storage 
              technology protect your investments 24/7.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Regular Audits</h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Independent security audits by leading cybersecurity firms 
              ensure the highest protection standards.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '25px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ffd700' }}>
          🚀 Ready to Join 100,000+ Successful Investors?
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '2rem', lineHeight: '1.6' }}>
          Don't miss out on the opportunity to earn consistent daily profits 
          with the world's most trusted Bitcoin investment platform.
        </p>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="/register" 
            className="btn" 
            style={{
              fontSize: '1.3rem',
              padding: '1.2rem 3rem',
              background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
              color: '#333',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            💎 Start Investing Today
          </a>
          <a 
            href="/plans" 
            className="btn" 
            style={{
              fontSize: '1.3rem',
              padding: '1.2rem 3rem',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              textDecoration: 'none'
            }}
          >
            📊 View Investment Plans
          </a>
        </div>
      </div>
    </div>
  );
}

export default WhyChoose;
