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
        register: function (foto, nombre, apellidos, sexo, direccion, email, contrasena, rol) {
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
            // Send the FormData object to the server
            return fetch('/CAPA_INTERMEDIA/src/server/users.php/register', {
                method: 'POST',
                body: formData
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
    }
    
};

export default api;