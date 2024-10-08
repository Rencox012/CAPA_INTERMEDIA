//component that accetps a Name, a rating, a price, an image and who is selling it.

export default function CardWrapper(){
    
    return{
        render: (name, rating, price, image, seller, id) => {
            return `
            <a 
            href="/CAPA_INTERMEDIA/src/pages/producto.php?id=${id}"
            class="card-container mt-4 w-full sm:w-6/12 md:w-4/12 lg:w-2/12 min-h-96 max-h-[408px] p-2"
            id = "${id}"
            >
            <div class="mt-4 w-full h-full hover:scale-105 transition-all ">
                <div class="transition-all ease-out bg-white/90 rounded-lg shadow-lg overflow-hidden h-full hover:shadow-xl">
                <img 
                    class="w-full h-56 object-cover object-center" 
                    src="data:image/png;base64,${image}"
                    alt="${name}"
                    onerror="this.src='/BDM/global/default_course_image.png';"
                />
                <div class="p-4 flex flex-col space-y-4  justify-center">
                    <h1 class="font-bold text-lg truncate">${name}</h1>
                    <p class="text-gray-500 text-sm">Vendido por ${seller}</p>
                    
                    <div class="flex justify-between items-center mt-2">
                    <div class="text-black font-semibold text-sm rounded-lg flex items-center">
                        <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        ${rating} / 5
                    </div>
                    <div class="text-green-600 font-bold text-lg">$${price} MXN</div>
                    </div>
                </div>
                </div>
            </div>
            </a>
            `;
        }
    }
}