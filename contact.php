<?php
declare(strict_types=1);

// ---- Configuration -------------------------------------------------------
$myemail   = 'msarmi84@hotmail.com';         
$fromEmail = 'no-reply@mariasarmientocobo.com';        
$redirectOk   = 'index.html?sent=1';
// -------------------------------------------------------------------------

$name    = trim($_POST['name']    ?? '');
$email   = trim($_POST['email']   ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    $errors[] = 'All fields are required.';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid Email Address.';
}

if (preg_match('/[\r\n]/', $name . $email . $subject)) {
    $errors[] = 'Invalid entry.';
}

if ($errors) {
    http_response_code(400);
    header('Content-Type: text/html; charset=UTF-8');
    echo implode('<br>', array_map('htmlspecialchars', $errors));
    exit;
}

$to           = $myemail;
$emailSubject = mb_encode_mimeheader('Contacto web: ' . $subject, 'UTF-8');
$body         = "Nombre:  $name\n"
              . "Email:   $email\n"
              . "Asunto:  $subject\n\n"
              . "Mensaje:\n$message\n";

$headers = implode("\r\n", [
    'From: Formulario web <' . $fromEmail . '>',
    'Reply-To: ' . $email,    
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
]);

if (mail($to, $emailSubject, $body, $headers)) {
    header('Location: ' . $redirectOk);
    exit;
}

http_response_code(500);
echo 'The message could not be sent. Please try again later.';
