
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil Comprador</title>
    <link href="../output.css" rel="stylesheet">
</head>
<body class="bg-page-background h-full">
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
        class="flex w-full h-full justify-start items-start mt-2 mr-2 ml-2 px-24 py-12 "
        >
        <script type="module">
            import PerfilDisplay from "../components/ui/Perfil-display.js";
            const perfilContainer = document.getElementById('Perfil-display');
            const perfil = await PerfilDisplay().render();
            perfilContainer.innerHTML = perfil;
            import {assignFunctions} from "../components/ui/Perfil-display.js"
            assignFunctions();
            import {assignFunctions as functionsWishList} from "../components/ui/Wishlists-Display.js";
            functionsWishList();
        </script>
        </div>
    </main>
    


<script type="module">
    import {assignFunctions} from "../components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
</script>

</body>
</html>