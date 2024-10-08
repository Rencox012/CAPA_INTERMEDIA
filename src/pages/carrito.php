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
        <div class="w-full p-12 flex h-full">
            <div class="flex flex-col w-4/6 justify-start items-start" id="Carrito-objects">
                <span class="text-white text-2xl font-semibold mt-10">Carrito de compras</span>
                <div id="Carrito-objetos-container">

                </div>
            </div>
            <div 
            class="flex flex-col justify-start items-center w-2/6 bg-zinc-900"
            id="Metodos-Pago">
                <span class="text-white text-center text-2xl font-semibold mt-10">Métodos de pago</span>
                <div
                class="flex flex-row gap-3 justify-start items-center mt-10"
                >
                    <button
                    class="w-full h-full p-2 mt-2 bg-zinc-500 hover:bg-zinc-300 hover:scale-110 transition-all duration-300 rounded-lg"
                    >
                    Tarjeta de crédito
                    </button>
                    <div id="paypal-button-container"></div>
                    <p id="result-message"></p>
                </div>

                <div class="flex flex-col justify-start items-center mt-10" id="tarjeta-credito">
                    <span class="text-white text-center text-xl font-semibold">Tarjeta de crédito</span>
                    <label for="NumeroTarjeta" class="text-white">Numero de tarjeta</label>
                    <input type="text" class="w-full p-2 mt-2" placeholder="Número de tarjeta" id="NumeroTarjeta">
                    <label for="NombreTitular" class="text-white">Nombre del titular</label>
                    <input type="text" class="w-full p-2 mt-2" placeholder="Nombre del titular" id="NombreTitular">
                    <label for="FechaVencimiento" class="text-white mt-4">Fecha de vencimiento</label>
                    <div
                    class="flex justify-between items-center w-full pb-5"
                    >
                        <label for="" class="text-white pr-1">Dia</label>
                        <input type="text" class="w-2/6 p-2 mt-2" placeholder="Dia" id="Dia">
                        <label for="" class="text-white">Mes</label>
                        <input type="text" class="w-2/6 p-2 mt-2" placeholder="Mes" id="Mes">
                    </div>
                    
                    <label for="CCV" class="text-white">Código de seguridad</label>
                    <input type="text" class="w-4/6 p-2 mt-2" placeholder="Código de seguridad" id="CCV">
                </div>

                <div class="flex flex-col justify-start items-center mt-10">
                    <span class="text-white text-center text-xl font-semibold">Total</span>
                    <span class="text-white text-center text-xl font-semibold" id="total">0</span>
                </div>
                    
            </div>

        </div>

    </main>

    <script type="module">
    import {assignFunctions} from "../components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
    </script>
    
 <!-- Initialize the JS-SDK -->

    <script
        src="https://www.paypal.com/sdk/js?client-id=test&buyer-country=US&currency=USD&components=buttons&enable-funding=venmo"
        data-sdk-integration-source="developer-studio"
    ></script>

    <script src="../utility/paypal/app.js"></script>
</body>
</html>