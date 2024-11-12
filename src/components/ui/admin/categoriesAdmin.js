import api from "../../../api/api.js";


async function getActiveCategories(){
    const response = await api.categories.getCategoriasActivas();
    switch (response.status){
        case 200:
            return await response.json();
        case 404:
            return [];
        default:
            return null;
    }
}
async function updateStatusCategoria(idCategoria, Status){
    const response = await api.categories.updateStatusCategoria(idCategoria, Status);
    switch (response.status){
        case 200:
            return true;
        case 404:
            return false;
        default:
            return null;
    }
}
async function handleUpdateCategoria(){
    //Get the button and attach a listener
    const button = document.getElementById('desactivar');
    button.addEventListener('click', async () => {
        //Get the selected category
        const select = document.getElementById('categorias');
        const idCategoria = select.options[select.selectedIndex].value;
        //Update the status
        const response = await updateStatusCategoria(idCategoria, 0);
        if(response === null){
            alert('Error al desactivar la categoría');
        } else if(response === true){
            alert('Categoría desactivada correctamente');
            location.reload();
        } else{
            alert('Error al desactivar la categoría');
        }
        }
    );
}
export function assignEvents(){
    handleUpdateCategoria();
}

export default function categories(){
    return{
        render: async () => {
            const categorias = await getActiveCategories();
            if(categorias === null) {
            return `
                <div class="flex items-center justify-center h-full">
                    <span class="text-lg font-bold text-red-500">Error al cargar las categorías</span>
                </div>
                `
            }
            return `
            <!-- select with all the categories, and a button to deactivate them -->
            <div class="rounded-lg shadow-md p-6 max-w-md w-full">
                <h2 class="text-lg font-semibold mb-4">Categorías</h2>
                <div class="mb-4">
                    <select id="categorias" class="w-full text-black border border-gray-400 rounded-md py-2 px-4">
                        ${categorias.map((categoria) => {
                            return `<option value="${categoria.IDCategoria}">${categoria.Nombre}</option>`
                        }).join(' ')}
                    </select>
                </div>
                <div class="flex items center justify-between mb-4">
                    <button id="desactivar" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Desactivar
                    </button>
                </div>
            </div>
            `
        }
    }
}