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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          💎 {siteSettings.siteName}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <div className="nav-links">
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              🏠 Home
            </Link>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              ℹ️ About
            </Link>
            <Link
              to="/plans"
              className={`nav-link ${isActive('/plans') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              💰 Plans
            </Link>
            <Link
              to="/how-it-works"
              className={`nav-link ${isActive('/how-it-works') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              ⚙️ How It Works
            </Link>
            <Link
              to="/faq"
              className={`nav-link ${isActive('/faq') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              ❓ FAQ
            </Link>
            <Link
              to="/testimonials"
              className={`nav-link ${isActive('/testimonials') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              💬 Reviews
            </Link>
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`nav-link dashboard-link ${isActive('/dashboard') ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  📊 Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className={`nav-link admin-link ${isActive('/admin') ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ⚙️ Admin
                  </Link>
                )}
                <span className="user-welcome">
                  👋 {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-signup"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
