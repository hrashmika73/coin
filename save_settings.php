<?php
/**
 * Save Settings Script
 * Kleverscape - Bitcoin Investment Platform
 * 
 * This script handles saving admin settings including:
 * - General site settings
 * - Cryptocurrency wallet addresses and networks
 * - QR code image uploads
 * - Contact information
 * - Payment API settings
 */

require_once 'db.php';

// Set content type for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

try {
    // Initialize response
    $response = ['success' => false, 'message' => '', 'data' => []];
    
    // Create uploads directory if it doesn't exist
    $uploadDir = 'uploads/qr_codes/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    // Get form data
    $primaryColor = sanitizeInput($_POST['primary_color'] ?? '#00e1ff');
    $siteName = sanitizeInput($_POST['site_name'] ?? 'Kleverscape');
    $contactEmail = sanitizeInput($_POST['contact_email'] ?? '');
    $supportPhone = sanitizeInput($_POST['support_phone'] ?? '');
    $paymentApiKey = sanitizeInput($_POST['payment_api_key'] ?? '');
    
    // Validate required fields
    if (empty($contactEmail) || !isValidEmail($contactEmail)) {
        throw new Exception('Please provide a valid contact email address');
    }
    
    if (empty($supportPhone) || strlen($supportPhone) < 10) {
        throw new Exception('Please provide a valid support phone number');
    }
    
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
    
    // Process cryptocurrency settings
    $coinData = [];
    foreach ($supportedCoins as $coinCode => $coinName) {
        $enabled = isset($_POST["{$coinCode}_enabled"]) ? 1 : 0;
        $address = sanitizeInput($_POST["{$coinCode}_address"] ?? '');
        $network = sanitizeInput($_POST["{$coinCode}_network"] ?? '');
        $qrCodePath = '';
        
        // Validate address if coin is enabled
        if ($enabled && (empty($address) || strlen($address) < 20)) {
            throw new Exception("Please provide a valid {$coinName} wallet address");
        }
        
        // Handle QR code upload
        if ($enabled && isset($_FILES["{$coinCode}_qr_code"]) && $_FILES["{$coinCode}_qr_code"]['error'] === UPLOAD_ERR_OK) {
            $file = $_FILES["{$coinCode}_qr_code"];
            
            // Validate file type
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!in_array($file['type'], $allowedTypes)) {
                throw new Exception("Invalid file type for {$coinName} QR code. Please upload JPEG, PNG, GIF, or WebP images only.");
            }
            
            // Validate file size (max 5MB)
            if ($file['size'] > 5 * 1024 * 1024) {
                throw new Exception("QR code file for {$coinName} is too large. Maximum size is 5MB.");
            }
            
            // Generate unique filename
            $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $fileName = $coinCode . '_qr_' . time() . '.' . $fileExtension;
            $filePath = $uploadDir . $fileName;
            
            // Move uploaded file
            if (move_uploaded_file($file['tmp_name'], $filePath)) {
                $qrCodePath = $filePath;
                
                // Delete old QR code if exists
                $oldQrQuery = "SELECT {$coinCode}_qr_code FROM site_settings WHERE id = 1";
                $oldQrStmt = $pdo->prepare($oldQrQuery);
                $oldQrStmt->execute();
                $oldQr = $oldQrStmt->fetchColumn();
                
                if ($oldQr && file_exists($oldQr)) {
                    unlink($oldQr);
                }
            } else {
                throw new Exception("Failed to upload QR code for {$coinName}");
            }
        }
        
        $coinData[$coinCode] = [
            'enabled' => $enabled,
            'address' => $address,
            'network' => $network,
            'qr_code' => $qrCodePath
        ];
    }
    
    // Check if settings record exists
    $checkQuery = "SELECT COUNT(*) FROM site_settings WHERE id = 1";
    $checkStmt = $pdo->prepare($checkQuery);
    $checkStmt->execute();
    $settingsExist = $checkStmt->fetchColumn() > 0;
    
    if ($settingsExist) {
        // Update existing settings
        $updateQuery = "UPDATE site_settings SET 
            primary_color = ?,
            site_name = ?,
            contact_email = ?,
            support_phone = ?,
            payment_api_key = ?,
            btc_enabled = ?, btc_address = ?, btc_network = ?, btc_qr_code = COALESCE(NULLIF(?, ''), btc_qr_code),
            usdt_enabled = ?, usdt_address = ?, usdt_network = ?, usdt_qr_code = COALESCE(NULLIF(?, ''), usdt_qr_code),
            eth_enabled = ?, eth_address = ?, eth_network = ?, eth_qr_code = COALESCE(NULLIF(?, ''), eth_qr_code),
            bnb_enabled = ?, bnb_address = ?, bnb_network = ?, bnb_qr_code = COALESCE(NULLIF(?, ''), bnb_qr_code),
            doge_enabled = ?, doge_address = ?, doge_network = ?, doge_qr_code = COALESCE(NULLIF(?, ''), doge_qr_code),
            trx_enabled = ?, trx_address = ?, trx_network = ?, trx_qr_code = COALESCE(NULLIF(?, ''), trx_qr_code),
            ltc_enabled = ?, ltc_address = ?, ltc_network = ?, ltc_qr_code = COALESCE(NULLIF(?, ''), ltc_qr_code),
            xrp_enabled = ?, xrp_address = ?, xrp_network = ?, xrp_qr_code = COALESCE(NULLIF(?, ''), xrp_qr_code),
            ada_enabled = ?, ada_address = ?, ada_network = ?, ada_qr_code = COALESCE(NULLIF(?, ''), ada_qr_code),
            shib_enabled = ?, shib_address = ?, shib_network = ?, shib_qr_code = COALESCE(NULLIF(?, ''), shib_qr_code),
            updated_at = NOW()
            WHERE id = 1";
        
        $params = [
            $primaryColor, $siteName, $contactEmail, $supportPhone, $paymentApiKey
        ];
        
        foreach ($supportedCoins as $coinCode => $coinName) {
            $params[] = $coinData[$coinCode]['enabled'];
            $params[] = $coinData[$coinCode]['address'];
            $params[] = $coinData[$coinCode]['network'];
            $params[] = $coinData[$coinCode]['qr_code'];
        }
        
        $updateStmt = $pdo->prepare($updateQuery);
        $updateStmt->execute($params);
        
    } else {
        // Insert new settings
        $insertQuery = "INSERT INTO site_settings (
            id, primary_color, site_name, contact_email, support_phone, payment_api_key,
            btc_enabled, btc_address, btc_network, btc_qr_code,
            usdt_enabled, usdt_address, usdt_network, usdt_qr_code,
            eth_enabled, eth_address, eth_network, eth_qr_code,
            bnb_enabled, bnb_address, bnb_network, bnb_qr_code,
            doge_enabled, doge_address, doge_network, doge_qr_code,
            trx_enabled, trx_address, trx_network, trx_qr_code,
            ltc_enabled, ltc_address, ltc_network, ltc_qr_code,
            xrp_enabled, xrp_address, xrp_network, xrp_qr_code,
            ada_enabled, ada_address, ada_network, ada_qr_code,
            shib_enabled, shib_address, shib_network, shib_qr_code,
            created_at, updated_at
        ) VALUES (
            1, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            NOW(), NOW()
        )";
        
        $params = [
            $primaryColor, $siteName, $contactEmail, $supportPhone, $paymentApiKey
        ];
        
        foreach ($supportedCoins as $coinCode => $coinName) {
            $params[] = $coinData[$coinCode]['enabled'];
            $params[] = $coinData[$coinCode]['address'];
            $params[] = $coinData[$coinCode]['network'];
            $params[] = $coinData[$coinCode]['qr_code'];
        }
        
        $insertStmt = $pdo->prepare($insertQuery);
        $insertStmt->execute($params);
    }
    
    // Log admin activity
    logAdminActivity('Settings Updated', 'Admin updated site settings including crypto wallets and contact info');
    
    // Success response
    $response['success'] = true;
    $response['message'] = 'Settings saved successfully!';
    $response['data'] = [
        'primary_color' => $primaryColor,
        'site_name' => $siteName,
        'contact_email' => $contactEmail,
        'support_phone' => $supportPhone,
        'coins' => $coinData,
        'updated_at' => date('Y-m-d H:i:s')
    ];
    
} catch (PDOException $e) {
    error_log("Database Error in save_settings.php: " . $e->getMessage());
    $response['message'] = 'Database error occurred. Please try again.';
    
} catch (Exception $e) {
    error_log("Error in save_settings.php: " . $e->getMessage());
    $response['message'] = $e->getMessage();
    
} catch (Throwable $e) {
    error_log("Unexpected error in save_settings.php: " . $e->getMessage());
    $response['message'] = 'An unexpected error occurred. Please contact support.';
}

// Return JSON response
echo json_encode($response);
?>
