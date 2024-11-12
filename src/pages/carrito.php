<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrito</title>
    <link href="../output.css" rel="stylesheet">

</head>
<body class = "bg-page-background h-screen overflow-y-scroll">
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

    <main class="h-full">
        <div class="w-full p-12 flex h-full">
            <div class="flex flex-col w-full justify-start items-start mx-8" id="Carrito-objects">
                <span class="text-white text-2xl font-semibold mt-10">Carrito de compras</span>
                <div id="Carrito-objetos-container" class="w-full mx-2">
                    <!-- Aquí se insertarán los objetos del carrito -->
                    <script type="module">
                        import ProductoWrapper from "../components/ui/carrito/Producto-wrapper.js";
                        import {assignListeners}from "../components/ui/carrito/Producto-wrapper.js"
                        const objetosContainer = document.getElementById('Carrito-objetos-container');

                        // Obtener los productos del carrito
                        const productos = await ProductoWrapper().render();
                        objetosContainer.innerHTML = productos;

                        assignListeners();

                        import MetodosPago from "../components/ui/carrito/Metodos-pago.js";
                        import {assignListeners as assignListenersMetodo}  from "../components/ui/carrito/Metodos-pago.js";
                        const metodosPago = await MetodosPago().render();
                        const metodosPagoContainer = document.getElementById('Metodos-Pago');
                        metodosPagoContainer.innerHTML = metodosPago;
                        assignListenersMetodo();

                        // Initialize the PayPal JS-SDK after the main content is loaded
                        const script = document.createElement('script');
                        script.src = "https://www.paypal.com/sdk/js?client-id=test&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo";
                        script.setAttribute('data-sdk-integration-source', 'developer-studio');
                        document.body.appendChild(script);

                        script.onload = () => {
                            import("../utility/paypal/app.js");
                        };
                    </script>

                </div>
            </div>
            <div
            class="flex flex-col p-2 justify-start items-center w-2/6 bg-zinc-900 overflow-y-scroll overflow-x-visible"
            id="Metodos-Pago">
            </div>

        </div>

    </main>

    <script type="module">
    import {assignFunctions} from "../components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
    </script>




</body>
</html>