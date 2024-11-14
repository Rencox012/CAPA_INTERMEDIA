
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="../output.css" rel="stylesheet">
    <script src="../jquery/jquery.js"></script>
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


<script type="module">
    import api from "../api/api.js";
    import {setCookie} from "../utility/cookieUtilities.js";
    //we import the class user 
    import {User} from "../utility/classes/User.js";

    $(document).ready(function(){
        $("#login-form").submit(async function(event){     
            event.preventDefault();
            // Get the email and password from the form
            let email = $("#email").val();
            let password = $("#password").val();
            let rol = $("#Rol").val();

            // Call the login function
        await api.users.login(email, password, rol).then((response) => {
                // Parse the JSON from the response
                console.log(response);
                if (!response.ok) {
                    alert("User not found");
                    throw new Error("HTTP error " + response.status);
                }
                else{
                    return response.json();
                }
            }).then((data) => {
            setCookie("user", data.uid, 1);
                    // Create a new user object
                    let user = new User(
                        data.IDUsuario,
                        data.Foto,
                        data.Nombre,
                        data.Apellidos,
                        data.Sexo,
                        data.Direccion,
                        data.Correo,
                        data.Contrasena,
                        data.Rol,
                        data.Status
                    );
                    // Store the user object in the session storage
                    console.log("SAVING THE FOLLOWING USER: ", user);
                    User.save(user);
                    // Print the local storage
                    console.log(localStorage);
                    // Redirect to the dashboard
                    window.location.href = "../index.php";
            }).catch((error) => {
                console.log(error);
            });
        });
    });
</script>
</body>
</html>