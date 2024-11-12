
//Component that contains the profile menu, containing the profile tab, recent purchaces tab and Wishlists tab
import api from "../../api/api.js";
import { User } from "../../utility/classes/User.js";
import DatosUsuario from "./Datos-usuario.js";
import WishlistsDisplay from "./Wishlists-Display.js";
import comprasRecientes from "./perfil-tabs/compras-recientes.js";
import ventas from "./perfil-tabs/ventas.js";
import productos from "./perfil-tabs/productos.js";

function handleMenuChange(){
    //wait for the document to load
    console.log ("HANDLING MENU CHANGE");
       //obtain the buttons
        const perfil = document.getElementById('Perfil-Info');
        const compras = document.getElementById('Compras-Info');
        const listas = document.getElementById('Listas-Info');
        const ventas = document.getElementById('Ventas-Info');
        const productos = document.getElementById('Productos-Info');

        //obtain the tabs
        const perfilInfo = document.getElementById('Perfil');
        const comprasInfo = document.getElementById('Compras');
        const listasInfo = document.getElementById('Listas');
        const ventasInfo = document.getElementById('ventas');
        const productosInfo = document.getElementById('productos');

        //hide or show the tabs according to the button clicked
        perfil.addEventListener('click', function(){
            perfilInfo.classList.remove('hidden');
            comprasInfo.classList.add('hidden');
            listasInfo.classList.add('hidden');
            ventasInfo.classList.add('hidden');
            productosInfo.classList.add('hidden');
        });
        compras.addEventListener('click', function(){
            comprasInfo.classList.remove('hidden');
            perfilInfo.classList.add('hidden');
            listasInfo.classList.add('hidden');
            ventasInfo.classList.add('hidden');
            productosInfo.classList.add('hidden');
        });
        listas.addEventListener('click', function(){
            listasInfo.classList.remove('hidden');
            comprasInfo.classList.add('hidden');
            perfilInfo.classList.add('hidden');
            ventasInfo.classList.add('hidden');
            productosInfo.classList.add('hidden');
        });
        ventas.addEventListener('click', function(){
            ventasInfo.classList.remove('hidden');
            comprasInfo.classList.add('hidden');
            perfilInfo.classList.add('hidden');
            listasInfo.classList.add('hidden');
            productosInfo.classList.add('hidden');
        });
        productos.addEventListener('click', function() {
            productosInfo.classList.remove('hidden');
            comprasInfo.classList.add('hidden');
            perfilInfo.classList.add('hidden');
            listasInfo.classList.add('hidden');
            ventasInfo.classList.add('hidden');
        }
        );
        
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

            const compras = await comprasRecientes().render();

            let ventasHTML = await ventas().render();

            let productosHTML = await productos().render();


            let isHidden = ""
            let isHiddenVendedores = ""


            if (user.rol === 'vendedor' || user.rol === 'admin' || user.rol === 'superAdmin') {
                isHidden =  "hidden";
            }
            else{
                isHiddenVendedores = "hidden";
            }


            return `

                <div class= "flex flex-col h-full justify-start items-center w-1/12 bg-gray-600/10 rounded-lg gap-10 rounded-r-none border-r-2 border-r-white/45  px-2">
                    <button
                    class="text-white mt-16 hover:scale-110 transition-transform transform-origin-center border-b-2 border-black py-2 px-4 rounded-lg active:scale-90 active:border-t-2 active:border-b-0"
                    id= "Perfil-Info">
                    Perfil
                    </button>
                    <button 
                    class="${isHidden} text-white hover:scale-110 transition-transform transform-origin-center border-b-2 border-black py-2 px-4 rounded-lg active:scale-90 active:border-t-2 active:border-b-0"
                    id="Compras-Info">
                    Compras
                    </button>
                    <button 
                    class="${isHidden} text-white hover:scale-110 transition-transform transform-origin-center border-b-2 border-black py-2 px-4 rounded-lg active:scale-90 active:border-t-2 active:border-b-0"
                    id="Listas-Info">
                    Listas
                    </button>
                    <button
                    class="${isHiddenVendedores} text-white flex-col hover:scale-110 transition-transform transform-origin-center border-b-2 border-black py-2 px-4 rounded-lg active:scale-90 active:border-t-2 active:border-b-0"
                    id="Ventas-Info">
                    Ventas
                    </button>
                    <button
                    class = "${isHiddenVendedores} text-white flex-col hover:scale-110 transition-transform transform-origin-center border-b-2 border-black py-2 px-4 rounded-lg active:scale-90 active:border-t-2 active:border-b-0"
                    id = "Productos-Info">
                    Productos
                    </button>
                </div>
                <div class="flex justify-start items-center w-11/12 h-full bg-gray-700/20 rounded-lg gap-10">
                    <div class="w-full p-4 flex flex-col h-full h-full items-center justify-items-start">
                        <div id="Perfil" class="flex flex-col gap-4 items-center justify-center overflow-y-scroll w-full h-full pt-5">
                            ${datosUsuario}
                        </div>
                        <div id="Compras" class=" gap-4 w-full h-fit items-center justify-center hidden overflow-hidden">
                            ${compras}
                        </div>
                        <div id="Listas" class=" flex-col w-full gap-4 items-center justify-center hidden">
                            ${wishlists}
                        </div>
                        <div id="ventas" class="flex-col w-full gap-4 items-center justify-center overflow-hidden h-full hidden">
                            ${ventasHTML}
                        </div>
                        <div id="productos" class=" flex-col w-full gap-4 items-center justify-center hidden">
                            ${productosHTML}
                        </div>
                    </div>
                </div>
            `
        }
    }
}
