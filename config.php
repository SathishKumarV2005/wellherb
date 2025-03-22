<?php
// Database configuration
$db_host = "localhost";     // Replace with your database host
$db_user = "your_username"; // Replace with your database username
$db_pass = "your_password"; // Replace with your database password
$db_name = "well_herb";     // Replace with your database name

// Create database connection
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
