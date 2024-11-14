//Componente que recibe el ID del producto, el ID del elemnto carrito, el precio, la cantidad en cantidad en el carrito y el nombre del producto
import api from "../../../api/api.js"
import { User } from "../../../utility/classes/User.js"
export let productosArray = [];
let categoriasArray = [];

async function getCarrito(idUsuario){
    const response = await api.cart.getCart(idUsuario);
    const data = await response.json();
    return data;
}
async function getCarritoProductos(idCarrito){
    const response = await api.cart.getProductosCarrito(idCarrito);
    const data = await response.json();
    return data;
}
async function handleUpdateCantidad(idElemento, cantidad){
    const response = await api.cart.updateCantidadCarrito(idElemento, cantidad);
    //If we get a 200 status code, we return the image
    switch(response.status){
        case 200:
            return true;
        default:
            return false;
    }
}
async function handleDeleteElemento(idElemento){
    const response = await api.cart.deleteElementoCarrito(idElemento);
    //If we get a 200 status code, we return the image
    switch(response.status){
        case 200:
            return true;
        default:
            return false;
    }
}
function listenerUpdate(){
    const producto = document.getElementById("Producto");
    if(producto == null){
        return;
    }
    const idProducto = producto.getAttribute("key");
    const existencias = getExistencias(idProducto);

    const inputs = document.querySelectorAll("#quantity-selector");
    //Add the event listener for the inputs
    inputs.forEach((input) => {
        input.addEventListener("change", async (event) => {
            const idElemento = event.target.parentElement.parentElement.id;
            let cantidad = event.target.value;
            const cantidadCache = cantidad;
            if(cantidad < 1){
                event.target.value = 1;
                alert ("La cantidad mínima es 1");
                cantidad = 1;
            }
            if(cantidad > existencias){
                event.target.value = 200;
                alert ("La cantidad no puede superar las existencias");
                cantidad = existencias;

            }
            const success = await handleUpdateCantidad(idElemento, cantidad);
            if(success){
                //change the value in the array
                productosArray = productos.map((producto) => {
                    if(producto.IDElemento == idElemento){
                        producto.CantidadEnCarrito = cantidad;
                    }
                    return producto;
                });
            }else{
                alert("No se ha podido actualizar la cantidad");
                event.target.value = cantidadCache;
            }
        });
    });
}
function listenerDelete(){
    //Get all the cuantity inputs
    const buttons = document.querySelectorAll("#delete-button");
    //Add the event listener for the inputs
    buttons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const idElemento = event.target.parentElement.parentElement.id;
            const idProducto = productosArray.find((producto) => producto.IDElemento == idElemento).IDProducto;
            const success = await handleDeleteElemento(idElemento);
            if(success){
                //change the value in the array
                productosArray = productosArray.filter((producto) => {
                    return producto.IDElemento != idElemento;
                });
                document.getElementById(idElemento).remove();
            }else{
                alert("No se ha podido eliminar el producto");
            }
        });
    });
}
async function getProductoPicture(idProducto){
    const response = await api.products.getProductPicture(idProducto);
    //If we get a 200 status code, we return the image
    switch(response.status){
        case 200:
            const data = await response.json();
            return data;
        case 404:
            return null;
        default:
            return null;
    }
}
async function getProductoCategories(idProducto){
    const response = await api.categories.getCategoriasProducto(idProducto);
    //If we get a 200 status code, we return the image
    switch(response.status){
        case 200:
            const data = await response.json();
            return data;
        case 404:
            return null;
        default:
            return null;
    }
}
async function getCategorias() {
    const response = await api.categories.getCategories();
    switch (response.status){
        case 200:
            return await response.json();
        case 404:
            return [];
        default:
            return null;
    }
}
async function getExistencias(idProducto){
    const response = await api.products.getExistencias(idProducto);
    //If we get a 200 status code, we return the image
    switch(response.status){
        case 200:
            const data = await response.json();
            return data[0].Existencias;
        case 404:
            return null;
        default:
            return null;
    }
}
function renderCategoriaHTML(categorias){
    return categorias.map((categoria) => {
        //get the category name comparing the ID to the ID in the array
        let categoriaNombre = categoriasArray.find((cat) => cat.IDCategoria === categoria.IDCategoria).Nombre;
        return `<span id="categorias" key="${categoria.IDCategoria}" class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            ${categoriaNombre}
        </span>`
    }).join(' ')
}

