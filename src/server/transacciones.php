<?php
//api that handles the url requests for the users
//setting the headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//allow form data to be processed

header("Access-Control-Allow-Methods: POST");

//including the sql.php file
require_once('../utility/sql.php');

$method = $_SERVER['REQUEST_METHOD'];

//switch to determine the method
switch($method){
    case "GET":

        //If the endpoint is not found, return a 404
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'Endpoint not found']);
        break;

    case "POST":
        if(strpos($_SERVER['REQUEST_URI'], 'transacciones.php/insertTransaction')){
            $data = json_decode(file_get_contents('php://input'), true);
            if(isset($data['idElemento']) && isset($data['idProducto']) && isset($data['cantidad']) && isset($data['idUsuario']) && isset($data['total']) &&isset($data['metodoPago'])){
                $idElemento = $data['idElemento'];
                $idProducto = $data['idProducto'];
                $cantidad = $data['cantidad'];
                $idUsuario = $data['idUsuario'];
                $total = $data['total'];
                $metodoPago = $data['metodoPago'];
                try{
                    $cart = insertarTransaccion($idElemento, $idProducto, $cantidad, $idUsuario, $total, $metodoPago);
                    if($cart['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($cart['success']);
                    }
                    else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No cart found' , "SQL DATA " => $cart['errorText']]);
                    }
                }catch(PDOException $e){
                    echo "Error: " . $e->getMessage();
                    $cart = [];
                }
            }else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'IdElemento, idProducto, cantidad, idUsuario, total and metodoPago are required' , "RECIVED DATA" => $_POST]);
            }
                
            return;
        }


        //If the endpoint is not found, return a 404
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'Endpoint not found']);
        break;
}