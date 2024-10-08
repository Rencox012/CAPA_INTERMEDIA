<?php
//api that handles the url requests for the users
//setting the headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
//allow form data to be processed

header("Access-Control-Allow-Methods: POST");

//including the sql.php file
require_once('../utility/sql.php');

//getting the request method
$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case 'GET': 
        // If the request method is GET and the URL ends with /cards, call the obtainCardsPage function
        if (strpos($_SERVER['REQUEST_URI'], '/server/productos.php/cards') !== false) {
            // Check if the 'page' parameter is present
            if (isset($_GET['page'])) {
                $pagina = $_GET['page'];
                $cards = obtainCardsPage($pagina);
                // If the cards are found, return them
                if ($cards) {
                    header('HTTP/1.1 200 OK');
                    echo json_encode($cards);
                } else {
                    // If no cards are found, return an error message
                    header('HTTP/1.1 404 Not Found');
                    echo json_encode(['message' => 'No cards found']);
                }
            } else {
                // If the 'page' parameter is missing, return an error message
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'Page number is required']);
            }
        }
        if(strpos($_SERVER['REQUEST_URI'], '/server/productos.php/producto?id') !== false){
            //check if the id is present
            if(isset($_GET['id'])){
                $id = $_GET['id'];
                //call the function to obtain the product
                try{
                    $product = obtainProduct($id);
                    // If the product is found, return it
                    if ($product) {
                        header('HTTP/1.1 200 OK');
                        echo json_encode($product);
                    } else {
                        // If no product is found, return an error message
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No product found']);
                    }
                }
                catch(PDOException $e){
                    // Handle error
                    echo "Error: " . $e->getMessage();
                    $product = [];
                }
            } else {
                // If the 'id' parameter is missing, return an error message
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'Id is required']);
            }
        }
        if(strpos($_SERVER['REQUEST_URI'], 'server/productos.php/pictures?id') !== false){
            //check if the id is present
            if(isset($_GET['id'])){
                $id = $_GET['id'];
                //call the function to obtain the comments
                try{
                    $pictures = obtainProductPictures($id);
                    // If the pictures are found, return them
                    if ($pictures) {
                        header('HTTP/1.1 200 OK');
                        echo json_encode($pictures);
                    } else {
                        // If no pictures are found, return an error message
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No pictures found']);
                    }
                }
                catch(PDOException $e){
                    // Handle error
                    echo "Error: " . $e->getMessage();
                    $pictures = [];
                }
            } else {
                // If the 'id' parameter is missing, return an error message
                header('HTTP/1.1 400 Bad Request');
                echo json_encode(['message' => 'Id is required']);
            }
        }
        break;
}
