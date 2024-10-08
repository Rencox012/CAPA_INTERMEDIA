//a component that will contain the main results of the search, this includes all cards, pages fetched along with pagination, and the results count
import CardWrapper from "./Card-wrapper.js";
import api from "../../api/api.js";

async function obtainAllCards (page){
      // Call the login function
      const response = await api.products.getCardsPage(page)
        return response.json();

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
            const tarjetas = response.map((card) => {
                return CardWrapper().render(card.NombreProducto, card.Calificacion, card.Precio, card.Portada, card.NombreVendedor, card.IDProducto);
            }).join('\n');

            return `
                <div class="w-full p-4">
                    <div class="flex items-center mt-4">
                        <h2 class="text-2xl font-semibold">Cursos</h2>
                    </div>
                    <div class="flex flex-wrap gap-8 justify-center">
                        ${tarjetas}
                    </div>
                </div>
            `;
        }
    };
}