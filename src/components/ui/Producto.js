import ListasDropdown from "./ListasDropdown.js";
import { User } from "../../utility/classes/user.js";
import api from "../../api/api.js";
//componente que muestra la información de un producto
//tiene varias imagenes del producto, nombre, precio, rating, descripción, número de reviews, vendedor y tags
function handleImageChange(){
    //this function is meant to change the image displayed, or hide the image display and show the video, viceversa too.
    console.log ("Entered the function");

    const imageDisplay = document.getElementById('images');
    const videoDisplay = document.getElementById('video');
    const images = document.querySelectorAll('#product-img');
    const videoButton = document.getElementById('Video-Button');
    
    videoButton.addEventListener('click', () => {
        console.log ("video button clicked");
        videoDisplay.classList.remove('hidden');
        imageDisplay.classList.add('hidden');
        videoButton.classList.add('bg-gray-300');
        images.forEach((image) => image.classList.remove('bg-gray-300'));
    });

    images.forEach((image, index) => {
        image.addEventListener('click', () => {
        //stop video from playing 
        videoDisplay.src = videoDisplay.src;
        videoDisplay.classList.add('hidden');
        imageDisplay.classList.remove('hidden');
        videoButton.classList.remove('bg-gray-300');
        images.forEach((image) => image.classList.remove('bg-gray-300'));
        image.classList.add('bg-gray-300');
        imageDisplay.src = image.src;
        });
    });

}

async function getCarrito(){
    //Get the user id
    const user = User.load();
    if(user !== null){
        //Get the carrito
        const response = await api.cart.getCart(user.uid);
        switch(response.status){
            case 200:
                const data = await response.json();
                console.log("CARRITO: ", data);
                return data;
            case 404:
                console.log("No se encontró el carrito");
                return null;
            default:
                console.log("Error al obtener el carrito");
                return null;
        }
    }
}

async function handleCantidadLimit(){
    //this function limits the amount of products that can be added to the cart
    const urlParams = new URLSearchParams(window.location.search);
    const productoID = urlParams.get('id');
    const cantidad = document.getElementById('cantidad');
    const response = await api.products.getExistencias(productoID)
    let existencias = 0;
    switch (response.status){
        case 200:
            const data = await response.json();
            //get element 0 from the data array
            existencias = data[0].Existencias;
            break;
        case 404:
            console.log("No se encontraron las existencias del producto");
            return;
        default:
            console.log("Error al obtener las existencias del producto");
            return;
    }
    cantidad.addEventListener('input', () => {
        if(cantidad.value > existencias){
            alert("No hay suficientes productos en existencia");
            cantidad.value = existencias;
        }
        else if(cantidad.value < 1){
            cantidad.value = 1;
        }
    });
}

async function insertConversation(){
    //get the contactar button
    const contactar = document.getElementById('contactar');
    //assign a listener
    contactar.addEventListener('click', async () => {
        //Get the user from the local storage
        const user = User.load();
        //get the seller ID from the contactar button
        const SellerID = document.getElementById('contactar').getAttribute('key');
        //get the product id from the url params
        const urlParams = new URLSearchParams(window.location.search);
        const productoID = urlParams.get('id');
        //call the api
        const response = await api.conversations.insertConversation(SellerID, user.uid , productoID);
        switch (response.status){
            case 200:
                console.log("Conversación creada");
                //send the user to the chat page
                window.location.href = "Chat.php";
            case 404:
                console.log("No se encontró el usuario");
                return null;
            default:
                console.log("Error al crear la conversación");
                return null;
        }
    });

}


async function getExistencias(){
    //this function gets the existencias of the product
    const urlParams = new URLSearchParams(window.location.search);
    const productoID = urlParams.get('id');
    const response = await api.products.getExistencias(productoID);
    switch(response.status){
        case 200:
            const data = await response.json();
            return data[0].Existencias;
        case 404:
            console.log("No se encontraron las existencias del producto");
            return 0;
        default:
            console.log("Error al obtener las existencias del producto");
            return 0;
    }
}

async function handleAddToCart(){
    //we will send the CartID, the productID and the quantity to the server
    const comprarBoton = document.getElementById('comprar-boton');
    comprarBoton.addEventListener('click', async () => {
        const carritoID = comprarBoton.getAttribute('key');
        const cantidad = document.getElementById('cantidad').value;
        if(cantidad === ""){
            console.log("No se ha seleccionado una cantidad");
            alert("Por favor selecciona una cantidad");
            return;
        }

        //obtain the procut id from the url, the value of id
        const urlParams = new URLSearchParams(window.location.search);
        const productoID = urlParams.get('id');
        
        const response = await api.cart.InsertarElementoCarrito(carritoID, productoID, cantidad);
        switch(response.status){
            case 200:
                console.log("Producto añadido al carrito");
                //Send the user to the cart page
                window.location.href = "carrito.php";
                break;
            case 404:
                console.log("No se encontró el carrito");
                alert("No se agrego el producto");
                break;
            default:
                console.log("Error al añadir el producto al carrito");
                break
        }
    });
}
export function assignFunctions(){
    handleImageChange();
    handleCantidadLimit();
    handleAddToCart();
    insertConversation();
}

