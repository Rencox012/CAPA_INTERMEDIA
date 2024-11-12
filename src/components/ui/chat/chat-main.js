// chat.js
import api from "../../../api/api.js";
import {User} from "../../../utility/classes/User.js";
import modalCotizacion from "./modal-cotizacion.js";
import {assignFunctions} from "./modal-cotizacion.js";

export let pagando = false;

export let conversationsArray = [];


function handleOpenFormModal(){
    //get the quote-modal
    const modal = document.getElementById('quote-modal');
    //get the open button
    const openModalButton = document.getElementById('create-form-btn');
    //attach the event listener to the button when clicked
    openModalButton.addEventListener('click', async () => {
        //get the product id
        const productID = document.getElementById('chat-messages').getAttribute('productoKey');
        //get the modal content
        const modalContent = await modalCotizacion().render(productID);
        //set the content of the modal
        modal.innerHTML = modalContent;
        //remove the hidden class
        modal.classList.remove('hidden');
        //assign the functions to the inputs
        assignFunctions();



    });
}
// Funciones auxiliares
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

// Enviar mensaje
async function sendMessage() {
    const input = document.getElementById('message-input');
    const user = User.load();
    const conversationID = document.getElementById('chat-messages').getAttribute('key');
    const productID = document.getElementById('chat-messages').getAttribute('productoKey');
    const content = input.value.trim();
    if (content) {
        const response = await api.conversations.insertMensaje(user.uid, conversationID, content);
        switch (response.status){
            case 200:
                const data = await response.json();
                input.value = '';
                await messagesRenderer().renderConversationMessages(conversationID,productID);
                break;
            case 401:
                console.log('No autorizado');
                alert('No autorizado');
                break;
            default:
                console.log('Error');
                alert ('Error al enviar mensaje');
                break;
        }
    }
}

export function assignListeners(){
    // Event listeners
    document.getElementById('send-message-btn').addEventListener('click', sendMessage);
    handleSelectConversation();
    handleOpenFormModal();


}

async function updateCotizacion(idCotizacion, idProducto, status, cantidad, precio){
    const usuario = User.load();
    const response = await api.cotizaciones.updateCotizacion(idCotizacion, status, usuario.uid, idProducto, cantidad, precio);
    switch (response.status){
        case 200:
            alert('Cotización actualizada');
            break;
        case 400:
            alert('Error al actualizar cotización');
            break;
        default:
            alert('Error al actualizar cotización');
            break;
    }
}
async function getConversacionesUsuario(){
    const usuario = User.load();
    const response = await api.conversations.getConversacionesUsuario(usuario.uid);
    switch (response.status){
        case 200:
            const data = await response.json();
            return data;
        case 401:
            return null;
        default:
            return null;

    }
}
async function getMensajesConversacion(idConversacion){
    const response = await api.conversations.GetMensajesConversacion(idConversacion);
    switch (response.status){
        case 200:
            const data = await response.json();
            return data;
        case 201:
            return [];
        case 401:
            return null;
        default:
            return null;
    }
}
async function getUsuarioFoto(idUsuario){
    const response = await api.users.getUsuarioFoto(idUsuario);
    switch (response.status){
        case 200:
            const data = await response.json();
            return data;
        case 401:
            return null;
        default:
            return null;
    }
}
function handleSelectConversation(){

    //get all the conversation elements
    const conversationElements = document.querySelectorAll('#conversacion-element');
    //attach the event listener to the conversation elements
    conversationElements.forEach((conversationElement) => {
        conversationElement.addEventListener('click', async (event) => {
            const conversationID = conversationElement.getAttribute('key');
            const productID = conversationElement.getAttribute('productKey');
            //select the conversation from the array
            const conversation = conversationsArray.find(conversation => conversation.IDConversacion === conversationID);
            const usuarioFotoID = conversation.IDVendedor === User.load().uid ? conversation.IDComprador : conversation.IDVendedor;
            const foto = await getUsuarioFoto(usuarioFotoID);
            const nombre = conversation.IDVendedor === User.load().uid ? conversation.NombreComprador : conversation.NombreVendedor;
            document.getElementById('chat-header').innerHTML = `
            <img src="data:image/png;base64,${foto.Foto}"
            class="w-12 h-12 rounded-full mr-4">
            <h2 class="font-bold">${nombre}</h2>
        `;
            await messagesRenderer().renderConversationMessages(conversationID, productID);
        });
    });
}
function handleAcceptQuote(){
    const acceptButton = document.getElementById('aceptar-cot');
    acceptButton.addEventListener('click', async () => {
        //Solamente tomaremos en cuenta el elemento padre del botón para los valores a enviar
        const form = acceptButton.parentElement.parentElement;
        const idCotizacion = form.getAttribute('key');
        const idProducto = document.getElementById('chat-messages').getAttribute('productoKey');
        const cantidad = form.querySelector('#cantidad-producto').innerText.split(' ')[1];
        const precio = form.querySelector('#precio-producto').innerText.split('$')[1];
        await updateCotizacion(idCotizacion, idProducto, 'Aceptado', cantidad, precio);
    });
}
function handleRejectQuote(){
    const rejectButton = document.getElementById('rechazar-cot');
    rejectButton.addEventListener('click', async () => {
        //Solamente tomaremos en cuenta el elemento padre del botón para los valores a enviar
        const form = rejectButton.parentElement.parentElement;
        const idCotizacion = form.getAttribute('key');
        const idProducto = document.getElementById('chat-messages').getAttribute('productoKey');
        const cantidad = form.querySelector('#cantidad-producto').innerText.split(' ')[1];
        const precio = form.querySelector('#precio-producto').innerText.split('$')[1];
        await updateCotizacion(idCotizacion, idProducto, 'Rechazado', cantidad, precio);
    });
}


