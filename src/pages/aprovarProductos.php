
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
</body>