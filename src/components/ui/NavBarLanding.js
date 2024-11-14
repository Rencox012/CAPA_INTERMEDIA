import {User} from '../../utility/classes/User.js';


export function handleEndSession(){
    //when the user clicks the logout button, it will redirect to the login page and delete the session cookie
    window.location.href = '/CAPA_INTERMEDIA/src/index.php';
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    //clear the user from local storage
    User.clear();
}

function handleSendToProfile(){
    //get the user ID from the local storage
    const id = User.GetUID();
    //when the user clicks the profile button, it will redirect to the profile page
    window.location.href = '/CAPA_INTERMEDIA/src/pages/perfil.php?id='+id;
}
function handleSendToCreateProduct(){
    //when the user clicks the create product button, it will redirect to the create product page
    window.location.href = '/CAPA_INTERMEDIA/src/pages/crearProducto.php';
}
function handleSendToChat(){
    //when the user clicks the chat button, it will redirect to the chat page
    window.location.href = '/CAPA_INTERMEDIA/src/pages/chat.php';
}
function handleSendToAdmin(){
    //when the user clicks the admin button, it will redirect to the admin page
    window.location.href = '/CAPA_INTERMEDIA/src/pages/aprovarProductos.php';
}
function handleSearch(){
    //get the search button
    const searchButton = document.getElementById('search-button');
    //attach the listener
    searchButton.addEventListener('click', () => {
        //when the user clicks the search button, it will redirect to the search page
        const search = document.getElementById('search-dropdown').value;
        if(search === ''){
            return;
        }
        //get what they want to search from the select
        const select = document.getElementById('dropdown-button').value;
        window.location.href = '/CAPA_INTERMEDIA/src/pages/Busqueda.php?search='+select+'&query='+search+'&page=1&filter=';
    });
}
export function assignFunctions()
{
    //assign the functions to the buttons
    if(document.getElementById('logout-button') !== null){
        document.getElementById('logout-button').addEventListener('click', handleEndSession );
    }
    if(document.getElementById('profile') !== null){
        document.getElementById('profile').addEventListener('click', handleSendToProfile);
    }
    if(document.getElementById('messages') !== null){
        document.getElementById('messages').addEventListener('click', handleSendToChat);
    }
    handleSearch()

    if(document.getElementById('admin') !== null){
        document.getElementById('admin').addEventListener('click', handleSendToAdmin);
    }
    if(document.getElementById('create') !== null){
        document.getElementById('create').addEventListener('click', handleSendToCreateProduct);
    }
}

