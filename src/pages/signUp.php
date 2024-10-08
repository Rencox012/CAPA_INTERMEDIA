
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign up</title>
    <link href="../output.css" rel="stylesheet">
    <script src="../jquery/jquery.js"></script>
</head>
<body class="bg-page-background">
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
        import LoginForm from "../components/ui/SignUpForm.js";
        const formContainer = document.getElementById('form-container');
        const form = LoginForm().render();
        formContainer.innerHTML = form;
    </script>

<script type="module">
    import api from "../api/api.js";

    $(document).ready(function(){
        $("#sign-up-form").submit(async function(event){     
            event.preventDefault();

            let file = $("#profile-picture").prop('files')[0];
            let name = $("#name").val();
            let apellidos = $("#apellidos").val();
            let sex = $("#Sex").val();
            let email = $("#email").val();
            let direccion = $("#direccion").val();
            let password = $("#password").val();
            let role = $("#Role").val();
            
            // Call the login function
           await api.users.register(file, name, apellidos, sex, direccion,  email, password, role).then((response) => {
                // Parse the JSON from the response
                console.log(response);
                if (!response.ok) {
                    alert("User not created");
                    throw new Error("HTTP error " + response.status + "JSON returned: " + response.json());
                }
                else{
                    return response.json();
                }
            }).then((data) => {
                // If the user is found, redirect to the dashboard
                console.log(data);
                alert ("User created successfully");
                window.location.href = "../index.php";
            }).catch((error) => {
                console.log(error);
            });
        });
    });
</script>

</body>
</html>