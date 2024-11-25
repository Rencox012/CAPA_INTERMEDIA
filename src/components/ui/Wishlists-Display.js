//COmponent that displays the wishlists of the user
import api from "../../api/api.js";
import { User } from "../../utility/classes/User.js";
import WishListWrapper from "./WishList-wrapper.js";
import {assignEvents} from "./WishList-wrapper.js" 


async function obtainLists(id){
    // Call the login function
    const response = await api.lists.getListasUsuario(id)
    if(response.status === 200 || response.status === 201){
        return response.json();
    }
    else{
        return null;
    }
}
function showCreateButton(){
    //show the create button when the select is changed to create a new list, and hide it when it is changed to anyn other option
    const select = document.getElementById('listas');
    const button = document.getElementById('modal-button');
    if(select === null || button === null){
        return;
    }
    select.addEventListener('change', () => {
        if(select.value === "Agregar"){
            button.classList.remove('hidden');
        }else{
            button.classList.add('hidden');
        }
    });
}

function handleChangeList(){
    //Get the select element
    const select = document.getElementById('listas');
    if(select === null){
        return;
    }
    select.addEventListener('change', async () => {
        //Based on the selected ID, we render the wishlist wrapper, except if the value is "Agregar"
        if(select.value === "Agregar"){
            const wishlistContent = await WishListWrapper().render(null);
        //Change the html of the wishlist wrapper
        document.getElementById('wishlist-wrapper').innerHTML = wishlistContent;
        }
        const wishlistContent = await WishListWrapper().render(select.value);
        //Change the html of the wishlist wrapper
        document.getElementById('wishlist-wrapper').innerHTML = wishlistContent;
        assignEvents();
    }
    );
}

export function assignFunctions(){
    showCreateButton();
}
export function assignProfileFunctions(){
    handleChangeList();
}

export default function WishlistsDisplay(){
    return{
        render: async () => {
            const user = User.load();



            const response = await obtainLists(user.uid);

            if(response === null){
                //give an error message
                console.log("Error al obtener las listas");
                return;
            }

            const creatiomButton = `
                <Button id="modal-button" class="hidden text-white font-semibold mr-2 hover:bg-zinc-900  p-4 rounded-lg hover:scale-105 duration-75 active:bg-slate-400 active:scale-95">Crear una nueva lista</Button>
            `

            //if the response is empty, we return a list with a single element that allows the user to create a new list
            if(response.message){
                return `
                <h1 class="text-white text-2xl font-semibold mt-10">Listas de deseos</h1>
                <div class="relative flex flex-row items-start justify-start w-full">
                    <div class = "relative flex flex-row items-start justify-start">
                        <Button id="modal-button" class="text-white font-semibold mr-2 hover:bg-zinc-900  p-4 rounded-lg hover:scale-105 duration-75 active:bg-slate-400 active:scale-95">Crear una nueva lista</Button>
                    </div>
                    <select class="bg-white border border-gray-400 w-3/4 text-gray-800 py-2 px-4 pr-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2">
                        <option value="Agregar">
                        + Crear nueva lista
                        </option>
                    </select>
                    
                </div>
                `;
            }else{
                    //create the lists
                    const listas = response.map((lista) => {
                        return `
                        <option value="${lista.IDLista}">
                        ${lista.Nombre}
                        </option>
                        `
                    }
                    ).join('\n');

                    //Render the wishlist wrapper with the first list
                    const wishlistContent = await WishListWrapper().render(response[0].IDLista);

                    //create a dropdown with the lists
                    return `
                    <h1 class="text-white text-2xl font-semibold mt-10">Listas de deseos</h1>
                    <div class="relative flex flex-row items-center justify-center">
                        <div class = "relative flex flex-row items-center">
                            ${creatiomButton}
                        </div>
                        <select id="listas" class="bg-white border border-gray-400 text-gray-800 py-2 px-4 pr-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2">
                            ${listas}
                            <option value="Agregar">
                            + Crear nueva lista
                            </option>
                        </select>
                    </div>
                    <div id="wishlist-wrapper" class="w-full">
                    ${wishlistContent}
                    </div>
                    `;
            }

            return`
            <h1 class="text-white text-2xl font-semibold mt-10">Listas de deseos</h1>
            `
        }
            
    }
}