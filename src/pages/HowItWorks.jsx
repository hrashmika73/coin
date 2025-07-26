function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: '📝',
      title: 'Create Your Account',
      description: 'Sign up in just 2 minutes with your email and basic information. No complex verification required to get started.',
      details: [
        'Quick 2-minute registration',
        'Email verification',
        'Secure password setup',
        'Welcome bonus activation'
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      number: '02',
      icon: '💰',
      title: 'Make Your First Deposit',
      description: 'Fund your account using Bitcoin, USDT, Ethereum, or other supported cryptocurrencies. Minimum deposit starts at just $100.',
      details: [
        'Multiple crypto options',
        'Instant deposit processing',
        'Secure wallet integration',
        'Real-time confirmation'
      ],
      gradient: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)'
    },
    {
      number: '03',
      icon: '📊',
      title: 'Choose Investment Plan',
      description: 'Select from our three carefully designed investment plans based on your budget and risk tolerance.',
      details: [
        'Starter: 2.5% daily (30 days)',
        'Pro: 5.0% daily (60 days)',
        'Elite: 7.5% daily (90 days)',
        'Flexible plan switching'
      ],
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
    },
    {
      number: '04',
      icon: '🚀',
      title: 'Watch Your Profits Grow',
      description: 'Sit back and watch as our advanced trading algorithms generate consistent daily returns directly to your account.',
      details: [
        'Daily profit payments',
        'Real-time tracking',
        'Performance analytics',
        'Automatic reinvestment options'
      ],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      number: '05',
      icon: '💸',
      title: 'Withdraw Your Earnings',
      description: 'Request withdrawals anytime with fast processing. Your profits are available 24/7 with instant approval.',
      details: [
        'Instant withdrawal requests',
        'Multiple crypto options',
        'No withdrawal limits',
        '24/7 processing'
      ],
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  const features = [
    {
      icon: '🔄',
      title: 'Automated Trading',
      description: 'Advanced AI algorithms trade 24/7 across multiple exchanges to maximize your returns.',
      color: '#667eea'
    },
    {
      icon: '📈',
      title: 'Real-Time Monitoring',
      description: 'Track your investments, profits, and portfolio performance in real-time through our dashboard.',
      color: '#ffd700'
    },
    {
      icon: '🔒',
      title: 'Secure Transactions',
      description: 'All transactions are secured with military-grade encryption and multi-factor authentication.',
      color: '#ff6b35'
    },
    {
      icon: '🌐',
      title: 'Global Access',
      description: 'Access your account from anywhere in the world with our mobile-responsive platform.',
      color: '#4facfe'
    }
  ];

  const timeline = [
    { time: '0-2 min', action: 'Account Creation', status: 'Instant' },
    { time: '2-5 min', action: 'First Deposit', status: 'Instant Processing' },
    { time: '5-10 min', action: 'Plan Selection', status: 'Immediate Activation' },
    { time: '24 hours', action: 'First Profit', status: 'Automatic Payment' },
    { time: 'Daily', action: 'Profit Payments', status: 'Continuous Returns' }
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
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚙️</div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          How It Works
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Start earning consistent Bitcoin profits in just 5 simple steps. 
          Our streamlined process makes cryptocurrency investment accessible to everyone.
        </p>
      </div>

      {/* Process Steps */}
      <div style={{ marginBottom: '4rem' }}>
        {steps.map((step, index) => (
          <div key={index} style={{
            display: 'grid',
            gridTemplateColumns: index % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '4rem'
          }}>
            {/* Step Content */}
            <div style={{
              order: index % 2 === 0 ? 1 : 2,
              padding: '2rem'
            }}>
              <div style={{
                display: 'inline-block',
                background: step.gradient,
                color: 'white',
                padding: '1rem 1.5rem',
                borderRadius: '50px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                marginBottom: '1.5rem'
              }}>
                Step {step.number}
              </div>
              
              <h2 style={{
                fontSize: '2.5rem',
                marginBottom: '1rem',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {step.title}
              </h2>
              
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                color: '#666',
                marginBottom: '2rem'
              }}>
                {step.description}
              </p>
              
              <div style={{
                background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                borderRadius: '15px',
                padding: '1.5rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: '#333' }}>Key Features:</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {step.details.map((detail, idx) => (
                    <li key={idx} style={{
                      padding: '0.5rem 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#666'
                    }}>
                      <span style={{ color: '#667eea', fontSize: '1.2rem' }}>✓</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Step Visual */}
            <div style={{
              order: index % 2 === 0 ? 2 : 1,
              background: step.gradient,
              borderRadius: '25px',
              padding: '3rem',
              textAlign: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
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
                <div style={{
                  fontSize: '8rem',
                  marginBottom: '1rem',
                  opacity: 0.9
                }}>
                  {step.icon}
                </div>
                <div style={{
                  fontSize: '4rem',
                  fontWeight: 'bold',
                  color: '#ffd700',
                  marginBottom: '1rem'
                }}>
                  {step.number}
                </div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                  {step.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="card card-gradient" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ⏰ Your Investment Timeline
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem'
        }}>
          {timeline.map((item, index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '2rem',
              borderRadius: '20px',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#ffd700',
                marginBottom: '0.5rem'
              }}>
                {item.time}
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>{item.action}</h4>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                fontSize: '0.9rem'
              }}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '25px',
        marginBottom: '4rem'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          color: '#ffd700'
        }}>
          🎯 Platform Features
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feature, index) => (
            <div key={index} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#ffd700'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Quick Answers */}
      <div className="card card-gradient" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          ❓ Quick Answers
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
            padding: '2rem',
            borderRadius: '20px'
          }}>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
              💰 What's the minimum investment?
            </h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              You can start investing with just $100 in our Starter Plan. 
              This makes cryptocurrency investment accessible to everyone.
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
            padding: '2rem',
            borderRadius: '20px'
          }}>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
              ⏰ How quickly can I withdraw profits?
            </h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Withdrawals are processed instantly 24/7. You can access your 
              profits anytime without waiting periods or restrictions.
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
            padding: '2rem',
            borderRadius: '20px'
          }}>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
              🔒 How secure are my investments?
            </h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Your investments are protected with bank-level security, 
              cold storage wallets, and comprehensive insurance coverage.
            </p>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #e3f2fd, #f3e5f5)',
            padding: '2rem',
            borderRadius: '20px'
          }}>
            <h4 style={{ color: '#667eea', marginBottom: '1rem' }}>
              📱 Can I track my investments on mobile?
            </h4>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Yes! Our platform is fully mobile-responsive and offers 
              real-time tracking of all your investments and profits.
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
          🚀 Ready to Get Started?
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '2rem', lineHeight: '1.6' }}>
          Join thousands of successful investors who are already earning 
          consistent daily profits with Kleverscape.
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
            💎 Create Account Now
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
            📊 View Plans
          </a>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
