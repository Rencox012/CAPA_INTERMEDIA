
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil Comprador</title>
    <link href="../output.css" rel="stylesheet">
</head>
<body class="bg-page-background h-screen overflow-y-scroll">
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
        class="flex-row justify-start items-start mt-2 mr-2 ml-2 px-24 py-12 w-full h-full"
        >
        <script type="module">
            import PerfilDisplay from "../components/ui/Perfil-display.js";
            const perfilContainer = document.getElementById('Perfil-display');
            const perfil = await PerfilDisplay().render();
            perfilContainer.innerHTML = perfil;
        </script>
        </div>
    </main>
    


<script type="module">
    import {assignFunctions} from "../components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
</script>
<script type="module">
    import {assignFunctions} from "../components/ui/Perfil-display.js"
    document.addEventListener('DOMContentLoaded', assignFunctions);
</script>
</body>
</html>