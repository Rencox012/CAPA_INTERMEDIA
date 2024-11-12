

export default function comprasWrapper(){
    return{
        render: (idTransaccion,idProducto,fechaCompra, foto, idCategoria,nombreCategoria,nombreProducto,valoracion,precio) =>{
            return`
                <div class="bg-white rounded-lg shadow-md p-6 max-w-md w-full">
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-sm text-gray-500">ID Transacción: #${idTransaccion}</span>
                        <span class="text-sm text-gray-500">Fecha: ${fechaCompra}</span>
                    </div>
                    <div class="flex items-center mb-4">
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
                            Categoría: ${nombreCategoria}
                        </span>
                    </div>
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center">
                            <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <span class="ml-1 text-sm font-semibold">${valoracion}</span>
                        </div>
                        <span class="text-lg font-bold">$${precio}</span>
                    </div>
                </div>
            `
            
        }
    }
}