

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing page</title>
    <link href="./output.css" rel="stylesheet">
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
            navbarContainer.innerHTML = NavBarMobile().render();
        }
        else{
            const navbarContainer = document.getElementById('navbar-container');
            navbarContainer.innerHTML = NavBar().render();
        }
       
    </script>
    <div id = "main-productos">
        <div id="results" class="w-full">
          <script type="module">
            import MainResults from "./components/ui/Main-results.js";
            const resultsContainer = document.getElementById('results');
            const masVendidosContainer = document.getElementById('mas-vendidos');
            const mejorValoradosContainer = document.getElementById('mejor-valorados');
            const results = await MainResults().render();
            const resultadosVentas = await MainResults().renderMasVendidos();
            const resultadosValorados = await MainResults().renderMejorValorados();
            resultsContainer.innerHTML = results;
            masVendidosContainer.innerHTML = resultadosVentas;
            mejorValoradosContainer.innerHTML = resultadosValorados;
          </script>
        </div>
    </div>
    <div id="mas-vendidos">

    </div>
    <div id="mejor-valorados">

    </div>
     

<script type="module">
    import {assignFunctions} from "./components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
</script>

</body>
</html>