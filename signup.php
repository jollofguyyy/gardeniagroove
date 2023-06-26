<?php
// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];
$password_confirmation = $_POST['password_confirmation'];



if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL)) {
    die("Valid email is required");
}

if (strlen($_POST["password"]) < 8) {
    die("Password must be at least 8 characters");
}


if (!preg_match("/[a-z]/i", $_POST["password"])) {
    die("Password must contain at least one letter");
}

if (!preg_match("/[1-9]/i", $_POST["password"])) {
    die("Password must contain at least one number");
}


// Validate form data (add your own validation rules as needed)
if (empty($name) || empty($email) || empty($password) || empty($password_confirmation)) {
    echo "All fields are required.";
    exit;
}

if ($password !== $password_confirmation) {
    echo "Password and Confirm Password do not match.";
    exit;
}

// Sanitize the form data to prevent SQL injection
$name = htmlspecialchars($name);
$email = htmlspecialchars($email);
$password = htmlspecialchars($password);




$myssqli = require __DIR__ . "/database.php";


$sql = "INSERT INTO user (name, email, password_hash)
       VALUES (?, ?, ?)";

$stmt = $mysqli->stmt_init();

if (!$stmt->prepare($sql)) {
    die("SQL error:" . $mysqli->error);
};

$smt->bind_param(
    $_POST["name"],
    $_POST["email"],
    $password_hash
);

if ($stmt->execute()) {

    header("Location: signUp-suc.html");
    exit;
} else {
    if ($$mysqli->errno === 1062) {
        die("Email already taken");
    } else {
        die($mysqli->error . " " . $mysqli->errno);
    }
}