async function getNombreProducto(idProduct){
    const response = await api.products.getNombreProducto(idProduct);
    switch (response.status){
        case 200:
            const data = await response.json();
            return data;
        case 401:
            return null;
        default:
            return null;
    }
}

async function renderMessage(message) {
    if (message.Tipo === 'mensaje') {
        const usuario = User.load();
        return `
                <div class="flex flex-col ${
            usuario.uid === message.IDEmisor ? 'items-end' : 'items-start'
        }">
                    <div class="${
            usuario.uid === message.IDEmisor ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'
        } rounded-lg p-2 max-w-xs">
                        <p>${message.Contenido}</p>
                    </div>
                    <span class="text-xs text-gray-500 mt-1">${formatDate(message.Fecha)}</span>
                </div>
            `;
    } else if (message.Tipo === 'cotizacion') {
        //only display the accept and reject buttons if the user role is comprador
        let buttons = '';
        const user = User.load();
        const isComprador = user.rol === 'comprador';
        const nombreProducto = await getNombreProducto(message.IDProducto);
        if (isComprador && message.Status === 'Pendiente') {
            buttons = `
                <div class="flex justify-between mt-2">
                    <button id="aceptar-cot" class="bg-green-500 text-white p-2 rounded">Aceptar</button>
                    <button id="rechazar-cot" class="bg-red-500 text-white p-2 rounded">Rechazar</button>
                </div>
            `;
        }

        return `
                <div id="form-cotizacion" key="${message.IDCotizacion}" class="bg-gray-700 rounded-lg p-4 max-w-md">
                    <h4 class="font-bold">${nombreProducto.Nombre}</h4>
                    <p id="cantidad-producto" class = "text-lg">Cantidad: ${message.Cantidad}</p>
                    <p id="precio-producto" class="text-lg">Precio individual: $${message.Precio}</p>
                    <p class="text-xs text-gray-500"> Este precio se multiplica por la cantidad para obtener el total</p>
                    <p class="text-sm mt-2">${message.Detalles}</p>
                    ${buttons}
                    <div class="flex justify-between mt-2">
                        <p class="text-sm text-gray-500">Estado: ${message.Status}</p>
                    </div>
                    <span class="text-xs text-gray-500 mt-1">${formatDate(message.Fecha)}</span>
                </div>
            `;
    }
}
function renderConversation(IDConversacion, IDVendedor,IDProducto,foto, NombreVendedor, IDComprador, NombreComprador, FechaUltimoMensaje, IDEmisorUltimoMensaje, TextoUltimoMensaje){
    const user = User.load();
    if(user.uid === IDEmisorUltimoMensaje && TextoUltimoMensaje !== "No hay mensajes"){
        TextoUltimoMensaje = `Tú: ${TextoUltimoMensaje}`;
    }
    const nombreDisplay = user.uid === IDVendedor ? NombreComprador : NombreVendedor;
    return `
            <div id="conversacion-element" key="${IDConversacion}" productKey ="${IDProducto}" class=" flex items-center p-4 cursor-pointer hover:bg-gray-700">
                <img src="data:image/png;base64,${foto}" alt="seller" class="w-12 h-12 rounded-full">
                <div class="ml-4">
                    <h4 class="font-semibold">${nombreDisplay}</h4>
                    <p class="text-sm text-gray-500">${TextoUltimoMensaje}</p>
                </div>
            </div>
        `;

}


