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
        if(strpos($_SERVER['REQUEST_URI'], '/listas.php/obtainLists') !== false){
            //check if the id is present
            if(isset($_GET['id'])){
                $id = $_GET['id'];
                //call the function to obtain the lists

                try{
                    $comments = getListasUsuario($id);


                    // If the comments are found, return them
                    if ($comments['success']) {
                        //If we receive the code 200, it means it found lists, if we get 201, it means it did the query, but no lists were found, based on this, we return the data or the error message
                        $code = $comments['code'];
                        if($code == 200){
                            header('HTTP/1.1 200 OK');
                                    //Log the information in log.txt
                            $log = fopen("log.txt", "a");
                            fwrite($log, "Enviando la siguiente informacion ".date("Y-m-d H:i:s")." - ".$_SERVER['REQUEST_URI']." - ".json_encode($comments)."\n");
                            fclose($log);
                            echo json_encode($comments['data']);
                        } else {
                            header( "HTTP/1.1 $code");
                            echo json_encode(['message' => $comments['errorText']]);
                        }
                    } else {
                        // If no lists are found, return an error message
                        $code = $comments['errorCode'];
                        header( "HTTP/1.1 $code");
                        echo json_encode(['message' => $comments['errorText']]);
                    }
                }
                catch(PDOException $e){
                    // Handle error
                    echo "Error: " . $e->getMessage();
                    $comments = [];
                }
            } else {
                // If the 'id' parameter is missing, return an error message
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'Id is required']);
            }
        }
        break;
    case "POST":
        if(strpos($_SERVER['REQUEST_URI'], '/listas.php/createList') !== false){
            //obtain the information from the body
            $data = json_decode(file_get_contents('php://input'), true);
            //check if the data is present
            if(isset($data['idUsuario']) && isset($data['nombre']) && isset($data['descripcion']) && isset($data['privacidad'])){
                //log the inforamtion in log.txt
                $log = fopen("log.txt", "a");
                fwrite($log, "POST - ".date("Y-m-d H:i:s")." - ".$_SERVER['REQUEST_URI']." - ".json_encode($data)."\n");
                fclose($log);

                $nombre = $data['nombre'];
                $idUsuario = $data['idUsuario'];
                $descripcion = $data['descripcion'];
                $privacidad = $data['privacidad'];
                //call the function to create the list
                try{
                    $result = createList($idUsuario, $nombre, $descripcion, $privacidad);
                    if ($result['success']) {
                        header('HTTP/1.1 200 Created');
                        echo json_encode(['message' => 'List created', 'data' => $result['data']]);
                    } else {
                        // If the list is not created, return an error message
                        $errorCode = $result['errorCode'];
                        header( "HTTP/1.1 $errorCode");
                        echo json_encode(['message' => $result['errorText']]);
                    }
                }
                catch(PDOException $e){
                    // Handle error
                    echo "Error: " . $e->getMessage();
                }
            } else {
                // If the 'id' or 'nombre' parameters are missing, return an error message
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'Id and name are required']);
            }
        }
        break;
}