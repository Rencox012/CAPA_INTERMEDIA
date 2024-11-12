
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Busqueda</title>
    <link href="../output.css" rel="stylesheet">
</head>
<body class="bg-page-background">
<script src="https://unpkg.com/feather-icons"></script>
<div id="navbar-container"></div>
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
<div id="filtros" class="max-w-4xl mx-auto px-4 py-6 mt-8">
    <h2 class="text-xl font-semibold mb-4 text-gray-200">Filtros</h2>
    <div class="flex flex-wrap gap-6 p-4 bg-gray-800 rounded-lg shadow-lg">
        <label class="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" name="valoracion" id="valoracion" value="valoracion"
                   class="custom-checkbox">
            <span class="text-gray-300 group-hover:text-gray-100 transition-colors">
                    <i data-feather="star" class="w-4 h-4 inline-block mr-1"></i>
                    Mejor valorados
                </span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" name="caro" id="caro" value="caro"
                   class="custom-checkbox">
            <span class="text-gray-300 group-hover:text-gray-100 transition-colors">
                    <i data-feather="trending-up" class="w-4 h-4 inline-block mr-1"></i>
                    Mayor precio
                </span>
        </label>

        <label class="flex items-center gap-2 cursor-pointer group">
            <input type="checkbox" name="barato" id="barato" value="barato"
                   class="custom-checkbox">
            <span class="text-gray-300 group-hover:text-gray-100 transition-colors">
                    <i data-feather="trending-down" class="w-4 h-4 inline-block mr-1"></i>
                    Menor precio
                </span>
        </label>
    </div>
    <script type="module">
        import api from "../api/api.js";

        function handleFilterSelection(){
            //If the serachType is Sellers or Buyers, hide the filters
            let urlParams = new URLSearchParams(window.location.search);
            let searchType = urlParams.get('search');
            if(searchType === 'Sellers' || searchType === 'Buyers'){
                document.getElementById('filtros').style.display = 'none';
            }
            let checkboxes = document.querySelectorAll('.custom-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', async (e) => {
                    //If the input is checked, add the filter to the URL, otherwise remove it
                    if (e.target.checked) {
                        let urlParams = new URLSearchParams(window.location.search);
                        let query = urlParams.get('query');
                        let searchType = urlParams.get('search');
                        let page = urlParams.get('page');
                        let filter = e.target.value;
                        let newUrl = `?search=${searchType}&query=${query}&page=${page}&filter=${filter}`;
                        window.location.href = newUrl;
                    }
                    else{
                        let urlParams = new URLSearchParams(window.location.search);
                        let query = urlParams.get('query');
                        let searchType = urlParams.get('search');
                        let page = urlParams.get('page');
                        let newUrl = `?search=${searchType}&query=${query}&page=${page}&filter=`;
                        window.location.href = newUrl;
                    }
                });
            });
        }
        function activeFilterURL(){
            let urlParams = new URLSearchParams(window.location.search);
            let filter = urlParams.get('filter');
            let checkboxes = document.querySelectorAll('.custom-checkbox');
            checkboxes.forEach(checkbox => {
                if(checkbox.value === filter){
                    checkbox.checked = true;
                }
            });
        }

        document.addEventListener('DOMContentLoaded', activeFilterURL);
        document.addEventListener('DOMContentLoaded', handleFilterSelection);
    </script>
</div>
<div id = "main-productos"
     class = "w-full flex flex-wrap flex-grow gap-8 justify-center">
    <script type="module">
        import Results from "../components/ui/busqueda/Results-Busqueda.js";
        import paginas from "../components/ui/busqueda/paginacion.js";

        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('query');
        const page = urlParams.get('page');
        const filter = urlParams.get('filter');
        const searchType = urlParams.get('search');
        let resultsContainer = document.getElementById('main-productos');
        let paginacion = document.getElementById('paginacion');
        let results;
        let paginasProductos;
        switch (searchType) {
            case 'Products':
                results = await Results().renderProductos(query, filter, page);
                resultsContainer.innerHTML = results;
                paginasProductos = await paginas().renderProductos(query,page);
                paginacion.innerHTML = paginasProductos;
                break;
            case 'Services':
                results = await Results().renderServicios(query, filter, page);
                resultsContainer.innerHTML = results;
                paginasProductos = await paginas().renderServicios(query,page);
                paginacion.innerHTML = paginasProductos;
                break;
            case 'Sellers':
                results = await Results().renderVendedores(query, page);
                resultsContainer.innerHTML = results;
                paginasProductos = await paginas().renderVendedores(query, page);
                paginacion.innerHTML = paginasProductos;
                break;
            case 'Buyers':
                results = await Results().renderCompradores(query, page);
                resultsContainer.innerHTML = results;
                paginasProductos = await paginas().renderCompradores(query, page);
                paginacion.innerHTML = paginasProductos;
                break;
            default:
                break;
        }
    </script>
</div>
<div id = "paginacion"
     class = "w-full flex flex-wrap flex-grow gap-8 justify-center mt-8">
>

</div>


<script type="module">
    import {assignFunctions} from "../components/ui/NavBarLanding.js";
    // Cuando el documento cargue, asigna las funciones a los botones
    document.addEventListener('DOMContentLoaded', assignFunctions);
</script>

</body>
</html>
