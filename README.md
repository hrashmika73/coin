# Kleverscape - Bitcoin Investment Platform

A comprehensive cryptocurrency investment platform with advanced admin panel and multi-coin support.

## 🚀 Features

### Frontend (React)
- ✅ Modern responsive design with Vortex-style layout
- ✅ Multiple cryptocurrency support (BTC, USDT, ETH, BNB, DOGE, TRX, LTC, XRP, ADA, SHIB)
- ✅ Live Bitcoin price tracking
- ✅ TradingView chart integration
- ✅ Investment plan management
- ✅ User dashboard and portfolio tracking
- ✅ Mobile-first responsive design
- ✅ Admin panel with comprehensive controls

### Backend (PHP)
- ✅ Secure database connection with PDO
- ✅ Admin settings management
- ✅ Multi-cryptocurrency wallet configuration
- ✅ QR code upload for payment addresses
- ✅ Investment plan CRUD operations
- ✅ User management system
- ✅ Transaction tracking
- ✅ KYC verification system
- ✅ Automated profit calculation
- ✅ Admin activity logging

### Admin Panel Features
- ✅ **Cryptocurrency Management**: Configure 10+ cryptocurrencies with addresses, networks, and QR codes
- ✅ **Color Customization**: Dynamic brand color picker with live preview
- ✅ **Contact Management**: Email and phone validation with error handling
- ✅ **Investment Plans**: Create, edit, and manage investment packages
- ✅ **User Management**: Add, edit, suspend users with full control
- ✅ **Transaction Control**: Approve/reject withdrawals and deposits
- ✅ **KYC Verification**: Review and process identity documents
- ✅ **Analytics Dashboard**: Revenue, user growth, and performance metrics
- ✅ **Settings Validation**: Client-side and server-side validation
- ✅ **Responsive Design**: Clean mobile-friendly admin interface

## 📁 File Structure

```
kleverscape/
├── 📂 Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── NotificationSystem.jsx
│   │   │   └── ... (other components)
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── AdminPanel.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ... (other pages)
│   │   ├���─ services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── 📂 Backend (PHP)
│   ├── db.php                    # Database connection
│   ├── save_settings.php         # Save admin settings
│   ├── fetch_settings.php        # Retrieve settings API
│   ├── database_schema.sql       # Complete database structure
│   ├── admin-settings.html       # Standalone admin page
│   └── uploads/qr_codes/         # QR code storage
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- **Web Server**: Apache/Nginx with PHP 7.4+
- **Database**: MySQL 5.7+ or MariaDB 10.3+
- **Node.js**: 16+ (for React frontend)
- **PHP Extensions**: PDO, PDO_MySQL, GD (for image handling)

### Step 1: Database Setup

1. **Create Database:**
   ```sql
   CREATE DATABASE kleverscape_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

2. **Import Schema:**
   ```bash
   mysql -u username -p kleverscape_db < database_schema.sql
   ```

3. **Verify Tables:**
   - `site_settings` - Admin configuration
   - `users` - User accounts and admin
   - `investment_plans` - Investment packages
   - `user_investments` - Active investments
   - `transactions` - All financial transactions
   - `kyc_submissions` - Identity verification
   - `admin_logs` - Admin activity tracking

### Step 2: Backend Configuration

1. **Update Database Connection:**
   ```php
   // In db.php, update these values:
   $db_config = [
       'host' => 'localhost',
       'dbname' => 'kleverscape_db',
       'username' => 'your_db_username',
       'password' => 'your_db_password'
   ];
   ```

2. **Set File Permissions:**
   ```bash
   chmod 755 uploads/qr_codes/
   chmod 644 *.php
   ```

3. **Test Backend:**
   - Visit: `http://yoursite.com/admin-settings.html`
   - Default admin: `admin@kleverscape.com` / `admin123`

### Step 3: Frontend Setup

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure API Endpoints:**
   ```javascript
   // In src/services/api.js, update base URL:
   const API_BASE_URL = 'http://yoursite.com/api';
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```

4. **Build for Production:**
   ```bash
   npm run build
   ```

## 🔧 Configuration Guide

### Admin Settings Page Features

#### 🏢 General Settings
- **Site Name**: Your platform name (displayed across the site)
- **Primary Color**: Brand color with live preview
- **Contact Email**: Support email (validated)
- **Support Phone**: Contact phone (validated)

#### 💰 Cryptocurrency Configuration
**Supported Coins:**
- Bitcoin (BTC) - Bitcoin/BEP20 networks
- Tether (USDT) - ERC20/TRC20/BEP20 networks
- Ethereum (ETH) - ERC20/BEP20 networks  
- Binance Coin (BNB) - BEP20 network
- Dogecoin (DOGE) - Dogecoin network
- TRON (TRX) - TRC20 network
- Litecoin (LTC) - Litecoin network
- Ripple (XRP) - XRP Ledger network
- Cardano (ADA) - Cardano network
- Shiba Inu (SHIB) - ERC20 network

