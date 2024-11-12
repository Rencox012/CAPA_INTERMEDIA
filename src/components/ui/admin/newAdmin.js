import api from "../../../api/api.js";
import {User} from "../../../utility/classes/User.js";
function validatePassword(){
    //obtain the password input html
    const passwordInput = document.getElementById("password")
    //attach a function that will watch each user input. The password must contain one uppercase letter, one lowercase letter, one number and one special character and at least 8 characters long. Foregin characters like ñ are not considered special characters
    passwordInput.addEventListener("input", (event) => {
        const password = event.target.value
        //regex to validate password
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
        if(!regex.test(password)){
            passwordInput.classList.add("border-rose-500")
        }else{
            passwordInput.classList.remove("border-rose-500")
        }
    })

}
function validateNombreApellidos(){
    //get the name input html
    const nameInput = document.getElementById("name")
    //attach a function that will watch each user input. The name must contain only letters
    nameInput.addEventListener("input", (event) => {
        const name = event.target.value
        //If the user types a number, the input will ignore it
        nameInput.value = name.replace(/[0-9]/g, "")
    }
    )
    //get the apellidos input html
    const apellidosInput = document.getElementById("apellidos")
    //attach a function that will watch each user input. The apellidos must contain only letters
    apellidosInput.addEventListener("input", (event) => {
        const apellidos = event.target.value
        //If the user types a number, the input will ignore it
        apellidosInput.value = apellidos.replace(/[0-9]/g, "")
    }
    )
}
function handleSubmit(){
    //get the form html
    const form = document.getElementById("sign-up-form")
    //attach a function that will watch the submit event
    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        //get the email input html
        const emailInput = document.getElementById("email")
        //get the email extension select html
        const emailExtension = document.getElementById("email-extension")
        //get the name input html
        const nameInput = document.getElementById("name")
        //get the apellidos input html
        const apellidosInput = document.getElementById("apellidos")
        //get the password input html
        const passwordInput = document.getElementById("password")
        //get the direccion input html
        const direccionInput = document.getElementById("direccion")
        //get the sexo input html
        const sexoInput = document.getElementById("Sex");
        //get the profile picture input html
        const profilePictureInput = document.getElementById("profile-picture")
        //get the profile picture file
        const profilePicture = profilePictureInput.files[0]
        //If any of the previous inputs are empty, or invalid, return an error
        if (emailInput.value === "" || nameInput.value === "" || apellidosInput.value === "" || passwordInput.value === "" || direccionInput.value === "" || sexoInput.value === "" || profilePicture === undefined) {
            alert("Por favor llene todos los campos")
            return
        }
        //If the password input has the border-red class it means the password is invalid, return an error
        if (passwordInput.classList.contains("border-rose-500")) {
            alert("La contraseña no es valida")
            return
        }
        const email = emailInput.value + emailExtension.value;
        const name = nameInput.value;
        const apellidos = apellidosInput.value;
        const password = passwordInput.value;
        const direccion = direccionInput.value;
        const sexo = sexoInput.value;
        //send the data to the api
        const response = api.users.register(profilePicture, name, apellidos, sexo, direccion, email, password, "admin", 1);
        switch (response.status) {
            case 200:
                alert("Usuario creado")
                location.reload()
                break
            case 201:
                alert("Administrador creado")
                location.reload()
                break
            case 401:
                alert("Error al crear usuario")
        }
    }
    )
}

export function assignEvents(){
    validatePassword()
    validateNombreApellidos()
    handleSubmit()
}

export default function newAdminForm(){
    return{
        render: async () => {

            const usuario = User.load()
            if(usuario.rol !== "superAdmin"){
                document.getElementById("superAdmin").classList.add("hidden")
                return ``
            }

            return `
            <form class="flex flex-col bg-form-background shadow-md p-form-x rounded-form justify-center items-center"
                id="sign-up-form"
                method="POST"
                >
                    <!-- Profile picture selector -->
                    <div class="flex flex-col justify-center items-center mb-4">
                        <label class="block text-white text-sm font-bold mb-2 opacity-95" for="profile-picture">
                            Foto de perfil
                        </label>
                        <input 
                        class="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="profile-picture" 
                        type="file" 
                        placeholder="Profile Picture"
                        name = "profile-picture"
                        accept="image/*"
                        required
                        >
                    </div>
                    <div class="flex flex-col justify-center items-center mb-4">
                        <label class="block text-white text-sm font-bold mb-2 opacity-95" for="email">
                            Email
                        </label>
                        <input 
                        class="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" 
                        id="email" 
                        type="text" 
                        placeholder="Email"
                        name = "email"
                        required
                        >
                        <!-- select with possible emails -->
                        <select id="email-extension" class="shadow border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" >
                            <option value="@gmail.com"> @gmail.com </option>
                            <option value="@hotmail.com"> @hotmail.com </option>
                            <option value="@outlook.com"> @outlook.com </option>
                            <option value="@yahoo.com" > @yahoo.com </option>
                            <option value="@live.com" > @live.com </option>
                            <option value="@protonmail.com" > @protonmail.com </option>
                            <option value="@aol.com" >  @aol.com </option>
                            <option value="@icloud.com" > @icloud.com </option>
                        </select>

                    </div>
                    <div class="flex flex-col justify-center items-center mb-4">
                        <label class="block text-white text-sm font-bold mb-2 opacity-95" for="name">
                            Nombre
                        </label>
                        <input
                        class="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                        name = "name"
                        required
                        >
                    </div>
                    <div class="flex flex-col justify-center items-center mb-4">
                        <label class = "block text-white text-sm font-bold mb-2" for="Apellidos">
                            Apellidos
                        </label>
                        <input class="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="apellidos"
                        type="text"
                        placeholder="Apellidos"
                        name = "Apellidos"
                        required
                        >
                    </div>
                    <div class="flex flex-col justify-center items-center mb-6">
                        <label class="block text-white text-sm font-bold mb-2" for="password">
                            Contraseña
                        </label>
                        <input
                        class="shadow border-2 rounded w-auto py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"    
                        name = "password"
                        required
                            >
                    <div class="flex flex-col justify-center items-center mb-6 w-1/3">
                        <label class = "block text-white text-sm font-bold mb-2" for="Sex">
                            Sexo
                        </label>
                        <!-- Select one of the 3 options -->
                        <select class="shadow border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Sex"
                        name = "Sex"
                        >
                            <option value = "Hombre"> Hombre </option>
                            <option value = "Mujer"> Mujer </option>
                        </select>
                    </div>
                    <div class="flex flex-col justify-center items-center mb-6 w-2/3">
                        <label class = "block text-white text-sm font-bold mb-2" for ="Direccion">
                            Direccion
                        </label>
                        <input class="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="direccion"
                        type="text"
                        placeholder="Direccion"
                        name = "Direccion"
                        required
                        >
                    </div>
                    <button
                    class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    >
                        Crear
                    </button>
                </form>
            `;
        }
    }
}