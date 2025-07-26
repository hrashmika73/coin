function About() {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '25px',
        textAlign: 'center',
        marginBottom: '4rem'
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏢</div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          About Kleverscape
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Leading the future of cryptocurrency investment with innovative technology, 
          unmatched security, and exceptional returns for our global community.
        </p>
      </div>

      {/* Our Story */}
      <div className="card card-gradient" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              📖 Our Story
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Founded in 2019 by a team of blockchain experts and financial professionals, 
              Kleverscape emerged from a vision to democratize cryptocurrency investment 
              and make Bitcoin trading accessible to everyone, regardless of their technical background.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Starting with just 100 users, we've grown to serve over 100,000 investors 
              across 150+ countries, managing more than $500 million in assets and delivering 
              consistent returns that have made thousands of our users financially independent.
            </p>
            <div style={{
              background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
              padding: '1.5rem',
              borderRadius: '15px'
            }}>
              <h4 style={{ marginBottom: '1rem', color: '#333' }}>🎯 Our Mission</h4>
              <p style={{ color: '#666', margin: 0 }}>
                To empower individuals worldwide with the tools, knowledge, and opportunities 
                to build wealth through cryptocurrency investment while maintaining the highest 
                standards of security and transparency.
              </p>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            padding: '2rem',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
            <h3 style={{ marginBottom: '2rem' }}>Our Growth Journey</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>2019</div>
                <div>Founded with 100 users</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>2021</div>
                <div>Reached 10,000 investors</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>2023</div>
                <div>$100M+ in managed assets</div>
              </div>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>2024</div>
                <div>100K+ global community</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="card card-gradient" style={{ marginBottom: '3rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          👥 Leadership Team
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            padding: '2rem',
            borderRadius: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍💼</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Michael Chen</h3>
            <div style={{ color: '#ffd700', marginBottom: '1rem' }}>CEO & Founder</div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Former Goldman Sachs executive with 15+ years in financial technology. 
              Led blockchain initiatives at major investment firms before founding Kleverscape.
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
            color: 'white',
            padding: '2rem',
            borderRadius: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👩‍💻</div>
            <h3 style={{ marginBottom: '0.5rem' }}>Sarah Rodriguez</h3>
            <div style={{ color: '#ffd700', marginBottom: '1rem' }}>CTO & Co-Founder</div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Blockchain architect and former Tesla engineer. Expert in cryptocurrency 
              security and scalable trading systems with multiple patents in fintech.
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
            color: '#333',
            padding: '2rem',
            borderRadius: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍⚖️</div>
            <h3 style={{ marginBottom: '0.5rem' }}>David Thompson</h3>
            <div style={{ color: '#667eea', marginBottom: '1rem' }}>Chief Compliance Officer</div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
              Former SEC regulatory expert ensuring Kleverscape operates within 
              all international compliance frameworks and regulatory requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="card card-gradient" style={{ marginBottom: '3rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          💎 Our Core Values
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Security First</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              We employ military-grade encryption, multi-factor authentication, 
              and cold storage solutions to protect every dollar invested.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌐</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Global Accessibility</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Making cryptocurrency investment accessible to everyone, 
              regardless of location, background, or investment experience.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Consistent Returns</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Delivering reliable, sustainable profits through advanced 
              trading algorithms and risk management strategies.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '1.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
            <h3 style={{ color: '#667eea', marginBottom: '1rem' }}>Transparency</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Complete transparency in operations, fees, and performance 
              with real-time reporting and regular audits.
            </p>
          </div>
        </div>
      </div>

      {/* Awards & Recognition */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        color: 'white',
        padding: '3rem 2rem',
        borderRadius: '25px',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#ffd700' }}>
          🏆 Awards & Recognition
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥇</div>
            <h4>Best Crypto Platform 2023</h4>
            <p style={{ fontSize: '0.9rem' }}>FinTech Innovation Awards</p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
            <h4>5-Star Customer Rating</h4>
            <p style={{ fontSize: '0.9rem' }}>Trustpilot Excellence Award</p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
            <h4>Security Excellence</h4>
            <p style={{ fontSize: '0.9rem' }}>Cybersecurity Leadership Council</p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
            <h4>Global Expansion Leader</h4>
            <p style={{ fontSize: '0.9rem' }}>International Business Forum</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card card-gradient">
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          📍 Global Headquarters
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Main Office</h4>
            <p style={{ color: '#666' }}>
              Kleverscape Financial Center<br/>
              100 Bitcoin Boulevard, Suite 2000<br/>
              New York, NY 10001, USA
            </p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌏</div>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>Regional Offices</h4>
            <p style={{ color: '#666' }}>
              London • Singapore • Dubai<br/>
              Tokyo • Sydney • São Paulo<br/>
              Operating in 150+ countries
            </p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>24/7 Support</h4>
            <p style={{ color: '#666' }}>
              support@kleverscape.com<br/>
              +1-800-CRYPTO-1<br/>
              Live chat available 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
