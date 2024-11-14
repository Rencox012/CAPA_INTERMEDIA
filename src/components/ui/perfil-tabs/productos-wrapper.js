//componente que renderiza las ventas del usuario
import api from "../../../api/api.js";
import {categoriasArray} from "./ventas.js";
import {productosArray} from "./productos.js";

function renderCategoriaHTML(categorias){
    return categorias.map((categoria) => {
        //get the category name comparing the ID to the ID in the array
        let categoriaNombre = categoriasArray.find((cat) => cat.IDCategoria === categoria.IDCategoria).Nombre;
        return `<span id="categorias" key="${categoria.IDCategoria}" class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            ${categoriaNombre}
        </span>`
    }).join(' ')
}
export function renderModificarModal(idProducto, Nombre, cantidad, precio){
    //Solo modificara el precio y la cantidad del producto
    return `
     <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
         <div class="fixed inset-0 transition-opacity" aria-hidden="true">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
         <div id="modificar-producto" key="${idProducto}" class=" inline-block align-bottom text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full bg-dark-600 rounded-lg shadow-xl p-6 w-full max-w-md text-white">
            <h2 id="product-editor-title" class="text-2xl font-bold mb-4 text-white">Editor de Producto</h2>
            <form id="product-form" class="space-y-4">
                <div>
                    <label for="product-name" class="block text-sm font-medium text-white mb-1">Nombre del producto</label>
                    <input type="text" id="product-name" name="product-name" class="w-full px-3 py-2 bg-dark-500 border border-dark-400 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value="${Nombre}" readonly>
                </div>
                <div>
                    <label for="product-quantity" class="block text-sm font-medium text-white mb-1">Cantidad Disponible</label>
                    <input type="number" id="product-quantity" name="product-quantity" class="w-full px-3 py-2 bg-dark-500 border border-dark-400 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value="${cantidad}" min="0" required>
                </div>
                <div>
                    <label for="product-price" class="block text-sm font-medium text-white mb-1">Precio Actual</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-white">$</span>
                        <input type="number" id="product-price" name="product-price" class="w-full pl-7 pr-3 py-2 bg-dark-500 border border-dark-400 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value="${precio}" min="0" step="0.01" required>
                    </div>
                </div>
                <div class="flex justify-end space-x-3 mt-6">
                    <button type="button" id="cancel-button" class="px-4 py-2 bg-dark-500 text-white rounded-md hover:bg-dark-400 focus:outline-none focus:ring-2 focus:ring-dark-300">
                        Cancelar
                    </button>
                    <button type="submit" id="accept-button" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    </div>
    `
}
function handleEditarProducto(){
    //Get all the buttons and attach a listener
    const buttons = document.querySelectorAll('#editar-producto');
    buttons.forEach((button) => {
        button.addEventListener('click', async () => {
            //Get the product ID
            const idProducto = button.getAttribute('key');
            //Get the product data
            const producto = productosArray.find((producto) => producto.IDProducto ===idProducto);
            //Render the modal
            const modal = document.getElementById('modal-modificar');
            modal.innerHTML = renderModificarModal(producto.IDProducto, producto.Nombre, producto.Cantidad, producto.Precio);
            //remove the hidden class
            modal.classList.remove('hidden');
            //Attach the listeners to the modal
            handleModal();
        });
    });
}
async function updateProducto(idProducto, cantidad, precio){
    const response = await api.products.updateProducto(idProducto, cantidad, precio);
    switch(response.status){
        case 200:
            return true;
        case 400:
            return false;
        default:
            return null;
    }
}
async function deleteProducto(idProducto){
    const response = await api.products.deleteProducto(idProducto);
    switch(response.status){
        case 200:
            return true;
        case 400:
            return false;
        default:
            return null;
    }
}
function handleModal(){
    //get the send button
    const acceptButton = document.getElementById('accept-button');
    acceptButton.addEventListener('click', async (e) => {
        e.preventDefault();
        //Get the product ID
        const idProducto = document.getElementById('modificar-producto').getAttribute('key');
        //Get the product data
        const cantidad = document.getElementById('product-quantity').value;
        const precio = document.getElementById('product-price').value;
        //Update the product
        const response = await updateProducto(idProducto, cantidad, precio);
        if(response === null){
            alert('Error al modificar el producto');
        } else if(response === true){
            alert('Producto modificado correctamente');
            location.reload();
        } else{
            alert('Error al modificar el producto');
        }
    });

    //Get the cancel button
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', () => {
        const modal = document.getElementById('modal-modificar');
        modal.innerHTML = "";
        modal.classList.add('hidden');
    });
}
function handleDeleteProducto(){
    //Get all the buttons and attach a listener
    const buttons = document.querySelectorAll('#eliminar-producto');
    buttons.forEach((button) => {
        button.addEventListener('click', async () => {
            //Get the product ID
            const idProducto = button.parentElement.parentElement.parentElement.id;
            //Delete the product
            const response = await deleteProducto(idProducto);
            if(response === null){
                alert('Error al eliminar el producto');
            } else if(response === true){
                alert('Producto eliminado correctamente');
                location.reload();
            } else{
                alert('Error al eliminar el producto');
            }
        });
    });
}

export function assignFunctions(){
    handleEditarProducto();
    handleDeleteProducto();
}

export default function productosWrapper(){
    return{
        render: (idProducto, precio, tipo, nombreProducto, status, existencias, foto, categorias) => {
            //render the categories
            let categoriasHTML = ""
            if(categorias !== null){
                categoriasHTML = renderCategoriaHTML(categorias);
            }
            let isHidden = ""
            //Si el producto es un servicio, esconde el boton de editar
            if(tipo === "Servicio"){
                isHidden = "hidden"
            }
            return `
            <div id="${idProducto}" class="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                <div class="flex items center justify-between mb-4">
                    <span class="text-sm text-gray-500">Tipo: ${tipo}</span>
                    <span class="text-sm text-gray-500">Status: ${status}</span>
                </div>
                <div class="mb-4">
                    ${categoriasHTML}
                </div>
                <div class="flex items center mb-4">
                    <img src = "data:image/png;base64,${foto}" alt="Producto" class="w-20 h-20 object-cover rounded-md mr-4"
                    onerror="this.src='/CAPA_INTERMEDIA/public/default_course_image.png';"
                    >
                    <div>
                        <a href="/CAPA_INTERMEDIA/src/pages/producto.php?id=${idProducto}"
                        class=" *:hover:underline"
                        ><h2 class="text-lg font-semibold">${nombreProducto}</h2></a>
                    </div>
                </div>
                <div class="mb-4">
                    <span class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                        Existencias: ${existencias}
                    </span>
                </div>
                <div class="flex items center justify-between mb-4">
                    <span class="text-lg font-bold">$${precio}</span>
                   <div class="flex items-center justify-items-center gap-2">
                        <button id="editar-producto" key = "${idProducto}" class="${isHidden} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Editar
                        </button>
                        <button id="eliminar-producto" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
            `


        }
    }
}