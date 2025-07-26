import { useState } from 'react';
import { Link } from 'react-router-dom';

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: 'Starter Plan',
      icon: '🚀',
      minAmount: 100,
      maxAmount: 999,
      dailyReturn: 2.5,
      duration: 30,
      totalReturn: 75,
      features: [
        '24/7 Customer Support',
        'Daily Profit Payments',
        'Mobile App Access',
        'Basic Analytics',
        'Email Notifications'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'Pro Plan',
      icon: '💎',
      minAmount: 1000,
      maxAmount: 4999,
      dailyReturn: 5.0,
      duration: 60,
      totalReturn: 300,
      features: [
        'Priority Customer Support',
        'Daily Profit Payments',
        'Mobile & Web App Access',
        'Advanced Analytics',
        'SMS & Email Notifications',
        'Dedicated Account Manager',
        'Early Access to New Features'
      ],
      popular: true,
      gradient: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)'
    },
    {
      id: 3,
      name: 'Elite Plan',
      icon: '👑',
      minAmount: 5000,
      maxAmount: 50000,
      dailyReturn: 7.5,
      duration: 90,
      totalReturn: 675,
      features: [
        'VIP Customer Support',
        'Instant Profit Payments',
        'Full Platform Access',
        'Premium Analytics & Reports',
        'Multi-channel Notifications',
        'Personal Investment Advisor',
        'Exclusive Market Insights',
        'Custom Investment Strategies',
        'White-glove Service'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)'
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProfit = (amount, plan) => {
    const daily = (amount * plan.dailyReturn) / 100;
    const total = daily * plan.duration;
    return { daily, total };
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '4rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '25px'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          💰 Investment Plans
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Choose from our carefully crafted investment plans designed to maximize your Bitcoin profits
          with guaranteed daily returns and secure transactions.
        </p>
      </div>

      {/* Plans Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {plans.map(plan => (
          <div
            key={plan.id}
            className="plan-card"
            style={{
              background: plan.gradient,
              position: 'relative',
              transform: selectedPlan === plan.id ? 'scale(1.05)' : 'scale(1)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedPlan(selectedPlan === plan.id ? null : plan.id)}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
              }}>
                🔥 MOST POPULAR
              </div>
            )}

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{plan.icon}</div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{plan.name}</h3>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}>
                {plan.dailyReturn}%
              </div>
              <div style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                Daily Return for {plan.duration} days
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '20px',
              padding: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '1.1rem'
              }}>
                <span>Min Amount:</span>
                <strong>{formatCurrency(plan.minAmount)}</strong>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '1.1rem'
              }}>
                <span>Max Amount:</span>
                <strong>{formatCurrency(plan.maxAmount)}</strong>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '1rem',
                fontSize: '1.1rem'
              }}>
                <span>Duration:</span>
                <strong>{plan.duration} days</strong>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '1.1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.3)',
                paddingTop: '1rem'
              }}>
                <span>Total Return:</span>
                <strong style={{ color: '#ffd700' }}>{plan.totalReturn}%</strong>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>✨ Features</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {plan.features.map((feature, index) => (
                  <li key={index} style={{
                    padding: '0.5rem 0',
                    borderBottom: index < plan.features.length - 1 ? '1px solid rgba(255, 255, 255, 0.2)' : 'none',
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

            <Link
              to="/register"
              className="btn"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                textAlign: 'center'
              }}
            >
              🚀 Start Investing
            </Link>
          </div>
        ))}
      </div>

      {/* Profit Calculator */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '25px',
        padding: '3rem',
        marginBottom: '4rem'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🧮 Profit Calculator
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {plans.map(plan => {
            const investment = 1000; // Example amount
            const profit = calculateProfit(investment, plan);
            
            return (
              <div key={plan.id} style={{
                background: plan.gradient,
                color: 'white',
                padding: '2rem',
                borderRadius: '20px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{plan.icon}</div>
                <h3 style={{ marginBottom: '1rem' }}>{plan.name}</h3>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  padding: '1.5rem'
                }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                    Investment: <strong>{formatCurrency(investment)}</strong>
                  </div>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                    Daily Profit: <strong style={{ color: '#ffd700' }}>{formatCurrency(profit.daily)}</strong>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                    Total Profit: <strong style={{ color: '#ffd700' }}>{formatCurrency(profit.total)}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why Choose Our Plans */}
      <div style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        color: 'white',
        padding: '4rem 2rem',
        borderRadius: '25px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#ffd700' }}>
          🌟 Why Choose Our Investment Plans?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ marginBottom: '1rem' }}>100% Secure</h3>
            <p>Your investments are protected with bank-level security and insurance coverage.</p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ marginBottom: '1rem' }}>Daily Payouts</h3>
            <p>Receive your profits every 24 hours, automatically credited to your account.</p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌍</div>
            <h3 style={{ marginBottom: '1rem' }}>Global Access</h3>
            <p>Invest from anywhere in the world with our international platform.</p>
          </div>
          
          <div>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📞</div>
            <h3 style={{ marginBottom: '1rem' }}>24/7 Support</h3>
            <p>Our expert team is available round-the-clock to assist you.</p>
          </div>
        </div>

        <div style={{ marginTop: '3rem' }}>
          <Link to="/register" className="btn" style={{
            fontSize: '1.3rem',
            padding: '1.2rem 3rem',
            background: 'linear-gradient(135deg, #ffd700, #ffed4a)',
            color: '#333',
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
          }}>
            💎 Start Your Investment Journey
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Plans;
