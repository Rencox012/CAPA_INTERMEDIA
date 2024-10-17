//componente que toma todas las listas y las ordena en un componente de lista desplegable
import api from "../../api/api.js";

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

function showCreationModal(){
    //show the modal to create a new list
    //prevent from being activated when loaded
    const button = document.getElementById('modal-button');
    button.addEventListener('click', () => {
        console.log("Button clicked");
        const modal = document.getElementById('modal');
        modal.classList.remove('hidden');
    });
}

function showCreateButton(){
    //show the create button when the select is changed to create a new list, and hide it when it is changed to anyn other option
    const select = document.getElementById('listas');
    const button = document.getElementById('modal-button');
    const button2 = document.getElementById('add-list');
    select.addEventListener('change', () => {
        if(select.value === "Agregar"){
            button.classList.remove('hidden');
            button2.classList.add('hidden');
        }else{
            button.classList.add('hidden');
            button2.classList.remove('hidden');
        }
    });
}

export function assignFunctions(){
    showCreationModal();
    showCreateButton();
}

export default function ListasDropdown() {
    return {
        render: async (id) => {
            //obtain the lists from the server
            const response = await obtainLists(id);

            console.log("DATA IS: ", response);

            if(response === null){
                //give an error message
                console.log("Error al obtener las listas");
                return;
            }

            const creatiomButton = `
                <Button id="modal-button" class="hidden text-gray-800 font-semibold mr-2 hover:bg-slate-100  p-4 rounded-lg hover:scale-105 duration-75 active:bg-slate-400 active:scale-95">Crear una nueva lista</Button>
            `
            //if the response is empty, we return a list with a single element that allows the user to create a new list
            if(response.message){
                return `
                <div class="relative flex flex-row items-center justify-center">
                    <div class = "relative flex flex-row items-center">
                        <Button id="modal-button" class="text-gray-800 font-semibold mr-2 hover:bg-slate-100  p-4 rounded-lg hover:scale-105 duration-75 active:bg-slate-400 active:scale-95">Crear una nueva lista</Button>
                    </div>
                    <select class="bg-white border border-gray-400 text-gray-800 py-2 px-4 pr-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2">
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
                    //create a dropdown with the lists
                    return `
                    <div class="relative flex flex-row items-center justify-center">
                        <div class = "relative flex flex-row items-center">
                            <button id="add-list" class="bg-blue-500 hover:bg-blue-700 mr-2 text-white font-bold p-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-50">Agregar a lista</button>
                            ${creatiomButton}
                        </div>
                        <select id="listas" class="bg-white border border-gray-400 text-gray-800 py-2 px-4 pr-8 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2">
                            ${listas}
                            <option value="Agregar">
                            + Crear nueva lista
                            </option>
                        </select>
                    </div>
                    `;
            }
        }
    }
}
            