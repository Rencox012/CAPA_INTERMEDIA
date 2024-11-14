
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil Comprador</title>
    <link href="../output.css" rel="stylesheet">
</head>
<body class="bg-page-background h-full">

<!-- Modal to create a new list, it will be hidden by default -->
<div id="modal" class="hidden fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                            Crear nueva lista
                        </h3>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                Ingresa el nombre de la lista que deseas crear
                            </p>
                        </div>
                        <div class="mt-2">
                            <label for="list-name">Lista</label><input type="text" required id="list-name" class="w-full border border-gray-300 p-2 rounded-md" placeholder="Nombre de la lista">
                        </div>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                Ingresa una descripción para la lista
                            </p>
                        </div>
                        <div class="mt-2">
                            <input type="text" required id="list-description" class="w-full border border-gray-300 p-2 rounded-md" placeholder="Descripción de la lista">
                        </div>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">
                                Privacidad
                            </p>
                        </div>
                        <div class="mt-2">
                            <select id="list-privacy" class="w-full border border-gray-300 p-2 rounded-md">
                                <option value="publica">Pública</option>
                                <option value="privada">Privada</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button id="create-list" class="w-full bg-black inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm">
                    Crear
                </button>
                <button id="close-modal" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancelar
                </button>
            </div>
        </div>
    </div>
</div>

!<-- Modal to modify an item, it only works with vendedores -->
<div id ="modal-modificar" class = "hidden fixed z-10 inset-0 overflow-y-hidden">

</div>





<div id="navbar-container">
    <script type="module">
        import NavBar from "../components/ui/NavBarLanding.js";
        import NavBarMobile from "../components/ui/NavBarLanding-Mobile.js";

        //if the user is on mobile, render the mobile navbar
        if (window.innerWidth <= 768) {
            const navbarContainer = document.getElementById('navbar-container');
            const navbar = NavBarMobile().render();
            navbarContainer.innerHTML = navbar;
        }
        else{
            const navbarContainer = document.getElementById('navbar-container');
            const navbar = NavBar().render();
            navbarContainer.innerHTML = navbar;
        }
    </script>
</div>

    <main class="h-full">
        <div
        id="Perfil-display"
        class="flex flex-row w-full h-screen justify-start items-start mt-2 mr-2 ml-2 px-24 pt-12 pb-4"
        >
        <script type="module">
            import PerfilDisplay from "../components/ui/Perfil-display.js";
            import auth from "../utility/middleware/auth.js";
            import {assignFunctions as FuncionesFiltrosProductos} from "../components/ui/perfil-tabs/productos.js";
            import {assignFunctions as FuncionesModalModificarProducto} from "../components/ui/perfil-tabs/productos-wrapper.js"
            import {assignFunctions as FuncionesDatosUsuario} from "../components/ui/Datos-usuario.js"
            import {assignEvents as FuncionesWishlistsEventos} from "../components/ui/WishList-wrapper.js";

            if(!auth().isLoggedIn()){
                window.location.href = './login.php';
            }

            const perfilContainer = document.getElementById('Perfil-display');
            const perfil = await PerfilDisplay().render();
            perfilContainer.innerHTML = perfil;
            import {assignFunctions} from "../components/ui/Perfil-display.js"
            assignFunctions();
            import {assignProfileFunctions} from "../components/ui/Wishlists-Display.js";
            assignProfileFunctions();
            import {assignFunctions as functionsWishList} from "../components/ui/Wishlists-Display.js";
            functionsWishList();
            import {assignFunctions as FuncionesModal} from "../components/ui/ListasDropdown.js";
            FuncionesModal();
            import {assignFunctions as FuncionesFiltros} from "../components/ui/perfil-tabs/ventas.js";
            FuncionesFiltros();
            FuncionesFiltrosProductos();
            FuncionesModalModificarProducto();
            FuncionesDatosUsuario();
            FuncionesWishlistsEventos();
            
        </script>
        </div>
    </main>
    


<script type="module">
    import {assignFunctions} from "../components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
</script>

<script>
        //script to hide the modal when the user clicks outside of it or the cancel button
        const modal = document.getElementById('modal');
        const closeModal = document.getElementById('close-modal');

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.classList.add('hidden');
            }
        }

        closeModal.onclick = function() {
            modal.classList.add('hidden');
        }
    </script>

    <script type = "module">
        import api from "../api/api.js";
        import { User } from "../utility/classes/user.js";
        //script to handle the creation of a new list from the modal
        const createList = document.getElementById('create-list');
        const listName = document.getElementById('list-name');
        const listDescription = document.getElementById('list-description');
        const listPrivacy = document.getElementById('list-privacy');
        const user = User.load()

        //if the name or description are empty, show an alert
        createList.onclick = async function() {
            if (listName.value === '' || listDescription.value === '') {
                alert('Por favor ingresa un nombre y descripción para la lista');
            } else {
                const response = await api.lists.createList(user.uid, listName.value, listDescription.value, listPrivacy.value);

                //if the response is 200, reload the page
                if (response.status === 200) {
                    alert('Lista creada exitosamente');
                    location.reload();
                } else {
                    alert('Hubo un error al crear la lista');
                }
            }
        }
    </script>
</body>
</html>