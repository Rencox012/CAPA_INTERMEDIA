//Componente que renderizara el modal segun la informacion enviada
import api from "../../../api/api.js";
import {User} from "../../../utility/classes/User.js";
import {pagando} from "./chat-main.js";

async function getNombreProducto(idProduct){
    const response = await api.products.getNombreProducto(idProduct);
    switch (response.status) {
        case 200:
            return await response.json();
        case 404:
            alert ("Producto no encontrado");
            return null
        default:
            alert ("Error al cargar el producto");
            return null;
    }
}
async function getExisteCotizacion(idConversation){
    const response = await api.cotizaciones.getExisteCotizacion(idConversation);
    switch (response.status) {
        case 200:
            const data = await response.json();
            //get the ExisteCotizacionPendiente value
            return data.ExisteCotizacionPendiente === 1;
        case 201:
            return true;
        default:
            alert ("Error al cargar la cotización");
            return null;
    }
}
function validationPrecio(){
    //get the precio input and attach the event listener
    const precio = document.getElementById("product-price");
    precio.addEventListener("input", ()=>{
        //if the user input is a letter, turn it into 0
        if (isNaN(precio.value)){
            precio.value = 1 ;
        }
        //if the value is 0 or lower, turn it back to 1
        if (precio.value <= 0){
            precio.value = 1;
        }

    })
}
function validationCantidad(){
    //get the cantidad input
    const cantidad = document.getElementById("product-quantity");
    //attach the event listener, make sure the user cannot input letters or a price of 0 or lower
    cantidad.addEventListener("input", ()=>{
        //If the user inputs a letter, turn it into 1
        if (isNaN(cantidad.value)){
            cantidad.value = 1;
        }
        //If the user inputs a number lower than 1, turn it into 1
        if (cantidad.value <= 0){
            cantidad.value = 1;
        }
    }
    )
}

async function insertCotizacion(){

    //Get the id of the conversation
    const idConversation = document.getElementById("chat-messages").getAttribute('key');

    const existeCotizacion = await getExisteCotizacion(idConversation);
    if (existeCotizacion){
        alert("Ya existe una cotización pendiente en esta conversación");
        return;
    }
    if(existeCotizacion === null){
        alert("Error al cargar la cotización");
        return;
    }

    //get theID of the product
    const idProduct = document.getElementById("chat-messages").getAttribute('productoKey');
    //get the precio
    const precio = document.getElementById("product-price").value;
    //get the detales
    const detalles = document.getElementById("product-details").value;
    //get the cantidad
    const cantidad = document.getElementById("product-quantity").value;

    //if any of the fields are empty, alert the user
    if (precio === "" || detalles === "" || cantidad === ""){
        alert("Por favor llene todos los campos");
        return;
    }

    const response = await api.cotizaciones.insertCotizacion(idConversation, idProduct, precio, detalles, cantidad);
    switch (response.status) {
        case 200:
            alert("Cotización enviada");
            //Clean the modal
            const modal = document.getElementById("quote-modal");
            modal.innerHTML = "";
            modal.classList.add("hidden");
            break;
        case 400:
            alert("Error al enviar la cotización");
            break;
        default:
            alert("Error al enviar la cotización");
            break;
    }
}
function handleInsertCotizacion(){
    const sendQuoteBtn = document.getElementById("send-quote-btn");
    sendQuoteBtn.addEventListener("click", insertCotizacion);
}
function closeModal(){
    const closeModalBtn = document.getElementById("close-modal-btn");
    closeModalBtn.addEventListener("click", ()=>{
        const modal = document.getElementById("quote-modal");
        modal.innerHTML = "";
        modal.classList.add("hidden");
    })
}
export function assignFunctions(){
    validationPrecio()
    validationCantidad()
    handleInsertCotizacion()
    closeModal()
}

export default function modalCotizacion(){
    return{
        async render(IDProducto){
            const productoName = await getNombreProducto(IDProducto);
            if(productoName === null){
                return null;
            }
            return`
            <div class="bg-gray-800 p-6 rounded-lg w-96">
                <h2 class="text-xl mb-4">Crear Cotización</h2>
                <input type="text" id="product-name" class="w-full bg-gray-700 text-white p-2 mb-2 rounded" disabled value="${productoName.Nombre}">
                <label for="product-quantity" class="text-white mb-2">Cantidad</label>
                <input type="number" id="product-quantity" class = "w-full bg-gray-700 text-white p-2 mb-2 rounded" placeholder="Cantidad">
                <label for="product-price" class="text-white mb-2">Precio individual</label>
                <input type="number" id="product-price" class="w-full bg-gray-700 text-white p-2 mb-2 rounded" placeholder="Precio">
                <label for="product-details" class="text-white mb-2">Detalles</label>
                <textarea id="product-details" class="w-full bg-gray-700 text-white p-2 mb-4 rounded" placeholder="Detalles del producto"></textarea>
                <div class="flex justify-end">
                    <button id="close-modal-btn" class="bg-red-500 text-white p-2 rounded mr-2">Cerrar</button>
                    <button id="send-quote-btn" class="bg-green-500 text-white p-2 rounded">Enviar Cotización</button>
                </div>
            </div>
            `
        }
    }
}