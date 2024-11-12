//MOdule that returns the html code for the wishlist
import api from "../../api/api.js"

async function getProductosListas(idLista){
    const response = await api.lists.getProductosLista(idLista);
    switch(response.status){
        case 200:
            const data = await response.json();
            const productos = data.data;
            return productos;
        default:
            return null;
    }
}

async function getProductoPicture(idProducto){
    const response = await api.products.getProductPicture(idProducto);
    //If we get a 200 status code, we return the image
    switch(response.status){
        case 200:
            const data = await response.json();
            return data[0];
        case 404:
            return null;
        default:
            return null;
    }
}

export default function WishListWrapper(){
    return{
        render: async (idLista) => {

            //if id lista is null, we return an empty div
            if(idLista === null){
                return `
                    <div></div>
                `
            }

            const productos = await getProductosListas(idLista);

            //If productos is null, render an empty div
            if(productos === null){
                return `
                    <div></div>
                `
            }

            const productosHTML = await Promise.all (productos.map(async (producto) => {
                const imagen = await getProductoPicture(producto.IDProducto);
                return`
                    <li id=${producto.IDElemento} class="flex flex-row justify-between  items-center text-2xl w-full text-white font-semibold bg-slate-800 rounded-md p-4">
                        <div class="flex items-center justify-start">
                            <img class="w-10 h-10 mr-2" 
                            src = "data:image/png;base64,${imagen.Portada}"
                            onerror="this.src='/CAPA_INTERMEDIA/public/default_course_image.png';"  
                            >
                            <a href="/CAPA_INTERMEDIA/src/pages/producto.php?id=${producto.IDProducto}"
                            class=" *:hover:underline"
                            >
                                <span>${producto.NombreProducto}</span>
                            </a>
                        </div>
                        <div class="flex items-center justify-end">
                            <span class="text-white font-semibold">$${producto.PrecioProducto}</span>
                            <button
                            id="delete-button"
                            class = "transition-all bg-red-500 hover:bg-red-700 hover:scale-105 text-white font-bold p-2 rounded-md ml-2 active:bg-red-400 active:scale-90"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </li>
                    `

            }
            ));

            return`
                <div id="wishlisht-main" class="">

                    <div class="flex items-center px-20 mt-4">
                        <ul class="flex items-center w-full">
                            ${productosHTML.join('')}
                        </ul>
                    </div>

                </div>
            `
        }
    }
}