<?php
/**
 * User Authentication API
 * Kleverscape - Bitcoin Investment Platform
 * 
 * Handles user registration, login, and session management
 */

session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../config/database.php';

try {
    $database = new Database();
    $pdo = $database->getConnection();
    
    $method = $_SERVER['REQUEST_METHOD'];
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Route handling
    $path = $_GET['action'] ?? '';
    
    switch ($path) {
        case 'register':
            if ($method !== 'POST') {
                throw new Exception('Method not allowed');
            }
            handleRegistration($pdo, $input);
            break;
            
        case 'login':
            if ($method !== 'POST') {
                throw new Exception('Method not allowed');
            }
            handleLogin($pdo, $input);
            break;
            
        case 'logout':
            handleLogout();
            break;
            
        case 'profile':
            if ($method === 'GET') {
                getUserProfile($pdo);
            } else {
                updateUserProfile($pdo, $input);
            }
            break;
            
        case 'verify-session':
            verifySession($pdo);
            break;
            
        default:
            throw new Exception('Invalid endpoint');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

function handleRegistration($pdo, $input) {
    // Validate input
    $requiredFields = ['username', 'email', 'password'];
    foreach ($requiredFields as $field) {
        if (empty($input[$field])) {
            throw new Exception("$field is required");
        }
    }
    
    $username = sanitizeInput($input['username']);
    $email = sanitizeInput($input['email']);
    $password = $input['password'];
    $firstName = sanitizeInput($input['firstName'] ?? '');
    $lastName = sanitizeInput($input['lastName'] ?? '');
    $phone = sanitizeInput($input['phone'] ?? '');
    $country = sanitizeInput($input['country'] ?? '');
    
    // Validate email format
    if (!validateEmail($email)) {
        throw new Exception('Invalid email format');
    }
    
    // Validate password strength
    if (strlen($password) < 8) {
        throw new Exception('Password must be at least 8 characters long');
    }
    
    // Check if username or email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    if ($stmt->fetch()) {
        throw new Exception('Username or email already exists');
    }
    
    // Generate referral code
    $referralCode = strtoupper(substr(md5($username . time()), 0, 8));
    
    // Create user
    $passwordHash = generateSecureHash($password);
    $stmt = $pdo->prepare("
        INSERT INTO users (username, email, password_hash, first_name, last_name, phone, country, referral_code)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$username, $email, $passwordHash, $firstName, $lastName, $phone, $country, $referralCode]);
    
    $userId = $pdo->lastInsertId();
    
    // Set session
    $_SESSION['user_id'] = $userId;
    $_SESSION['username'] = $username;
    $_SESSION['user_logged_in'] = true;
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => [
            'id' => $userId,
            'username' => $username,
            'email' => $email,
            'referral_code' => $referralCode
        ]
    ]);
}

function handleLogin($pdo, $input) {
    $username = sanitizeInput($input['username'] ?? $input['email'] ?? '');
    $password = $input['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        throw new Exception('Username and password are required');
    }
    
    // Find user by username or email
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1");
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user || !verifyPassword($password, $user['password_hash'])) {
        throw new Exception('Invalid credentials');
    }
    
    if ($user['status'] !== 'active') {
        throw new Exception('Account is suspended');
    }
    
    // Update last login
    $stmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $stmt->execute([$user['id']]);
    
    // Set session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['user_logged_in'] = true;
    $_SESSION['is_admin'] = $user['is_admin'];
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'balance' => floatval($user['balance']),
            'total_invested' => floatval($user['total_invested']),
            'total_profit' => floatval($user['total_profit']),
            'isAdmin' => $user['is_admin'] == 1
        ]
    ]);
}

function handleLogout() {
    session_destroy();
    echo json_encode([
        'success' => true,
        'message' => 'Logged out successfully'
    ]);
}

function getUserProfile($pdo) {
    if (!isset($_SESSION['user_logged_in']) || !$_SESSION['user_logged_in']) {
        throw new Exception('Not authenticated');
    }
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        throw new Exception('User not found');
    }
    
    // Remove sensitive data
    unset($user['password_hash']);
    
    echo json_encode([
        'success' => true,
        'user' => $user
    ]);
}

function updateUserProfile($pdo, $input) {
    if (!isset($_SESSION['user_logged_in']) || !$_SESSION['user_logged_in']) {
        throw new Exception('Not authenticated');
    }
    
    $allowedFields = ['first_name', 'last_name', 'phone', 'country'];
    $updateFields = [];
    $updateValues = [];
    
    foreach ($allowedFields as $field) {
        if (isset($input[$field])) {
            $updateFields[] = "$field = ?";
            $updateValues[] = sanitizeInput($input[$field]);
        }
    }
    
    if (empty($updateFields)) {
        throw new Exception('No valid fields to update');
    }
    
    $updateValues[] = $_SESSION['user_id'];
    
    $sql = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($updateValues);
    
    echo json_encode([
        'success' => true,
        'message' => 'Profile updated successfully'
    ]);
}

function verifySession($pdo) {
    if (!isset($_SESSION['user_logged_in']) || !$_SESSION['user_logged_in']) {
        echo json_encode([
            'success' => false,
            'authenticated' => false
        ]);
        return;
    }
    
    $stmt = $pdo->prepare("SELECT username, email, balance, total_invested, total_profit, is_admin FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        session_destroy();
        echo json_encode([
            'success' => false,
            'authenticated' => false
        ]);
        return;
    }
    
    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'user' => [
            'id' => $_SESSION['user_id'],
            'username' => $user['username'],
            'email' => $user['email'],
            'balance' => floatval($user['balance']),
            'total_invested' => floatval($user['total_invested']),
            'total_profit' => floatval($user['total_profit']),
            'isAdmin' => $user['is_admin'] == 1
        ]
    ]);
}
?>
