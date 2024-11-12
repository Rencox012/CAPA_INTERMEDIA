//login form component
import api from "../../api/api.js"


export function handleEmailVerif(){
    const email = document.getElementById('email').value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if(!emailRegex.test(email)){
        document.getElementById('email').setCustomValidity('Please enter a valid email');
        if(!document.getElementById('warning-email')){
            const warning = document.createElement('p');
            warning.id = 'warning-email';
            warning.textContent = 'Please enter a valid email.';
            warning.classList.add('text-red-500', 'text-xs', 'italic');
            document.getElementById('email').insertAdjacentElement('afterend', warning);
            return false;
        }
    }
    else{
        if(document.getElementById('warning-email')){
            document.getElementById('warning-email').remove();
        }
        document.getElementById('email').setCustomValidity('');
        return true;
    }
}

export default function LoginForm() {
    
    
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
                    //remove the message with id warning if it exists in the document
                    if(document.getElementById('warning')){
                        document.getElementById('warning').remove();
                    }
                    document.getElementById('password').setCustomValidity('');
                }
            }


            return `
               <form class="bg-form-background shadow-md p-form-x rounded-form justify-center items-center"
                id = "login-form"
                method="POST"
                >
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
                    </div>
                    <div class="mb-6">
                        <label class="block text-white text-sm font-bold mb-2" for="password">
                            Password
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
                        
                    </div>

                    <div class = "mb-6">
                    <label for="Rol"
                    class="block text-white text-sm font-bold mb-2"
                    >Entrar como:</label>
                    <select name="Rol" id="Rol"
                    class="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="comprador">Comprador</option>
                        <option value="vendedor">Vendedor</option>
                        <option value="admin">Administrador</option>
                        <option value="superAdmin">Super Administrador</option>
                    </select>
                    </div>
                    <div class="flex items-center justify-between">
                        <input class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-50"
                        type="submit"
                        value = "Log in"
                        >
                        </button>
                        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 transition-colors duration-50" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
            `;

        }
    }
}