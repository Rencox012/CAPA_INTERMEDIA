//a component that will contain the main results of the search, this includes all cards, pages fetched along with pagination, and the results count
import CardWrapper from "./Card-wrapper.js";
import api from "../../api/api.js";

let categoriasArray = [];

async function obtainAllCards (page){
      // Call the login function
      const response = await api.products.getCardsPage(page)
        return response.json();

}
async function getProductoFoto(productoID){
    const response = await api.products.getProductPicture(productoID);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener la foto del producto");
            return null;
    }
}
async function getTarjetaProducto(idProducto){
    const response = await api.products.getTarjetaProducto(idProducto);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener la tarjeta del producto");
            return null;
    }
}
async function getMasVendidos(){
    const response = await api.products.getProductosMasVendidos();
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener los productos más vendidos");
            return null;
    }
}
async function getMejorValorados(){
    const response = await api.products.getProductosMejorValorados();
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener los productos mejor valorados");
            return null;
    }
}
async function getCategorias(){
    const response = await api.categories.getCategories();
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener las categorías");
            return null;
    }
}
async function getCategoriasProducto(idProducto){
    const response = await api.categories.getCategoriasProducto(idProducto);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener las categorías del producto");
            return null;
    }
}
export default function MainResults() {
    return {
        render: async () => {
            // obtain the page from the url
            const urlParams = new URLSearchParams(window.location.search);
            const page = urlParams.get('page') || 1;

            // obtain the cards from the server
            const response = await obtainAllCards(page);
            // create the cards
            const tarjetas = await Promise.all(
                response.map(async (producto) => {
                    const foto = await getProductoFoto(producto.IDProducto);
                    return CardWrapper().render(producto.NombreProducto, producto.Calificacion, producto.Precio, foto[0].Portada, producto.NombreVendedor, producto.IDProducto, producto.Tipo);
                })
            );

            return `
                <div class="w-full p-4">
                    <div class="flex flex-wrap gap-8 justify-center">
                        ${tarjetas}
                    </div>
                </div>
            `;
        },
        renderMasVendidos: async () => {
            //obtain the IDs from the server
            const productosIDs = await getMasVendidos();
            //get the card information
            let tarjetasData = "";
            for (const productoID of productosIDs){
                const tarjeta = await getTarjetaProducto(productoID.IDProducto);
                const categoriasProducto = await getCategoriasProducto(productoID.IDProducto);
                const foto = await getProductoFoto(productoID.IDProducto);
                tarjetasData += CardWrapper().render(tarjeta.NombreProducto, tarjeta.Calificacion, tarjeta.Precio, foto[0].Portada, tarjeta.NombreVendedor, tarjeta.IDProducto, tarjeta.Tipo);
            }
            return `
                <div class="w-full p-4">
                    <h2 class="text-2xl text-white font-bold text-center">Los productos mas vendidos!</h2>
                    <div class="flex flex-wrap gap-8 justify-center">
                        ${tarjetasData}
                    </div>
                </div>
            `;
        },
        renderMejorValorados: async () => {
            //obtain the IDs from the server
            const productosIDs = await getMejorValorados();
            //get the card information
            let tarjetasData = "";
            for (const productoID of productosIDs){
                const tarjeta = await getTarjetaProducto(productoID.IDProducto);
                const categoriasProducto = await getCategoriasProducto(productoID.IDProducto);
                const foto = await getProductoFoto(productoID.IDProducto);
                tarjetasData += CardWrapper().render(tarjeta.NombreProducto, tarjeta.Calificacion, tarjeta.Precio, foto[0].Portada, tarjeta.NombreVendedor, tarjeta.IDProducto, tarjeta.Tipo);
            }
            return `
                <div class="w-full p-4">
                    <h2 class="text-2xl text-white font-bold text-center">Los productos mejor valorados!</h2>
                    <div class="flex flex-wrap gap-8 justify-center">
                        ${tarjetasData}
                    </div>
                </div>
            `;
        }
    };
}