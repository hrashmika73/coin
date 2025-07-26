import { useState } from 'react';

function FAQ() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openQuestions, setOpenQuestions] = useState({});

  const categories = [
    { id: 'general', name: '🔍 General', icon: '🔍' },
    { id: 'account', name: '👤 Account', icon: '👤' },
    { id: 'investment', name: '💰 Investment', icon: '💰' },
    { id: 'withdrawal', name: '💸 Withdrawal', icon: '💸' },
    { id: 'security', name: '🔒 Security', icon: '🔒' },
    { id: 'technical', name: '⚙️ Technical', icon: '⚙️' }
  ];

  const faqData = {
    general: [
      {
        question: "What is Kleverscape?",
        answer: "Kleverscape is a leading cryptocurrency investment platform that allows users to invest in Bitcoin and earn consistent daily returns. We use advanced trading algorithms and market analysis to generate profits for our investors across multiple exchanges and markets."
      },
      {
        question: "How does Kleverscape generate profits?",
        answer: "We employ sophisticated AI-powered trading algorithms that operate 24/7 across multiple cryptocurrency exchanges. Our system analyzes market trends, executes high-frequency trades, and leverages arbitrage opportunities to generate consistent returns for our investors."
      },
      {
        question: "Is Kleverscape legitimate and regulated?",
        answer: "Yes, Kleverscape is a fully licensed and regulated financial services company. We comply with international financial regulations and undergo regular audits by independent third-party firms to ensure transparency and security."
      },
      {
        question: "What countries do you serve?",
        answer: "Kleverscape operates globally and serves clients in over 150 countries. However, we comply with local regulations and may restrict services in certain jurisdictions. Please check our terms of service for specific country restrictions."
      },
      {
        question: "How long has Kleverscape been operating?",
        answer: "Kleverscape was founded in 2019 and has been successfully operating for over 5 years. We've grown from 100 initial users to over 100,000 active investors worldwide, managing more than $500 million in assets."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "Creating an account is simple and takes just 2 minutes. Click the 'Sign Up' button, provide your email address, create a secure password, and verify your email. You'll receive a welcome bonus upon successful registration."
      },
      {
        question: "What information do I need to provide?",
        answer: "For basic account creation, you only need an email address and password. For enhanced security and higher withdrawal limits, we may request additional verification documents such as government-issued ID and proof of address."
      },
      {
        question: "Can I have multiple accounts?",
        answer: "No, each person is allowed only one account per email address. Multiple accounts are not permitted and may result in account suspension. If you need to change your email, please contact our support team."
      },
      {
        question: "How do I reset my password?",
        answer: "Click the 'Forgot Password' link on the login page and enter your email address. You'll receive a secure password reset link within minutes. Follow the instructions to create a new password."
      },
      {
        question: "Can I change my account details?",
        answer: "Yes, you can update your profile information, contact details, and security settings through your account dashboard. Some changes may require additional verification for security purposes."
      }
    ],
    investment: [
      {
        question: "What is the minimum investment amount?",
        answer: "The minimum investment amount is $100 for our Starter Plan. This low minimum makes cryptocurrency investment accessible to everyone, regardless of their budget or experience level."
      },
      {
        question: "What are the different investment plans?",
        answer: "We offer three investment plans: Starter Plan (2.5% daily for 30 days, $100-$999), Pro Plan (5.0% daily for 60 days, $1,000-$4,999), and Elite Plan (7.5% daily for 90 days, $5,000-$50,000). Each plan offers different returns and durations."
      },
      {
        question: "How are daily profits calculated?",
        answer: "Daily profits are calculated as a percentage of your investment amount. For example, if you invest $1,000 in the Pro Plan (5% daily), you'll earn $50 per day. Profits are automatically credited to your account every 24 hours."
      },
      {
        question: "Can I have multiple active investments?",
        answer: "Yes, you can have multiple active investments across different plans simultaneously. This allows you to diversify your portfolio and maximize your earning potential based on your investment strategy."
      },
      {
        question: "What happens when my investment plan expires?",
        answer: "When your investment plan expires, your initial investment amount plus all accumulated profits remain in your account. You can then choose to reinvest in a new plan or withdraw your funds."
      },
      {
        question: "Can I cancel my investment before it expires?",
        answer: "Investment plans are designed to run for their full duration to ensure optimal returns. Early cancellation may be possible in exceptional circumstances, but may result in reduced returns. Please contact support for assistance."
      }
    ],
    withdrawal: [
      {
        question: "How do I withdraw my profits?",
        answer: "Withdrawals are simple and instant. Go to your dashboard, click 'Withdraw', enter the amount and your cryptocurrency wallet address, and submit the request. Funds are typically processed within minutes."
      },
      {
        question: "What is the minimum withdrawal amount?",
        answer: "The minimum withdrawal amount is $50 for all supported cryptocurrencies. This ensures efficient processing while keeping transaction fees reasonable."
      },
      {
        question: "Are there any withdrawal fees?",
        answer: "Kleverscape does not charge withdrawal fees. You only pay the standard network transaction fees required by the blockchain (typically $1-5 depending on network congestion and cryptocurrency)."
      },
      {
        question: "How long do withdrawals take?",
        answer: "Withdrawals are processed instantly 24/7. Once approved, funds are sent to your wallet immediately. Blockchain confirmation times vary by cryptocurrency but typically take 10-60 minutes."
      },
      {
        question: "Can I withdraw to any wallet?",
        answer: "Yes, you can withdraw to any valid cryptocurrency wallet address that supports the chosen cryptocurrency. Ensure you enter the correct address and network to avoid loss of funds."
      },
      {
        question: "Is there a daily withdrawal limit?",
        answer: "There are no daily withdrawal limits for verified accounts. You can access your full balance anytime. Unverified accounts may have temporary limits that can be removed through identity verification."
      }
    ],
    security: [
      {
        question: "How secure is my investment?",
        answer: "Your investments are protected with bank-level security including 256-bit SSL encryption, multi-factor authentication, cold storage wallets, and comprehensive insurance coverage. We employ the same security standards as major financial institutions."
      },
      {
        question: "What is two-factor authentication (2FA)?",
        answer: "2FA adds an extra layer of security to your account by requiring a second verification step during login. You can enable 2FA using apps like Google Authenticator or receive SMS codes to your mobile phone."
      },
      {
        question: "How do you protect against hackers?",
        answer: "We use multiple security layers including advanced encryption, DDoS protection, regular security audits, cold storage for funds, and real-time monitoring systems. Our security team operates 24/7 to detect and prevent threats."
      },
      {
        question: "What happens if I lose access to my 2FA device?",
        answer: "If you lose access to your 2FA device, contact our support team immediately with your account details and identity verification. We have secure recovery procedures to restore access to your account."
      },
      {
        question: "Do you store my cryptocurrency?",
        answer: "We use a combination of hot wallets for operational needs and cold storage for the majority of funds. Cold storage keeps your cryptocurrency offline and protected from online threats, ensuring maximum security."
      }
    ],
    technical: [
      {
        question: "Do you have a mobile app?",
        answer: "Our platform is fully mobile-responsive and works perfectly on all mobile browsers. You can access all features including trading, monitoring investments, and withdrawals from your smartphone or tablet."
      },
      {
        question: "What browsers are supported?",
        answer: "Kleverscape works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your preferred browser."
      },
      {
        question: "Can I use API for automated trading?",
        answer: "Currently, we don't offer public API access as our platform is designed for passive investment rather than active trading. All trading is handled automatically by our advanced algorithms."
      },
      {
        question: "What if the website is down?",
        answer: "Our platform maintains 99.9% uptime with redundant servers worldwide. In the rare event of maintenance, your investments continue to generate profits automatically. We'll notify users in advance of any scheduled maintenance."
      },
      {
        question: "How do I contact technical support?",
        answer: "You can reach our technical support team 24/7 through live chat, email (support@kleverscape.com), or phone. Our expert team typically responds within minutes to resolve any technical issues."
      }
    ]
  };

  const toggleQuestion = (questionIndex) => {
    setOpenQuestions(prev => ({
      ...prev,
      [questionIndex]: !prev[questionIndex]
    }));
  };

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
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❓</div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Frequently Asked Questions
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Find answers to the most common questions about Kleverscape, 
          cryptocurrency investment, and how our platform works.
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        <div className="stat-card">
          <div className="stat-value">24/7</div>
          <div className="stat-label">🎧 Support Available</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">&lt;5min</div>
          <div className="stat-label">⚡ Response Time</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">98%</div>
          <div className="stat-label">✅ Issues Resolved</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">50+</div>
          <div className="stat-label">📚 Help Articles</div>
        </div>
      </div>

      {/* Category Navigation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '1rem',
        marginBottom: '3rem',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                background: activeCategory === category.id 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                  : 'transparent',
                color: activeCategory === category.id ? 'white' : '#333',
                border: activeCategory === category.id ? 'none' : '2px solid #e0e0e0',
                padding: '1rem 1.5rem',
                borderRadius: '15px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="card card-gradient">
        <h2 style={{
          fontSize: '2rem',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center'
        }}>
          {categories.find(cat => cat.id === activeCategory)?.name} Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqData[activeCategory]?.map((faq, index) => (
            <div
              key={index}
              style={{
                border: '2px solid #e0e0e0',
                borderRadius: '15px',
                overflow: 'hidden',
                background: openQuestions[index] 
                  ? 'linear-gradient(135deg, #f8f9fa, #e9ecef)' 
                  : 'white',
                transition: 'all 0.3s ease'
              }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  background: 'transparent',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#333'
                }}
              >
                <span>{faq.question}</span>
                <span style={{
                  fontSize: '1.5rem',
                  color: '#667eea',
                  transform: openQuestions[index] ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  +
                </span>
              </button>
              
              {openQuestions[index] && (
                <div style={{
                  padding: '0 1.5rem 1.5rem',
                  borderTop: '1px solid #e0e0e0',
                  background: 'white'
                }}>
                  <p style={{
                    color: '#666',
                    lineHeight: '1.6',
                    margin: '1rem 0 0',
                    fontSize: '1rem'
                  }}>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '25px',
        textAlign: 'center',
        marginTop: '4rem'
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎧</div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#ffd700' }}>
          Still Have Questions?
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '2rem', lineHeight: '1.6' }}>
          Our expert support team is available 24/7 to help you with any questions 
          or concerns about your cryptocurrency investments.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
            <h4 style={{ marginBottom: '0.5rem' }}>Email Support</h4>
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Get detailed answers</p>
            <a 
              href="mailto:support@kleverscape.com"
              style={{
                color: '#ffd700',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              support@kleverscape.com
            </a>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
            <h4 style={{ marginBottom: '0.5rem' }}>Live Chat</h4>
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Instant responses</p>
            <button style={{
              background: '#ffd700',
              color: '#333',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Start Chat
            </button>
          </div>
          
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '2rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📱</div>
            <h4 style={{ marginBottom: '0.5rem' }}>Phone Support</h4>
            <p style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>Speak with experts</p>
            <a 
              href="tel:+1-800-CRYPTO-1"
              style={{
                color: '#ffd700',
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              +1-800-CRYPTO-1
            </a>
          </div>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#ffd700' }}>💡 Pro Tip</h4>
          <p style={{ margin: 0, lineHeight: '1.6' }}>
            For faster support, include your account email and specific details 
            about your question when contacting us. Our team can resolve most 
            issues within minutes!
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
