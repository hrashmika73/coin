-- Kleverscape Database Schema
-- Bitcoin Investment Platform Complete Database Structure

-- Create database (uncomment if needed)
-- CREATE DATABASE kleverscape_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE kleverscape_db;

-- ============================================
-- Site Settings Table
-- ============================================
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` int(11) NOT NULL PRIMARY KEY,
  `site_name` varchar(100) DEFAULT 'Kleverscape',
  `primary_color` varchar(10) DEFAULT '#00e1ff',
  `contact_email` varchar(255) NOT NULL DEFAULT 'support@kleverscape.com',
  `support_phone` varchar(50) NOT NULL DEFAULT '+1-800-CRYPTO',
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
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50) NOT NULL UNIQUE,
  `email` varchar(255) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `balance` decimal(18,8) DEFAULT 0.00000000,
  `total_invested` decimal(18,8) DEFAULT 0.00000000,
  `total_profit` decimal(18,8) DEFAULT 0.00000000,
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
CREATE TABLE IF NOT EXISTS `investment_plans` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(100) NOT NULL,
  `description` text,
  `min_amount` decimal(18,8) NOT NULL,
  `max_amount` decimal(18,8) NOT NULL,
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
CREATE TABLE IF NOT EXISTS `user_investments` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `plan_id` int(11) NOT NULL,
  `amount` decimal(18,8) NOT NULL,
  `daily_return` decimal(5,2) NOT NULL,
  `duration_days` int(11) NOT NULL,
  `current_profit` decimal(18,8) DEFAULT 0.00000000,
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
CREATE TABLE IF NOT EXISTS `transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `type` enum('deposit', 'withdrawal', 'investment', 'profit', 'referral') NOT NULL,
  `amount` decimal(18,8) NOT NULL,
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
-- Deposits Table
-- ============================================
CREATE TABLE IF NOT EXISTS `deposits` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `coin` varchar(10) NOT NULL,
  `amount` decimal(18,8) NOT NULL,
  `txid` varchar(100) NOT NULL,
  `wallet_address` varchar(500) DEFAULT NULL,
  `status` enum('pending', 'approved', 'rejected') DEFAULT 'pending',
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Withdrawals Table
-- ============================================
CREATE TABLE IF NOT EXISTS `withdrawals` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int(11) NOT NULL,
  `coin` varchar(10) NOT NULL,
  `amount` decimal(18,8) NOT NULL,
  `wallet_address` varchar(500) NOT NULL,
  `transaction_hash` varchar(255) DEFAULT NULL,
  `status` enum('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
  `processed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Admin Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` varchar(50) NOT NULL UNIQUE,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Admin Activity Logs Table
-- ============================================
CREATE TABLE IF NOT EXISTS `admin_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `admin_id` int(11) NOT NULL,
  `action` varchar(255) NOT NULL,
  `details` text,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `timestamp` timestamp DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`admin_id`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert Default Data
-- ============================================

-- Insert default admin user (username: admin, password: admin123)
INSERT IGNORE INTO `admin_users` (`id`, `username`, `password_hash`, `email`) VALUES 
(1, 'admin', '$2y$10$E6rFvVfzchQyKoGJSZSO4uhPBqZY0yN8/EcMtP/R9O2dHyWu0Qq7y', 'admin@kleverscape.com');

-- Insert default investment plans
INSERT IGNORE INTO `investment_plans` (`id`, `name`, `description`, `min_amount`, `max_amount`, `daily_return`, `duration_days`, `status`, `featured`) VALUES
(1, 'Starter Plan', 'Perfect for beginners looking to start their crypto investment journey', 100.00000000, 999.00000000, 2.50, 30, 'active', 0),
(2, 'Pro Plan', 'Ideal for experienced investors seeking higher returns', 1000.00000000, 4999.00000000, 5.00, 60, 'active', 1),
(3, 'Elite Plan', 'Premium plan for serious investors with maximum profit potential', 5000.00000000, 50000.00000000, 7.50, 90, 'active', 1),
(4, 'VIP Plan', 'Exclusive high-tier investment plan with personalized support', 25000.00000000, 100000.00000000, 10.00, 180, 'active', 1);

-- Insert default site settings
INSERT IGNORE INTO `site_settings` (`id`, `site_name`, `primary_color`, `contact_email`, `support_phone`, `btc_enabled`, `btc_address`, `usdt_enabled`, `usdt_address`, `eth_enabled`, `eth_address`) VALUES
(1, 'Kleverscape', '#00e1ff', 'support@kleverscape.com', '+1-800-CRYPTO', 1, '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', 1, '0x742d35Cc6634C0532925a3b8D0F8C9', 1, '0x742d35Cc6634C0532925a3b8D0F8C9');

-- ============================================
-- Create Indexes for Performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_user_investments_user_id ON user_investments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_investments_status ON user_investments(status);
CREATE INDEX IF NOT EXISTS idx_deposits_user_id ON deposits(user_id);
CREATE INDEX IF NOT EXISTS idx_deposits_status ON deposits(status);
CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON withdrawals(status);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_logs(admin_id);

-- ============================================
-- Stored Procedures for Auto Calculations
-- ============================================

DELIMITER //

-- Procedure to calculate daily profits
CREATE PROCEDURE IF NOT EXISTS CalculateDailyProfits()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE inv_id INT;
    DECLARE user_id_var INT;
    DECLARE amount_var DECIMAL(18,8);
    DECLARE daily_return_var DECIMAL(5,2);
    DECLARE profit_amount DECIMAL(18,8);
    
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
        
        -- Update user balance and total profit
        UPDATE users 
        SET balance = balance + profit_amount,
            total_profit = total_profit + profit_amount
        WHERE id = user_id_var;
        
        -- Insert transaction record
        INSERT INTO transactions (user_id, type, amount, crypto_currency, status, description)
        VALUES (user_id_var, 'profit', profit_amount, 'USD', 'completed', CONCAT('Daily profit from investment ID: ', inv_id));
        
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
