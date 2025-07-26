import { useState, useEffect } from 'react';

function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "John Mitchell",
      location: "New York, USA",
      avatar: "👨‍💼",
      investment: "$5,000",
      profit: "$37,500",
      duration: "8 months",
      rating: 5,
      text: "Kleverscape completely changed my financial situation. I started with $5,000 and have earned over $37,500 in just 8 months. The daily returns are exactly as promised, and the platform is incredibly user-friendly. I've already recommended it to all my friends!",
      plan: "Elite Plan",
      verification: "✅ Verified Investor"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      location: "Madrid, Spain",
      avatar: "👩‍💻",
      investment: "$2,500",
      profit: "$18,750",
      duration: "6 months",
      rating: 5,
      text: "As a single mother, I needed a reliable income source. Kleverscape has been a blessing - the consistent daily profits help me support my family while building long-term wealth. The customer support team is amazing and always available when I need help.",
      plan: "Pro Plan",
      verification: "✅ Verified Investor"
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      location: "Dubai, UAE",
      avatar: "👨‍🎓",
      investment: "$10,000",
      profit: "$67,500",
      duration: "12 months",
      rating: 5,
      text: "I was skeptical about cryptocurrency investments until I found Kleverscape. Their transparent approach and consistent returns convinced me. Now I earn more from my investments than my regular job. This platform is the real deal!",
      plan: "Elite Plan",
      verification: "✅ Verified Investor"
    },
    {
      id: 4,
      name: "Sarah Thompson",
      location: "London, UK",
      avatar: "👩‍🔬",
      investment: "$1,500",
      profit: "$11,250",
      duration: "5 months",
      rating: 5,
      text: "Being a scientist, I analyzed Kleverscape thoroughly before investing. The mathematical precision of their returns and the security measures impressed me. It's been 5 months of steady profits, and I couldn't be happier with my decision.",
      plan: "Pro Plan",
      verification: "✅ Verified Investor"
    },
    {
      id: 5,
      name: "Chen Wei",
      location: "Singapore",
      avatar: "👨‍💻",
      investment: "$3,000",
      profit: "$22,500",
      duration: "7 months",
      rating: 5,
      text: "I work in fintech, so I understand investment platforms well. Kleverscape stands out with its advanced technology and reliable returns. The AI trading algorithms are impressive, and the daily profits are credited like clockwork.",
      plan: "Pro Plan",
      verification: "✅ Verified Investor"
    },
    {
      id: 6,
      name: "Emma Wilson",
      location: "Toronto, Canada",
      avatar: "👩‍🎨",
      investment: "$800",
      profit: "$4,800",
      duration: "4 months",
      rating: 5,
      text: "As an artist with irregular income, Kleverscape provides the financial stability I needed. Even with a small investment, the returns have been life-changing. The platform is so easy to use, and withdrawals are instant.",
      plan: "Starter Plan",
      verification: "✅ Verified Investor"
    }
  ];

  const quickStats = [
    { label: "Total Testimonials", value: "2,500+", icon: "💬" },
    { label: "Average Rating", value: "4.9/5", icon: "⭐" },
    { label: "Success Rate", value: "98.5%", icon: "📈" },
    { label: "Countries", value: "150+", icon: "🌍" }
  ];

  const successMetrics = [
    { metric: "Average Monthly ROI", value: "150%", description: "Consistent returns across all plans" },
    { metric: "Customer Satisfaction", value: "98.5%", description: "Based on 10,000+ reviews" },
    { metric: "Platform Uptime", value: "99.9%", description: "Reliable 24/7 service" },
    { metric: "Withdrawal Success", value: "100%", description: "All approved withdrawals processed" }
  ];

  const videoTestimonials = [
    {
      name: "Michael Chen",
      location: "Hong Kong",
      thumbnail: "🎥",
      title: "From $1,000 to $15,000 in 10 months",
      duration: "2:34"
    },
    {
      name: "Lisa Johnson",
      location: "Sydney, Australia",
      thumbnail: "🎬",
      title: "How Kleverscape changed my retirement plans",
      duration: "3:12"
    },
    {
      name: "Carlos Rodriguez",
      location: "São Paulo, Brazil",
      thumbnail: "📹",
      title: "Building wealth with cryptocurrency investment",
      duration: "4:07"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? '#ffd700' : '#ddd',
          fontSize: '1.5rem'
        }}
      >
        ⭐
      </span>
    ));
  };

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
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💬</div>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #ffd700, #ff6b35)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Success Stories
        </h1>
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
          maxWidth: '800px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Hear from our successful investors who have transformed their financial future 
          with Kleverscape's Bitcoin investment platform.
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '4rem'
      }}>
        {quickStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Featured Testimonial Carousel */}
      <div className="card card-gradient" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🌟 Featured Success Stories
        </h2>

        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            transform: `translateX(-${activeTestimonial * 100}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                style={{
                  minWidth: '100%',
                  padding: '2rem'
                }}
              >
                <div style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  borderRadius: '25px',
                  padding: '3rem',
                  textAlign: 'center',
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
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>
                      {testimonial.avatar}
                    </div>
                    
                    <div style={{ marginBottom: '1rem' }}>
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p style={{
                      fontSize: '1.3rem',
                      lineHeight: '1.6',
                      marginBottom: '2rem',
                      fontStyle: 'italic',
                      maxWidth: '800px',
                      margin: '0 auto 2rem'
                    }}>
                      "{testimonial.text}"
                    </p>
                    
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '20px',
                      padding: '2rem',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                      gap: '1rem',
                      marginBottom: '2rem'
                    }}>
                      <div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>
                          {testimonial.investment}
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>Initial Investment</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>
                          {testimonial.profit}
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>Total Profit</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ffd700' }}>
                          {testimonial.duration}
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>Time Period</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ffd700' }}>
                          {testimonial.plan}
                        </div>
                        <div style={{ fontSize: '0.9rem' }}>Investment Plan</div>
                      </div>
                    </div>
                    
                    <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                      {testimonial.name}
                    </h3>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                      📍 {testimonial.location}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#ffd700' }}>
                      {testimonial.verification}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem'
          }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                style={{
                  width: '15px',
                  height: '15px',
                  borderRadius: '50%',
                  border: 'none',
                  background: activeTestimonial === index ? '#667eea' : '#ddd',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* All Testimonials Grid */}
      <div className="card card-gradient" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          💎 More Success Stories
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {testimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              style={{
                background: index % 3 === 0 
                  ? 'linear-gradient(135deg, #667eea, #764ba2)'
                  : index % 3 === 1
                  ? 'linear-gradient(135deg, #ff6b35, #f7931e)'
                  : 'linear-gradient(135deg, #ffd700, #ffed4a)',
                color: index % 3 === 2 ? '#333' : 'white',
                borderRadius: '20px',
                padding: '2rem',
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
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '3rem' }}>{testimonial.avatar}</div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>
                      {testimonial.name}
                    </h4>
                    <p style={{ 
                      fontSize: '0.9rem', 
                      opacity: 0.8,
                      margin: 0 
                    }}>
                      📍 {testimonial.location}
                    </p>
                  </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  {renderStars(testimonial.rating)}
                </div>

                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  marginBottom: '1.5rem',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.text.substring(0, 150)}..."
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  fontSize: '0.9rem'
                }}>
                  <div>
                    <strong>Investment:</strong> {testimonial.investment}
                  </div>
                  <div>
                    <strong>Profit:</strong> {testimonial.profit}
                  </div>
                  <div>
                    <strong>Duration:</strong> {testimonial.duration}
                  </div>
                  <div>
                    <strong>Plan:</strong> {testimonial.plan}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Metrics */}
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
          📊 Platform Performance
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {successMetrics.map((metric, index) => (
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
                {metric.value}
              </div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                {metric.metric}
              </h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Video Testimonials */}
      <div className="card card-gradient" style={{ marginBottom: '4rem' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎥 Video Testimonials
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {videoTestimonials.map((video, index) => (
            <div key={index} style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.closest('div').style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.closest('div').style.transform = 'scale(1)'}
            >
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                {video.thumbnail}
              </div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                {video.name}
              </h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '1rem' }}>
                📍 {video.location}
              </p>
              <p style={{ fontSize: '1rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                {video.title}
              </p>
              <div style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.5rem 1rem',
                borderRadius: '15px',
                display: 'inline-block'
              }}>
                ▶️ {video.duration}
              </div>
            </div>
          ))}
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
          🚀 Your Success Story Starts Here
        </h2>
        <p style={{ fontSize: '1.3rem', marginBottom: '2rem', lineHeight: '1.6' }}>
          Join thousands of successful investors who have already transformed their 
          financial future with Kleverscape. Your success story could be next!
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
            💎 Start Your Journey
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

export default Testimonials;
