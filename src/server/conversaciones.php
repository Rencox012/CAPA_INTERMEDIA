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

switch ($method){
    case "GET":
        switch ($endpoint){
            case 'getConversacionesUsuario':
                if(isset($_GET['idUsuario'])){
                    $idUsuario = $_GET['idUsuario'];
                    $conversaciones = getConversacionesUsuario($idUsuario);
                    if($conversaciones['success']){
                        switch($conversaciones['code']){
                            case 200:
                                header('HTTP/1.1 200 OK');
                                echo json_encode($conversaciones['data']);
                                break;
                            case 201:
                                header('HTTP/1.1 201 Created');
                                echo json_encode($conversaciones);
                                break;
                            case 404:
                                header('HTTP/1.1 404 Not Found');
                                echo json_encode(['message' => 'Conversaciones not found']);
                                break;
                            default:
                                header('HTTP/1.1 500 Internal Server Error');
                                echo json_encode(['message' => 'Internal Server Error']);
                                break;
                        }
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Conversaciones not found']);
                    }
                }
                else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Bad Request']);
                }
                break;

            case 'getMensajesConversacion':
                if(isset($_GET['idConversacion'])){
                    $idConversacion = $_GET['idConversacion'];
                    $mensajes = getMensajesConversacion($idConversacion);
                    if($mensajes['success']){
                        switch($mensajes['code']){
                            case 200:
                                header('HTTP/1.1 200 OK');
                                echo json_encode($mensajes['data']);
                                break;
                            case 201:
                                header('HTTP/1.1 201 Created');
                                echo json_encode($mensajes['data']);
                                break;
                            case 404:
                                header('HTTP/1.1 404 Not Found');
                                echo json_encode(['message' => 'Mensajes not found']);
                                break;
                            default:
                                header('HTTP/1.1 500 Internal Server Error');
                                echo json_encode(['message' => 'Internal Server Error']);
                                break;
                        }
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Mensajes not found']);
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
        switch ($endpoint){

            case 'insertConversacion':
                $data = json_decode(file_get_contents('php://input'), true);
                if(isset($data['idVendedor']) && isset($data['idComprador']) && isset($data['idProducto'])){
                    $idVendedor = $data['idVendedor'];
                    $idComprador = $data['idComprador'];
                    $idProducto = $data['idProducto'];
                    $conversacion = insertConversacion($idVendedor, $idComprador, $idProducto);
                    if($conversacion['success']){
                        switch($conversacion['code']){
                            case 200:
                                header('HTTP/1.1 200 OK');
                                echo json_encode($conversacion);
                                break;
                            case 201:
                                header('HTTP/1.1 201 Created');
                                echo json_encode($conversacion);
                                break;
                            case 404:
                                header('HTTP/1.1 404 Not Found');
                                echo json_encode(['message' => 'Conversacion not found']);
                                break;
                            default:
                                header('HTTP/1.1 500 Internal Server Error');
                                echo json_encode(['message' => 'Internal Server Error']);
                                break;
                        }
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Conversacion not found']);
                    }
                }
                else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Bad Request']);
                }
                break;
            case 'insertMensaje':
                $data = json_decode(file_get_contents('php://input'), true);
                if(isset($data['idConversacion']) && isset($data['idUsuario']) && isset($data['mensaje'])){
                    $idConversacion = $data['idConversacion'];
                    $idUsuario = $data['idUsuario'];
                    $mensaje = $data['mensaje'];
                    $insert = insertMensaje($idUsuario, $idConversacion, $mensaje);
                    if($insert['success']){
                        switch($insert['code']){
                            case 200:
                                header('HTTP/1.1 200 OK');
                                echo json_encode($insert);
                                break;
                            case 201:
                                header('HTTP/1.1 201 Created');
                                echo json_encode($insert);
                                break;
                            case 404:
                                header('HTTP/1.1 404 Not Found');
                                echo json_encode(['message' => 'Mensaje not found']);
                                break;
                            default:
                                header('HTTP/1.1 500 Internal Server Error');
                                echo json_encode(['message' => 'Internal Server Error']);
                                break;
                        }
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Mensaje not found']);
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

    default:
        header('HTTP/1.1 405 Not Found');
        echo json_encode(['message' => 'Method not allowed']);
        break;
}