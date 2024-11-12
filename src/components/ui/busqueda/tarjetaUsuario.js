//Tarjeta para despleguar la informacion del usuario.
import api from "../../../api/api.js";
async function getUserFoto(idUsuario){
    const response = await api.users.getUsuarioFoto(idUsuario);
    switch(response.status){
        case 200:
            return await response.json();
        default:
            return null;
    }
}

export default function TarjetaUsuario(){
    return{
        render: async (usuario) => {

            const foto = await getUserFoto(usuario.IDUsuario);
            if(foto === null){
                return `
                    <div></div>
                `
            }

            return `
            <a 
            href="/CAPA_INTERMEDIA/src/pages/PerfilUsuario.php?id=${usuario.IDUsuario}"
            class="card-container mt-4 w-full sm:w-6/12 md:w-4/12 lg:w-2/12 min-h-96 max-h-[408px] p-2"
            id = "${usuario.IDUsuario}"
            >
            <div class="mt-4 w-full h-full hover:scale-105 transition-all ">
                <div class="transition-all ease-out bg-white/90 rounded-lg shadow-lg overflow-hidden h-full hover:shadow-xl">
                <img 
                    class="w-full h-56 object-cover object-center" 
                    src="data:image/png;base64,${foto.Foto}"
                    alt="${usuario.Nombre}"
                    onerror="this.src='/BDM/global/default_course_image.png';"
                />
                <div class="p-4 flex flex-col space-y-4  justify-center">
                    <h1 class="font-bold text-lg truncate">${usuario.Nombre}</h1>
                    
                </div>
                </div>
            </div>
            </a>
            `;
        }
    }
}