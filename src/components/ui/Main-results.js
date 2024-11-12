//a component that will contain the main results of the search, this includes all cards, pages fetched along with pagination, and the results count
import CardWrapper from "./Card-wrapper.js";
import api from "../../api/api.js";

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
        }
    };
}