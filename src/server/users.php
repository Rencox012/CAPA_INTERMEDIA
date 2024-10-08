<?php
//api that handles the url requests for the users
//setting the headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//allow form data to be processed

header("Access-Control-Allow-Methods: POST");

require_once('../utility/sql.php');

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'POST' && strpos($_SERVER['REQUEST_URI'], '/server/users.php/login') !== false) {
    // Get the POST request
    $data = json_decode(file_get_contents('php://input'), true);
    // Call the login function
    if (isset($data['email']) && isset($data['password']) && isset($data['rol'])) {
        $email = $data['email'];
        $password = $data['password'];
        $rol = $data['rol'];

        // Call the login function
        $user = Login($email, $password, $rol);

        // If the user is found, return the user
        if ($user) {
            header('HTTP/1.1 200 OK');
            echo json_encode($user);
        } else {
            // If the user is not found, return an error message
            header('HTTP/1.1 401 Unauthorized');
            echo json_encode(['message' => 'Invalid email or password']);
        }
    } else {
        // If email or password is missing, return an error message
        header('HTTP/1.1 400 Bad Request');
        echo json_encode(['message' => 'Email and password are required']);
    }
}
// If the request method is POST and the URL ends with /register, call the register function
if ($_SERVER['REQUEST_METHOD'] == 'POST' && strpos($_SERVER['REQUEST_URI'], '/server/users.php/register') !== false) {
    // Check if all required fields are present
    if (isset($_FILES['foto']) && isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['sexo']) && isset($_POST['direccion']) && isset($_POST['contrasena']) && isset($_POST['email']) && isset($_POST['rol'])) {
        $foto = file_get_contents($_FILES['foto']['tmp_name']);
        $name = $_POST['nombre'];
        $apellidos = $_POST['apellidos'];
        $genero = $_POST['sexo'];
        $direccion = $_POST['direccion'];
        $password = $_POST['contrasena'];
        $email = $_POST['email'];
        $rol = $_POST['rol'];
        try {
            // Call the register function
            Register($name,$apellidos, $genero, $direccion, $password, $email, $rol, $foto);

            // Return a success message
            header('HTTP/1.1 201 Created');
            echo json_encode(['message' => 'User created successfully']);
        } catch (PDOException $e) {
            // If an error occurs, return an error message
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['message' => $e->getMessage()]);
        }
    } else {
        // If any of the required fields are missing, return an error message
        header('HTTP/1.1 400 Bad Request');
        //determine what field is missing

        
        echo json_encode(['message' => 'Some information is missing']);
    }
}