export default function NavBar () {
    //function to handle the login button click
    function handleLoginClick(){
    window.location.href = '/CAPA_INTERMEDIA/src/pages/login.php';
    }
    function handleSignUpClick(){
    window.location.href = '/CAPA_INTERMEDIA/src/pages/signUp.php';
    }
    
    

    return{
       //return the nav bar html
    render: () => {  
    //function to handle the dropdown selection
    function handleDropDownSelection (e){
        let button = document.getElementById('dropdown-button');
        button.value = e.target.value;
        //change the span value to the selected value
        document.getElementById('DropValue').textContent = e.target.value;
        
    }

    function handleShowDropDown(){
        let dropdown = document.getElementById('dropdown');
        dropdown.classList.toggle('hidden');
        }

    function handleUserDropDown(){
        let dropdown = document.getElementById('user-dropdown-content');
        dropdown.classList.toggle('hidden');
        }

        //check if we are in the login or signUp page, if we are, hide the search bar
        let path = window.location.pathname;
        let isLoginPage = path.includes('login.php');
        let isSignUpPage = path.includes('signUp.php');
        if(isLoginPage || isSignUpPage){
            return `

    <nav class="bg-nav-bar flex justify-between p-4 items-center">
                <a href="/CAPA_INTERMEDIA/src/index.php" class="text-text-title font-bold text-title">Argo</a>

                <div class="flex space-x-4">
                    <button
                        class="bg-button-transparent text-button-text-golden font-bold py-button-y px-button-x rounded-button hover:text-button-text-hover-golden"
                        onclick="(${handleSignUpClick})()"
                        >
                    Sign up
                    </button>
                    <button
                        class="bg-button-transparent text-button-text-golden font-bold py-button-y px-button-x rounded-button hover:text-button-text-hover-golden"
                        onclick="(${handleLoginClick})()"
                        >                   
                        Log in
                    </button>
                </div>
            </nav>
            `
        }

        const user = User.load();
        let addProductButton = '';
        let adminPage = '';
        if(user!==null){
            addProductButton = user.rol === 'vendedor' ?
                `
                        <button 
                        type="button"
                        class="inline-flex w-full py-2 text-white hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                        value = "Create"
                        id = "create"
                        >
                        Publicar un nuevo producto
                        </button>
            `
                : ``

            adminPage = user.rol === 'admin'?
            `
            <li>
                <button
                type="button"
                class="inline-flex w-full py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                value = "Admin"
                id="admin"
                >
                Admin
                </button>
            </li>
            `
            : user.rol === 'superAdmin'?
            `
            <li>
                <button
                type="button"
                class="inline-flex w-full py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                value = "Admin"
                id="admin"
                >
                Admin
                </button>
            </li>
            `
            : ``

        }


        
        //If the user is logged in, we show the cart and the user profile picture, othewhise we show the login and sign up buttons
        
        
        const NavBarOptions = user ? ` 
        <div
        class="flex flex-row justify-end"
        >
            <div id="shoppingcart"
                class="flex items-center justify-center w-10 h-10 bg-button-golden rounded-full hover:bg-button-hover-golden">
                    <a href="/CAPA_INTERMEDIA/src/pages/carrito.php">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="size-6">
                        <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                        </svg>
                    </a>
                </div>
                <div class="relative w-10 h-10 bg-button-golden rounded-full hover:bg-button-hover-golden flex flex-col mr-12" onclick="(${handleUserDropDown})()">
                    <img 
                    src="data:image/png;base64,${user.foto}"
                    class="w-10 h-10 rounded-full hover:cursor-pointer" alt="profile"
                    
                    >
            </div>
            <div id="user-dropdown-content" class="hidden absolute mt-15 z-20 pl-1 w-24 flex-col top-20 justify-center items-center rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-gray-800">
                <ul class="py-2 text-sm text-white text-white overflow-visible w-full flex-col items-center justify-center" aria-labelledby="dropdown-button">
                <li>
                    <button 
                    type="button" 
                    class="inline-flex w-full py-2 text-white hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                    value = "Profile"
                    onclick="(${handleDropDownSelection})(event)"
                    id = "profile"
                    >
                    Profile
                    </button>
                </li>
                <li>
                    <button
                    type="button"
                    class="inline-flex w-full py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                    value = "Messages"
                    onclick="(${handleDropDownSelection})(event)"
                    id = "messages"
                    >
                    Messages
                    </button>
                </li>
                ${addProductButton}
                <li>
                ${adminPage}
                    <button 
                    type="button" 
                    class="inline-flex w-full py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                    value = "Logout"
                    id = "logout-button"
                    onclick="(${handleDropDownSelection})(event)"
                    >
                    Logout
                    </button>
                </li>
                </ul>
            </div>
        </div>
        
        `
        : `
        <div class="flex flex-row justify-end">
                <button
                class="bg-button-transparent text-button-text-golden font-bold py-button-y px-button-x rounded-button hover:text-button-text-hover-golden"
                onclick="(${handleSignUpClick})()"
                >
                Sign up
                </button>
                <button
                class="bg-button-transparent text-button-text-golden font-bold py-button-y px-button-x rounded-button hover:text-button-text-hover-golden"
                onclick="(${handleLoginClick})()"
                >                   
                Log in
                </button>
            </div>
        `

        return `
            <nav class="bg-nav-bar flex justify-between p-4 items-center">
                <a href="/CAPA_INTERMEDIA/src/index.php?page=1" class="text-text-title font-bold text-title">Argo</a>
            <div class="flex-grow flex justify-center w-full">
                    <div class="w-full max-w-2xl">
                        <div class="flex">
                            <button 
                            id="dropdown-button" 
                            data-dropdown-toggle="dropdown" 
                            class="flex-shrink-0 h-1/2 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 bg-gray-700 hover:bg-gray-600 focus:ring-gray-700 text-white border-gray-600"
                            type="button"
                            value = "Products"
                            onclick="(${handleShowDropDown})()"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clip-rule="evenodd" />
                                </svg>

                                <span id="DropValue">Buyers</span>
                        </button>
                            <div id="dropdown"
                            class="hidden absolute text-white z-10 w-25 mt-14 origin-top-right rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-gray-800">
                                <ul class="list-none py-2 text-sm text-gray-700 text-white" aria-labelledby="dropdown-button">
                                <li class="list-none">
                                    <button 
                                    type="button" 
                                    class="inline-flex w-full px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg  list-none"
                                    value = "Products"
                                    onclick="(${handleDropDownSelection})(event)"
                                    id = "products"
                                    >
                                    Products
                                    </button>
                                </li>
                                <li class="list-none">
                                    <button 
                                    type="button" 
                                    class="inline-flex w-full px-4 py-2 text-white hover:bg-gray-100 hover:bg-gray-600  hover:rounded-lg"
                                    value = "Buyers"
                                    onclick="(${handleDropDownSelection})(event)"
                                    >Buyers
                                    </button>
                                </li>
                                <li class="list-none">
                                    <button 
                                    type="button" 
                                    class="inline-flex w-full px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                                    value = "Sellers"
                                    onclick="(${handleDropDownSelection})(event)"
                                    >Sellers
                                    </button>
                                </li>
                                <li class="list-none">
                                    <button 
                                    type="button" 
                                    class="inline-flex w-full px-4 py-2 hover:bg-gray-100 hover:bg-gray-600 hover:text-white hover:rounded-lg"
                                    value = "Services"
                                    onclick="(${handleDropDownSelection})(event)"
                                    >
                                    Services
                                    </button>
                                </li>
                                </ul>
                            </div>
                            <div class="relative w-full h-full">   
                                <input type="search" id="search-dropdown" 
                                class="block p-2.5 w-full z-20 h-ful text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-s-gray-700  border-gray-600 placeholder-gray-400 text-white focus:border-blue-500" placeholder="Search products, services, sellers..." required />
                                <button id="search-button" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span class="sr-only">Search</span>
                                </button>
                            </div>
                    </div>
                </div>
            </div>
                        
                    <div class=" flex justify-between w-1/4 space-x-10">
                                <div class ="w-full justify-between space-x-10">
                                    ${NavBarOptions}
                                </div>
                            </div>
            </nav>


        `;
    }
    }
}   