**For Each Coin:**
- ✅ Enable/Disable toggle
- ✅ Wallet address input (validated)
- ✅ Network type selection
- ✅ QR code upload (optional)
- ✅ Real-time validation

#### 🔌 Payment API Integration
- Payment gateway API key configuration
- Secure storage with encryption

### Frontend Integration

The React frontend automatically fetches settings from the PHP backend:

```javascript
// Example: Dynamic color theming
useEffect(() => {
  const fetchSettings = async () => {
    const response = await fetch('/fetch_settings.php');
    const data = await response.json();
    if (data.success) {
      document.documentElement.style.setProperty('--primary-color', data.data.primary_color);
    }
  };
  fetchSettings();
}, []);
```

## 🔒 Security Features

### Input Validation
- ✅ Server-side sanitization
- ✅ Client-side validation
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ File upload validation

### Authentication
- ✅ Secure password hashing
- ✅ Session management
- ✅ Admin role verification
- ✅ Activity logging

### File Security
- ✅ Restricted upload types
- ✅ File size limits (5MB)
- ✅ Secure storage paths
- ✅ Protected admin areas

## 📊 Database Schema

### Key Tables

#### Site Settings
```sql
site_settings (
  id, primary_color, site_name, contact_email, support_phone,
  btc_enabled, btc_address, btc_network, btc_qr_code,
  usdt_enabled, usdt_address, usdt_network, usdt_qr_code,
  [... other cryptocurrencies],
  created_at, updated_at
)
```

#### Users
```sql
users (
  id, username, email, password_hash, balance, 
  total_invested, total_profit, kyc_status, 
  is_admin, status, created_at
)
```

#### Investment Plans
```sql
investment_plans (
  id, name, min_amount, max_amount, 
  daily_return, duration_days, status
)
```

## 🎯 Usage Examples

### Admin Settings Form

The admin can configure all settings through a single form:

```html
<form action="save_settings.php" method="POST" enctype="multipart/form-data">
  <!-- Site settings -->
  <input name="site_name" value="Kleverscape">
  <input name="primary_color" type="color" value="#00e1ff">
  
  <!-- Crypto settings -->
  <input name="btc_enabled" type="checkbox" checked>
  <input name="btc_address" value="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2">
  <select name="btc_network">
    <option value="Bitcoin">Bitcoin</option>
  </select>
  <input name="btc_qr_code" type="file" accept="image/*">
  
  <button type="submit">💾 Save Settings</button>
</form>
```

### API Response Format

```json
{
  "success": true,
  "message": "Settings saved successfully!",
  "data": {
    "site_name": "Kleverscape",
    "primary_color": "#00e1ff",
    "contact_email": "support@kleverscape.com",
    "coins": {
      "btc": {
        "name": "Bitcoin",
        "enabled": true,
        "address": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
        "network": "Bitcoin",
        "qr_code_url": "uploads/qr_codes/btc_qr_1234567890.png"
      }
    }
  }
}
```

## 🚀 Production Deployment

### Security Checklist
- [ ] Change default admin password
- [ ] Enable HTTPS/SSL
- [ ] Set secure file permissions
- [ ] Configure firewall rules
- [ ] Enable database backups
- [ ] Set up monitoring
- [ ] Configure error logging

### Performance Optimization
- [ ] Enable PHP OPcache
- [ ] Set up CDN for assets
- [ ] Configure database indexing
- [ ] Enable Gzip compression
- [ ] Optimize images and uploads

## 📞 Support & Documentation

### Default Login
- **Admin Email**: `admin@kleverscape.com`
- **Password**: `admin123` (⚠️ Change immediately!)

### API Endpoints
- `POST /save_settings.php` - Save admin settings
- `GET /fetch_settings.php` - Retrieve current settings
- `POST /save_plan.php` - Save investment plans

### File Locations
- **QR Codes**: `uploads/qr_codes/`
- **Logs**: Check server error logs
- **Database**: Import `database_schema.sql`

## 🔄 Updates & Maintenance

### Regular Tasks
- Monitor admin logs
- Backup database daily
- Update cryptocurrency addresses
- Review user submissions
- Check system performance

### Customization
The platform is designed to be easily customizable:
- Add new cryptocurrencies by updating the coin arrays
- Modify color schemes through CSS variables
- Extend the database schema for additional features
- Add new admin controls following the existing patterns

---

**Made with ❤️ for crypto enthusiasts worldwide**

*This platform provides a solid foundation for cryptocurrency investment services with professional admin controls and modern user experience.*
