
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil usuario</title>
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
    <div id="app" class="container mx-auto p-4">
        <div id="userProfile" class="bg-dark-200 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <!-- El perfil del usuario se renderizará aquí -->
            <script type="module">
                import InfoUsuario from "../components/ui/PerfilUsuarios/display-Usuario.js";
                await InfoUsuario().render();
            </script>
        </div>
    </div>
</main>
<script type="module">
    import {assignFunctions} from "../components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
</script>
</body>
</html><?php
