import api from "../../../api/api.js";
import {User} from "../../../utility/classes/User.js";
import ventasWrapper from "./ventas-wrapper.js";

export let categoriasArray = [];
let ventasArray = [];

async function getVentasUsuario(){
    const user = User.load();
    const response = await api.products.getVentasUsuarios(user.uid);
    switch (response.status){
        case 200:
            return await response.json();
        case 404:
            return [];
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
async function getCategoriasProducto(id){
    const response = await api.categories.getCategoriasProducto(id);
    switch (response.status){
        case 200:
            return await response.json();
        case 404:
            return [];
        default:
            return null;
    }
}
async function getFotoProducto(idProducto){
    const response = await api.products.getProductPicture(idProducto);
    switch (response.status){
        case 200:
            return await response.json();
        case 404:
            return [];
        default:
            return null;
    }
}
function validationYear(){
    //Get the year input
    const year = document.getElementById('anio');
    //attach a listener that won't allow the user to insert letters or special characters
    year.addEventListener('input', () => {
        year.value = year.value.replace(/[^0-9]/g, '');
    }
    );
}
function filterMonthYear(){
    //when the user selects a month or year, we will check what elements in the ventasArray does not math the criteria, and hide them
    const mes = document.getElementById('mes');
    const anio = document.getElementById('anio');
    mes.addEventListener('change', () => {
        //if the month or year are empty, we show all the elements
        if(mes.value === '0' || anio.value === ''){
            ventasArray.forEach((venta) => {
                document.getElementById(venta.IDTransaccion).classList.remove('hidden');
            });
            return;
        }
        ventasArray.forEach((venta) => {
            const fecha = new Date(venta.FechaVenta);
            if(fecha.getMonth() + 1 !== parseInt(mes.value) || fecha.getFullYear() !== parseInt(anio.value)){
                document.getElementById(venta.IDTransaccion).classList.add('hidden');
            }else{
                document.getElementById(venta.IDTransaccion).classList.remove('hidden');
            }
        });
    });
    anio.addEventListener('change', () => {
        ventasArray.forEach((venta) => {
            const fecha = new Date(venta.FechaVenta);
            if(fecha.getMonth() + 1 !== parseInt(mes.value) || fecha.getFullYear() !== parseInt(anio.value)){
                document.getElementById(venta.IDTransaccion).classList.add('hidden');
            }else{
                document.getElementById(venta.IDTransaccion).classList.remove('hidden');
            }
        });
    });
}
function filterCategory(){
    //when the user selects a category, obtain the categories that belong to the product and compare them to the selected category
    const categoria = document.getElementById('categoria');
    categoria.addEventListener('change', () => {
        //if the value of the select is 0, we show all the elements
        if(categoria.value === '0'){
            ventasArray.forEach((venta) => {
                document.getElementById(venta.IDTransaccion).classList.remove('hidden');
            });
            return;
        }
        ventasArray.forEach((venta) => {
            const categorias = venta.Categorias;
            //iterate through the categories of the product
            let found = false;
            categorias.forEach((cat) => {
                if(cat.IDCategoria === categoria.value){
                    found = true;
                }
            }
            );
            if(!found){
                document.getElementById(venta.IDTransaccion).classList.add('hidden');
            }else{
                document.getElementById(venta.IDTransaccion).classList.remove('hidden');
            }
            //Clear the other filters
            document.getElementById('mes').value = 0;
            document.getElementById('anio').value = '';
        });
    });
}

export function assignFunctions(){
    validationYear();
    filterMonthYear();
    filterCategory();
}
export default function ventas(){
    return{
        render: async () => {
            categoriasArray = await getCategorias();
            if(categoriasArray === null){
                return `
                <div class="ventas hidden">
                    <div class="ventas-container">
                        <h2>Ventas</h2>
                        <div class="ventas-list">
                            <p>No se han realizado ventas</p>
                        </div>
                    </div>
                </div>
                `;
            }
            const ventas = await getVentasUsuario();
            if(ventas === null){
                return `
                <div class="ventas hidden">
                    <div class="ventas-container">
                        <h2>Ventas</h2>
                        <div class="ventas-list">
                            <p>No se han realizado ventas</p>
                        </div>
                    </div>
                </div>
                `;
            }


            const ventasHTML = await Promise.all(
                ventas.map(async (venta) => {
                    ventasArray.push(venta);
                    const categoriasProducto = await getCategoriasProducto(venta.IDProducto);
                    ventasArray[ventasArray.length - 1].Categorias = categoriasProducto;
                    const foto = await getFotoProducto(venta.IDProducto);
                    return ventasWrapper().render(venta.IDTransaccion, venta.IDProducto, venta.PrecioProducto, venta.FechaVenta, venta.NombreProducto, venta.CalificacionProducto, venta.ExistenciaActual, foto[0].Portada, categoriasProducto);
                })
            )
            return `
            <div id="Filtros" class = "text-white mb-4">
                <h2
                class="text-white text-2xl font-semibold mt-10"
                >Ventas</h2>
                <!-- filtros basados en el mes y año de la venta, y la categoria del producto -->
                <div class="flex flex-row items-center w-full">
                    <span class="text-white mr-5">Filtros</span>
                    <div class="flex flex-row items-center w-full ">
                        <div class="flex flex-row items-center w-full gap-2">
                            <label for="mes">Mes</label>
                            <select
                            name="mes"
                            id="mes"
                            class="bg-gray-200 rounded-lg text-black p-2"
                            >
                                <option value="0">Todos</option>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Septiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                        </div>
                        <div class="flex flex-row items-center w-full gap-2">
                            <label for="anio">Año</label>
                            <input
                            type="number"
                            name="anio"
                            id="anio"
                            class="bg-gray-200 rounded-lg text-black p-2"
                            />
                        </div>
                        <div class="flex flex-row items-center w-full gap-2">
                            <label for="categoria">Categoria</label>
                            <select
                            name="categoria"
                            id="categoria"
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
                <div class="flex flex-col  overflow-hidden h-full">
                    
                    <div class="flex flex-col items-center justify-items-center w-full h-full overflow-y-scroll gap-2 pb-32">
                        ${ventasHTML.join("")}
                    </div>
                </div>
            `;

        }
    }
}