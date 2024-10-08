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

export function assignFunctions(){
    //this function assigns the functions to the elements
    console.log ("assigning functions");
    handleImageChange();
}

export default function Producto() {
    return {
        render: (name, video, images, price, rating, descripcion, reviewNumber, seller, sellerID, tipo) => {

            //Segun el tipo de producto, se mostrará el precio y el boton de comprar, o se mostrará que es un servicio y un boton de contactar al vendedor
            const tipoProducto = tipo === "Producto" ? `<span class="text-green font-bold text-lg">$${price} MXN</span>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2">Añadir al carrito</button>` :
            `<span class="text-green font-bold text-lg">Servicio</span><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2" id=${sellerID}>Contactar al vendedor</button>`;

            return `
            <div class="w-11/12 h-10/12 bg-white rounded-lg shadow-lg p-4">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between">
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
                <div class="flex flex-col md:flex-row mt-4 h-[48rem]">
                    <div class="flex flex-col md:w-7/12">
                        <div class="flex flex-col gap-4 h-full">
                            <div class="flex flex-col gap-2 h-[38rem]">
                                <h2 class="text-lg font-semibold text-gray-800">Descripción</h2>
                                <p class="text-gray-500 text-sm">${descripcion}</p>
                            </div>
                            
                        </div>
                    </div>
                    <div class="flex flex-col md:w-5/12 mt-4 md:mt-0 ">
                        <div class="flex flex-col gap-4 h-full">
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
                            <div class="flex flex-col items-center mt-4">
                                ${tipoProducto}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col mt-4">
                    <h2 class="text-lg font-semibold text-gray-800">Vendedor</h2>
                    <p class="text-gray-500 text-sm">${seller}</p>
                </div>
            </div>
            `;
        }
    }
}