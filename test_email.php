<?php
$to = 'ssuryaganesh20@gmail.com'; // Replace with the recipient's email address
$subject = 'Test Email from XAMPP Mercury';
$message = 'This is a test email sent from XAMPP using Mercury.';
$headers = 'From: sgrscsurya@gmail.com' . "\r\n" . // Replace with your email
           'Reply-To: sgrscsurya@gmail.com' . "\r\n" . // Replace with your email
           'X-Mailer: PHP/' . phpversion();

if (mail($to, $subject, $message, $headers)) {
    echo 'Email sent successfully!';
} else {
    echo 'Email sending failed.';
}
?>