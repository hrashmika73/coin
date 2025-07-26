<?php
/**
 * Kleverscape Setup Script
 * Bitcoin Investment Platform - Complete Installation
 * 
 * This script sets up the database, creates default admin user,
 * and configures the initial settings for your platform.
 */

// Prevent direct access in production
if (file_exists('.env')) {
    die('Setup already completed. Remove .env file to run setup again.');
}

$step = $_GET['step'] ?? 1;
$errors = [];
$success = [];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kleverscape Setup - Bitcoin Investment Platform</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .setup-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            padding: 3rem;
            max-width: 600px;
            width: 100%;
        }
        
        .setup-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .setup-header h1 {
            color: #667eea;
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
        }
        
        .setup-header p {
            color: #666;
            font-size: 1.1rem;
        }
        
        .step-indicator {
            display: flex;
            justify-content: center;
            margin-bottom: 2rem;
        }
        
        .step {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e0e0e0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 0.5rem;
            font-weight: bold;
            color: #666;
        }
        
        .step.active {
            background: #667eea;
            color: white;
        }
        
        .step.completed {
            background: #28a745;
            color: white;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #333;
        }
        
        .form-control {
            width: 100%;
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .form-control:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
            width: 100%;
        }
        
        .btn:hover {
            transform: translateY(-2px);
        }
        
        .alert {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 10px;
            border: 1px solid transparent;
        }
        
        .alert-danger {
            background: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
        }
        
        .alert-success {
            background: #d4edda;
            border-color: #c3e6cb;
            color: #155724;
        }
        
        .info-box {
            background: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 10px;
            padding: 1rem;
            margin-bottom: 1rem;
        }
        
        .info-box h4 {
            color: #1565c0;
            margin-bottom: 0.5rem;
        }
        
        .code-block {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-radius: 10px;
            padding: 1rem;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
            margin: 1rem 0;
            overflow-x: auto;
        }
        
        .feature-list {
            list-style: none;
            padding: 0;
        }
        
        .feature-list li {
            padding: 0.5rem 0;
            display: flex;
            align-items: center;
        }
        
        .feature-list li:before {
            content: '✅';
            margin-right: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="setup-container">
        <div class="setup-header">
            <h1>🚀 Kleverscape Setup</h1>
            <p>Bitcoin Investment Platform Installation</p>
        </div>
        
        <div class="step-indicator">
            <div class="step <?= $step >= 1 ? ($step == 1 ? 'active' : 'completed') : '' ?>">1</div>
            <div class="step <?= $step >= 2 ? ($step == 2 ? 'active' : 'completed') : '' ?>">2</div>
            <div class="step <?= $step >= 3 ? ($step == 3 ? 'active' : 'completed') : '' ?>">3</div>
            <div class="step <?= $step >= 4 ? ($step == 4 ? 'active' : 'completed') : '' ?>">4</div>
        </div>

        <?php if ($step == 1): ?>
            <!-- Step 1: Welcome and Requirements -->
            <h3>📋 Welcome to Kleverscape Setup</h3>
            <p>This setup wizard will help you install and configure your Bitcoin investment platform in just a few steps.</p>
            
            <div class="info-box">
                <h4>🎯 What You'll Get:</h4>
                <ul class="feature-list">
                    <li>Complete cryptocurrency investment platform</li>
                    <li>Admin panel with 10+ cryptocurrency support</li>
                    <li>User registration and investment tracking</li>
                    <li>Automatic deposit verification</li>
                    <li>Professional responsive design</li>
                    <li>Secure payment processing</li>
                </ul>
            </div>
            
            <div class="info-box">
                <h4>📋 Requirements Check:</h4>
                <ul class="feature-list">
                    <li>PHP <?= phpversion() ?> (✅ Installed)</li>
                    <li>MySQL Database (Configure in next step)</li>
                    <li>Web Server (Apache/Nginx)</li>
                    <li>SSL Certificate (Recommended for production)</li>
                </ul>
            </div>
            
            <form method="GET">
                <input type="hidden" name="step" value="2">
                <button type="submit" class="btn">Continue to Database Setup →</button>
            </form>

        <?php elseif ($step == 2): ?>
            <!-- Step 2: Database Configuration -->
            <h3>🗄️ Database Configuration</h3>
            
            <?php
            if ($_POST) {
                $dbHost = $_POST['db_host'] ?? 'localhost';
                $dbName = $_POST['db_name'] ?? 'kleverscape_db';
                $dbUser = $_POST['db_user'] ?? 'root';
                $dbPass = $_POST['db_pass'] ?? '';
                
                try {
                    $pdo = new PDO("mysql:host=$dbHost;charset=utf8mb4", $dbUser, $dbPass);
                    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    // Create database if it doesn't exist
                    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
                    $pdo->exec("USE `$dbName`");
                    
                    // Execute schema
                    $schema = file_get_contents('config/schema.sql');
                    $pdo->exec($schema);
                    
                    // Save database config
                    $envContent = "DB_HOST=$dbHost\nDB_NAME=$dbName\nDB_USER=$dbUser\nDB_PASS=$dbPass\n";
                    file_put_contents('.env', $envContent);
                    
                    $success[] = "Database created and configured successfully!";
                    
                    echo "<script>setTimeout(() => { window.location.href = '?step=3'; }, 2000);</script>";
                    
                } catch (Exception $e) {
                    $errors[] = "Database connection failed: " . $e->getMessage();
                }
            }
            ?>
            
            <?php foreach ($errors as $error): ?>
                <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
            <?php endforeach; ?>
            
            <?php foreach ($success as $msg): ?>
                <div class="alert alert-success"><?= htmlspecialchars($msg) ?></div>
            <?php endforeach; ?>
            
            <?php if (empty($success)): ?>
                <form method="POST">
                    <div class="form-group">
                        <label>Database Host</label>
                        <input type="text" name="db_host" class="form-control" value="localhost" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Database Name</label>
                        <input type="text" name="db_name" class="form-control" value="kleverscape_db" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Database Username</label>
                        <input type="text" name="db_user" class="form-control" value="root" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Database Password</label>
                        <input type="password" name="db_pass" class="form-control">
                    </div>
                    
                    <button type="submit" class="btn">Create Database & Continue →</button>
                </form>
            <?php endif; ?>

        <?php elseif ($step == 3): ?>
            <!-- Step 3: Admin Account Setup -->
            <h3>👤 Create Admin Account</h3>
            
            <?php
            if ($_POST) {
                $adminUsername = $_POST['admin_username'] ?? '';
                $adminEmail = $_POST['admin_email'] ?? '';
                $adminPassword = $_POST['admin_password'] ?? '';
                $confirmPassword = $_POST['confirm_password'] ?? '';
                
                if ($adminPassword !== $confirmPassword) {
                    $errors[] = "Passwords do not match";
                } elseif (strlen($adminPassword) < 8) {
                    $errors[] = "Password must be at least 8 characters long";
                } else {
                    try {
                        // Load database config
                        $env = parse_ini_file('.env');
                        $pdo = new PDO("mysql:host={$env['DB_HOST']};dbname={$env['DB_NAME']};charset=utf8mb4", $env['DB_USER'], $env['DB_PASS']);
                        
                        // Create admin user
                        $passwordHash = password_hash($adminPassword, PASSWORD_DEFAULT);
                        $stmt = $pdo->prepare("UPDATE admin_users SET username = ?, password_hash = ?, email = ? WHERE id = 1");
                        $stmt->execute([$adminUsername, $passwordHash, $adminEmail]);
                        
                        $success[] = "Admin account created successfully!";
                        echo "<script>setTimeout(() => { window.location.href = '?step=4'; }, 2000);</script>";
                        
                    } catch (Exception $e) {
                        $errors[] = "Failed to create admin account: " . $e->getMessage();
                    }
                }
            }
            ?>
            
            <?php foreach ($errors as $error): ?>
                <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
            <?php endforeach; ?>
            
            <?php foreach ($success as $msg): ?>
                <div class="alert alert-success"><?= htmlspecialchars($msg) ?></div>
            <?php endforeach; ?>
            
            <?php if (empty($success)): ?>
                <form method="POST">
                    <div class="form-group">
                        <label>Admin Username</label>
                        <input type="text" name="admin_username" class="form-control" value="admin" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Admin Email</label>
                        <input type="email" name="admin_email" class="form-control" value="admin@kleverscape.com" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Admin Password</label>
                        <input type="password" name="admin_password" class="form-control" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" name="confirm_password" class="form-control" required>
                    </div>
                    
                    <button type="submit" class="btn">Create Admin Account →</button>
                </form>
            <?php endif; ?>

        <?php elseif ($step == 4): ?>
            <!-- Step 4: Setup Complete -->
            <h3>🎉 Setup Complete!</h3>
            
            <div class="alert alert-success">
                <strong>Congratulations!</strong> Your Kleverscape Bitcoin Investment Platform is now ready to use.
            </div>
            
            <div class="info-box">
                <h4>🚀 What's Next:</h4>
                <ul class="feature-list">
                    <li>Configure your cryptocurrency wallet addresses</li>
                    <li>Set up investment plans</li>
                    <li>Customize your site branding</li>
                    <li>Enable SSL certificate for security</li>
                    <li>Set up automated verification (optional)</li>
                </ul>
            </div>
            
            <div class="info-box">
                <h4>📱 Access Your Platform:</h4>
                <p><strong>Frontend:</strong> <a href="/" target="_blank"><?= $_SERVER['HTTP_HOST'] ?></a></p>
                <p><strong>Admin Panel:</strong> <a href="/admin-login.php" target="_blank"><?= $_SERVER['HTTP_HOST'] ?>/admin-login.php</a></p>
            </div>
            
            <div class="info-box">
                <h4>🔧 Admin Login Credentials:</h4>
                <div class="code-block">
                    Username: admin<br>
                    Password: [Your chosen password]
                </div>
            </div>
            
            <div class="info-box">
                <h4>⚠️ Security Notice:</h4>
                <p>For security, please delete or move this setup.php file after installation.</p>
            </div>
            
            <a href="/" class="btn">Visit Your Site →</a>

        <?php endif; ?>
    </div>
</body>
</html>
