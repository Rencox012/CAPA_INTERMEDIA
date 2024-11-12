//Componente que contendra todos los productos a ser aprovados o rechazados

import api from "../../../api/api.js";
import {User} from "../../../utility/classes/User.js";
import auth from "../../../utility/middleware/auth.js";

async function getProductosPendientes(){
    const response = await api.products.getProductosPendientes()
    switch (response.status){
        case 200:
            return response.json()
        case 401:
            return null
    }
}
async function updateProducto(idProducto, estado){
    const user = User.load();
    const response = await api.products.updateProductoStatus(idProducto, estado, user.uid)
    switch (response.status){
        case 200:
            return response
        case 401:
            return response
    }
}

function handleAprobarProducto(){
    //We will append the event listener to all the aceptar buttons
    const aprobarButtons = document.querySelectorAll("#aprobar")
    aprobarButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const idProducto = event.target.getAttribute("key")
            const resposne = await updateProducto(idProducto, "Aprovado")
            switch (resposne.status){
                case 200:
                    console.log("Producto aprovado")
                    alert("Producto aprovado")
                    location.reload()
                    break
                case 401:
                    alert("Error al aprovar producto")
            }

        })
    })

}

function handleRechazarProducto(){
    //We will append the event listener to all the rechazar buttons
    const rechazarButtons = document.querySelectorAll("#rechazar")
    rechazarButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const idProducto = event.target.getAttribute("key")
            const response = await updateProducto(idProducto, "Rechazado")
            switch (response.status){
                case 200:
                    console.log("Producto rechazado")
                    alert("Producto rechazado")
                    location.reload()
                    break
                case 401:
                    alert("Error al rechazar producto")
                    break;
                default:
                    alert("Error desconocido al rechazar producto")

            }
        })
    })
}

export function assignEvents(){
    handleAprobarProducto()
    handleRechazarProducto()
}

function renderCard(idProducto, nombre, descripcion, vendedor, imagen){
    return`
    <div id="${idProducto}" class="bg-gray-800 rounded-lg shadow-lg p-6">
                <img src="data:image/png;base64,${imagen}"
                alt="${nombre}" class="w-full h-48 object-cover mb-4 rounded"
                >
                <h3 class="text-xl font-semibold mb-2">${nombre}</h3>
                <p class="text-gray-400 mb-2">${descripcion}</p>
                <p class="text-gray-500 mb-4">Vendedor: ${vendedor}</p>
                <div class="flex justify-between">
                    <button
                    id="aprobar"
                    key="${idProducto}"
                     class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Aprobar
                    </button>
                    <button class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    id="rechazar"
                    key="${idProducto}"
                    >
                        Rechazar
                    </button>
                </div>
            </div>`
}

export default function productosAprovar(){
    return{
        render: async () => {

            if(!auth().isAdmin()){
               //redirect the user back to the home page
                window.location.href = "/CAPA_INTERMEDIA/src/index.php"
            }

            const productos = await getProductosPendientes()
            let productosHTML = "";
            if(productos && productos.length > 0) {
                await Promise.all(productos.map(async producto => {
                    const responseFoto = await api.products.getProductPicture(producto.IDProducto)
                    const foto = await responseFoto.json()
                    productosHTML += renderCard(producto.IDProducto, producto.NombreProducto, producto.DescripcionProducto, producto.NombreVendedor,foto[0].Portada)
                }
                ));
            }
            else{
                productosHTML = "<h1 class='text-3xl text-center text-gray-400'>No hay productos pendientes por aprobar</h1>"
            }

            return productosHTML;

        }
    }
}