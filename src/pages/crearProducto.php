<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Crear producto</title>
        <link href="../output.css" rel="stylesheet">
    </head>
    <body class="bg-page-background h-full text-gray-200 min-h-screen p-4">
        <div id="navbar-container">
            <script type="module">
                import NavBar from "../components/ui/NavBarLanding.js";
                import NavBarMobile from "../components/ui/NavBarLanding-Mobile.js";
                //if the user is on mobile, render the mobile navbar
                if (window.innerWidth <= 768) {
                    const navbarContainer = document.getElementById('navbar-container');
                    navbarContainer.innerHTML = NavBarMobile().render();
                }
                else{
                    const navbarContainer = document.getElementById('navbar-container');
                    navbarContainer.innerHTML = NavBar().render();
                }
            </script>
        </div>

        <div id="form-container" class="max-w-4xl mx-auto bg-dark-200 rounded-lg shadow-xl p-6">
            <h1 class="text-2xl text-white font-bold mb-6">Crear Nueva Publicación</h1>
            <script type="module">
                import creationForm from "../components/ui/creacion-Producto/creation-Form.js";
                import {addListeners} from "../components/ui/creacion-Producto/creation-Form.js";

                const formContainer = document.getElementById('form-container');
                const form = await creationForm().render();
                formContainer.innerHTML = form;

                addListeners();

            </script>
        </div>

    <div id = "modal-creacCategoria"
         class = "hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div class = "bg-dark-200 p-4 rounded-lg">
            <h1 class = "text-2xl text-white font-bold mb-4">Crear Nueva Categoría</h1>
            <label for="nombre-categoria" class = "text-white">Nombre de la categoría</label>
            <input type = "text" id = "nombre-categoria" class = "bg-gray-800 text-white p-2 rounded-lg w-full mb-4" placeholder = "Nombre de la categoría">
            <label for="descripcion-categoria" class = "text-white">Descripción de la categoría</label>
            <input type="text" id="descripcion-categoria" class = "bg-gray-800 text-white p-2 rounded-lg w-full mb-4" placeholder = "Descripcion de la categoría">
            <button id = "crear-categoria" class = "bg-blue-500 text-white p-2 rounded-lg">Crear</button>
            <button id = "cerrar-modal" class = "bg-red-500 text-white p-2 rounded-lg">Cerrar</button>
        </div>
    </div>



        <script type="module">
            import api from "../api/api.js";
            import {User} from "../utility/classes/User.js";
            import auth from "../utility/middleware/auth.js";

            if(!auth().isVendedor()){
                window.location.href = '../index.php';
            }

            function handleCloseModal(){
                const modal = document.getElementById('modal-creacCategoria');
                const cerrarModal = document.getElementById('cerrar-modal');
                cerrarModal.addEventListener('click', () => {
                    modal.classList.add('hidden');
                });
            }
            async function getCategoriaExiste(nombre) {
                const response = await api.categories.getCategoriaExiste(nombre);
                if (response.status === 200) {
                    const data = await response.json();
                    return data.Existe;
                }
                else{
                    return null;
                }
            }
            async function handleCreateCategory(){
                //get the creat button
                const crearCategoria = document.getElementById('crear-categoria');
                //attach the event listener
                crearCategoria.addEventListener('click', async () => {
                    //get the name and description of the category
                    const nombreCategoria = document.getElementById('nombre-categoria').value;
                    const descripcionCategoria = document.getElementById('descripcion-categoria').value;

                    //if the name or description are empty, show an error message
                    if(nombreCategoria === '' || descripcionCategoria === ''){
                        alert('Por favor llene todos los campos');
                        return;
                    }
                    //Validate that the category doesn't exist already
                    const exists = await getCategoriaExiste(nombreCategoria);
                    if(exists === null){
                        alert('Error al verificar si la categoría existe');
                        return;
                    }
                    //If it exists the api will return a 1, if it does, display a message and return
                    if(exists >= 1){
                        alert('La categoría ya existe');
                        return;
                    }
                    //create the category
                    const usuario = User.load();
                    const response = await api.categories.insertCategory(nombreCategoria, descripcionCategoria, usuario.uid);
                    //if the category was created successfully
                    if(response.status === 200){
                        const categoryID =  await response.json();
                        //show a message
                        alert('Categoría creada exitosamente');
                        //get the categorias select and we insert the new category
                        const categoriasSelect = document.getElementById('categorySelect');
                        const option = document.createElement('option');
                        option.value = categoryID;
                        option.text = nombreCategoria;
                        categoriasSelect.appendChild(option);
                        //close the modal
                        const modal = document.getElementById('modal-creacCategoria');
                        modal.classList.add('hidden');
                        //clean the inputs
                        document.getElementById('nombre-categoria').value = '';
                        document.getElementById('descripcion-categoria').value = '';
                    }else{
                        //show an error message
                        alert('Error al crear la categoría');
                    }
                });

            }


            handleCloseModal();
            handleCreateCategory();
        </script>
    </body>
</html>