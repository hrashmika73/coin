import { useState, useEffect } from 'react';

function CryptoNewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const mockNews = [
    {
      id: 1,
      title: "Bitcoin Reaches New All-Time High as Institutional Adoption Grows",
      summary: "Major corporations continue to add Bitcoin to their treasury reserves, driving unprecedented demand.",
      category: "bitcoin",
      timestamp: "2 hours ago",
      source: "CoinDesk",
      image: "https://via.placeholder.com/300x200/f7931a/ffffff?text=Bitcoin+News",
      trend: "bullish"
    },
    {
      id: 2,
      title: "Ethereum 2.0 Staking Rewards Hit 5.2% Annual Yield",
      summary: "The Ethereum network continues to see strong validator participation as staking rewards remain attractive.",
      category: "ethereum",
      timestamp: "4 hours ago", 
      source: "CoinTelegraph",
      image: "https://via.placeholder.com/300x200/627eea/ffffff?text=Ethereum+News",
      trend: "bullish"
    },
    {
      id: 3,
      title: "Regulatory Clarity Boosts Crypto Market Confidence",
      summary: "New guidelines from financial regulators provide clearer framework for cryptocurrency operations.",
      category: "regulation",
      timestamp: "6 hours ago",
      source: "Reuters",
      image: "https://via.placeholder.com/300x200/28a745/ffffff?text=Regulation+News",
      trend: "neutral"
    },
    {
      id: 4,
      title: "DeFi Protocol Launches Revolutionary Yield Farming Strategy",
      summary: "New decentralized finance platform offers sustainable high yields through innovative liquidity mining.",
      category: "defi",
      timestamp: "8 hours ago",
      source: "The Block",
      image: "https://via.placeholder.com/300x200/6f42c1/ffffff?text=DeFi+News",
      trend: "bullish"
    },
    {
      id: 5,
      title: "Central Bank Digital Currency Pilots Expand Globally",
      summary: "Multiple countries announce new CBDC trials as digital payment adoption accelerates worldwide.",
      category: "cbdc",
      timestamp: "12 hours ago",
      source: "Financial Times",
      image: "https://via.placeholder.com/300x200/dc3545/ffffff?text=CBDC+News",
      trend: "neutral"
    },
    {
      id: 6,
      title: "NFT Marketplace Sees Record Trading Volume",
      summary: "Digital art and collectibles continue to drive massive trading activity across major platforms.",
      category: "nft",
      timestamp: "1 day ago",
      source: "CoinMarketCap",
      image: "https://via.placeholder.com/300x200/fd7e14/ffffff?text=NFT+News",
      trend: "bullish"
    }
  ];

  const categories = [
    { id: 'all', name: 'All News', icon: '📰' },
    { id: 'bitcoin', name: 'Bitcoin', icon: '₿' },
    { id: 'ethereum', name: 'Ethereum', icon: 'Ξ' },
    { id: 'defi', name: 'DeFi', icon: '🔄' },
    { id: 'regulation', name: 'Regulation', icon: '⚖️' },
    { id: 'nft', name: 'NFTs', icon: '🎨' },
    { id: 'cbdc', name: 'CBDC', icon: '🏛️' }
  ];

  useEffect(() => {
    // Simulate loading news
    setLoading(true);
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 1000);
  }, [selectedCategory]);

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'bullish': return '📈';
      case 'bearish': return '📉';
      default: return '📊';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'bullish': return '#28a745';
      case 'bearish': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="news-feed-container">
        <div className="news-header">
          <h3>📰 Crypto News</h3>
        </div>
        <div className="news-loading">
          <div className="loading-spinner spinner-large"></div>
          <p>Loading latest crypto news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="news-feed-container">
      {/* Header */}
      <div className="news-header">
        <div className="news-title">
          <h3>📰 Crypto News</h3>
          <p>Stay updated with the latest cryptocurrency news</p>
        </div>
        <button className="btn btn-primary refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {/* Category Filter */}
      <div className="news-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="news-grid">
        {filteredNews.map(article => (
          <div key={article.id} className="news-card">
            <div className="news-image">
              <img src={article.image} alt={article.title} />
              <div className="news-trend" style={{ color: getTrendColor(article.trend) }}>
                {getTrendIcon(article.trend)}
              </div>
            </div>
            
            <div className="news-content">
              <div className="news-meta">
                <span className="news-source">{article.source}</span>
                <span className="news-time">{article.timestamp}</span>
              </div>
              
              <h4 className="news-title">{article.title}</h4>
              <p className="news-summary">{article.summary}</p>
              
              <div className="news-footer">
                <span className={`news-category category-${article.category}`}>
                  {categories.find(c => c.id === article.category)?.icon} {article.category.toUpperCase()}
                </span>
                <button className="btn btn-link read-more">
                  Read More →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Breaking News Ticker */}
      <div className="breaking-news">
        <div className="breaking-label">🚨 BREAKING</div>
        <div className="breaking-content">
          <div className="breaking-scroll">
            Bitcoin surges 5% after major bank announces crypto adoption • 
            Ethereum network upgrade scheduled for next month • 
            New stablecoin regulation passed in major jurisdiction • 
            DeFi total value locked reaches new milestone
          </div>
        </div>
      </div>
    </div>
  );
}

export default CryptoNewsFeed;