export default function messagesRenderer(){
    return{
        renderMain: async function(){

            const chatList = document.getElementById('chat-list');
            const conversations = await getConversacionesUsuario();
            if (conversations.length === 0){
                chatList.innerHTML = '<p class="text-center text-gray-400">No hay conversaciones</p>';
                return;
            }
            const conversationsHTML = await Promise.all(conversations.map(async conversation => {
                //push the conversation to the array
                conversationsArray.push(conversation);
                const usuario = User.load();
                const idUserToGet = conversation.IDVendedor === usuario.uid ? conversation.IDComprador : conversation.IDVendedor;
                const foto = await getUsuarioFoto(idUserToGet);
                const name = conversation.IDVendedor === User.load().uid ? conversation.NombreVendedor : conversation.NombreVendedor;
                return renderConversation(conversation.IDConversacion, conversation.IDVendedor, conversation.IDProducto, foto.Foto, name, conversation.IDComprador, conversation.NombreComprador, conversation.FechaUltimoMensaje, conversation.IDEmisorUltimoMensaje, conversation.TextoUltimoMensaje);
            }
            ));
            chatList.innerHTML = conversationsHTML.join('');
            document.getElementById('create-form-btn').classList.add('hidden');
            document.getElementById('message-input').classList.add('hidden');
            document.getElementById('send-message-btn').classList.add('hidden');

        },
        renderConversationMessages: async function(idConversation, idProducto){
            const messages = await getMensajesConversacion(idConversation);
            if (messages.length === 0 || messages === null){
                document.getElementById('chat-messages').innerHTML = '<p class="text-center text-gray-400">No hay mensajes</p>';
                document.getElementById('chat-messages').setAttribute('key', idConversation);
                document.getElementById('chat-messages').setAttribute('productoKey', idProducto);
                return;
            }
            const messagesHTML = await Promise.all(messages.map(async message => {
                return await renderMessage(message);
            }
            ));
            document.getElementById('chat-messages').innerHTML = messagesHTML.join('');
            document.getElementById('chat-messages').setAttribute('key', idConversation);
            document.getElementById('chat-messages').setAttribute('productoKey', idProducto);

            //Show the message input, the send message button, and if the user rol is vendedor, show the create form button
            if(User.load().rol === 'vendedor'){
                document.getElementById('create-form-btn').classList.remove('hidden');
            }
            document.getElementById('message-input').classList.remove('hidden');
            document.getElementById('send-message-btn').classList.remove('hidden');
            handleAcceptQuote();
            handleRejectQuote();


        }
    }
}