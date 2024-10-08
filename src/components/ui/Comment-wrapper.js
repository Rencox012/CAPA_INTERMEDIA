//Component that accepts a comment object and displays the comment

export default function CommentWrapper(){

    return{
        render(id, Usuario, FotoPerfil, Comentario, Calificacion, Fecha, Activo){
            if(Activo == 0){
                //we send back a comment saying the comment was removed by an administrator
                return `
                <div class="flex flex-col w-full p-4 bg-white rounded-lg shadow-lg" id= ${id} >
                    <div class="flex items-center justify-between">
                        <span class="text-red-500">Este comentario ha sido eliminado por un administrador</span>
                    </div>
                </div>
                `;

            }    
            return `
            <div class="flex flex-col w-full p-4 bg-white rounded-lg shadow-lg" id= ${id} >
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                          <img class="w-12 h-12 rounded-full" src="data:image/png;base64,${FotoPerfil}" alt="Foto de perfil de ${Usuario}">
                        </div>
                        <div class="ml-4">
                            <h2 class="text-lg font-semibold">${Usuario}</h2>
                            <p class="text-sm text-gray-500">${Fecha}</p>
                        </div>
                    </div>
                    <div class="flex items-center">
                        <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <p class="text-sm text-gray-500">${Calificacion}/5</p>
                    </div>
                </div>
                <p class="mt-4 text-gray-600">${Comentario}</p>
            </div>
            `;
    }
}
}