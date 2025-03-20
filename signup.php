<?php
session_start();
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = $_POST["password"];
    $confirm_password = $_POST["confirm_password"];

    if ($password !== $confirm_password) {
        die("❌ Passwords do not match.");
    }

    // Check if user already exists
    $check_stmt = $conn->prepare("SELECT id FROM users WHERE username = ? OR email = ?");
    $check_stmt->bind_param("ss", $username, $email);
    $check_stmt->execute();
    $check_stmt->store_result();
    if ($check_stmt->num_rows > 0) {
        die("❌ Username or Email already taken.");
    }
    $check_stmt->close();

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert into DB
    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt->execute()) {
        // Redirect to userinfo.html with username and email as URL parameters
        header("Location: userinfo.html?username=" . urlencode($username) . "&email=" . urlencode($email));
        exit();
    } else {
        die("❌ Error inserting data: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();
}
?>