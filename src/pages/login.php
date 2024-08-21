<?php

if($_POST){
//get the username and password from the post request
$username = $_POST['username'];
$password = $_POST['password'];

echo "Username: $username <br>";
echo "Password: $password <br>";
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="../output.css" rel="stylesheet">
</head>
<body class="bg-page-background">
<script src="https://unpkg.com/feather-icons"></script>
    <div id="navbar-container"></div>
    <script type="module">
        import NavBar from "../components/ui/NavBarLanding.js";
        import NavBarMobile from "../components/ui/NavBarLanding-Mobile.js";
        import LoginForm from "../components/ui/LoginForm.js";

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

    <div id="form-container" class="flex justify-center items-center m-2"></div>
    <script type = "module">
        import LoginForm from "../components/ui/LoginForm.js";
        const formContainer = document.getElementById('form-container');
        const form = LoginForm().render();
        formContainer.innerHTML = form;
    </script>

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</body>
</html>