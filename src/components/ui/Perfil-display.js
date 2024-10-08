/*#TODO 
-Terminar la tab de informacion del usuario
-Agregar conexion con la api para poder modificar el usuario
-Empezar las tabs de compras recientes y las listas.
*/
//Component that contains the profile menu, containing the profile tab, recent purchaces tab and Wishlists tab
import api from "../../api/api.js";
import { User } from "../../utility/classes/user.js";
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


export function assignFunctions(){
    handleMenuChange();
}

export default function PerfilDisplay(){
    return{
        render: async () => {
            //obtain the info of the user from the local storage
            const user = User.load();

            return `
            <div class="w-full p-4 flex h-full">
                <div class="flex flex-col justify-start items-center w-1/12 bg-gray-600/10 rounded-lg gap-10">
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
                <div class="flex flex-col justify-start items-center w-11/12 bg-gray-700/20 rounded-lg gap-10">
                    <div id="Perfil" class="flex flex-col gap-4 items-center justify-center">
                        <h1 class="text-white text-2xl font-semibold mt-10">Información del perfil</h1>
                        <div id = "foto-perfil" class = "w-1/4 rounded-full bg-gray-500/50">
                            <img src="data:image/png;base64,${user.foto}" class="w-full h-full rounded-full object-cover items-center" alt="Foto de perfil">
                        </div>
                        <div id = "informacion" class = "flex w-full flex-row gap-4 items-center justify-center">
                            <div class="flex flex-col gap-4 w-1/2 items-center justify-center pt-5">
                             <!-- Toda la informacion del usuario en text inputs, por si desea cambiarla -->
                            <label for="Nombre" class="text-white">Nombre</label>
                            <input type="text" class="w-3/4 p-2 rounded-lg shadow-lg" value="${user.name}" id="Nombre">
                            <label for="Apellido" class="text-white">Apellidos</label>
                            <input type="text" class="w-1/4 p-2 rounded-lg shadow-lg" value="${user.apellidos}" id="Apellido">
                            <label for="Telefono" class="text-white">Telefono</label>
                            <input type="text" class="w-1/4 p-2 rounded-lg shadow-lg" value="${user.direccion}" id="Direccion">
                            </div>
                            <div class="flex flex-col gap-4 w-1/2 items-center justify-end">
                            <label for="Correo" class="text-white">Correo</label>
                            <input type="text" class="w-3/4 p-2 rounded-lg shadow-lg" value="${user.email}" id="Correo">

                            </div>
                           

                        </div>
                    </div>
                    <div id="Compras" class="flex gap-4 w-1/2 items-center justify-center hidden">
                        <h1 class="text-white text-2xl font-semibold mt-10">Compras recientes</h1>
                    </div>
                    <div id="Listas" class="flex gap-4 w-1/2 items-center justify-center hidden">
                        <h1 class="text-white text-2xl font-semibold mt-10">Listas de deseos</h1>
                    </div>
                </div>
            </div>
            `
        }
    }
}
