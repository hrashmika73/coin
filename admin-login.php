<?php
/**
 * Admin Login Page
 * Kleverscape - Bitcoin Investment Platform
 * 
 * Secure admin authentication with session management
 */

session_start();

// Redirect if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: /admin');
    exit;
}

require_once 'config/database.php';

$error = '';
$loginAttempts = $_SESSION['login_attempts'] ?? 0;
$lastAttempt = $_SESSION['last_attempt'] ?? 0;

// Rate limiting: 5 attempts per 15 minutes
if ($loginAttempts >= 5 && (time() - $lastAttempt) < 900) {
    $error = 'Too many failed attempts. Please try again in 15 minutes.';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && empty($error)) {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    
    try {
        $database = new Database();
        $pdo = $database->getConnection();
        
        $stmt = $pdo->prepare('SELECT * FROM admin_users WHERE username = ? LIMIT 1');
        $stmt->execute([$username]);
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($admin && password_verify($password, $admin['password_hash'])) {
            // Successful login
            $_SESSION['admin_logged_in'] = true;
            $_SESSION['admin_id'] = $admin['id'];
            $_SESSION['admin_username'] = $admin['username'];
            $_SESSION['login_attempts'] = 0;
            
            // Update last login
            $stmt = $pdo->prepare('UPDATE admin_users SET last_login = NOW() WHERE id = ?');
            $stmt->execute([$admin['id']]);
            
            // Log admin login
            $stmt = $pdo->prepare('INSERT INTO admin_logs (admin_id, action, details, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)');
            $stmt->execute([
                $admin['id'],
                'Admin Login',
                'Successful admin login',
                $_SERVER['REMOTE_ADDR'] ?? '',
                $_SERVER['HTTP_USER_AGENT'] ?? ''
            ]);
            
            header('Location: /admin');
            exit;
        } else {
            // Failed login
            $loginAttempts++;
            $_SESSION['login_attempts'] = $loginAttempts;
            $_SESSION['last_attempt'] = time();
            $error = 'Invalid username or password.';
        }
        
    } catch (Exception $e) {
        error_log('Admin login error: ' . $e->getMessage());
        $error = 'Login system temporarily unavailable. Please try again later.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Kleverscape</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .login-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            padding: 3rem;
            width: 100%;
            max-width: 450px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .login-header .logo {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .login-header h1 {
            color: #2c3e50;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .login-header p {
            color: #666;
            font-size: 1.1rem;
        }
        
        .security-notice {
            background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
            padding: 1rem;
            border-radius: 15px;
            margin-bottom: 2rem;
            border-left: 4px solid #2c3e50;
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .security-notice .icon {
            font-size: 2rem;
            flex-shrink: 0;
        }
        
        .security-notice strong {
            color: #2c3e50;
            display: block;
            margin-bottom: 0.25rem;
        }
        
        .security-notice p {
            color: #666;
            margin: 0;
            font-size: 0.9rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #2c3e50;
        }
        
        .input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        
        .input-icon {
            position: absolute;
            left: 1rem;
            font-size: 1.2rem;
            color: #666;
            z-index: 1;
        }
        
        .form-control {
            width: 100%;
            padding: 1rem 1rem 1rem 3rem;
            border: 2px solid #e0e0e0;
            border-radius: 15px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.9);
        }
        
        .form-control:focus {
            outline: none;
            border-color: #2c3e50;
            box-shadow: 0 0 0 3px rgba(44, 62, 80, 0.1);
            background: white;
        }
        
        .btn-login {
            width: 100%;
            padding: 1.25rem;
            background: linear-gradient(135deg, #2c3e50, #34495e);
            color: white;
            border: none;
            border-radius: 15px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .btn-login:hover:not(:disabled) {
            background: linear-gradient(135deg, #34495e, #2c3e50);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(44, 62, 80, 0.3);
        }
        
        .btn-login:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        
        .alert {
            padding: 1rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        }
        
        .alert-danger {
            background: #fee;
            color: #c33;
            border: 1px solid #fcc;
        }
        
        .alert-warning {
            background: #fff8e1;
            color: #f57c00;
            border: 1px solid #ffcc02;
        }
        
        .footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 1.5rem;
            border-top: 1px solid #eee;
            margin-top: 2rem;
        }
        
        .back-to-site {
            color: #2c3e50;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        .back-to-site:hover {
            color: #34495e;
        }
        
        .security-info {
            display: flex;
            gap: 1rem;
            font-size: 0.8rem;
            color: #666;
        }
        
        @media (max-width: 480px) {
            .login-container {
                padding: 2rem;
                margin: 1rem;
            }
            
            .footer {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <div class="logo">🛡️</div>
            <h1>Admin Panel</h1>
            <p>Kleverscape Administration</p>
        </div>
        
        <div class="security-notice">
            <span class="icon">🔒</span>
            <div>
                <strong>Secure Access</strong>
                <p>This area is restricted to authorized administrators only.</p>
            </div>
        </div>
        
        <?php if ($error): ?>
            <div class="alert alert-danger">
                <span>⚠️</span>
                <?= htmlspecialchars($error) ?>
            </div>
        <?php endif; ?>
        
        <?php if ($loginAttempts > 0 && $loginAttempts < 5): ?>
            <div class="alert alert-warning">
                <span>🔔</span>
                <?= 5 - $loginAttempts ?> login attempts remaining
            </div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="username">👤 Username</label>
                <div class="input-wrapper">
                    <span class="input-icon">👤</span>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        class="form-control" 
                        placeholder="Enter your username"
                        required 
                        autocomplete="username"
                        <?= $loginAttempts >= 5 ? 'disabled' : '' ?>
                    >
                </div>
            </div>
            
            <div class="form-group">
                <label for="password">🔑 Password</label>
                <div class="input-wrapper">
                    <span class="input-icon">🔑</span>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        class="form-control" 
                        placeholder="Enter your password"
                        required 
                        autocomplete="current-password"
                        <?= $loginAttempts >= 5 ? 'disabled' : '' ?>
                    >
                </div>
            </div>
            
            <button 
                type="submit" 
                class="btn-login"
                <?= $loginAttempts >= 5 ? 'disabled' : '' ?>
            >
                <span>🔓</span>
                Access Admin Panel
            </button>
        </form>
        
        <div class="footer">
            <a href="/" class="back-to-site">← Back to Site</a>
            <div class="security-info">
                <span>🔒 SSL Secured</span>
                <span>🌍 <?= $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP' ?></span>
            </div>
        </div>
    </div>
    
    <script>
        // Auto-focus first input
        document.addEventListener('DOMContentLoaded', function() {
            const usernameInput = document.getElementById('username');
            if (usernameInput && !usernameInput.disabled) {
                usernameInput.focus();
            }
        });
        
        // Simple form validation
        document.querySelector('form').addEventListener('submit', function(e) {
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value;
            
            if (!username || !password) {
                e.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
            
            if (password.length < 3) {
                e.preventDefault();
                alert('Password too short');
                return false;
            }
        });
    </script>
</body>
</html>
