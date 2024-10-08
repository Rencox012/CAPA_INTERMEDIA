<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Producto</title>
    <link href="../output.css" rel="stylesheet">
</head>
<body class="bg-page-background h-screen overflow-y-scroll">
<div id="navbar-container"></div>
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
    <main class="h-full">
        <div 
        id="Producto-display"
        class="flex justify-center items-center mt-2 mr-2 ml-2 px-24 py-12 w-full h-full"
        >
        </div>
        <script type="module">
            import DisplayProducto from "../components/ui/Display-producto.js";
            import Producto from "../components/ui/Producto.js";
            const productoContainer = document.getElementById('Producto-display');
            
            const producto = await DisplayProducto().render();
            productoContainer.innerHTML = producto;

            import {assignFunctions} from "../components/ui/Producto.js"
            assignFunctions();
        </script>

        <div id="Create-comment">
        <script type="module">
            import CreateComment from "../components/ui/Create-comment.js";
            const commentContainer = document.getElementById('Create-comment');
            const comment = CreateComment().render();
            commentContainer.innerHTML = comment;

            import {assignFunctions} from "../components/ui/Create-comment.js"
            assignFunctions();

        </script>
        </div>

        <div id="comentarios">

            <script type="module">
                import CommentarySection from "../components/ui/Commentary-section.js"; 
                const commentContainer = document.getElementById('comentarios');
                const comments = await CommentarySection().render();
                commentContainer.innerHTML = comments;


            </script>

        </div>
    </main>

    <script type="module">
    import {assignFunctions} from "./components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
    </script>

</body>
</html>