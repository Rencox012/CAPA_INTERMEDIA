<?php
$db_user = "root";
$db_pass = "";
$db_name = "capa_intermedia";

#region Conexiones
function close_connection(){
    global $conn;
    $conn = null;
}
function connect (){
    global $db_user, $db_pass, $db_name;
    try {
        $conn = new PDO("mysql:host=localhost;dbname=$db_name", $db_user, $db_pass);
        // set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
    }
    return $conn;
}
#endregion

#region Usuarios
function Register($name, $apellidos, $genero, $direccion, $password, $email, $rol, $foto) {
    // Connect using the connection function
    $conn = connect();
    
    // Prepare the SQL statement with placeholders
    $sql = "CALL InsertarUsuario(:email, :name, :apellidos, :password, :rol, :genero, :direccion, :foto)";
    
    try {
        // Prepare the statement
        $stmt = $conn->prepare($sql);

        //send the informtion recieved to a log file in the same folder
        $log = fopen("log.txt", "w") or die("Unable to open file!");
        //include the day and time of the request
        fwrite($log, date("Y-m-d h:i:sa") . "\n");
        //Write all the information recieved
        fwrite($log, "Name: $name\n");
        fwrite($log, "Apellidos: $apellidos\n");
        fwrite($log, "Genero: $genero\n");
        fwrite($log, "Direccion: $direccion\n");
        fwrite($log, "Password: $password\n");
        fwrite($log, "Email: $email\n");
        fwrite($log, "Rol: $rol\n");
        
        // Bind the parameters
        $stmt->bindParam(':apellidos', $apellidos);
        //turn the picture into a base64 string
        $foto = base64_encode($foto);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':genero', $genero);
        $stmt->bindParam(':direccion', $direccion);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':rol', $rol);
        $stmt->bindParam(':foto', $foto);
        
        // Execute the statement
        $stmt->execute();
        
        return true;
    } catch (PDOException $e) {
        // Rethrow the exception to be caught in the calling function
        throw $e;
    } finally {
        // Close the connection
        close_connection();
    }
}
function Login($email, $password, $rol){
    //connect using the connection function
    $conn = connect();
    $sql = "CALL IniciarSesion('$email', '$password', '$rol')";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $result = $stmt->fetchAll();
    //if the user is found, return the user
    if (count($result) > 0){
        close_connection();
        $user = array();
        $user['IDUsuario'] = $result[0]['IDUsuario'];
        $user['Foto'] = $result[0]['Foto'];
        $user['Apellidos'] = $result[0]['Apellidos'];
        $user['Nombre'] = $result[0]['Nombre'];
        $user['Sexo'] = $result[0]['Sexo'];
        $user['Direccion'] = $result[0]['Direccion'];
        $user['Correo'] = $result[0]['Correo'];
        $user['Contrasena'] = $result[0]['Contrasena'];
        $user['Rol'] = $result[0]['Rol'];  
        $user['Status'] = $result[0]['Status'];
        return $user;
    }
    //if the user is not found, return null
    close_connection();
    return null;
}

#endregion

#region Productos
function obtainCardsPage($page) {
    try {
        $conn = connect();
        $sql = "CALL GetProductosPaginados(:page)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':page', $page, PDO::PARAM_INT);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Handle error
        echo "Error: " . $e->getMessage();
        $result = [];
    } finally {
        close_connection();
    }
    return $result;
}

function obtainProduct($id){
    try {
        $conn = connect();
        $sql = "CALL GetProducto(:id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Handle error
        echo "Error: " . $e->getMessage();
        $result = [];
    } finally {
        close_connection();
    }
    return $result;
}

function obtainProductPictures($id){
    try {
        $conn = connect();
        $sql = "CALL GetMultimediaByID(:id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Handle error
        echo "Error: " . $e->getMessage();
        $result = [];
    } finally {
        close_connection();
    }
    return $result;
}
#endregion
#region Comentarios
function obtainComments($id){
    try {
        $conn = connect();
        $sql = "CALL GetComentarios(:id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        // Handle error
        echo "Error: " . $e->getMessage();
        $result = [];
    } finally {
        close_connection();
    }
    return $result;
}

function createComment($id, $comentario, $calificacion, $idUsuario){
    $result = false;
    try {
        $conn = connect();
        $sql = "CALL InstertarComentario(:id, :idUsuario, :comentario, :calificacion)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':comentario', $comentario, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':calificacion', $calificacion, PDO::PARAM_INT);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = true;
    } catch (PDOException $e) {
        // Handle error
        echo "Error: " . $e->getMessage();
    } finally {
        close_connection();
        return $result;
    }
}

#endregion
#region Listas
function getListasUsuario($id){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetListasUsuario(:id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


       //if we have a result, return it
        if (count($result) > 0){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No lists found';
        }
    } catch (PDOException $e) {
        // Handle error
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    } 
}
function createList($id, $nombre, $descripcion, $status){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL InsertarLista(:idUsuario, :nombre, :descripcion, :status)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $id, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR_CHAR);
        $stmt->execute();

        //if there were no mistakes, return the success message
        $resultado['data'] = 'List created';

    } catch (PDOException $e) {
        // Handle error
        $resultado['success'] = false;
        $resultado['errorCode'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    } 
}
#endregion
function blobToBase64($blob){
    return base64_encode($blob);
}
