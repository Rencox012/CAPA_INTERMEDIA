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
        if(strpos($_SERVER['REQUEST_URI'], 'carrito.php/getCart?id')){
            if(isset($_GET['id'])){
                $id = $_GET['id'];
                try{
                    $cart = getCarrito($id);
                    if($cart['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($cart['data']);
                    }
                    else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No cart found']);
                    }
                }catch(PDOException $e){
                    echo "Error: " . $e->getMessage();
                    $cart = [];
                }
            }else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'Id is required']);
            }
            return;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'carrito.php/getProductosCarrito?id')){
            if(isset($_GET['id'])){
                $id = $_GET['id'];
                try{
                    $cart = getCarritoProductos($id);
                    if($cart['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($cart['data']);
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
                echo json_encode(['message' => 'Id is required']);
            }
            return;
        }

        //If the endpoint is not found, we return a 404 error
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'No endpoint found']);
        break;
    case "POST":
        if(strpos($_SERVER['REQUEST_URI'], 'carrito.php/InsertarElementoCarrito')){
            $data = json_decode(file_get_contents('php://input'), true);
            if(isset($data['idCarrito']) && isset($data['idProducto']) && isset($data['cantidad'])){
                $idCarrito = $data['idCarrito'];
                $idProducto = $data['idProducto'];
                $cantidad = $data['cantidad'];
                try{
                    $cart = insertCarritoElement($idCarrito, $idProducto, $cantidad);
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
                echo json_encode(['message' => 'Id, idProducto and cantidad are required' , "RECIVED DATA" => $_POST]);
            }
            return;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'carrito.php/updateCantidadCarrito')){
            $data = json_decode(file_get_contents('php://input'), true);
            if(isset($data['idElemento']) && isset($data['cantidad'])){
                $idElemento = $data['idElemento'];
                $cantidad = $data['cantidad'];
                try{
                    $cart = updateCantidadCarrito($idElemento, $cantidad);
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
                echo json_encode(['message' => 'IdElemento and cantidad are required' , "RECIVED DATA" => $_POST]);
            }
            return;
        }


        if(strpos($_SERVER['REQUEST_URI'], 'carrito.php/deleteElementoCarrito')){
            $data = json_decode(file_get_contents('php://input'), true);
            if(isset($data['idElemento'])){
                $idElemento = $data['idElemento'];
                try{
                    $cart = deleteElementoCarrito($idElemento);
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
                echo json_encode(['message' => 'IdElemento is required' , "RECIVED DATA" => $_POST]);
            }
            return;
        }
    
        
        


        //If we get no correct data, we return a 404 error
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'No endpoint found']);
        
        break;
}