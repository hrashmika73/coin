<?php
/**
 * Site Settings API Endpoint
 * Kleverscape - Bitcoin Investment Platform
 * 
 * Handles GET/POST requests for site settings
 * Integrates with React frontend
 */

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
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Fetch current settings
        $stmt = $pdo->prepare("SELECT * FROM site_settings WHERE id = 1 LIMIT 1");
        $stmt->execute();
        $settings = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($settings) {
            // Format cryptocurrency data for frontend
            $coins = [];
            $supportedCoins = [
                'btc' => ['name' => 'Bitcoin', 'symbol' => 'BTC'],
                'usdt' => ['name' => 'Tether', 'symbol' => 'USDT'],
                'eth' => ['name' => 'Ethereum', 'symbol' => 'ETH'],
                'bnb' => ['name' => 'Binance Coin', 'symbol' => 'BNB'],
                'doge' => ['name' => 'Dogecoin', 'symbol' => 'DOGE'],
                'trx' => ['name' => 'TRON', 'symbol' => 'TRX'],
                'ltc' => ['name' => 'Litecoin', 'symbol' => 'LTC'],
                'xrp' => ['name' => 'Ripple', 'symbol' => 'XRP'],
                'ada' => ['name' => 'Cardano', 'symbol' => 'ADA'],
                'shib' => ['name' => 'Shiba Inu', 'symbol' => 'SHIB']
            ];
            
            foreach ($supportedCoins as $coinCode => $coinInfo) {
                $enabled = $settings["{$coinCode}_enabled"] ?? 0;
                if ($enabled) {
                    $coins[$coinCode] = [
                        'name' => $coinInfo['name'],
                        'symbol' => $coinInfo['symbol'],
                        'enabled' => true,
                        'address' => $settings["{$coinCode}_address"] ?? '',
                        'network' => $settings["{$coinCode}_network"] ?? ''
                    ];
                }
            }
            
            echo json_encode([
                'success' => true,
                'data' => [
                    'siteName' => $settings['site_name'] ?? 'Kleverscape',
                    'primaryColor' => $settings['primary_color'] ?? '#00e1ff',
                    'contactEmail' => $settings['contact_email'] ?? 'support@kleverscape.com',
                    'supportPhone' => $settings['support_phone'] ?? '+1-800-CRYPTO',
                    'coins' => $coins
                ]
            ]);
        } else {
            // Return default settings
            echo json_encode([
                'success' => true,
                'data' => [
                    'siteName' => 'Kleverscape',
                    'primaryColor' => '#00e1ff',
                    'contactEmail' => 'support@kleverscape.com',
                    'supportPhone' => '+1-800-CRYPTO',
                    'coins' => [
                        'btc' => [
                            'name' => 'Bitcoin',
                            'symbol' => 'BTC',
                            'enabled' => true,
                            'address' => '',
                            'network' => 'Bitcoin'
                        ]
                    ]
                ]
            ]);
        }
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Update settings (admin only)
        $input = json_decode(file_get_contents('php://input'), true);
        
        // Basic validation
        if (!isset($input['siteName']) || !isset($input['primaryColor'])) {
            throw new Exception('Missing required fields');
        }
        
        // Check if settings exist
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM site_settings WHERE id = 1");
        $stmt->execute();
        $exists = $stmt->fetchColumn() > 0;
        
        if ($exists) {
            // Update existing settings
            $stmt = $pdo->prepare("
                UPDATE site_settings SET 
                    site_name = ?, 
                    primary_color = ?, 
                    contact_email = ?, 
                    support_phone = ?,
                    updated_at = NOW()
                WHERE id = 1
            ");
            $stmt->execute([
                $input['siteName'],
                $input['primaryColor'],
                $input['contactEmail'] ?? 'support@kleverscape.com',
                $input['supportPhone'] ?? '+1-800-CRYPTO'
            ]);
        } else {
            // Insert new settings
            $stmt = $pdo->prepare("
                INSERT INTO site_settings (id, site_name, primary_color, contact_email, support_phone, created_at, updated_at)
                VALUES (1, ?, ?, ?, ?, NOW(), NOW())
            ");
            $stmt->execute([
                $input['siteName'],
                $input['primaryColor'],
                $input['contactEmail'] ?? 'support@kleverscape.com',
                $input['supportPhone'] ?? '+1-800-CRYPTO'
            ]);
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Settings updated successfully'
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>
