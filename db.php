<?php
$servername = "localhost";
$username = "root"; 
$password = ""; 
$database = "halo_health";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>