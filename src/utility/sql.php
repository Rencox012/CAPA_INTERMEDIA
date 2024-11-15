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
function Register($name, $apellidos, $genero, $direccion, $password, $email, $rol, $foto, $publico) {
    // Connect using the connection function
    $conn = connect();
    
    // Prepare the SQL statement with placeholders
    $sql = "CALL InsertarUsuario(:email, :name, :apellidos, :password, :rol, :genero, :direccion, :foto, :publico)";
    
    try {
        // Prepare the statement
        $stmt = $conn->prepare($sql);

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
        $stmt->bindParam(':publico', $publico);
        
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

function getUsuarioCompras ($idUsuario){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetUsuarioCompras(:idUsuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result= $stmt->fetchAll(PDO::FETCH_ASSOC);

        //If we have a result, return it
        if (count($result) > 0){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No purchases found';
        }
        //if
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
function getUsuarioFoto($idUsuario){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetUsuarioFoto(:idUsuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No picture found';
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
function getBusquedaVendedores($query,$page){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetBusquedaVendedores(:query, :page)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':query', $query, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':page', $page, PDO::PARAM_INT);
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
            $resultado['errorText'] = 'No sellers found';
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
function getPaginasVendedores($query){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetPaginasVendedores(:query)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':query', $query, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No pages found';
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
function getBusquedaCompradores($query, $page){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetBusquedaCompradores(:query, :page)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':query', $query, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':page', $page, PDO::PARAM_INT);
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
            $resultado['errorText'] = 'No buyers found';
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
function getPaginasCompradores($query){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetPaginasCompradores(:query)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':query', $query, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No pages found';
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
function getUserInfo($idUsuario){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetUserInfo(:idUsuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No user found';
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
function updateUserInfo($idUsuario, $foto, $correo, $nombre, $apellidos, $direccion){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the connection
    $conn = connect();
    try{
        //prepare the transaction
        $conn->beginTransaction();
        $sql = "CALL UpdateUsuarioInfo(:idUsuario, :foto, :correo, :nombre, :apellidos, :direccion)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        //Check if the photo is already encoded in base 64 or if it is a blob file, if it is a blob, encode it, otherwise, just send it
        if(!isBase64($foto)){
            $foto = base64_encode($foto);
        }
        $stmt->bindParam(':foto', $foto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':correo', $correo, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':apellidos', $apellidos, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':direccion', $direccion, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there are no errors, return the success message
        $resultado['data'] = 'User updated';
        $resultado['code'] = 200;
    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
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

function getProductPicture($id){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetFotoProducto(:id)";
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
            $resultado['errorText'] = 'No pictures found';
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

function insertProducto($idUsuario, $nombre, $cantidad, $descripcion, $precio, $portada, $tipo){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'Text' => null
    ];
    $conn = connect();
    try{
        $conn->beginTransaction();
        $sql = "CALL InsertarProducto(:idUsuario, :nombre, :cantidad, :descripcion, :precio, :portada, :tipo)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':precio', $precio, PDO::PARAM_STR_CHAR);
        if ( is_string($portada)) {
            $portada64 = blobToBase64($portada);
            $stmt->bindParam(':portada', $portada64, PDO::PARAM_STR_CHAR);
        } else {
            throw new InvalidArgumentException("Invalid portada value.");
        }
        $stmt->bindParam(':portada', $portada64, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':tipo', $tipo, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $resultado['data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $resultado['data'] = $resultado['data'][0]['IDProducto'];
        $resultado['code'] = 200;
        $stmt->closeCursor();
        $conn->commit();


    } catch (PDOException $e) {
        // Handle error
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['Text'] = $e->getMessage();
        $conn->rollBack();

    } finally {
        close_connection();
        return $resultado;
    }
}

function insertMultimedia($idProducto, $categoria, $archivo){
    $resultado =[
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the connection
    $conn = connect();
    try{
        //prepare the transaction
        $conn->beginTransaction();
        $sql = "CALL InsertarMultimedia(:idProducto, :categoria, :archivo)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':categoria', $categoria, PDO::PARAM_STR_CHAR);
        //If the categoria is Foto, we need to turn the file into a base64 string
        if ($categoria == 'Foto'){
            $archivo = base64_encode($archivo);
        }
        $stmt->bindParam(':archivo', $archivo, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there are no errors, return the success message
        $resultado['data'] = 'Multimedia inserted';
        $resultado['code'] = 200;
    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }

}

function getExistencias($idProducto){
    $resultado =[
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetExistencias(:idProducto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if (count($result) > 0){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No stock found';
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

function getProductosPendientes(){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetProductosPendientes()";
        $stmt = $conn->prepare($sql);
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
            $resultado['text'] = 'No products found';
        }
    } catch (PDOException $e) {
        // Handle error
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}

function updateProductoStatus($idProducto,$status,$idUsuario){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the connection
    $conn = connect();
    try{
        //prepare the transaction
        $conn->beginTransaction();
        $sql = "CALL UpdateProductoStatus(:idProducto, :status, :idUsuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there are no errors, return the success message
        $resultado['data'] = 'Status updated';
        $resultado['code'] = 200;
    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}
function getNombreProducto($idProducto){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetNombreProducto(:idProducto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No product found';
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
function getExisteCompra($idUsuario, $idProducto){
    $resultado =[
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetExisteCompra(:idUsuario, :idProducto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //return the result
        $resultado['data'] = $result;
        $resultado['code'] = 200;
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
function getBusquedaProductos($query, $filtro, $pagina){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetBusquedaProductos(:query, :pagina, :filtro)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':query', $query, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':filtro', $filtro, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':pagina', $pagina, PDO::PARAM_INT);
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
            $resultado['errorText'] = 'No products found';
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
function getPaginasProductosBusqueda($query){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetPaginasProductosBusqueda(:query)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':query', $query, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No pages found';
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
function getBusquedaServicios($query, $filtro, $pagina){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetBusquedaServicios(:query, :pagina, :filtro)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':query', $query, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':filtro', $filtro, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':pagina', $pagina, PDO::PARAM_INT);
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
            $resultado['errorText'] = 'No services found';
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
function getPaginasServiciosBusqueda($query){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetPaginasServiciosBusqueda(:query)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':query', $query, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No pages found';
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
function getVentasUsuario($idUsuario){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetVentasUsuario(:idUsuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
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
            $resultado['errorText'] = 'No sales found';
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
function getProductosUsuario($idUsuario){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetProductosUsuario(:idUsuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
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
            $resultado['errorText'] = 'No products found';
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
function updateProducto($idProducto, $cantidad, $precio){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the connection
    $conn = connect();
    try{
        //prepare the transaction
        $conn->beginTransaction();
        $sql = "CALL UpdateProducto(:idProducto, :cantidad, :precio)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
        $stmt->bindParam(':precio', $precio, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there are no errors, return the success message
        $resultado['data'] = 'Product updated';
        $resultado['code'] = 200;
    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}
function deleteProducto($idProducto){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    $conn = connect();
    try{
        $conn->beginTransaction();
        $sql = "CALL DeleteProducto(:idProducto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        $resultado['data'] = 'Product deleted';
        $resultado['code'] = 200;
    } catch (PDOException $e) {
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
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
function getListasOtroUsuario($id){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetListasOtroUsuario(:id)";
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

function insertProductoLista($idLista, $idProducto, $cantidad){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {
        //prepare the transaction
        $conn = connect();
        $conn->beginTransaction();
        $sql = "CALL InsertarProductoLista(:idLista, :idProducto, :cantidad)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idLista', $idLista, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Product added to list';

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['errorCode'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}

function getProductoExisteLista($idLista, $idProducto){
    $resultado =[
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];

    try {
        $conn = connect();
        $sql = "CALL GetProductoExisteLista(:idLista, :idProducto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idLista', $idLista, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //Log the recieved data and what we are comparing to log.txt
        $log = fopen('log.txt', 'a');
        fwrite($log, "Data: ".json_encode($result)."\n");
        fwrite($log, "Comparing to: ".json_encode($idProducto)."\n");
        fclose($log);




        //If the result is not empty, return true
        if ($result['Existe'] == null || $result['Existe'] == "null"){

            $resultado['data'] = $result;
        } else {
            $resultado['success'] = false;
            $resultado['data'] = $result;
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

function getProductosLista($idLista){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetProductosLista(:idLista)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idLista', $idLista, PDO::PARAM_STR_CHAR);
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
            $resultado['errorText'] = 'No products found';
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
function deleteProductoLista($idElemento){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL DeleteProductoLista(:idElemento)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idElemento', $idElemento, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Element deleted';
        $resultado['code'] = 200;

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}
#endregion
#region Carrito
function getCarrito($idUsuario){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetUsuarioCarrito(:idUsuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No cart found';
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
function insertCarritoElement($IDCarrito, $IDProducto, $cantidad){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL InsertarElementoCarrito(:IDCarrito, :IDProducto, :cantidad)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':IDCarrito', $IDCarrito, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':IDProducto', $IDProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Element added to cart';

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['errorCode'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}

function getCarritoProductos($idCarrito){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetProductosCarrito(:idCarrito)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idCarrito', $idCarrito, PDO::PARAM_STR_CHAR);
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
            $resultado['errorText'] = 'No products found';
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

function updateCantidadCarrito($idElemento, $cantidad){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL UpdateCantidadCarrito(:idElemento, :cantidad)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idElemento', $idElemento, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Element updated';


    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['errorCode'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    } 
}

function deleteElementoCarrito($idElemento){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL DeleteElementoCarrito(:idElemento)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idElemento', $idElemento, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Element deleted';

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['errorCode'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    } 
}

function insertarTransaccion ($idElemento, $idProducto, $cantidad, $idUsuario, $total, $metodoPago){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL InsertarTransaccion(:idElemento, :idProducto, :cantidad, :idUsuario, :total, :metodoPago)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idElemento', $idElemento, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':total', $total, PDO::PARAM_INT);
        $stmt->bindParam(':metodoPago', $metodoPago, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Transaction added';

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['errorCode'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    } 
}



#endregion
#region Categorias

function getCategorias(){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];

    try {
        $conn = connect();
        $sql = "CALL GetCategorias()";
        $stmt = $conn->prepare($sql);
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
            $resultado['errorText'] = 'No categories found';
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
function getCategoriasActivoas(){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];

    try {
        $conn = connect();
        $sql = "CALL GetCategoriasActivas()";
        $stmt = $conn->prepare($sql);
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
            $resultado['errorText'] = 'No categories found';
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
function getCategoriasProducto($idProducto){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];

    try {
        $conn = connect();
        $sql = "CALL GetCategoriasProducto(:idProducto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
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
            $resultado['errorText'] = 'No categories found';
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
function insertCategoriasProducto($idProducto, $idCategoria){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL InsertarCategoriasProducto(:idProducto, :idCategoria)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idCategoria', $idCategoria, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Category added to product';
        $resultado['code'] = 200;

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['errorCode'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }

}
function insertCategoria($idUsuario, $nombre, $descripcion){
    $resultado = [
        'success' => true,
        'data' => [],
        'errorCode' => null,
        'errorText' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL InsertarCategoria(:idUsuario, :nombre, :descripcion)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        //if there were no mistakes, the sp will return the ID of the cateogry
        $resultado['data'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        //only send the elemt 0 of the array
        $resultado['data'] = $resultado['data'][0]['IDCategoria'];
        $resultado['code'] = 200;
        $stmt->closeCursor(); // Close the cursor to free up the connection to execute the next query
        $conn->commit();

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['errorCode'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}
function getExisteCategoria($nombre){
    $resultado =[
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];

    try {
        $conn = connect();
        $sql = "CALL GetExisteCategoria(:nombre)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

       //it will return a 1 if it exists, or a 0 if it doesn't
        $resultado['data'] = $result;
        $resultado['code'] = 200;
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
function updateStatusCategoria($idCategoria, $status){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL UpdateStatusCategoria(:idCategoria, :status)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idCategoria', $idCategoria, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Category status updated';
        $resultado['code'] = 200;

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['errorText'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}
#endregion#
#region Conversaciones
function insertConversacion($idVendedor, $idComprador, $idProducto){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL InsertarConversacion(:idVendedor, :idComprador, :idProducto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idVendedor', $idVendedor, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idComprador', $idComprador, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Conversation created';
        $resultado['code'] = 200;

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}
function getConversacionesUsuario($idUsuario){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetConversacionesUsuario(:idUsuario)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
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
            $resultado['errorText'] = 'No conversations found';
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
function getMensajesConversacion($idConversacion){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];
    try {
        $conn = connect();
        $sql = "CALL GetMensajesConversacion(:idConversacion)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idConversacion', $idConversacion, PDO::PARAM_STR_CHAR);
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
            $resultado['errorText'] = 'No messages found';
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
function insertMensaje($idEmisor,$idConversacion, $texto){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL InsertarMensaje(:idEmisor, :idConversacion, :texto)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idEmisor', $idEmisor, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idConversacion', $idConversacion, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':texto', $texto, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Message sent';
        $resultado['code'] = 200;

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}

#endregion
#region Cotizaciones
function insertCotizacion($idConversacion, $idProducto, $precio, $detalles, $cantidad){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL InsertarCotizacion(:idConversacion, :idProducto, :precio, :detalles, :cantidad)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idConversacion', $idConversacion, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':precio', $precio, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':detalles', $detalles, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Quotation sent';
        $resultado['code'] = 200;

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}
function updateCotizacion($idCotizacion, $status, $idUsuario, $idProducto, $cantidad, $precio){
    $resultado = [
        'success' => true,
        'data' => [],
        'code' => null,
        'text' => null
    ];
    //prepare the transaction
    $conn = connect();
    try {

        $conn->beginTransaction();
        $sql = "CALL UpdateCotizacion(:idCotizacion, :status, :idUsuario, :idProducto, :cantidad, :precio)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idCotizacion', $idCotizacion, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':status', $status, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idUsuario', $idUsuario, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':idProducto', $idProducto, PDO::PARAM_STR_CHAR);
        $stmt->bindParam(':cantidad', $cantidad, PDO::PARAM_INT);
        $stmt->bindParam(':precio', $precio, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $conn->commit();
        //if there were no mistakes, return the success message
        $resultado['data'] = 'Quotation updated';
        $resultado['code'] = 200;

    } catch (PDOException $e) {
        // Handle error
        $conn->rollBack();
        $resultado['success'] = false;
        $resultado['code'] = 500;
        $resultado['text'] = $e->getMessage();
    } finally {
        close_connection();
        return $resultado;
    }
}
function getExisteCotizacion($idConversacion){
    $resultado =[
        'success' => true,
        'data' => [],
        'code' => null,
        'errorText' => null
    ];

    try {
        $conn = connect();
        $sql = "CALL GetExisteCotizacion(:idConversacion)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':idConversacion', $idConversacion, PDO::PARAM_STR_CHAR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        //if we have a result, return it
        if ($result){
            $resultado['data'] = $result;
            $resultado['success'] = true;
            $resultado['code'] = 200;
        } else {
            //if we don't have a result, return an empty array
            $resultado['success'] = true;
            $resultado['code'] = 201;
            $resultado['errorText'] = 'No quotation found';
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
#endregion
function blobToBase64($blob): string
{
    return base64_encode($blob);
}
function isBase64($string): bool
{
    //check if the element passed is already encoded in base64
    if (base64_encode(base64_decode($string, true)) === $string){
        return true;
    } else {
        return false;
    }
}
