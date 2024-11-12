
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aprovar productos</title>
    <link href="../output.css" rel="stylesheet">
    <script type="module">
        //Before the page loads, check if the user is logged in and admin
        import auth from "../utility/middleware/auth.js";

        if(!auth().isAdmin()){
            //If the user is not an admin, redirect them to the landing page
            window.location.href = "../index.php";
        }

    </script>
</head>
<body class="bg-page-background h-full text-white">
    <div id="navbar-container">
        <script type="module">
            import NavBar from "../components/ui/NavBarLanding.js";
            import NavBarMobile from "../components/ui/NavBarLanding-Mobile.js"
            import {assignFunctions} from "../components/ui/NavBarLanding.js";


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
                assignFunctions();
            }
        </script>
    </div>

    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Panel de Administración</h1>

        <!-- Sección de Aprobación de Productos -->
        <section class="mb-12">
            <h2 class="text-2xl font-semibold mb-4">Aprobación de Productos</h2>
            <div id="productGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Las tarjetas de productos se insertarán aquí dinámicamente -->
                <script type="module">
                    import productosAprovar from "../components/ui/admin/productos-aprobar.js";
                    import {assignEvents} from "../components/ui/admin/productos-aprobar.js";

                    const productGrid = document.getElementById('productGrid');
                    productGrid.innerHTML = await productosAprovar().render();
                    assignEvents();
                </script>
            </div>
        </section>

        <!-- Sección de Categorías -->
        <section>
            <h2 class="text-2xl font-semibold mb-4">Categorías Disponibles</h2>
            <div id="categoryList" class="space-y-4">
                <!-- Las categorías se insertarán aquí dinámicamente -->
                <script type="module">
                    import categories from "../components/ui/admin/categoriesAdmin.js";
                    import {assignEvents} from "../components/ui/admin/categoriesAdmin.js";

                    const categoryList = document.getElementById('categoryList');
                    categoryList.innerHTML = await categories().render();
                    assignEvents();
                </script>
            </div>
        </section>
        <!-- Seccion solo disponible para el rol de superAdmin. Creacion de nuevos administradores -->
        <section>
            <h2 id="superAdmin" class="text-2xl font-semibold mb-4">Crear nuevo administrador</h2>
            <div id="newAdmin" class="space-y-4">
                <!-- Formulario para crear un nuevo administrador -->
                <script type="module">
                    import newAdminForm from "../components/ui/admin/newAdmin.js"
                    import {assignEvents} from "../components/ui/admin/newAdmin.js";

                    const newAdmin = document.getElementById('newAdmin');
                    newAdmin.innerHTML = await newAdminForm().render();

                    assignEvents();


                </script>
        </section>
    </div>
</body>