export function assignListeners(){
    listenerUpdate();
    listenerDelete();
}
function renderProctoHTML(IDElemento, foto ,Precio,CantidadEnCarrito,Nombre, IDProducto, categorias){
    const precioTotal = Precio * CantidadEnCarrito;
    let categoriasHTML = ""
    if(categorias !== null){
        categoriasHTML = renderCategoriaHTML(categorias);
    }
    return `
            <div
            id="${IDElemento}"
            class="flex flex-row justify-between rounded-md items-center w-full bg-zinc-900 p-2 mt-2"
            >   
                <div class="flex flex-row justify-start items-center">
                    <img alt="placeholder" class="w-20 h-20"
                    src = "data:image/png;base64,${foto}"
                    onerror="this.src='/CAPA_INTERMEDIA/public/default_course_image.png';"
                    >
                    <a href="/CAPA_INTERMEDIA/src/pages/producto.php?id=${IDProducto}" class=" *:hover:underline text-white text-xl font-semibold ml-2">
                        <span id="Producto" key="${IDProducto}" class="text-white text-xl font-semibold ml-2">${Nombre}</span>
                    </a>
                    
                </div>
                 <span class="text-white text-base font-semibold">Categorías</span>
                    <div class="flex flex-row items-center ml-2">
                        ${categoriasHTML}
                    </div>
                <div class="flex flex-row justify-start items-center">
                   
                    <span class="text-white text-base font-semibold">Cantidad</span>
                    <input id="quantity-selector" type="number" value="${CantidadEnCarrito}"
                    class="w-2/6 p-2 ml-2 disabled:opacity-50 bg-zinc-900 text-white border-white border-2 rounded-md" 
                    >
                    <span class="text-white text-base font-semibold ml-2">Precio Total</span>
                    <span class="text-white text-base font-semibold ml-2">$${precioTotal}</span>
                    <button class="bg-red-500 p-2 ml-2 rounded-md transition-all hover:scale-105 active:scale-95 active:bg-black *:hover:scale-105 *:active:scale-95 *:active:fill-red-500"
                    id="delete-button"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 transition-all">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                    </svg>
                    </button>

                </div>
            </div>
            `

}

export default function ProductoWrapper(){
    return{
        render: async () => {

            const Usuario = User.load();

            const carritoID = await getCarrito(Usuario.uid);


            if(carritoID == null){
                alert ("No se ha podido cargar el carrito");
                window.location.href = "dashboard.php";
            }


            const productos = await getCarritoProductos(carritoID.IDCarrito);

            categoriasArray = await getCategorias();


            if(productos == null){
                alert ("No se ha podido cargar los productos del carrito");
                window.location.href = "dashboard.php";
            }
            if(productos.length == 0){
                return `
                <div class="flex flex-col justify-center items-center w-full">
                    <span class="text-white text-2xl font-semibold">No hay productos en el carrito</span>
                </div>
                `
            }

            let html = "";

            html = await Promise.all(productos.map(async (producto) => {
                productosArray.push(producto);
                const foto = await getProductoPicture(producto.IDProducto);
                const categorias = await getProductoCategories(producto.IDProducto);
                return renderProctoHTML(producto.IDElemento, foto[0].Portada, producto.Precio, producto.CantidadEnCarrito, producto.Nombre, producto.IDProducto, categorias);
            }));

            return html.join("");


            
            
        },
        updateProductos: async () => {
            //Function that updates the products in the cart when they are deleted, using the array as a reference
            if(productosArray.length == 0){
                return `
                <div class="flex flex-col justify-center items-center w-full">
                    <span class="text-white text-2xl font-semibold">No hay productos en el carrito</span>
                </div>
                `
            }

            let html = "";

            html = await Promise.all(productosArray.map(async (producto) => {
                const foto = await getProductoPicture(producto.IDProducto);
                return renderProctoHTML(producto.IDElemento, foto[0].Portada, producto.Precio, producto.CantidadEnCarrito, producto.Nombre);
            }
            ));

            return html.join("");

        }
    }
}