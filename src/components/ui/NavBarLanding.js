export default function NavBar () {

    //function to handle the login button click
    function handleLoginClick(){
       window.location.href = '/src//pages/login.html';
    }
    function handleSignUpClick(){
       window.location.href = '/src/pages/signUp.html';
    }

    return{
       //return the nav bar html
       render: () => {
          return `
             <nav class="bg-nav-bar flex justify-between p-4 items-center">
                <a href="/src/index.html" class="text-text-title font-bold text-title">Argo</a>
                <div class="flex space-x-4">
                   <button
                    class="bg-button-blue text-button-text font-bold py-button-y px-button-x rounded-button hover:bg-button-blue-hover transition-colors duration-50"
                    onclick="(${handleSignUpClick})()"
                    >
                   Sign up
                   </button>
                   <button
                    class="bg-button-blue text-button-text font-bold py-button-y px-button-x rounded-button hover:bg-button-blue-hover transition-colors duration-50"
                    onclick="(${handleLoginClick})()"
                    >                   
                   Log in
                   </button>
                </div>
             </nav>
          `;
    }
 
    }
 }
 