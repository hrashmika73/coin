import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({ user, logout, siteSettings, isAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          💎 {siteSettings.siteName}
        </Link>
        
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/why-choose" 
            className={`nav-link ${isActive('/why-choose') ? 'active' : ''}`}
          >
            Why Choose
          </Link>
          <Link 
            to="/plans" 
            className={`nav-link ${isActive('/plans') ? 'active' : ''}`}
          >
            Plans
          </Link>
          <Link 
            to="/how-it-works" 
            className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}
          >
            How It Works
          </Link>
          <Link 
            to="/faq" 
            className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
          >
            FAQ
          </Link>
          <Link 
            to="/testimonials" 
            className={`nav-link ${isActive('/testimonials') ? 'active' : ''}`}
          >
            Testimonials
          </Link>
          
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                📊 Dashboard
              </Link>
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                >
                  ⚙️ Admin
                </Link>
              )}
              <span className="nav-link">
                👋 Welcome, {user.username}!
              </span>
              <button 
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
