//Nav bar component for mobile devices, adding a side menu for navigation.


export default function NavBarMobile() {

    //function to handle the login button click
    function handleLoginClick(){
        window.location.href = '/CAPA_INTERMEDIA/src/pages/login.php';
    }
    function handleSignUpClick(){
        window.location.href = '/CAPA_INTERMEDIA/src/pages/signUp.php';
    }
    //function that handles the hiding and showing of the side menu
    function handleSideMenuClick(){
        let sideMenu = document.getElementById('side-menu');
        if(sideMenu.style.display === 'none'){
            sideMenu.style.display = 'block';
        }else{
            sideMenu.style.display = 'none';
        }
    }

    return {
        render: () => {

            //check if we are in the login or signUp page, if we are, hide the search bar
            let path = window.location.pathname;
            let isLoginPage = path.includes('login.php');
            let isSignUpPage = path.includes('signUp.php');
            if(isLoginPage || isSignUpPage){
                return `

            <script src="/node_modules/feather-icons/dist/feather.js"></script>
                  <nav class="bg-nav-bar flex justify-between p-4 items-center">
                <a href="/src/index.html" class="text-text-title font-bold text-title"></a>

                <ion-icon name="menu-outline" size="large" class="text-white"></ion-icon>
             </nav>
            } `
            }
            return `

            <script src="/node_modules/feather-icons/dist/feather.js"></script>
                  <nav class="bg-nav-bar flex justify-between p-4 items-center">
                <a href="/src/index.html" class="text-text-title font-bold text-title"></a>

               <div class="flex-grow flex justify-start">
                    <form class="w-2 flex-grow">
                        <div class="flex w-2">
                            <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                            <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button"> <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                        </svg></button>
                            <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                                </li>
                                <li>
                                    <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                                </li>
                                </ul>
                            </div>
                            <div class="relative w-full">
                                <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                                <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                    <span class="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>


                <ion-icon name="menu-outline" size="large" class="text-white"></ion-icon>
             </nav>
            `;
        }
    }
}   
