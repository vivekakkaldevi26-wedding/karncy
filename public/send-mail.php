<?php
/**
 * Karncy Portal - Mail Dispatcher
 * Sends inquiries, applications, and password requests to viveka@karncy.com
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$recipient = "viveka@karncy.com";

// Health check / GET test
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $test = isset($_GET['test']) ? true : false;
    if ($test) {
        $subject = "Karncy Portal - Mail Dispatcher Test";
        $body = "Hello Vivek,\r\n\r\nThis is an automated verification test for the Karncy Portal mail integration.\r\n\r\nTimestamp: " . date("r") . "\r\nStatus: Active & Operational\r\n\r\nBest regards,\r\nKarncy Dispatcher";
        $headers = "From: Karncy Portal <noreply@karncy.com>\r\n" .
                   "Reply-To: noreply@karncy.com\r\n" .
                   "X-Mailer: PHP/" . phpversion() . "\r\n" .
                   "Content-Type: text/plain; charset=UTF-8\r\n";
        $sent = @mail($recipient, $subject, $body, $headers);
        echo json_encode([
            "success" => $sent,
            "recipient" => $recipient,
            "message" => $sent ? "Test email dispatched successfully to $recipient" : "Failed to dispatch email",
            "timestamp" => date("c")
        ]);
        exit;
    }
    echo json_encode(["status" => "online", "recipient" => $recipient]);
    exit;
}

// Process POST request
$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Invalid or missing JSON payload"]);
    exit;
}

$type = isset($data['type']) ? trim($data['type']) : 'General';
$fullName = isset($data['fullName']) ? trim($data['fullName']) : (isset($data['name']) ? trim($data['name']) : '');
$email = isset($data['email']) ? trim($data['email']) : (isset($data['workEmail']) ? trim($data['workEmail']) : '');
$phone = isset($data['phone']) ? trim($data['phone']) : '';
$company = isset($data['company']) ? trim($data['company']) : (isset($data['companyName']) ? trim($data['companyName']) : '');
$message = isset($data['message']) ? trim($data['message']) : '';
$fundingReq = isset($data['fundingRequirement']) ? trim($data['fundingRequirement']) : '';
$howHelp = isset($data['howCanWeHelp']) ? trim($data['howCanWeHelp']) : '';
$document = isset($data['document']) ? trim($data['document']) : '';

// Server-side field validation
$validationErrors = [];
if (mb_strlen($fullName) < 2) {
    $validationErrors[] = "Full name must be at least 2 characters long.";
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $validationErrors[] = "A valid email address is required.";
}
$phoneDigits = preg_replace('/\D/', '', $phone);
if (strlen($phoneDigits) < 7 || strlen($phoneDigits) > 15) {
    $validationErrors[] = "A valid phone number with 7 to 15 digits is required.";
}
if ($type === 'password_request' && mb_strlen($company) < 2) {
    $validationErrors[] = "Company or institution name is required.";
}

if (!empty($validationErrors)) {
    http_response_code(422);
    echo json_encode([
        "success" => false,
        "error" => "Validation failed",
        "details" => $validationErrors
    ]);
    exit;
}

// Fallbacks for display
$displayCompany = $company ?: 'Not provided';

// Subject determination
switch ($type) {
    case 'funding':
        $subject = "[Karncy Funding] Application from " . ($fullName ?: 'Applicant') . " - " . ($displayCompany);
        $headline = "New Funding Application";
        break;
    case 'business':
        $subject = "[Karncy Business] Inquiry from " . ($fullName ?: 'Client') . " - " . ($displayCompany);
        $headline = "New Business Partnership Inquiry";
        break;
    case 'password_request':
        $subject = "[Karncy Resources] Password Request: " . ($document ?: 'Investor Materials') . " - " . ($fullName ?: 'User');
        $headline = "Document Access Password Request";
        break;
    case 'contact':
    default:
        $subject = "[Karncy Contact] Inquiry from " . ($fullName ?: 'Visitor');
        $headline = "New Contact Inquiry";
        break;
}

// HTML Email Body
$html = '<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #f1f5f9; margin: 0; padding: 24px; color: #1e293b; }
  .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
  .header { background: #0D1F82; padding: 24px 28px; color: #ffffff; }
  .header h2 { margin: 0 0 6px 0; font-size: 20px; font-weight: 700; }
  .header p { margin: 0; font-size: 13px; opacity: 0.85; }
  .content { padding: 28px; }
  .row { display: table; width: 100%; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
  .label { display: table-cell; width: 35%; font-weight: 600; color: #64748b; }
  .val { display: table-cell; width: 65%; color: #0f172a; }
  .val a { color: #0D1F82; text-decoration: none; font-weight: 600; }
  .message-box { margin-top: 20px; padding: 14px 16px; background: #f8fafc; border-left: 3px solid #ff6900; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #334155; }
</style>
</head>
<body>
<div class="card">
  <div class="header">
    <h2>' . htmlspecialchars($headline) . '</h2>
    <p>Received via Karncy Portal (' . date("M j, Y, g:i A T") . ')</p>
  </div>
  <div class="content">
    <div class="row"><div class="label">Full Name</div><div class="val"><strong>' . htmlspecialchars($fullName) . '</strong></div></div>
    <div class="row"><div class="label">Email Address</div><div class="val"><a href="mailto:' . htmlspecialchars($email) . '">' . htmlspecialchars($email) . '</a></div></div>
    <div class="row"><div class="label">Phone Number</div><div class="val">' . htmlspecialchars($phone) . '</div></div>
    <div class="row"><div class="label">Company / Institution</div><div class="val">' . htmlspecialchars($displayCompany) . '</div></div>';

if ($fundingReq) {
    $html .= '<div class="row"><div class="label">Funding Requirement</div><div class="val" style="color: #ff6900; font-weight: 700;">' . htmlspecialchars($fundingReq) . '</div></div>';
}
if ($howHelp) {
    $html .= '<div class="row"><div class="label">Requirement Type</div><div class="val">' . htmlspecialchars($howHelp) . '</div></div>';
}
if ($document) {
    $html .= '<div class="row"><div class="label">Requested Document</div><div class="val" style="color: #0D1F82; font-weight: 700;">' . htmlspecialchars($document) . '</div></div>';
}
if ($message) {
    $html .= '<div style="margin-top: 18px; font-weight: 600; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em;">Message / Brief</div>
              <div class="message-box">' . nl2br(htmlspecialchars($message)) . '</div>';
}

$html .= '
  </div>
</div>
</body>
</html>';

$headers = "MIME-Version: 1.0\r\n" .
           "Content-Type: text/html; charset=UTF-8\r\n" .
           "From: Karncy Portal <noreply@karncy.com>\r\n" .
           (filter_var($email, FILTER_VALIDATE_EMAIL) ? "Reply-To: " . $email . "\r\n" : "") .
           "X-Mailer: PHP/" . phpversion() . "\r\n";

$sent = @mail($recipient, $subject, $html, $headers);

if ($sent) {
    echo json_encode([
        "success" => true,
        "message" => "Inquiry received and emailed to admin",
        "recipient" => $recipient,
        "type" => $type,
        "timestamp" => date("c")
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Mail server error. Request could not be dispatched."
    ]);
}
?>
