import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NotificationSystem from './components/NotificationSystem';
import LiveChat from './components/LiveChat';
import Home from './pages/Home';
import About from './pages/About';
import WhyChoose from './pages/WhyChoose';
import Plans from './pages/Plans';
import HowItWorks from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import EmailVerification from './pages/EmailVerification';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import { cronService } from './services/cronService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    primaryColor: '#00e1ff',
    siteName: 'Kleverscape',
    contactEmail: 'support@kleverscape.com',
    supportPhone: '+1-800-CRYPTO',
    coins: {
      btc: { enabled: true, address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', network: 'Bitcoin' },
      usdt: { enabled: true, address: '0x742d35Cc6634C0532925a3b8D0F8C9', network: 'ERC20' },
      eth: { enabled: true, address: '0x742d35Cc6634C0532925a3b8D0F8C9', network: 'ERC20' },
      bnb: { enabled: true, address: '0x742d35Cc6634C0532925a3b8D0F8C9', network: 'BEP20' }
    }
  });

  useEffect(() => {
    // Check for saved user session
    const savedUser = localStorage.getItem('kleverscape_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAdmin(userData.isAdmin || false);
    }

    // Apply site color theme
    document.documentElement.style.setProperty('--primary-color', siteSettings.primaryColor);
  }, [siteSettings.primaryColor]);

  const login = (userData) => {
    setUser(userData);
    setIsAdmin(userData.isAdmin || false);
    localStorage.setItem('kleverscape_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('kleverscape_user');
  };

  const updateSiteSettings = (newSettings) => {
    setSiteSettings(prev => ({ ...prev, ...newSettings }));
    if (newSettings.primaryColor) {
      document.documentElement.style.setProperty('--primary-color', newSettings.primaryColor);
    }
  };

  return (
    <Router>
      <div className="App" style={{ '--primary-color': siteSettings.primaryColor }}>
        <NotificationSystem />
        <LiveChat />
        <Header
          user={user}
          logout={logout}
          siteSettings={siteSettings}
          isAdmin={isAdmin}
        />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home siteSettings={siteSettings} />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-choose" element={<WhyChoose />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={login} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register onRegister={login} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} siteSettings={siteSettings} /> : <Navigate to="/login" />} 
            />
            <Route
              path="/admin-login"
              element={!isAdmin ? <AdminLogin onAdminLogin={login} /> : <Navigate to="/admin" />}
            />
            <Route
              path="/admin"
              element={isAdmin ? <AdminPanel siteSettings={siteSettings} updateSiteSettings={updateSiteSettings} /> : <Navigate to="/admin-login" />}
            />
            <Route
              path="/verify-email"
              element={<EmailVerification />}
            />
            <Route
              path="/deposit"
              element={user ? <Deposit /> : <Navigate to="/login" />}
            />
            <Route
              path="/withdraw"
              element={user ? <Withdraw /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        
        <Footer siteSettings={siteSettings} />
      </div>
    </Router>
  );
}

export default App;