export default function Producto() {
    return {
        render: async (name, video, images, price, rating, descripcion, reviewNumber, seller, sellerID, tipo) => {

            const existencias = await getExistencias();
            var agregarLista;
            const user = User.load();
            if(user !== null && user.rol !== "vendedor"){
                const elementoListas = await ListasDropdown().render(user.uid);
                agregarLista  = tipo === "Producto" ? 
                `
                ${elementoListas}
                `
                : ``;
            }
            else{
                agregarLista = ``;
            }

            const carritoID = await getCarrito();

            const userRole = user !== null ? user.rol : null;
            let tipoProducto = "";
            if(existencias === 0 || existencias === null){
                tipoProducto = `<span class="text-red font-bold text-lg">Producto agotado</span>`;
            }
            else{
                if(userRole !== "vendedor" && userRole !== null && userRole !== "admin" && userRole !== "superAdmin"){
                    //Segun el tipo de producto, se mostrará el precio y el boton de comprar, o se mostrará que es un servicio y un boton de contactar al vendedor, si es que el usuario no es un vendedor
                    tipoProducto = tipo === "Producto" ? `<span class="text-green font-bold text-lg">$${price} MXN</span>
                <!-- Input de numeros donde le permita al usuario seleccionar la cantidad de productos que quiere comprar -->
                <input type="number" id="cantidad" name="cantidad" min="1" max="100" class="w-1/4 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Cantidad" required>
                <button id="comprar-boton" key=${carritoID.IDCarrito} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2 overflow-x-visible">Añadir al carrito</button>`
                        :
                        `<span class="text-green font-bold text-lg">Servicio</span><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2 overflow-x-visible" id="contactar" key ="${sellerID}">Contactar al vendedor</button>`;
                }
            }



            

            return `
            <div class="w-full h-full bg-white rounded-lg shadow-lg p-4 overflow-hidden">
                <div class="flex flex-row md:flex-row md:items-center md:justify-between">
                    <div class="flex flex-col md:flex-row items-center justify-center md:justify-start">
                        <h1 class="text-2xl font-bold text-gray-800">${name}</h1>
                        <div class="flex items-center mt-2 md:mt-0 md:ml-4">
                            <div class="flex items-center">
                                <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                                <span class="text-black font-semibold text-sm">${rating} / 5</span>
                            </div>
                            <span class="text-gray-500 text-sm ml-2">${reviewNumber} reviews</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row md:flex-row mt-4 h-full pb-16">
                    <div class="flex flex-col md:w-7/12">
                        <div class="flex flex-col gap-4 h-full">
                            <div class="flex flex-col gap-2 h-[38rem]">
                                <h2 class="text-lg font-semibold text-gray-800">Descripción</h2>
                                <p class="text-gray-500 text-sm">${descripcion}</p>
                            </div>
                            <h2 class="text-lg font-semibold text-gray-800">Vendedor</h2>
                            <p class="text-gray-500 text-sm">${seller}</p>
                            
                        </div>
                    </div>
                    <div class="flex flex-col md:w-5/12 mt-4 md:mt-0 h-full overflow-x-visible">
                        <div class="flex flex-col gap-4 h-full overflow-y-scroll overflow-x-visible">
                            <h2 class="text-lg font-semibold text-gray-800">Imágenes</h2>
                            <div class="flex flex-col gap-2 h-full">
                                <div class="flex flex-col gap-2 h-full">
                                    <iframe class = "w-11/12 h-[30rem] object-cover object-center rounded-lg"
                                    id="video"
                                    src=${video} frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                    <img class="w-11/12 h-[30rem] object-contain object-center rounded-lg hidden" src="${images[0]}" alt="${name}" id="images" />
                                    <div class="flex gap-2">
                                        <button class="w-1/4 h-20 object-contain object-center rounded-lg hover:scale-105 transition-all hover:cursor-pointer bg-gray-300" id="Video-Button">
                                        Video
                                        </button>
                                        ${images.map((image, index) => `<img class="w-1/4 h-20 object-contain object-center rounded-lg hover:scale-105 transition-all hover:cursor-pointer"
                                            src="data:image/png;base64,${image}"
                                            alt="${name}" id="product-img" />`).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="flex flex-col items-center mt-4 overflow-x-visible">
                                ${tipoProducto}
                            </div>
                            <div class="flex flex-col items-center mt-4 overflow-visible">
                                ${agregarLista}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-row mt-4">
                   
                </div>
            </div>
            `;
        }
    }
}