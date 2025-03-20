<?php
session_start();
include "db.php";

$error_message = ""; // Initialize an error message variable

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = trim($_POST['username']);
    $pass = $_POST['password'];

    if (empty($user) || empty($pass)) {
        $error_message = "❌ Username or Password is empty!";
        header("Location: login.html?error=" . urlencode($error_message));
        exit();
    } else {
        // Fetch user data using either username or email
        $sql = "SELECT * FROM users WHERE username = ? OR email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $user, $user); // Bind the same variable for both username and email
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            $error_message = "❌ User does not exist in database!";
            header("Location: login.html?error=" . urlencode($error_message));
            exit();
        } else {
            $row = $result->fetch_assoc();
            // Verify password
            if (password_verify($pass, $row['password'])) {
                // Update last login time
                $update_sql = "UPDATE users SET last_login = NOW() WHERE username = ?";
                $update_stmt = $conn->prepare($update_sql);
                $update_stmt->bind_param("s", $row['username']); // Use the username from the fetched row
                $update_stmt->execute();

                // Set session variable
                $_SESSION['username'] = $row['username'];

                // Redirect to main menu
                header("Location: main-menu.html");
                exit();
            } else {
                $error_message = "❌ Invalid username or password!";
                header("Location: login.html?error=" . urlencode($error_message));
                exit();
            }
        }

        $stmt->close();
        $conn->close();
    }
}
?>