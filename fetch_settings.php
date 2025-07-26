<?php
/**
 * Fetch Settings Script
 * Kleverscape - Bitcoin Investment Platform
 * 
 * This script retrieves site settings for the frontend
 * Returns JSON data for dynamic integration
 */

require_once 'db.php';

// Set content type for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Initialize response
    $response = ['success' => false, 'message' => '', 'data' => []];
    
    // Fetch settings from database
    $query = "SELECT * FROM site_settings WHERE id = 1 LIMIT 1";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $settings = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($settings) {
        // Define supported cryptocurrencies
        $supportedCoins = [
            'btc' => 'Bitcoin',
            'usdt' => 'Tether',
            'eth' => 'Ethereum',
            'bnb' => 'Binance Coin',
            'doge' => 'Dogecoin',
            'trx' => 'TRON',
            'ltc' => 'Litecoin',
            'xrp' => 'Ripple',
            'ada' => 'Cardano',
            'shib' => 'Shiba Inu'
        ];
        
        // Format cryptocurrency data
        $coins = [];
        foreach ($supportedCoins as $coinCode => $coinName) {
            $enabled = isset($settings["{$coinCode}_enabled"]) ? (bool)$settings["{$coinCode}_enabled"] : false;
            
            if ($enabled) {
                $coins[$coinCode] = [
                    'name' => $coinName,
                    'symbol' => strtoupper($coinCode),
                    'enabled' => true,
                    'address' => $settings["{$coinCode}_address"] ?? '',
                    'network' => $settings["{$coinCode}_network"] ?? '',
                    'qr_code' => $settings["{$coinCode}_qr_code"] ?? null
                ];
                
                // Add full URL for QR code if exists
                if (!empty($coins[$coinCode]['qr_code'])) {
                    $baseUrl = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http') . 
                               '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['SCRIPT_NAME']) . '/';
                    $coins[$coinCode]['qr_code_url'] = $baseUrl . $coins[$coinCode]['qr_code'];
                }
            }
        }
        
        // Prepare response data
        $responseData = [
            'site_name' => $settings['site_name'] ?? 'Kleverscape',
            'primary_color' => $settings['primary_color'] ?? '#00e1ff',
            'contact_email' => $settings['contact_email'] ?? 'support@kleverscape.com',
            'support_phone' => $settings['support_phone'] ?? '+1-800-CRYPTO',
            'coins' => $coins,
            'enabled_coins_count' => count($coins),
            'last_updated' => $settings['updated_at'] ?? $settings['created_at']
        ];
        
        // Success response
        $response['success'] = true;
        $response['message'] = 'Settings retrieved successfully';
        $response['data'] = $responseData;
        
    } else {
        // No settings found, return defaults
        $response['success'] = true;
        $response['message'] = 'No settings found, returning defaults';
        $response['data'] = [
            'site_name' => 'Kleverscape',
            'primary_color' => '#00e1ff',
            'contact_email' => 'support@kleverscape.com',
            'support_phone' => '+1-800-CRYPTO',
            'coins' => [
                'btc' => [
                    'name' => 'Bitcoin',
                    'symbol' => 'BTC',
                    'enabled' => true,
                    'address' => '',
                    'network' => 'Bitcoin',
                    'qr_code' => null
                ],
                'usdt' => [
                    'name' => 'Tether',
                    'symbol' => 'USDT',
                    'enabled' => true,
                    'address' => '',
                    'network' => 'ERC20',
                    'qr_code' => null
                ],
                'eth' => [
                    'name' => 'Ethereum',
                    'symbol' => 'ETH',
                    'enabled' => true,
                    'address' => '',
                    'network' => 'ERC20',
                    'qr_code' => null
                ]
            ],
            'enabled_coins_count' => 3,
            'last_updated' => date('Y-m-d H:i:s')
        ];
    }
    
} catch (PDOException $e) {
    error_log("Database Error in fetch_settings.php: " . $e->getMessage());
    $response['message'] = 'Database error occurred';
    
} catch (Exception $e) {
    error_log("Error in fetch_settings.php: " . $e->getMessage());
    $response['message'] = $e->getMessage();
    
} catch (Throwable $e) {
    error_log("Unexpected error in fetch_settings.php: " . $e->getMessage());
    $response['message'] = 'An unexpected error occurred';
}

// Return JSON response
echo json_encode($response, JSON_PRETTY_PRINT);
?>
