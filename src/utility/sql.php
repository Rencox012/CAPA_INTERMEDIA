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
        echo "Connected successfully";
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

?>