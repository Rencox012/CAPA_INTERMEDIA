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
    case 'GET':
        if(strpos($_SERVER['REQUEST_URI'], '/obtain?id') !== false){
            //check if the id is present
            if(isset($_GET['id'])){
                $id = $_GET['id'];
                //call the function to obtain the comments
                try{
                    $comments = obtainComments($id);
                    // If the comments are found, return them
                    if ($comments) {
                        header('HTTP/1.1 200 OK');
                        echo json_encode($comments);
                    } else {
                        // If no comments are found, return an error message
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No comments found']);
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
    case 'POST':
        if(strpos($_SERVER['REQUEST_URI'], '/create?id') !==false){
            //get the id from the URL and the rest of the data from the body
            $id = $_GET['id'];
            $data = json_decode(file_get_contents('php://input'), true);
            // Check if all required fields are present
            if (isset($data['comentario']) && isset($data['calificacion']) && isset($data['idUsuario'])) {
                $comentario = $data['comentario'];
                $calificacion = $data['calificacion'];
                $idUsuario = $data['idUsuario'];
                try {
                    // Call the createComment function
                    $result = createComment($id, $comentario, $calificacion, $idUsuario);

                    if($result == false){
                        // If the comment is not created, return an error message
                        header('HTTP/1.1 400 Bad Request');
                        echo json_encode(['message' => 'Error creating comment']);
                    }
                    // Return a success message
                    header('HTTP/1.1 201 Created');
                    echo json_encode(['message' => 'Comment created successfully']);
                } catch (PDOException $e) {
                    // Handle error
                    echo "Error: " . $e->getMessage();
                }
            } else {
                // If any of the required fields are missing, return an error message
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'All fields are required']);
            }
        }
    break;
    default:
        // If the request method is not POST, return an error message
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(['message' => 'Método no permitido']);
        break;
}