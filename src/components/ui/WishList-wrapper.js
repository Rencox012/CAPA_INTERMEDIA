//MOdule that returns the html code for the wishlist
export default function WishListWrapper(){
    return{
        render: async (idList) => {
            return`
                <div id="wishlisht-main" class="">

                    <div class="flex items-center px-20 mt-4">
                        <ul class="flex items-center">
                            <li class="text-2xl text-white font-semibold">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                </svg>
                                Listas de deseos
                            </div>

                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-2">Eliminar de la lista</button>

                            </li>
                        </ul>
                    </div>

                </div>
            `
        }
    }
}