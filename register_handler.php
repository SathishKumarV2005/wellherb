<?php
session_start();
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $age = mysqli_real_escape_string($conn, $_POST['age']);
    $gender = mysqli_real_escape_string($conn, $_POST['gender']);
    $country = mysqli_real_escape_string($conn, $_POST['country']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];

    // Validate passwords match
    if ($password !== $confirm_password) {
        echo "<script>
            alert('Passwords do not match!');
            window.location.href = 'register.html';
        </script>";
        exit();
    }

    // Check if email already exists
    $check_email = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $check_email);
    
    if (mysqli_num_rows($result) > 0) {
        echo "<script>
            alert('Email already exists! Please use a different email.');
            window.location.href = 'register.html';
        </script>";
        exit();
    }

    // Hash password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user data
    $sql = "INSERT INTO users (name, age, gender, country, email, password) 
            VALUES ('$name', '$age', '$gender', '$country', '$email', '$hashed_password')";

    if (mysqli_query($conn, $sql)) {
        echo "<script>
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        </script>";
    } else {
        echo "<script>
            alert('Error: " . mysqli_error($conn) . "');
            window.location.href = 'register.html';
        </script>";
    }
}

mysqli_close($conn);
?>
