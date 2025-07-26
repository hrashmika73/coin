<?php
/**
 * Crypto Verification Service
 * Kleverscape - Bitcoin Investment Platform
 * 
 * Handles automatic verification of cryptocurrency transactions
 * Supports BTC, ETH, and other major cryptocurrencies
 */

require_once '../config/database.php';

class CryptoVerificationService {
    private $pdo;
    private $apiKeys;
    
    public function __construct() {
        $database = new Database();
        $this->pdo = $database->getConnection();
        
        // API Keys for blockchain explorers
        $this->apiKeys = [
            'etherscan' => $_ENV['ETHERSCAN_API_KEY'] ?? 'YourEtherscanAPIKey',
            'blockcypher' => $_ENV['BLOCKCYPHER_API_KEY'] ?? '',
            'bscscan' => $_ENV['BSCSCAN_API_KEY'] ?? 'YourBscScanAPIKey'
        ];
    }
    
    /**
     * Check Bitcoin transaction via BlockCypher API
     */
    public function verifyBtcTransaction($txid, $expectedAddress, $expectedAmount) {
        try {
            $url = "https://api.blockcypher.com/v1/btc/main/txs/$txid";
            if ($this->apiKeys['blockcypher']) {
                $url .= "?token=" . $this->apiKeys['blockcypher'];
            }
            
            $response = $this->makeHttpRequest($url);
            if (!$response) {
                return false;
            }
            
            $data = json_decode($response, true);
            
            // Check if transaction has enough confirmations
            if (!isset($data['confirmations']) || $data['confirmations'] < 3) {
                return false;
            }
            
            // Verify amount and address
            foreach ($data['outputs'] as $output) {
                if (in_array($expectedAddress, $output['addresses'])) {
                    $valueBtc = $output['value'] / 1e8; // Convert satoshi to BTC
                    if (abs($valueBtc - $expectedAmount) < 0.0001) {
                        return true;
                    }
                }
            }
            
            return false;
            
        } catch (Exception $e) {
            error_log("BTC verification error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Check Ethereum transaction via Etherscan API
     */
    public function verifyEthTransaction($txid, $expectedAddress, $expectedAmount) {
        try {
            $apiKey = $this->apiKeys['etherscan'];
            
            // Get transaction receipt
            $receiptUrl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=$txid&apikey=$apiKey";
            $receiptResponse = $this->makeHttpRequest($receiptUrl);
            
            if (!$receiptResponse) {
                return false;
            }
            
            $receiptData = json_decode($receiptResponse, true);
            
            // Check if transaction was successful
            if (!isset($receiptData['result']['status']) || $receiptData['result']['status'] !== '0x1') {
                return false;
            }
            
            // Get transaction details
            $txUrl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionByHash&txhash=$txid&apikey=$apiKey";
            $txResponse = $this->makeHttpRequest($txUrl);
            
            if (!$txResponse) {
                return false;
            }
            
            $txData = json_decode($txResponse, true);
            
            if (!isset($txData['result'])) {
                return false;
            }
            
            $toAddress = strtolower($txData['result']['to']);
            $expectedAddress = strtolower($expectedAddress);
            
            // Convert wei to Ether
            $valueWei = hexdec($txData['result']['value']);
            $valueEth = $valueWei / 1e18;
            
            // Verify address and amount
            if ($toAddress === $expectedAddress && abs($valueEth - $expectedAmount) < 0.0001) {
                return true;
            }
            
            return false;
            
        } catch (Exception $e) {
            error_log("ETH verification error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Check USDT (ERC20) transaction via Etherscan API
     */
    public function verifyUsdtTransaction($txid, $expectedAddress, $expectedAmount) {
        try {
            $apiKey = $this->apiKeys['etherscan'];
            
            // Get transaction receipt to check for token transfers
            $receiptUrl = "https://api.etherscan.io/api?module=proxy&action=eth_getTransactionReceipt&txhash=$txid&apikey=$apiKey";
            $receiptResponse = $this->makeHttpRequest($receiptUrl);
            
            if (!$receiptResponse) {
                return false;
            }
            
            $receiptData = json_decode($receiptResponse, true);
            
            // Check if transaction was successful
            if (!isset($receiptData['result']['status']) || $receiptData['result']['status'] !== '0x1') {
                return false;
            }
            
            // Check logs for USDT transfer events
            if (isset($receiptData['result']['logs'])) {
                foreach ($receiptData['result']['logs'] as $log) {
                    // USDT contract address (mainnet)
                    $usdtContract = '0xdac17f958d2ee523a2206206994597c13d831ec7';
                    
                    if (strtolower($log['address']) === strtolower($usdtContract)) {
                        // Decode transfer event
                        if (count($log['topics']) >= 3) {
                            $toAddress = '0x' . substr($log['topics'][2], 26); // Extract recipient address
                            $amount = hexdec($log['data']) / 1e6; // USDT has 6 decimals
                            
                            if (strtolower($toAddress) === strtolower($expectedAddress) && 
                                abs($amount - $expectedAmount) < 0.01) {
                                return true;
                            }
                        }
                    }
                }
            }
            
            return false;
            
        } catch (Exception $e) {
            error_log("USDT verification error: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Verify pending deposits automatically
     */
    public function verifyPendingDeposits() {
        try {
            // Get site settings for wallet addresses
            $stmt = $this->pdo->prepare("SELECT * FROM site_settings WHERE id = 1");
            $stmt->execute();
            $settings = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$settings) {
                throw new Exception("Site settings not found");
            }
            
            // Get pending deposits
            $stmt = $this->pdo->prepare("
                SELECT d.*, u.username 
                FROM deposits d 
                JOIN users u ON d.user_id = u.id 
                WHERE d.status = 'pending' 
                ORDER BY d.created_at ASC
            ");
            $stmt->execute();
            $pendingDeposits = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $verifiedCount = 0;
            
            foreach ($pendingDeposits as $deposit) {
                $verified = false;
                $coin = strtolower($deposit['coin']);
                $txid = $deposit['txid'];
                $amount = $deposit['amount'];
                
                // Get expected wallet address from settings
                $addressKey = $coin . '_address';
                $expectedAddress = $settings[$addressKey] ?? '';
                
                if (empty($expectedAddress)) {
                    error_log("No wallet address configured for coin: $coin");
                    continue;
                }
                
                // Verify based on coin type
                switch ($coin) {
                    case 'btc':
                        $verified = $this->verifyBtcTransaction($txid, $expectedAddress, $amount);
                        break;
                        
                    case 'eth':
                        $verified = $this->verifyEthTransaction($txid, $expectedAddress, $amount);
                        break;
                        
                    case 'usdt':
                        $verified = $this->verifyUsdtTransaction($txid, $expectedAddress, $amount);
                        break;
                        
                    default:
                        error_log("Verification not implemented for coin: $coin");
                        continue 2;
                }
                
                if ($verified) {
                    // Update deposit status
                    $stmt = $this->pdo->prepare("
                        UPDATE deposits 
                        SET status = 'approved', verified_at = NOW() 
                        WHERE id = ?
                    ");
                    $stmt->execute([$deposit['id']]);
                    
                    // Credit user balance
                    $stmt = $this->pdo->prepare("
                        UPDATE users 
                        SET balance = balance + ? 
                        WHERE id = ?
                    ");
                    $stmt->execute([$amount, $deposit['user_id']]);
                    
                    // Log transaction
                    $stmt = $this->pdo->prepare("
                        INSERT INTO transactions (user_id, type, amount, crypto_currency, transaction_hash, status, description)
                        VALUES (?, 'deposit', ?, ?, ?, 'completed', ?)
                    ");
                    $stmt->execute([
                        $deposit['user_id'],
                        $amount,
                        strtoupper($coin),
                        $txid,
                        "Verified deposit of $amount " . strtoupper($coin)
                    ]);
                    
                    $verifiedCount++;
                    echo "Deposit ID {$deposit['id']} verified and credited for user {$deposit['username']}\n";
                }
            }
            
            return $verifiedCount;
            
        } catch (Exception $e) {
            error_log("Verification service error: " . $e->getMessage());
            throw $e;
        }
    }
    
    /**
     * Make HTTP request with timeout and error handling
     */
    private function makeHttpRequest($url, $timeout = 30) {
        $context = stream_context_create([
            'http' => [
                'timeout' => $timeout,
                'user_agent' => 'Kleverscape/1.0'
            ]
        ]);
        
        $response = @file_get_contents($url, false, $context);
        
        if ($response === false) {
            $error = error_get_last();
            error_log("HTTP request failed: " . ($error['message'] ?? 'Unknown error'));
            return false;
        }
        
        return $response;
    }
    
    /**
     * Get verification statistics
     */
    public function getVerificationStats() {
        $stmt = $this->pdo->prepare("
            SELECT 
                COUNT(*) as total_deposits,
                SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as verified_deposits,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_deposits,
                SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected_deposits
            FROM deposits
        ");
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

// CLI execution for cron job
if (php_sapi_name() === 'cli') {
    try {
        $verificationService = new CryptoVerificationService();
        $verified = $verificationService->verifyPendingDeposits();
        echo "Verification complete. $verified deposits verified.\n";
    } catch (Exception $e) {
        echo "Verification failed: " . $e->getMessage() . "\n";
        exit(1);
    }
}
?>
