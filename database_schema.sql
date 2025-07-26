-- Kleverscape Database Schema
-- Bitcoin Investment Platform Database Structure

-- Create database (uncomment if needed)
-- CREATE DATABASE kleverscape_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE kleverscape_db;

-- ============================================
-- Site Settings Table
-- ============================================
CREATE TABLE `site_settings` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `primary_color` varchar(10) DEFAULT '#00e1ff',
  `site_name` varchar(100) DEFAULT 'Kleverscape',
  `contact_email` varchar(255) NOT NULL,
  `support_phone` varchar(50) NOT NULL,
  `payment_api_key` varchar(500) DEFAULT NULL,
  
  -- Bitcoin Settings
  `btc_enabled` tinyint(1) DEFAULT 1,
  `btc_address` varchar(500) DEFAULT NULL,
  `btc_network` varchar(50) DEFAULT 'Bitcoin',
  `btc_qr_code` varchar(500) DEFAULT NULL,
  
  -- USDT Settings
  `usdt_enabled` tinyint(1) DEFAULT 1,
  `usdt_address` varchar(500) DEFAULT NULL,
  `usdt_network` varchar(50) DEFAULT 'ERC20',
  `usdt_qr_code` varchar(500) DEFAULT NULL,
  
  -- Ethereum Settings
  `eth_enabled` tinyint(1) DEFAULT 1,
  `eth_address` varchar(500) DEFAULT NULL,
  `eth_network` varchar(50) DEFAULT 'ERC20',
  `eth_qr_code` varchar(500) DEFAULT NULL,
  
  -- Binance Coin Settings
  `bnb_enabled` tinyint(1) DEFAULT 1,
  `bnb_address` varchar(500) DEFAULT NULL,
  `bnb_network` varchar(50) DEFAULT 'BEP20',
  `bnb_qr_code` varchar(500) DEFAULT NULL,
  
  -- Dogecoin Settings
  `doge_enabled` tinyint(1) DEFAULT 0,
  `doge_address` varchar(500) DEFAULT NULL,
  `doge_network` varchar(50) DEFAULT 'Dogecoin',
  `doge_qr_code` varchar(500) DEFAULT NULL,
  
  -- TRON Settings
  `trx_enabled` tinyint(1) DEFAULT 0,
  `trx_address` varchar(500) DEFAULT NULL,
  `trx_network` varchar(50) DEFAULT 'TRC20',
  `trx_qr_code` varchar(500) DEFAULT NULL,
  
  -- Litecoin Settings
  `ltc_enabled` tinyint(1) DEFAULT 0,
  `ltc_address` varchar(500) DEFAULT NULL,
  `ltc_network` varchar(50) DEFAULT 'Litecoin',
  `ltc_qr_code` varchar(500) DEFAULT NULL,
  
  -- Ripple Settings
  `xrp_enabled` tinyint(1) DEFAULT 0,
  `xrp_address` varchar(500) DEFAULT NULL,
  `xrp_network` varchar(50) DEFAULT 'XRP Ledger',
  `xrp_qr_code` varchar(500) DEFAULT NULL,
  
  -- Cardano Settings
  `ada_enabled` tinyint(1) DEFAULT 0,
  `ada_address` varchar(500) DEFAULT NULL,
  `ada_network` varchar(50) DEFAULT 'Cardano',
  `ada_qr_code` varchar(500) DEFAULT NULL,
  
  -- Shiba Inu Settings
  `shib_enabled` tinyint(1) DEFAULT 0,
  `shib_address` varchar(500) DEFAULT NULL,
  `shib_network` varchar(50) DEFAULT 'ERC20',
  `shib_qr_code` varchar(500) DEFAULT NULL,
  
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Users Table
-- ============================================
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `balance` decimal(15,2) DEFAULT 0.00,
  `total_invested` decimal(15,2) DEFAULT 0.00,
  `total_profit` decimal(15,2) DEFAULT 0.00,
  `referral_code` varchar(20) UNIQUE,
  `referred_by` int(11) DEFAULT NULL,
  `kyc_status` enum('pending', 'approved', 'rejected') DEFAULT 'pending',
  `status` enum('active', 'suspended', 'banned') DEFAULT 'active',
  `is_admin` tinyint(1) DEFAULT 0,
  `email_verified` tinyint(1) DEFAULT 0,
  `verification_token` varchar(100) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`referred_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Investment Plans Table
-- ============================================
CREATE TABLE `investment_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `description` text,
  `min_amount` decimal(15,2) NOT NULL,
  `max_amount` decimal(15,2) NOT NULL,
  `daily_return` decimal(5,2) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `status` enum('active', 'disabled') DEFAULT 'active',
  `featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- User Investments Table
-- ============================================
CREATE TABLE `user_investments` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `daily_return` decimal(5,2) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `current_profit` decimal(15,2) DEFAULT 0.00,
  `status` enum('active', 'completed', 'cancelled') DEFAULT 'active',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `last_profit_date` date DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`plan_id`) REFERENCES `investment_plans`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Transactions Table
-- ============================================
CREATE TABLE `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `type` enum('deposit', 'withdrawal', 'investment', 'profit', 'referral') NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `currency` varchar(10) DEFAULT 'USD',
  `crypto_currency` varchar(10) DEFAULT NULL,
  `wallet_address` varchar(500) DEFAULT NULL,
  `transaction_hash` varchar(255) DEFAULT NULL,
  `status` enum('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
  `description` text,
  `admin_notes` text,
  `processed_by` int(11) DEFAULT NULL,
  `processed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`processed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- KYC Submissions Table
-- ============================================
CREATE TABLE `kyc_submissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `document_type` enum('passport', 'driver_license', 'national_id') NOT NULL,
  `document_number` varchar(100) NOT NULL,
  `front_image_path` varchar(500) NOT NULL,
  `back_image_path` varchar(500) DEFAULT NULL,
  `selfie_image_path` varchar(500) NOT NULL,
  `full_name` varchar(200) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` text,
  `status` enum('pending', 'approved', 'rejected') DEFAULT 'pending',
  `review_notes` text,
  `reviewed_by` int(11) DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Admin Activity Logs Table
-- ============================================
CREATE TABLE `admin_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `admin_id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `details` text,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `timestamp` timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`admin_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Referral System Table
-- ============================================
CREATE TABLE `referral_earnings` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `referrer_id` int(11) NOT NULL,
  `referred_id` int(11) NOT NULL,
  `investment_id` int(11) DEFAULT NULL,
  `commission_rate` decimal(5,2) NOT NULL,
  `commission_amount` decimal(15,2) NOT NULL,
  `status` enum('pending', 'paid') DEFAULT 'pending',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `paid_at` timestamp NULL DEFAULT NULL,
  FOREIGN KEY (`referrer_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`referred_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`investment_id`) REFERENCES `user_investments`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert Default Data
-- ============================================

-- Insert default admin user (password: admin123)
INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `first_name`, `last_name`, `is_admin`, `email_verified`, `status`) VALUES 
(1, 'admin', 'admin@kleverscape.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 1, 1, 'active');

-- Insert default investment plans
INSERT INTO `investment_plans` (`name`, `description`, `min_amount`, `max_amount`, `daily_return`, `duration_days`, `status`, `featured`) VALUES
('Starter Plan', 'Perfect for beginners looking to start their crypto investment journey', 100.00, 999.00, 2.50, 30, 'active', 0),
('Pro Plan', 'Ideal for experienced investors seeking higher returns', 1000.00, 4999.00, 5.00, 60, 'active', 1),
('Elite Plan', 'Premium plan for serious investors with maximum profit potential', 5000.00, 50000.00, 7.50, 90, 'active', 1),
('VIP Plan', 'Exclusive high-tier investment plan with personalized support', 25000.00, 100000.00, 10.00, 180, 'active', 1);

-- Insert default site settings
INSERT INTO `site_settings` (`id`, `primary_color`, `site_name`, `contact_email`, `support_phone`, `btc_enabled`, `btc_address`, `usdt_enabled`, `usdt_address`, `eth_enabled`, `eth_address`) VALUES
(1, '#00e1ff', 'Kleverscape', 'support@kleverscape.com', '+1-800-CRYPTO', 1, '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', 1, '0x742d35Cc6634C0532925a3b8D0F8C9', 1, '0x742d35Cc6634C0532925a3b8D0F8C9');

-- ============================================
-- Create Indexes for Performance
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_user_investments_user_id ON user_investments(user_id);
CREATE INDEX idx_user_investments_status ON user_investments(status);
CREATE INDEX idx_kyc_submissions_user_id ON kyc_submissions(user_id);
CREATE INDEX idx_kyc_submissions_status ON kyc_submissions(status);
CREATE INDEX idx_admin_logs_admin_id ON admin_logs(admin_id);
CREATE INDEX idx_referral_earnings_referrer_id ON referral_earnings(referrer_id);

-- ============================================
-- Create Views for Common Queries
-- ============================================

-- User Statistics View
CREATE VIEW user_stats AS
SELECT 
    u.id,
    u.username,
    u.email,
    u.balance,
    u.total_invested,
    u.total_profit,
    COUNT(ui.id) as active_investments,
    u.created_at as join_date
FROM users u
LEFT JOIN user_investments ui ON u.id = ui.user_id AND ui.status = 'active'
WHERE u.is_admin = 0
GROUP BY u.id;

-- Investment Plan Performance View
CREATE VIEW plan_performance AS
SELECT 
    ip.id,
    ip.name,
    ip.min_amount,
    ip.max_amount,
    ip.daily_return,
    ip.duration_days,
    COUNT(ui.id) as total_investments,
    SUM(ui.amount) as total_invested_amount,
    AVG(ui.amount) as avg_investment_amount
FROM investment_plans ip
LEFT JOIN user_investments ui ON ip.id = ui.plan_id
GROUP BY ip.id;

-- ============================================
-- Stored Procedures
-- ============================================

DELIMITER //

-- Procedure to calculate daily profits
CREATE PROCEDURE CalculateDailyProfits()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE inv_id INT;
    DECLARE user_id_var INT;
    DECLARE amount_var DECIMAL(15,2);
    DECLARE daily_return_var DECIMAL(5,2);
    DECLARE profit_amount DECIMAL(15,2);
    
    DECLARE cur CURSOR FOR 
        SELECT id, user_id, amount, daily_return 
        FROM user_investments 
        WHERE status = 'active' 
        AND (last_profit_date IS NULL OR last_profit_date < CURDATE())
        AND start_date <= CURDATE()
        AND end_date >= CURDATE();
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN cur;
    
    read_loop: LOOP
        FETCH cur INTO inv_id, user_id_var, amount_var, daily_return_var;
        IF done THEN
            LEAVE read_loop;
        END IF;
        
        SET profit_amount = amount_var * (daily_return_var / 100);
        
        -- Update investment profit
        UPDATE user_investments 
        SET current_profit = current_profit + profit_amount,
            last_profit_date = CURDATE()
        WHERE id = inv_id;
        
        -- Update user balance
        UPDATE users 
        SET balance = balance + profit_amount,
            total_profit = total_profit + profit_amount
        WHERE id = user_id_var;
        
        -- Insert transaction record
        INSERT INTO transactions (user_id, type, amount, status, description)
        VALUES (user_id_var, 'profit', profit_amount, 'completed', CONCAT('Daily profit from investment ID: ', inv_id));
        
    END LOOP;
    
    CLOSE cur;
    
    -- Mark completed investments
    UPDATE user_investments 
    SET status = 'completed' 
    WHERE status = 'active' 
    AND end_date < CURDATE();
    
END //

DELIMITER ;

-- ============================================
-- Database Setup Complete
-- ============================================
-- 
-- Usage Instructions:
-- 1. Import this SQL file into your MySQL database
-- 2. Update the database connection details in db.php
-- 3. Ensure the uploads/qr_codes/ directory has write permissions
-- 4. Default admin login: admin@kleverscape.com / admin123
-- 
-- Security Notes:
-- - Change the default admin password immediately
-- - Update database credentials in production
-- - Set proper file permissions on upload directories
-- - Enable SSL/HTTPS in production
-- 
-- ============================================
