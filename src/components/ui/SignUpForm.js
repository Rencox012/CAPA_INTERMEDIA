//sign up form component


function handleShowPrivacitySelector(){
    //Get the role selector
    const roleSelector = document.getElementById('Role');
    //attach the event listener to the role selector
    roleSelector.addEventListener('change', (event) => {
        //Get the privacity selector
        const privacitySelector = document.getElementById('Privacity');
        //if the role is Comprador, show the privacity selector
        if(event.target.value === 'Comprador'){
            privacitySelector.classList.remove('hidden');
        }
        //if the role is Vendedor, hide the privacity selector
        else{
            privacitySelector.classList.add('hidden');
        }
    });

}

export function assignListeners(){
    handleShowPrivacitySelector();
}

export default function SignUpForm() {

    

    return {
        render: () => {

            function handlePassword(value){
                //validate the password
                if(value === ''){
                    document.getElementById('password').setCustomValidity('Please enter a password');
                    //if the message with id warning does not exist in the document, it will create a new message
                    if(!document.getElementById('warning')){
                        const warning = document.createElement('p');
                        warning.id = 'warning';
                        warning.textContent = 'Please choose a password.';
                        warning.classList.add('text-red-500', 'text-xs', 'italic');
                        document.getElementById('password').insertAdjacentElement('afterend', warning);
                    }
                }
                //if the password is not empty, it will not display a message
                else{

                    //check with regex if it has at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character, other languages characters like ñ are not considered special characters
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
                    if(!passwordRegex.test(value)){
                        console.log('Please enter a valid password');
                        document.getElementById('password').setCustomValidity('Please enter a valid password');
                        //if the message with id warning does not exist in the document, it will create a new message
                        if(!document.getElementById('warning')){
                            const warning = document.createElement('p');
                            warning.id = 'warning';
                            warning.textContent = 'Please choose a valid password.';
                            warning.classList.add('text-red-500', 'text-xs', 'italic');
                            document.getElementById('password').insertAdjacentElement('afterend', warning);
                        }
                    }
                    else{
                        //remove the message with id warning if it exists in the document
                        if(document.getElementById('warning')){
                            document.getElementById('warning').remove();
                        }
                        document.getElementById('password').setCustomValidity('');
                    }
                }
            }
            
            function handleEmail(event){
                //use regex to validate the email, including the @ symbol and the domain
                const email = event.target.value;
                const emailRegex = /\S+@\S+\.\S+/;
                //reset the custom validity and remove the warning if it exists
                event.target.setCustomValidity('');
                const existingWarning = document.getElementById('warning-email');
                if(existingWarning){
                    existingWarning.remove();
                }
                //if the email does not match the regex, it will display a message
                if(!emailRegex.test(email)){
                    console.log('Please enter a valid email');
                    event.target.setCustomValidity('Please enter a valid email');
                    //if the message with id warning-email does not exist in the document, it will create a new message
                    if(!document.getElementById('warning-email')){
                        const warning = document.createElement('p');
                        warning.id = 'warning-email';
                        warning.textContent = 'Please enter a valid email.';
                        warning.classList.add('text-red-500', 'text-xs', 'italic');
                        event.target.insertAdjacentElement('afterend', warning);
                    }
                }


            }
            //function that handles the form submission
            function handleSubmit(event){
                event.preventDefault();
                //verify that the email is valid
                if(handleEmailVerif()){
                    //if the email is valid, submit the form
                    event.target.submit();
                }   
            }


            return `
            <form class="bg-form-background shadow-md p-form-x rounded-form justify-center items-center"
                id="sign-up-form"
                method="POST"
                >
                    <!-- Profile picture selector -->
                    <div class="mb-4">
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
                    <div class="mb-4">
                        <label class="block text-white text-sm font-bold mb-2 opacity-95" for="email">
                            Email
                        </label>
                        <input 
                        class="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
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
                    <div class="mb-4">
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
                    <div class="mb-4">
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
                    <div class="mb-6">
                        <label class="block text-white text-sm font-bold mb-2" for="password">
                            Contraseña
                        </label>
                        <input
                        class="shadow appearance-none border border-red rounded w-auto py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        oninput="(${handlePassword})(this.value)"
                        name = "password"
                        required
                            >
                    <div class="mb-6 w-1/3">
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
                    <div class="mb-6 w-2/3">
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
                    <div class = "mb-6">
                        <label class = "block text-white text-sm font-bold mb-2" for="Role">
                            Soy comprador o vendedor?
                        </label>
                        <!-- Select one of the 2 options -->
                        <select class="shadow border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Role"
                        name = "Role"
                        >
                            <option value = "Comprador"> Comprador </option>
                            <option value = "Vendedor"> Vendedor </option>
                        </select>
                        <!--If the user is a Comprador, it needs to select wether it wants to be private or public-->
                        <select class="shadow border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="Privacity"
                        name = "Privacity"
                        >
                            <option value = "1"> Publico </option>
                            <option value = "0"> Privado </option>
                        </select>
                    </div>
                    <div class="flex items-center justify-between">
                        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-50"
                        type="submit"
                        value = "Sign up"
                        >
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition-colors duration-50" href="#">
                            Olvide mi contraseña?
                        </a>
                    </div>
                </form>
            `;
        }
    }
}