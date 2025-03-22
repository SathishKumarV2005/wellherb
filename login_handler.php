<?php
session_start();
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    // Get user from database
    $sql = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) == 1) {
        $user = mysqli_fetch_assoc($result);
        
        // Verify password
        if (password_verify($password, $user['password'])) {
            // Password is correct, create session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_name'] = $user['name'];
            
            echo "<script>
                window.location.href = 'home.html';
            </script>";
        } else {
            echo "<script>
                alert('Invalid password!');
                window.location.href = 'login.html';
            </script>";
        }
    } else {
        echo "<script>
            alert('Email not found!');
            window.location.href = 'login.html';
        </script>";
    }
}

mysqli_close($conn);
?>
