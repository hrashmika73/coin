<?php
/**
 * Investment Plans API
 * Kleverscape - Bitcoin Investment Platform
 * 
 * Handles CRUD operations for investment plans
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
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
    $planId = $_GET['id'] ?? null;
    
    switch ($method) {
        case 'GET':
            if ($planId) {
                getSinglePlan($pdo, $planId);
            } else {
                getAllPlans($pdo);
            }
            break;
            
        case 'POST':
            createPlan($pdo, $input);
            break;
            
        case 'PUT':
            if (!$planId) {
                throw new Exception('Plan ID is required for update');
            }
            updatePlan($pdo, $planId, $input);
            break;
            
        case 'DELETE':
            if (!$planId) {
                throw new Exception('Plan ID is required for deletion');
            }
            deletePlan($pdo, $planId);
            break;
            
        default:
            throw new Exception('Method not allowed');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

function getAllPlans($pdo) {
    $stmt = $pdo->prepare("
        SELECT ip.*, 
               COUNT(ui.id) as total_investments,
               COALESCE(SUM(ui.amount), 0) as total_invested
        FROM investment_plans ip
        LEFT JOIN user_investments ui ON ip.id = ui.plan_id
        GROUP BY ip.id
        ORDER BY ip.featured DESC, ip.created_at ASC
    ");
    $stmt->execute();
    $plans = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Convert decimal values to float for JSON
    foreach ($plans as &$plan) {
        $plan['min_amount'] = floatval($plan['min_amount']);
        $plan['max_amount'] = floatval($plan['max_amount']);
        $plan['daily_return'] = floatval($plan['daily_return']);
        $plan['total_investments'] = intval($plan['total_investments']);
        $plan['total_invested'] = floatval($plan['total_invested']);
        $plan['featured'] = $plan['featured'] == 1;
    }
    
    echo json_encode([
        'success' => true,
        'plans' => $plans
    ]);
}

function getSinglePlan($pdo, $planId) {
    $stmt = $pdo->prepare("
        SELECT ip.*, 
               COUNT(ui.id) as total_investments,
               COALESCE(SUM(ui.amount), 0) as total_invested
        FROM investment_plans ip
        LEFT JOIN user_investments ui ON ip.id = ui.plan_id
        WHERE ip.id = ?
        GROUP BY ip.id
    ");
    $stmt->execute([$planId]);
    $plan = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$plan) {
        throw new Exception('Investment plan not found');
    }
    
    // Convert decimal values to float for JSON
    $plan['min_amount'] = floatval($plan['min_amount']);
    $plan['max_amount'] = floatval($plan['max_amount']);
    $plan['daily_return'] = floatval($plan['daily_return']);
    $plan['total_investments'] = intval($plan['total_investments']);
    $plan['total_invested'] = floatval($plan['total_invested']);
    $plan['featured'] = $plan['featured'] == 1;
    
    echo json_encode([
        'success' => true,
        'plan' => $plan
    ]);
}

function createPlan($pdo, $input) {
    // Validate required fields
    $requiredFields = ['name', 'min_amount', 'max_amount', 'daily_return', 'duration_days'];
    foreach ($requiredFields as $field) {
        if (!isset($input[$field]) || $input[$field] === '') {
            throw new Exception("$field is required");
        }
    }
    
    $name = sanitizeInput($input['name']);
    $description = sanitizeInput($input['description'] ?? '');
    $minAmount = floatval($input['min_amount']);
    $maxAmount = floatval($input['max_amount']);
    $dailyReturn = floatval($input['daily_return']);
    $durationDays = intval($input['duration_days']);
    $status = sanitizeInput($input['status'] ?? 'active');
    $featured = $input['featured'] ?? false;
    
    // Validate business logic
    if ($minAmount <= 0 || $maxAmount <= 0) {
        throw new Exception('Amount values must be greater than zero');
    }
    
    if ($minAmount >= $maxAmount) {
        throw new Exception('Maximum amount must be greater than minimum amount');
    }
    
    if ($dailyReturn <= 0 || $dailyReturn > 50) {
        throw new Exception('Daily return must be between 0.01% and 50%');
    }
    
    if ($durationDays <= 0 || $durationDays > 365) {
        throw new Exception('Duration must be between 1 and 365 days');
    }
    
    $stmt = $pdo->prepare("
        INSERT INTO investment_plans (name, description, min_amount, max_amount, daily_return, duration_days, status, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$name, $description, $minAmount, $maxAmount, $dailyReturn, $durationDays, $status, $featured ? 1 : 0]);
    
    $planId = $pdo->lastInsertId();
    
    echo json_encode([
        'success' => true,
        'message' => 'Investment plan created successfully',
        'plan_id' => $planId
    ]);
}

function updatePlan($pdo, $planId, $input) {
    // Check if plan exists
    $stmt = $pdo->prepare("SELECT id FROM investment_plans WHERE id = ?");
    $stmt->execute([$planId]);
    if (!$stmt->fetch()) {
        throw new Exception('Investment plan not found');
    }
    
    $updateFields = [];
    $updateValues = [];
    
    $allowedFields = [
        'name' => 'string',
        'description' => 'string',
        'min_amount' => 'float',
        'max_amount' => 'float',
        'daily_return' => 'float',
        'duration_days' => 'int',
        'status' => 'string',
        'featured' => 'bool'
    ];
    
    foreach ($allowedFields as $field => $type) {
        if (isset($input[$field])) {
            $updateFields[] = "$field = ?";
            
            switch ($type) {
                case 'string':
                    $updateValues[] = sanitizeInput($input[$field]);
                    break;
                case 'float':
                    $updateValues[] = floatval($input[$field]);
                    break;
                case 'int':
                    $updateValues[] = intval($input[$field]);
                    break;
                case 'bool':
                    $updateValues[] = $input[$field] ? 1 : 0;
                    break;
            }
        }
    }
    
    if (empty($updateFields)) {
        throw new Exception('No valid fields to update');
    }
    
    $updateValues[] = $planId;
    
    $sql = "UPDATE investment_plans SET " . implode(', ', $updateFields) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($updateValues);
    
    echo json_encode([
        'success' => true,
        'message' => 'Investment plan updated successfully'
    ]);
}

function deletePlan($pdo, $planId) {
    // Check if plan has active investments
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM user_investments WHERE plan_id = ? AND status = 'active'");
    $stmt->execute([$planId]);
    $activeInvestments = $stmt->fetchColumn();
    
    if ($activeInvestments > 0) {
        throw new Exception('Cannot delete plan with active investments');
    }
    
    $stmt = $pdo->prepare("DELETE FROM investment_plans WHERE id = ?");
    $stmt->execute([$planId]);
    
    if ($stmt->rowCount() === 0) {
        throw new Exception('Investment plan not found');
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Investment plan deleted successfully'
    ]);
}
?>
