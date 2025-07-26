<?php
/**
 * Database Connection File
 * Kleverscape - Bitcoin Investment Platform
 * 
 * This file establishes a secure connection to your MySQL database
 * using PDO for better security and performance.
 */

// Database configuration
$db_config = [
    'host' => 'localhost',           // Your database host
    'dbname' => 'kleverscape_db',    // Your database name
    'username' => 'root',            // Your database username
    'password' => '',                // Your database password
    'charset' => 'utf8mb4'           // Character set
];

try {
    // Create PDO connection with security options
    $dsn = "mysql:host={$db_config['host']};dbname={$db_config['dbname']};charset={$db_config['charset']}";
    
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$db_config['charset']}"
    ];
    
    $pdo = new PDO($dsn, $db_config['username'], $db_config['password'], $options);
    
    // Connection successful
    // Uncomment the line below for testing connection (remove in production)
    // echo "Database connection successful!";
    
} catch (PDOException $e) {
    // Log error securely and show user-friendly message
    error_log("Database Connection Error: " . $e->getMessage());
    
    // In production, show generic error message
    die("Database connection failed. Please contact support.");
    
    // For development, you can show detailed error:
    // die("Connection failed: " . $e->getMessage());
}

/**
 * Helper function to get database connection
 * @return PDO Database connection object
 */
function getDB() {
    global $pdo;
    return $pdo;
}

/**
 * Helper function to execute a query safely
 * @param string $sql SQL query with placeholders
 * @param array $params Parameters for the query
 * @return PDOStatement
 */
function executeQuery($sql, $params = []) {
    global $pdo;
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    return $stmt;
}

/**
 * Helper function to sanitize input
 * @param string $input Input to sanitize
 * @return string Sanitized input
 */
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

/**
 * Helper function to validate email
 * @param string $email Email to validate
 * @return bool True if valid email
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Helper function to log admin activities
 * @param string $action Action performed
 * @param string $details Additional details
 * @param int $admin_id Admin user ID
 */
function logAdminActivity($action, $details = '', $admin_id = 1) {
    global $pdo;
    try {
        $sql = "INSERT INTO admin_logs (admin_id, action, details, timestamp) VALUES (?, ?, ?, NOW())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$admin_id, $action, $details]);
    } catch (PDOException $e) {
        error_log("Failed to log admin activity: " . $e->getMessage());
    }
}
?>
