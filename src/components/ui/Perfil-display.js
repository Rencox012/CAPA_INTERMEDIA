/*#TODO 
-Terminar la tab de informacion del usuario
-Agregar conexion con la api para poder modificar el usuario
-Empezar las tabs de compras recientes y las listas.
*/
//Component that contains the profile menu, containing the profile tab, recent purchaces tab and Wishlists tab
import api from "../../api/api.js";
import { User } from "../../utility/classes/user.js";
import DatosUsuario from "./Datos-usuario.js";
import WishlistsDisplay from "./Wishlists-Display.js";

function handleMenuChange(){
    //wait for the document to load
    console.log ("HANDLING MENU CHANGE");
       //obtain the buttons
        const perfil = document.getElementById('Perfil-Info');
        const compras = document.getElementById('Compras-Info');
        const listas = document.getElementById('Listas-Info');

        //obtain the tabs
        const perfilInfo = document.getElementById('Perfil');
        const comprasInfo = document.getElementById('Compras');
        const listasInfo = document.getElementById('Listas');

        console.log("PERFIL: ", perfil);
        //hide or show the tabs according to the button clicked
        perfil.addEventListener('click', function(){
            perfilInfo.classList.remove('hidden');
            comprasInfo.classList.add('hidden');
            listasInfo.classList.add('hidden');
        });
        compras.addEventListener('click', function(){
            comprasInfo.classList.remove('hidden');
            perfilInfo.classList.add('hidden');
            listasInfo.classList.add('hidden');
        });
        listas.addEventListener('click', function(){
            listasInfo.classList.remove('hidden');
            comprasInfo.classList.add('hidden');
            perfilInfo.classList.add('hidden');
        });
        
}

function handleEdition(){
    //if the text is edited, we enable the save button
    const nombre = document.getElementById('Nombre');
    const apellido = document.getElementById('Apellido');
    const direccion = document.getElementById('Direccion');
    const correo = document.getElementById('Correo');
    const guardar = document.getElementById('guardar');

    nombre.addEventListener('input', () => {
        guardar.disabled = false;
    });
    apellido.addEventListener('input', () => {
        guardar.disabled = false;
    });
    direccion.addEventListener('input', () => {
        guardar.disabled = false;
    });
    correo.addEventListener('input', () => {
        guardar.disabled = false;
    });
}


export function assignFunctions(){
    handleMenuChange();
    handleEdition();
}

export default function PerfilDisplay(){
    return{
        render: async () => {
            //obtain the info of the user from the local storage
            const user = User.load();

            const datosUsuario =await DatosUsuario().render(user.foto, user.name, user.apellidos, user.direccion, user.email);

            const wishlists = await WishlistsDisplay().render();

            return `

                <div class= "flex flex-col h-full justify-start items-center w-1/12 bg-gray-600/10 rounded-lg gap-10 rounded-r-none border-r-2 border-r-white/45 ">
                    <button
                    class="text-white flex-col mt-16 hover:scale-110 transition-transform transform-origin-center border-b-2 border-black py-2 px-4 rounded-lg active:scale-90 active:border-t-2 active:border-b-0"
                    id= "Perfil-Info">
                    Perfil
                    </button>
                    <button 
                    class="text-white flex-col hover:scale-110 transition-transform transform-origin-center border-b-2 border-black py-2 px-4 rounded-lg active:scale-90 active:border-t-2 active:border-b-0"
                    id="Compras-Info">
                    Compras
                    </button>
                    <button 
                    class="text-white flex-col hover:scale-110 transition-transform transform-origin-center border-b-2 border-black py-2 px-4 rounded-lg active:scale-90 active:border-t-2 active:border-b-0"
                    id="Listas-Info">
                    Listas
                    </button>
                </div>
                <div class="flex flex-col justify-start items-center w-11/12 h-full bg-gray-700/20 rounded-lg gap-10">
                    <div class="w-full p-4 flex h-full items-center justify-center">
                        <div id="Perfil" class="flex flex-col gap-4 items-center justify-center overflow-hidden">
                            ${datosUsuario}
                        </div>
                        <div id="Compras" class="flex gap-4 w-1/2 items-center justify-center hidden">
                            <h1 class="text-white text-2xl font-semibold mt-10">Compras recientes</h1>
                        </div>
                        <div id="Listas" class="flex flex-col w-full gap-4 items-center justify-center hidden">
                            ${wishlists}
                        </div>
                    </div>
                </div>
            `
        }
    }
}
