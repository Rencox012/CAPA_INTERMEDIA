<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


header("Access-Control-Allow-Methods: POST");

require_once('../utility/sql.php');

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case "GET":
        if(strpos($_SERVER['REQUEST_URI'], 'users.php/getUsuarioCompras?id')){
            if(isset($_GET['id'])){
                $id = $_GET['id'];
                $user = getUsuarioCompras($id);
                if($user['success']){
                    switch($user['code']){
                        case 200:
                            header('HTTP/1.1 200 OK');
                            echo json_encode($user['data']);
                            break;
                        case 201:
                            header('HTTP/1.1 201 Created');
                            echo json_encode($user);
                            break;
                        case 404:
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'User not found']);
                            break;
                        default:
                            header('HTTP/1.1 500 Internal Server Error');
                            echo json_encode(['message' => 'Internal Server Error']);
                            break;
                            
                    }
                }else{
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode(['message' => 'User not found']);
                }
            }
        else{
            header('HTTP/1.1 400 Bad Request');
            echo json_encode(['message' => 'User ID is required']);
        }
        return;
    }
        if(strpos($_SERVER['REQUEST_URI'], 'users.php/getUsuarioFoto?id')) {
            if (isset($_GET['id'])) {
                $id = $_GET['id'];
                $user = getUsuarioFoto($id);
                if ($user['success']) {
                    switch ($user['code']) {
                        case 200:
                            header('HTTP/1.1 200 OK');
                            echo json_encode($user['data']);
                            break;
                        case 201:
                            header('HTTP/1.1 201 Created');
                            echo json_encode($user);
                            break;
                        case 404:
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'User not found']);
                            break;
                        default:
                            header('HTTP/1.1 500 Internal Server Error');
                            echo json_encode(['message' => 'Internal Server Error']);
                            break;

                    }
                } else {
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode(['message' => 'User not found']);
                }
            } else {
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'User ID is required']);
            }
            return;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'users.php/getBusquedaVendedores')){
            if(isset($_GET['query']) && isset($_GET['pagina'])){
                $query = $_GET['query'];
                $pagina = $_GET['pagina'];
                try{
                    $products = getBusquedaVendedores($query, $pagina);
                    if($products['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($products['data']);
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No users found']);
                    }
                }catch(PDOException $e){
                    echo "Error: " . $e->getMessage();
                }
            }
            else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'All fields are required']);
            }
            break;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'users.php/getPaginasVendedores')){
            if(isset($_GET['query'])){
                $query = $_GET['query'];
                try{
                    $products = getPaginasVendedores($query);
                    if($products['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($products['data']);
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No users found']);
                    }
                }catch(PDOException $e){
                    echo "Error: " . $e->getMessage();
                }
            }
            else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'All fields are required']);
            }
            break;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'users.php/getBusquedaCompradores')){
            if(isset($_GET['query']) && isset($_GET['pagina'])){
                $query = $_GET['query'];
                $pagina = $_GET['pagina'];
                try{
                    $products = getBusquedaCompradores($query, $pagina);
                    if($products['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($products['data']);
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No users found']);
                    }
                }catch(PDOException $e){
                    echo "Error: " . $e->getMessage();
                }
            }
            else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'All fields are required']);
            }
            break;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'users.php/getPaginasCompradores')){
            if(isset($_GET['query'])){
                $query = $_GET['query'];
                try{
                    $products = getPaginasCompradores($query);
                    if($products['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($products['data']);
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No users found']);
                    }
                }catch(PDOException $e){
                    echo "Error: " . $e->getMessage();
                }
            }
            else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'All fields are required']);
            }
            break;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'users.php/getUserInfo')){
            if(isset($_GET['id'])){
                $id = $_GET['id'];
                try{
                    $products = getUserInfo($id);
                    if($products['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($products['data']);
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No users found']);
                    }
                }catch(PDOException $e){
                    echo "Error: " . $e->getMessage();
                }
            }
            else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'All fields are required']);
            }
            break;
        }


        //If the endpoint is not found, return a 404
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'Endpoint not found']);
        break;

    case "POST":

        if (strpos($_SERVER['REQUEST_URI'], '/server/users.php/login')) {
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
            return;
        }

        // If the request method is POST and the URL ends with /register, call the register function
        if (strpos($_SERVER['REQUEST_URI'], '/server/users.php/register')) {
            // Check if all required fields are present
            if (isset($_FILES['foto']) && isset($_POST['nombre']) && isset($_POST['apellidos']) && isset($_POST['sexo']) && isset($_POST['direccion']) && isset($_POST['contrasena']) && isset($_POST['email']) && isset($_POST['rol']) && isset($_POST['privacidad'])) {
                $foto = file_get_contents($_FILES['foto']['tmp_name']);
                $name = $_POST['nombre'];
                $apellidos = $_POST['apellidos'];
                $genero = $_POST['sexo'];
                $direccion = $_POST['direccion'];
                $password = $_POST['contrasena'];
                $email = $_POST['email'];
                $rol = $_POST['rol'];
                $privacidad = $_POST['privacidad']; 
                try {
                    // Call the register function
                    Register($name,$apellidos, $genero, $direccion, $password, $email, $rol, $foto, $privacidad);

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
            return;
        }


        //If the endpoint is not found, return a 404 
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'Endpoint not found']);
        break;
}


