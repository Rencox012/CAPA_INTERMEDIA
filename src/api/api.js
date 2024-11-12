//API to handle all posible requests to the server
const api = {
    users: {
        login: function(email, password, rol){
            return fetch('/CAPA_INTERMEDIA/src/server/users.php/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    rol: rol
                })
            });
        },
        register: function (foto, nombre, apellidos, sexo, direccion, email, contrasena, rol, privacity) {
            // Create a FormData object
            const formData = new FormData();
            // Append the data to the FormData object
            formData.append('foto', foto);
            formData.append('nombre', nombre);
            formData.append('apellidos', apellidos);
            formData.append('sexo', sexo);
            formData.append('direccion', direccion);
            formData.append('email', email);
            formData.append('contrasena', contrasena);
            formData.append('rol', rol);
            formData.append('privacidad', privacity);
            // Send the FormData object to the server
            return fetch('/CAPA_INTERMEDIA/src/server/users.php/register', {
                method: 'POST',
                body: formData
            });
        },
        getUsuarioCompras: function (idUsuario){
            return fetch(`/CAPA_INTERMEDIA/src/server/users.php/getUsuarioCompras?id=${idUsuario}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getUsuarioFoto: async function (idUsuario){
            return fetch(`/CAPA_INTERMEDIA/src/server/users.php/getUsuarioFoto?id=${idUsuario}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getBusquedaVendedores: async function (query, page){
            return fetch(`/CAPA_INTERMEDIA/src/server/users.php/getBusquedaVendedores?query=${query}&pagina=${page}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getPaginasVendedores: async function (query){
            return fetch(`/CAPA_INTERMEDIA/src/server/users.php/getPaginasVendedores?query=${query}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getBusquedaCompradores: async function (query, page){
            return fetch(`/CAPA_INTERMEDIA/src/server/users.php/getBusquedaCompradores?query=${query}&pagina=${page}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getPaginasCompradores: async function (query){
            return fetch(`/CAPA_INTERMEDIA/src/server/users.php/getPaginasCompradores?query=${query}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getUserInfo: async function(id){
            return fetch(`/CAPA_INTERMEDIA/src/server/users.php/getUserInfo?id=${id}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        }
    },
    products: {
        getCardsPage: async function(page){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/cards?page=${page}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                    
                
        },
        getProducto: async function(id){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/producto?id=${id}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getProductPictures: async function(id){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/pictures?id=${id}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getProductPicture: async function(id){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getProductPicture?id=${id}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        insertProducto: async function (idUsuario, nombre, cantidad, descripcion, precio, portada, tipo){
            //Prepare a form data to send the blob of the image along with the rest of the data
            const formData = new FormData();
            formData.append('idUsuario', idUsuario);
            formData.append('nombre', nombre);
            formData.append('cantidad', cantidad);
            formData.append('descripcion', descripcion);
            formData.append('precio', precio);
            formData.append('portada', portada);
            formData.append('tipo', tipo);

            return fetch('/CAPA_INTERMEDIA/src/server/productos.php/insertProducto', {
                method: 'POST',
                body: formData
            }
            );
        },
        insertMultimedia: async function (idProducto, multimedia, tipo){
            const formData = new FormData();
            formData.append('idProducto', idProducto);
            formData.append('multimedia', multimedia);
            formData.append('tipo', tipo);

            return fetch('/CAPA_INTERMEDIA/src/server/productos.php/insertMultimedia', {
                method: 'POST',
                body: formData
            });
        },
        getExistencias: async function (idProducto){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getExistencias?id=${idProducto}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getProductosPendientes: async function(){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getProductosPendientes` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        updateProductoStatus(idProducto, status, idUsuario){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/updateProductoStatus` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idProducto: idProducto,
                        status: status,
                        idUsuario: idUsuario
                    })
                });
        },
        getNombreProducto(idProducto){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getNombreProducto?id=${idProducto}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getExisteCompra(idProducto, idUsuario){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getExisteCompra?idProducto=${idProducto}&idUsuario=${idUsuario}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getBusquedaProductos(query, filtro, pagina){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getBusquedaProductos?query=${query}&filtro=${filtro}&pagina=${pagina}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getPaginasProductosBusqueda(query){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getPaginasProductosBusqueda?query=${query}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getBusquedaServicios(query, filtro, pagina){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getBusquedaServicios?query=${query}&filtro=${filtro}&pagina=${pagina}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getPaginasServiciosBusqueda(query){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getPaginasServiciosBusqueda?query=${query}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getVentasUsuarios(idUsuario){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getVentasUsuario?idUsuario=${idUsuario}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getProductosUsuario(idUsuario){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/getProductosUsuario?idUsuario=${idUsuario}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        updateProducto(idProducto, cantidad, precio){
            return fetch(`/CAPA_INTERMEDIA/src/server/productos.php/updateProducto` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idProducto: idProducto,
                        cantidad: cantidad,
                        precio: precio
                    })
                });
        }
    },
    comments: {
        getComments: async function(id){
            return fetch(`/CAPA_INTERMEDIA/src/server/comentarios.php/obtain?id=${id}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        createComment: async function(id, comment, rating, userID){
            console.log("SENDING COMMENT: ", id, comment, rating, userID);
            return fetch(`/CAPA_INTERMEDIA/src/server/comentarios.php/create?id=${id}` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        comentario: comment,
                        calificacion: rating,
                        idUsuario : userID
                    })
                });
        }
    },
    lists:{
        getListasUsuario: async function(id){
            return fetch(`/CAPA_INTERMEDIA/src/server/listas.php/obtainLists?id=${id}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getListasOtroUsuario: async function(id){
            return fetch(`/CAPA_INTERMEDIA/src/server/listas.php/obtainListsOther?id=${id}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        createList: async function(idUsuario, name, descripcion, privacidad){
            return fetch(`/CAPA_INTERMEDIA/src/server/listas.php/createList` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUsuario: idUsuario,
                        nombre: name,
                        descripcion: descripcion,
                        privacidad: privacidad
                    })
                });
        },
        insertProductoLista: async function (idLista, idProducto, cantidad){
            return fetch(`/CAPA_INTERMEDIA/src/server/listas.php/insertProductoLista` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idLista: idLista,
                        idProducto: idProducto,
                        cantidad: cantidad
                    })
                });
        },
        getProductoExisteLista: async function(idLista, idProducto){
            return fetch(`/CAPA_INTERMEDIA/src/server/listas.php/getProductoExisteLista?idLista=${idLista}&idProducto=${idProducto}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getProductosLista: async function(idLista){
            return fetch(`/CAPA_INTERMEDIA/src/server/listas.php/getProductosLista?id=${idLista}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
    },
    cart:{
        getCart: async function(id){
            return fetch(`/CAPA_INTERMEDIA/src/server/carrito.php/getCart?id=${id}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        InsertarElementoCarrito : async function(idCarrito, idProducto, cantidad){
            return fetch(`/CAPA_INTERMEDIA/src/server/carrito.php/InsertarElementoCarrito` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCarrito: idCarrito,
                        idProducto: idProducto,
                        cantidad: cantidad
                    })
                });
        },
        getProductosCarrito : async function(idCarrito){
            return fetch(`/CAPA_INTERMEDIA/src/server/carrito.php/getProductosCarrito?id=${idCarrito}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        updateCantidadCarrito : async function(idElemento, cantidad){
            return fetch(`/CAPA_INTERMEDIA/src/server/carrito.php/updateCantidadCarrito` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idElemento: idElemento,
                        cantidad: cantidad
                    })
                });
        },
        deleteElementoCarrito : async function(idElemento){
            return fetch(`/CAPA_INTERMEDIA/src/server/carrito.php/deleteElementoCarrito` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idElemento: idElemento
                    })
                });
        },
    },
    transactions:{
        insertTransacction: async function (idElemento, idProducto, cantidad, idUsuario, total, metodoPago){
            return fetch(`/CAPA_INTERMEDIA/src/server/transacciones.php/insertTransaction` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idElemento: idElemento,
                        idProducto: idProducto,
                        cantidad: cantidad,
                        idUsuario: idUsuario,
                        total: total,
                        metodoPago: metodoPago
                    })
                });
        }
    },
    categories: {
        getCategories(){
            return fetch(`/CAPA_INTERMEDIA/src/server/categorias.php/getCategories` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getCategoriasActivas(){
            return fetch(`/CAPA_INTERMEDIA/src/server/categorias.php/getCategoriasActivas` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        getCategoriasProducto: async function (idProducto){
            return fetch(`/CAPA_INTERMEDIA/src/server/categorias.php/getCategoriasProducto?idProducto=${idProducto}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        insertCategoriesProducto: async function (idProducto, idCategoria){
            return fetch(`/CAPA_INTERMEDIA/src/server/categorias.php/insertCategoriesProducto` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idProducto: idProducto,
                        idCategoria: idCategoria
                    })
                });
        },
        getCategoriaExiste: async function (nombre){
            return fetch(`/CAPA_INTERMEDIA/src/server/categorias.php/getCategoriaExiste?nombre=${nombre}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        insertCategory (nombre, descricion, idUsuario){
            return fetch(`/CAPA_INTERMEDIA/src/server/categorias.php/insertCategory` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        descripcion: descricion,
                        idUsuario: idUsuario
                    })
                });
        },
        updateStatusCategoria(idCategoria, status){
            return fetch(`/CAPA_INTERMEDIA/src/server/categorias.php/updateStatusCategoria` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCategoria: idCategoria,
                        status: status
                    })
                });
        },
    },
    conversations:{
        insertConversation: async function (idVendedor, idComprador, idProducto){
            return fetch(`/CAPA_INTERMEDIA/src/server/conversaciones.php/insertConversacion` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idVendedor: idVendedor,
                        idComprador: idComprador,
                        idProducto: idProducto
                    })
                });
            },
        getConversacionesUsuario: async function (idUsuario){
            return fetch(`/CAPA_INTERMEDIA/src/server/conversaciones.php/getConversacionesUsuario?idUsuario=${idUsuario}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        GetMensajesConversacion: async function (idConversacion){
            return fetch(`/CAPA_INTERMEDIA/src/server/conversaciones.php/getMensajesConversacion?idConversacion=${idConversacion}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
        insertMensaje: async function (idUsuario, idConversacion, mensaje){
            return fetch(`/CAPA_INTERMEDIA/src/server/conversaciones.php/insertMensaje` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idUsuario: idUsuario,
                        idConversacion: idConversacion,
                        mensaje: mensaje
                    })
                });
        }
        },
    cotizaciones:{
        insertCotizacion: async function(idConversacion, idProducto, precio, detalles, cantidad){
            return fetch(`/CAPA_INTERMEDIA/src/server/cotizaciones.php/insertCotizacion` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idConversacion: idConversacion,
                        idProducto: idProducto,
                        precio: precio,
                        detalles: detalles,
                        cantidad: cantidad
                    })
                });
        },
        updateCotizacion(idCotizacion, status, idUsuario, idProducto, cantidad, precio){
            return fetch(`/CAPA_INTERMEDIA/src/server/cotizaciones.php/updateCotizacion` ,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        idCotizacion: idCotizacion,
                        status: status,
                        idUsuario: idUsuario,
                        idProducto: idProducto,
                        cantidad: cantidad,
                        precio: precio
                    })
                });
        },
        getExisteCotizacion(idConversacion){
            return fetch(`/CAPA_INTERMEDIA/src/server/cotizaciones.php/getExisteCotizacion?idConversacion=${idConversacion}` ,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
        },
    },
    
};

export default api;