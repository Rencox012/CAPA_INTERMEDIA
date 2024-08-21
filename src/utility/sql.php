<?php

//setting the database connection

$db_user = "root";
$db_pass = "";
$db_name = "capa_intermedia";

//connect to the database using PDO
function connect (){
    global $db_user, $db_pass, $db_name;
    try {
        $conn = new PDO("mysql:host=localhost;dbname=$db_name", $db_user, $db_pass);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    return $conn;
}

function close_connection(){
    global $conn;
    $conn = null;
}

function Register($username, $password, $email){
    //connect using the connection function
    $conn = connect();
    //insert the user into the database, username, email and password, The UI will be automatically generated
    $sql = "INSERT INTO users (name, email, password, uid) VALUES ('$username', '$email', '$password' , UUID())";
    try {
        $conn->exec($sql);
        echo "New record created successfully";
    } catch (PDOException $e) {
        echo "New error";
        echo $sql . "<br>" . $e->getMessage();
    }
    close_connection();
}

function Login($email, $password){
    //connect using the connection function
    $conn = connect();
    //select the user from the database
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$password'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result = $stmt->fetchAll();
    echo "User found: " . count($result) . "<br>";
    //if the user is found, return the user
    if (count($result) > 0){
        close_connection();
        return $result[0];
    }
    //if the user is not found, return null
    close_connection();
    return null;
}

?>