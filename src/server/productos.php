<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

header("Access-Control-Allow-Methods: POST");

require_once('../utility/sql.php');

$method = $_SERVER['REQUEST_METHOD'];
$requestUri = $_SERVER['REQUEST_URI'];
$endpoint = basename(parse_url($requestUri, PHP_URL_PATH));



switch($method){
    case 'GET':
        switch($endpoint){
            case 'cards':
                if (isset($_GET['page'])) {
                    $pagina = $_GET['page'];
                    $cards = obtainCardsPage($pagina);
                    if ($cards) {
                        header('HTTP/1.1 200 OK');
                        echo json_encode($cards);
                    } else {
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No cards found']);
                    }
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Page number is required']);
                }
                break;

            case 'producto':
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    try {
                        $product = obtainProduct($id);
                        if ($product) {
                            header('HTTP/1.1 200 OK');
                            echo json_encode($product);
                        } else {
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No product found']);
                        }
                    } catch (PDOException $e) {
                        echo "Error: " . $e->getMessage();
                    }
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Id is required']);
                }
                break;

            case 'pictures':
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    try {
                        $pictures = obtainProductPictures($id);
                        if ($pictures) {
                            header('HTTP/1.1 200 OK');
                            echo json_encode($pictures);
                        } else {
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No pictures found']);
                        }
                    } catch (PDOException $e) {
                        echo "Error: " . $e->getMessage();
                    }
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Id is required']);
                }
                break;

            case 'getProductPicture':
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    try {
                        $product = getProductPicture($id);
                        if ($product['success']) {
                            header('HTTP/1.1 200 OK');
                            echo json_encode($product['data']);
                        } else {
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No product found']);
                        }
                    } catch (PDOException $e) {
                        echo "Error: " . $e->getMessage();
                    }
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Id is required']);
                }
                break;

            case 'getExistencias':
                if (isset($_GET['id'])) {
                    $id = $_GET['id'];
                    try {
                        $existencias = getExistencias($id);
                        if ($existencias['success']) {
                            header('HTTP/1.1 200 OK');
                            echo json_encode([$existencias['data']]);
                        } else {
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No existencias found']);
                        }
                    } catch (PDOException $e) {
                        echo "Error: " . $e->getMessage();
                    }
                } else {
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Id is required']);
                }
                break;

            case 'getProductosPendientes':
                try{
                    $products = getProductosPendientes();
                    if($products['success']){
                        header('HTTP/1.1 200 OK');
                        echo json_encode($products['data']);
                    }else{
                        header('HTTP/1.1 404 Not Found');
                        echo json_encode(['message' => 'No products found']);
                    }
                }
                catch(PDOException $e){
                    echo "Error: " . $e->getMessage();
                }

                break;

            case 'getNombreProducto':
                if(isset($_GET['id'])){
                    $id = $_GET['id'];
                    try{
                        $product = getNombreProducto($id);
                        if($product['success']){
                            header('HTTP/1.1 200 OK');
                            echo json_encode($product['data']);
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No product found']);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Id is required']);
                }
                break;

            case 'getExisteCompra':
                if(isset($_GET['idProducto']) && isset($_GET['idUsuario'])){
                    $idProducto = $_GET['idProducto'];
                    $idUsuario = $_GET['idUsuario'];
                    try{
                        $compra = getExisteCompra($idUsuario, $idProducto);
                        if($compra['success']){
                            header('HTTP/1.1 200 OK');
                            echo json_encode($compra['data']);
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No purchase found']);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'All fields are required']);
                }
                break;

            case 'getBusquedaProductos':
                if(isset($_GET['query']) && isset($_GET['pagina'])){
                    $query = $_GET['query'];
                    $pagina = $_GET['pagina'];
                    $filtro = "";
                    if (isset($_GET['filtro'])) {
                        $filtro = $_GET['filtro'];
                    }
                    try{
                        $products = getBusquedaProductos($query, $filtro, $pagina);
                        switch($products['code']){
                            case 200:
                                header('HTTP/1.1 200 OK');
                            echo json_encode($products['data']);
                                break;
                            case 201:
                                header('HTTP/1.1 201 OK');
                            echo json_encode($products);
                            case 404:
                                header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No products found']);
                            default:
                            header('HTTP/1.1 500 Server Error');
                            echo json_encode(['message' => 'No products found', 'sql' => $products]);
                        }
                        if($products['success']){
                            
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No products found']);
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

            case 'getPaginasProductosBusqueda':
                if(isset($_GET['query'])){
                    $query = $_GET['query'];
                    try{
                        $pages = getPaginasProductosBusqueda($query);
                        if($pages['success']){
                            header('HTTP/1.1 200 OK');
                            echo json_encode($pages['data']);
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No pages found']);
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

            case 'getBusquedaServicios':
                if(isset($_GET['query']) && isset($_GET['pagina'])){
                    $query = $_GET['query'];
                    $pagina = $_GET['pagina'];
                    $filtro = "";
                    if (isset($_GET['filtro'])) {
                        $filtro = $_GET['filtro'];
                    }
                    try{
                        $products = getBusquedaServicios($query, $filtro, $pagina);
                        if($products['success']){
                            header('HTTP/1.1 200 OK');
                            echo json_encode($products['data']);
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No products found']);
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

            case 'getPaginasServiciosBusqueda':
                if(isset($_GET['query'])){
                    $query = $_GET['query'];
                    try{
                        $pages = getPaginasServiciosBusqueda($query);
                        if($pages['success']){
                            header('HTTP/1.1 200 OK');
                            echo json_encode($pages['data']);
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No pages found']);
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

            case 'getVentasUsuario':
                if(isset($_GET['idUsuario'])){
                    $idUsuario = $_GET['idUsuario'];
                    try{
                        $ventas = getVentasUsuario($idUsuario);
                        if($ventas['success']){
                            header('HTTP/1.1 200 OK');
                            echo json_encode($ventas['data']);
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No sales found']);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Id is required']);
                }
                break;

            case 'getProductosUsuario':
                if(isset($_GET['idUsuario'])){
                    $idUsuario = $_GET['idUsuario'];
                    try{
                        $products = getProductosUsuario($idUsuario);
                        if($products['success']){
                            header('HTTP/1.1 200 OK');
                            echo json_encode($products['data']);
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'No products found']);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Id is required']);
                }
                break;

            default:
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['message' => 'No endpoint found']);
                break;
        }
        break;

    case "POST":
        switch($endpoint){
            case 'insertProducto':
                if(isset($_POST['idUsuario']) && isset($_POST['nombre']) && isset($_POST['cantidad']) && isset($_POST['descripcion']) && isset($_POST['precio']) && isset($_FILES['portada']) && isset($_POST['tipo'])){
                    $idUsuario = $_POST['idUsuario'];
                    $nombre = $_POST['nombre'];
                    $cantidad = $_POST['cantidad'];
                    $descripcion = $_POST['descripcion'];
                    $precio = $_POST['precio'];
                    $portada = file_get_contents($_FILES['portada']['tmp_name']);
                    $tipo = $_POST['tipo'];
                    //Call the function to insert the product
                    try{
                        $product = insertProducto($idUsuario, $nombre, $cantidad, $descripcion, $precio, $portada, $tipo);
                        if($product['success']){
                            switch($product['code']){
                                case 200:
                                    header('HTTP/1.1 200 OK');
                                    echo json_encode($product['data']);
                                    break;
                                case 201:
                                    header('HTTP/1.1 201 Created');
                                    echo json_encode($product);
                                    break;
                                case 404:
                                    header('HTTP/1.1 404 Not Found');
                                    echo json_encode(['message' => 'Product not found']);
                                    break;
                                default:
                                    header('HTTP/1.1 500 Internal Server Error');
                                    echo json_encode(['message' => 'Internal Server Error', 'data' => $product]);
                                    break;
                            }
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Product not found']);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                        $product = [];
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'All fields are required', 'data' => $_POST]);
                }
                break;

            case 'insertMultimedia':
                $multimedia = "";
                if(isset($_POST['multimedia'])){
                    $multimedia = $_POST['multimedia'];
                }
                else if (isset($_FILES['multimedia'])){
                    $multimedia = file_get_contents($_FILES['multimedia']['tmp_name']);
                }
                else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'Multimedia is required']);
                    break;
                }

                if(isset($_POST['idProducto']) && isset($_POST['tipo'])){
                    $idProducto = $_POST['idProducto'];
                    $tipo = $_POST['tipo'];
                    //Call the function to insert the multimedia
                    try{
                        $multimedia = insertMultimedia($idProducto, $tipo, $multimedia);
                        if($multimedia['success']){
                            switch($multimedia['code']){
                                case 200:
                                    header('HTTP/1.1 200 OK');
                                    echo json_encode($multimedia['data']);
                                    break;
                                case 201:
                                    header('HTTP/1.1 201 Created');
                                    echo json_encode($multimedia);
                                    break;
                                case 404:
                                    header('HTTP/1.1 404 Not Found');
                                    echo json_encode(['message' => 'Multimedia not found']);
                                    break;
                                default:
                                    header('HTTP/1.1 500 Internal Server Error');
                                    echo json_encode(['message' => 'Internal Server Error', 'data' => $multimedia]);
                                    break;
                            }
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Multimedia not found']);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                        $multimedia = [];
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'All fields are required']);
                }
                break;

            case 'updateProductoStatus':
                $data = json_decode(file_get_contents('php://input'), true);
                if(isset($data['idProducto']) && isset($data['status']) && isset($data['idUsuario'])){
                    $idProducto = $data['idProducto'];
                    $status = $data['status'];
                    $idUsuario = $data['idUsuario'];
                    try{
                        $product = updateProductoStatus($idProducto, $status, $idUsuario);
                        if($product['success']){
                            switch($product['code']){
                                case 200:
                                    header('HTTP/1.1 200 OK');
                                    echo json_encode($product['data']);
                                    break;
                                case 201:
                                    header('HTTP/1.1 201 Created');
                                    echo json_encode($product);
                                    break;
                                case 404:
                                    header('HTTP/1.1 404 Not Found');
                                    echo json_encode(['message' => 'Product not found']);
                                    break;
                                default:
                                    header('HTTP/1.1 500 Internal Server Error');
                                    echo json_encode(['message' => 'Internal Server Error', 'data' => $product]);
                                    break;
                            }
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Product not found']);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                        $product = [];
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'All fields are required']);
                }
                break;

            case 'updateProducto':
                $data = json_decode(file_get_contents('php://input'), true);
                if(isset($data['idProducto']) && isset($data['cantidad']) && isset($data['precio'])){
                    $idProducto = $data['idProducto'];
                    $cantidad = $data['cantidad'];
                    $precio = $data['precio'];
                    try{
                        $product = updateProducto($idProducto, $cantidad, $precio);
                        if($product['success']){
                            switch($product['code']){
                                case 200:
                                    header('HTTP/1.1 200 OK');
                                    echo json_encode($product['data']);
                                    break;
                                case 201:
                                    header('HTTP/1.1 201 Created');
                                    echo json_encode($product);
                                    break;
                                case 404:
                                    header('HTTP/1.1 404 Not Found');
                                    echo json_encode(['message' => 'Product not found']);
                                    break;
                                default:
                                    header('HTTP/1.1 500 Internal Server Error');
                                    echo json_encode(['message' => 'Internal Server Error', 'data' => $product]);
                                    break;
                            }
                        }else{
                            header('HTTP/1.1 404 Not Found');
                            echo json_encode(['message' => 'Product not found']);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                        $product = [];
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'All fields are required']);
                }
                break;
            case 'deleteProducto':
                $data = json_decode(file_get_contents('php://input'), true);
                if(isset($data['idProducto'])){
                    $idProducto = $data['idProducto'];
                    try{
                        $product = deleteProducto($idProducto);
                        if($product['success']){
                            switch($product['code']){
                                case 200:
                                    header('HTTP/1.1 200 OK');
                                    echo json_encode($product['data']);
                                    break;
                                case 201:
                                    header('HTTP/1.1 201 Created');
                                    echo json_encode($product);
                                    break;
                                case 404:
                                    header('HTTP/1.1 404 Not Found');
                                    echo json_encode(['message' => 'Product not found']);
                                    break;
                                default:
                                    header('HTTP/1.1 500 Internal Server Error');
                                    echo json_encode(['message' => 'Internal Server Error', 'data' => $product]);
                                    break;
                            }
                        }else{
                            header('HTTP/1.1 500 Server ERror');
                            echo json_encode(['message' => 'Product not found', 'sql' => $product]);
                        }
                    }catch(PDOException $e){
                        echo "Error: " . $e->getMessage();
                        $product = [];
                    }
                }else{
                    header('HTTP/1.1 400 Bad Request');
                    echo json_encode(['message' => 'All fields are required']);
                }
                break;

            default:
                header('HTTP/1.1 404 Not Found');
                echo json_encode(['message' => 'No endpoint found']);
                break;
        }
        break;

    default:
        header('HTTP/1.1 405 Method Not Allowed');
        echo json_encode(['message' => 'Method not allowed']);
        break;
}
