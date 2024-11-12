<?php

//api that handles the url requests for the users
//setting the headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//allow form data to be processed

header("Access-Control-Allow-Methods: POST");

require_once('../utility/sql.php');

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$endpoint = basename(parse_url($requestUri, PHP_URL_PATH));

switch ($method) {
    case "GET":
        switch ($endpoint) {
            case 'getExisteCotizacion':
                if(isset($_GET['idConversacion'])){
                    $idConversacion = $_GET['idConversacion'];
                    $cotizacion = getExisteCotizacion($idConversacion);
                    if($cotizacion['success']){
                        switch($cotizacion['code']){
                            case 200:
                                header('HTTP/1.1 200 OK');
                                echo json_encode($cotizacion['data']);
                                break;
                            case 201:
                                header('HTTP/1.1 201 Created');
                                echo json_encode($cotizacion);
                                break;
                            case 404:
                                header('HTTP/1.1 404 Not Found');
                                echo json_encode(['message' => 'Cotizacion not found']);
                                break;
                            default:
                                header('HTTP/1.1 500 Internal Server Error');
                                echo json_encode(['message' => 'Internal Server Error']);
                                break;
                        }
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Cotizacion not found']);
                    }
                }
                else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Bad Request']);
                }
                break;

            default:
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['message' => 'Endpoint not found']);
                break;
        }
        break;
    case "POST":
        switch ($endpoint) {

            case 'insertCotizacion':
                $data = json_decode(file_get_contents('php://input'), true);
                if(isset($data['idConversacion']) && isset($data['idProducto']) && isset($data['precio']) && isset($data['cantidad']) && isset($data['detalles'])){
                    $idConversacion = $data['idConversacion'];
                    $idProducto = $data['idProducto'];
                    $precio = $data['precio'];
                    $cantidad = $data['cantidad'];
                    $detalles = $data['detalles'];
                    $cotizacion = insertCotizacion($idConversacion, $idProducto, $precio,$detalles, $cantidad);
                    if($cotizacion['success']){
                        switch($cotizacion['code']){
                            case 200:
                                header('HTTP/1.1 200 OK');
                                echo json_encode($cotizacion);
                                break;
                            case 201:
                                header('HTTP/1.1 201 Created');
                                echo json_encode($cotizacion);
                                break;
                            case 404:
                                header('HTTP/1.1 404 Not Found');
                                echo json_encode(['message' => 'Cotizacion not found']);
                                break;
                            default:
                                header('HTTP/1.1 500 Internal Server Error');
                                echo json_encode(['message' => 'Internal Server Error']);
                                break;
                        }
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Cotizacion not found']);
                    }
                }
                else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Bad Request']);
                }
                break;
            case 'updateCotizacion':
                $data = json_decode(file_get_contents('php://input'), true);
                if(isset($data['idCotizacion'])&& isset($data['status']) && isset($data['idUsuario']) && isset($data['precio']) && isset($data['cantidad']) && isset($data['idProducto'])){
                    $idCotizacion = $data['idCotizacion'];
                    $precio = $data['precio'];
                    $cantidad = $data['cantidad'];
                    $status = $data['status'];
                    $idUsuario = $data['idUsuario'];
                    $idProducto = $data['idProducto'];
                    $cotizacion = updateCotizacion($idCotizacion, $status, $idUsuario, $idProducto, $cantidad, $precio);
                    if($cotizacion['success']){
                        switch($cotizacion['code']){
                            case 200:
                                header('HTTP/1.1 200 OK');
                                echo json_encode($cotizacion);
                                break;
                            case 201:
                                header('HTTP/1.1 201 Created');
                                echo json_encode($cotizacion);
                                break;
                            case 404:
                                header('HTTP/1.1 404 Not Found');
                                echo json_encode(['message' => 'Cotizacion not found']);
                                break;
                            default:
                                header('HTTP/1.1 500 Internal Server Error');
                                echo json_encode(['message' => 'Internal Server Error']);
                                break;
                        }
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Cotizacion not found']);
                    }
                }
                else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Bad Request']);
                }
                break;

            default:
                header('HTTP/1.1 405 Not Found');
                echo json_encode(['message' => 'Method not allowed']);
                break;
        }
}