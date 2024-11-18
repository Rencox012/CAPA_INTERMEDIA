import api from "../../../api/api.js";
import {User} from "../../../utility/classes/User.js";
import {categoriasArray} from "./ventas.js";
import productosWrapper from "./productos-wrapper.js";

export let productosArray = [];
async function getProductosUsuario(){
    const user = User.load();
    const response = await api.products.getProductosUsuario(user.uid);
    switch(response.status){
        case 200:
            return response.json();
        default:
            return null;
    }
}
async function getProductoFoto(id){
    const response = await api.products.getProductPicture(id);
    switch(response.status){
        case 200:
            return response.json();
        default:
            return null;
    }
}
async function getCategoriasProducto(id){
    const response = await api.categories.getCategoriasProducto(id);
    switch(response.status){
        case 200:
            return response.json();
        default:
            return null;
    }
}

function filterCategory(){
    //Get the select element
    const select = document.getElementById('categorias-Productos');
    if(select === null){
        return;
    }
    select.addEventListener('change', () => {
        //if the value of the select is 0, we show all the elements
        if(select.value === '0'){
            productosArray.forEach((producto) => {
                document.getElementById(producto.IDProducto).classList.remove('hidden');
            });
            return;
        }
        productosArray.forEach((producto) => {
            const categorias = producto.categorias;
            if (categorias === null || categorias.length === 0){
                document.getElementById(producto.IDProducto).classList.add('hidden');
                return;
            }
            //iterate through the categories of the product
            let found = false;
            categorias.forEach((cat) => {
                    if(cat.IDCategoria === select.value){
                        found = true;
                    }
                }
            );
            if(!found){
                document.getElementById(producto.IDProducto).classList.add('hidden');
            }else{
                document.getElementById(producto.IDProducto).classList.remove('hidden');
            }
        });
    });
}

export function assignFunctions() {
    filterCategory();
}


export default function productos(){
    return{
        render: async () => {
            const user = User.load();
            const productos = await getProductosUsuario();
            if(productos === null){
                return `
                <div class="perfil-info">
                    <h1>Productos</h1>
                    <p>No tienes productos en venta</p>
                </div>
                `
            }

            let productosHTML = "";
            for (const producto of productos) {
                const foto = await getProductoFoto(producto.IDProducto);
                const categorias = await getCategoriasProducto(producto.IDProducto);
                productosArray.push({
                    IDProducto: producto.IDProducto,
                    Nombre: producto.Nombre,
                    Precio: producto.Precio,
                    Cantidad: producto.Cantidad,
                    categorias: categorias,
                    tipo: producto.Tipo,
                    status: producto.Status
                });
                productosHTML += productosWrapper().render(producto.IDProducto, producto.Precio, producto.Tipo, producto.Nombre, producto.Tipo, producto.Cantidad, foto[0].Portada, categorias);
            }
            return `
            <div id="Filtros-Productos" class = "text-white mb-4">
                <h2
                class="text-white text-2xl font-semibold mt-10"
                >Productos</h2>
                <!-- filtros basados en el mes y año de la venta, y la categoria del producto -->
                <div class="flex flex-row items-center w-full">
                    <span class="text-white mr-5">Filtros</span>
                    <div class="flex flex-row items-center w-full ">
                        <div class="flex flex-row items-center w-full gap-2">
                            <label for="categoria">Categoria</label>
                            <select
                            name="categoria"
                            id="categorias-Productos"
                            class="bg-gray-200 rounded-lg text-black p-2"
                            >
                            <option value="0">Todas</option>
                                ${categoriasArray.map((categoria) => {
                return `
                                    <option value="${categoria.IDCategoria}">
                                        ${categoria.Nombre}
                                    </option>
                                    `
            }).join("")}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
                <div class="productos-container">
                    <div class="flex flex-col items-center justify-items-center w-full overflow-y-scroll gap-2">
                        ${productosHTML}
                    </div>
                </div>
            `

        }
    }
}