//componente que renderiza las ventas del usuario
import {categoriasArray} from "./ventas.js";
function renderCategoriaHTML(categorias){
    return categorias.map((categoria) => {
        //get the category name comparing the ID to the ID in the array
        let categoriaNombre = categoriasArray.find((cat) => cat.IDCategoria === categoria.IDCategoria).Nombre;
        return `<span id="categorias" key="${categoria.IDCategoria}" class="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            ${categoriaNombre}
        </span>`
    }).join(' ')
}
export default function ventasWrapper(){
    return{
        render: (idTransaccion, idProducto, precio, fechaVenta, nombreProducto, calificacion, existencias, foto, categorias) => {
            //render the categories
            let categoriasHTML = ""
            if(categorias !== null){
                categoriasHTML = renderCategoriaHTML(categorias);
            }
            return `
            <div id="${idTransaccion}" class="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                <div class="flex items center justify-between mb-4">
                    <span class="text-sm text-gray-500">ID Transacción: #${idTransaccion}</span>
                    <span class="text-sm text-gray-500">Fecha: ${fechaVenta}</span>
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
                    <span class="text-lg font-bold">Calificación: ${calificacion}</span>
                </div>
            </div>
            `


        }
    }
}