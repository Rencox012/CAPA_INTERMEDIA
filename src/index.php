<?php

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing page</title>
    <link href="./output.css" rel="stylesheet">
</head>
</head>
<body class="bg-page-background">
    <script src="https://unpkg.com/feather-icons"></script>
    <div id="navbar-container"></div>
    <script type="module">
        import NavBar from "./components/ui/NavBarLanding.js";
        import NavBarMobile from "./components/ui/NavBarLanding-Mobile.js";

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
<div id = "main-productos">
    <div id="results" class="w-full">
      <script type="module">
        import MainResults from "./components/ui/Main-results.js";
        const resultsContainer = document.getElementById('results');
        const results = await MainResults().render();
        resultsContainer.innerHTML = results;
      </script>
    </div>
</div>
     

<script type="module">
    import {assignFunctions} from "./components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
</script>

</body>
</html>