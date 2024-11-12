import api from "../../../api/api.js";
import { User } from "../../../utility/classes/User.js";
import comprasWrapper from "./compras-wrapper.js";

export let comprasArray = [];

async function getUsuarioCompras(id){
    const response = await api.users.getUsuarioCompras(id);
    switch(response.status){
        case 200:
            return response.json();
        default:
            return null;
    }
}

async function getProductoPicture(idProducto){
    const response = await api.products.getProductPicture(idProducto);
    switch(response.status){
        case 200:
            return response.json();
        default:
            return null;
    }
}

export default function comprasRecientes(){
    return{
        render: async () => {
            const user = User.load();

            const compras = await getUsuarioCompras(user.uid);
            if(compras === null){
                return `
                    <div></div>
                `
            }
            const comprasHTML = await Promise.all(compras.map(async (compra) => {
                const imagen = await getProductoPicture(compra.IDProducto);
                comprasArray.push(compra);
                return comprasWrapper().render(compra.IDTransaccion, compra.IDProducto, compra.FechaCompra, imagen[0].Portada, compra.IDCategoria, compra.NombreCategoria, compra.NombreProducto, compra.PromedioValoracion, compra.PrecioProducto);
            }
            ));

            return`
            <h1 class="text-white text-2xl font-semibold mt-10">Compras recientes</h1>
                <div class="flex flex-col w-full h-full items-center justify-items-start gap-4 overflow-y-scroll pb-20">
                    ${comprasHTML.join("")}
                </div>
            `
        } 
    }
}