<?php

//api that handles the url requests for the users
//setting the headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//allow form data to be processed

header("Access-Control-Allow-Methods: POST");

require_once('../utility/sql.php');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method){
    case "GET":
        if(strpos($_SERVER['REQUEST_URI'], 'categorias.php/getCategories')){
            $categorias = getCategorias();
            if($categorias['success']){
                switch($categorias['code']){
                    case 200:
                        header('HTTP/1.1 200 OK');
                        echo json_encode($categorias['data']);
                        break;
                    case 201:
                        header('HTTP/1.1 201 Created');
                        echo json_encode($categorias);
                        break;
                    case 404:
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Categorias not found']);
                        break;
                    default:
                        header('HTTP/1.1 500 Internal Server Error');
                        echo json_encode(['message' => 'Internal Server Error']);
                        break;
                }
            }else{
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['message' => 'Categorias not found']);
            }
            return;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'categorias.php/getCategoriasActivas')){
            $categorias = getCategoriasActivoas();
            if($categorias['success']){
                switch($categorias['code']){
                    case 200:
                        header('HTTP/1.1 200 OK');
                        echo json_encode($categorias['data']);
                        break;
                    case 201:
                        header('HTTP/1.1 201 Created');
                        echo json_encode($categorias);
                        break;
                    case 404:
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'Categorias not found']);
                        break;
                    default:
                        header('HTTP/1.1 500 Internal Server Error');
                        echo json_encode(['message' => 'Internal Server Error']);
                        break;
                }
            }else{
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['message' => 'Categorias not found']);
            }
            return;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'categorias.php/getCategoriasProducto')){
            if(isset($_GET['idProducto'])){
                $idProducto = $_GET['idProducto'];
                $categorias = getCategoriasProducto($idProducto);
                if($categorias['success']){
                    switch($categorias['code']){
                        case 200:
                            header('HTTP/1.1 200 OK');
                            echo json_encode($categorias['data']);
                            break;
                        case 201:
                            header('HTTP/1.1 201 Created');
                            echo json_encode($categorias);
                            break;
                        case 404:
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Categorias not found']);
                            break;
                        default:
                            header('HTTP/1.1 500 Internal Server Error');
                            echo json_encode(['message' => 'Internal Server Error']);
                            break;
                    }
                }else{
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode(['message' => 'Categorias not found']);
                }
            }else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'idProducto is required']);
            }
            return;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'categorias.php/getCategoriaExiste')){
            if(isset($_GET['nombre'])){
                $nombre = $_GET['nombre'];
                $categoria = getExisteCategoria($nombre);
                if($categoria['success']){
                    switch($categoria['code']){
                        case 200:
                            header('HTTP/1.1 200 OK');
                            echo json_encode($categoria['data']);
                            break;
                        case 201:
                            header('HTTP/1.1 201 Created');
                            echo json_encode($categoria);
                            break;
                        case 404:
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Categoria not found']);
                            break;
                        default:
                            header('HTTP/1.1 500 Internal Server Error');
                            echo json_encode(['message' => 'Internal Server Error']);
                            break;
                    }
                }else{
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode(['message' => 'Categoria not found', 'data' => $categoria]);
                }
            }else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'nombre is required']);
            }
            return;
        }

        //If the endpoint is not found, return a 404
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'Endpoint not found']);

        break;
    case "POST":
        if(strpos($_SERVER['REQUEST_URI'], 'categorias.php/insertCategoriesProducto')){
            $data = json_decode(file_get_contents('php://input'), true);
           if(isset($data['idProducto']) && isset($data['idCategoria'])){
                $idProducto = $data['idProducto'];
                $idCategoria = $data['idCategoria'];
                $categoria = insertCategoriasProducto($idProducto, $idCategoria);
                if($categoria['success']){
                    switch($categoria['code']){
                        case 200:
                            header('HTTP/1.1 200 OK');
                            echo json_encode($categoria['data']);
                            break;
                        case 201:
                            header('HTTP/1.1 201 Created');
                            echo json_encode($categoria);
                            break;
                        case 404:
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Categoria not found', 'sql' => $categoria]);
                            break;
                        default:
                            header('HTTP/1.1 500 Internal Server Error');
                            echo json_encode(['message' => 'Internal Server Error', 'sql' => $categoria]);
                            break;
                    }
                }else{
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode(['message' => 'Categoria not found']);
                }
            }else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'idProducto and idCategoria are required']);
           }
            return;
        }
        if(strpos($_SERVER['REQUEST_URI'], 'categorias.php/insertCategory')){
            $data = json_decode(file_get_contents('php://input'), true);
            if(isset($data['nombre']) && isset($data['idUsuario']) && isset($data['descripcion'])){
                $nombre = $data['nombre'];
                $idUsuario = $data['idUsuario'];
                $descripcion = $data['descripcion'];
                $categoria = insertCategoria($idUsuario, $nombre, $descripcion);
                if($categoria['success']){
                    switch($categoria['code']){
                        case 200:
                            header('HTTP/1.1 200 OK');
                            echo json_encode($categoria['data']);
                            break;
                        case 201:
                            header('HTTP/1.1 201 Created');
                            echo json_encode($categoria);
                            break;
                        case 404:
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Categoria not found']);
                            break;
                        default:
                            header('HTTP/1.1 500 Internal Server Error');
                            echo json_encode(['message' => 'Internal Server Error']);
                            break;
                    }
                }else{
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode(['message' => 'Categoria not found']);
                }
            }else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'nombre is required']);
            }
            return;

        }
        if(strpos($_SERVER['REQUEST_URI'], 'categorias.php/updateStatusCategoria')){
            $data = json_decode(file_get_contents('php://input'), true);
            if(isset($data['idCategoria']) && isset($data['status'])){
                $idCategoria = $data['idCategoria'];
                $status = $data['status'];
                $categoria = updateStatusCategoria($idCategoria, $status);
                if($categoria['success']){
                    switch($categoria['code']){
                        case 200:
                            header('HTTP/1.1 200 OK');
                            echo json_encode($categoria['data']);
                            break;
                        case 201:
                            header('HTTP/1.1 201 Created');
                            echo json_encode($categoria);
                            break;
                        case 404:
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Categoria not found']);
                            break;
                        default:
                            header('HTTP/1.1 500 Internal Server Error');
                            echo json_encode(['message' => 'Internal Server Error']);
                            break;
                    }
                }else{
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode(['message' => 'Categoria not found']);
                }
            }else{
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'idCategoria and status are required']);
            }
            return;
        }


        //If the endpoint is not found, return a 404
        header('HTTP/1.1 404 Not Found');
        echo json_encode(['message' => 'Endpoint not found']);
        break;
}