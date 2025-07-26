<?php
/**
 * Database Configuration Class
 * Kleverscape - Bitcoin Investment Platform
 */

class Database {
    private $host;
    private $dbname;
    private $username;
    private $password;
    private $port;
    private $charset;
    private $pdo;

    public function __construct() {
        // Load configuration from environment or use defaults
        $this->host = $_ENV['DB_HOST'] ?? 'localhost';
        $this->dbname = $_ENV['DB_NAME'] ?? 'kleverscape_db';
        $this->username = $_ENV['DB_USER'] ?? 'root';
        $this->password = $_ENV['DB_PASS'] ?? '';
        $this->port = $_ENV['DB_PORT'] ?? '3306';
        $this->charset = 'utf8mb4';
    }

    public function getConnection() {
        if ($this->pdo === null) {
            try {
                $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->dbname};charset={$this->charset}";
                
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES {$this->charset}"
                ];

                $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
                
            } catch (PDOException $e) {
                error_log("Database connection failed: " . $e->getMessage());
                throw new Exception("Database connection failed");
            }
        }
        
        return $this->pdo;
    }

    public function testConnection() {
        try {
            $pdo = $this->getConnection();
            $stmt = $pdo->query("SELECT 1");
            return $stmt !== false;
        } catch (Exception $e) {
            return false;
        }
    }
}

// Helper functions for common database operations
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

function generateSecureHash($password) {
    return password_hash($password, PASSWORD_DEFAULT);
}

function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}
?>
