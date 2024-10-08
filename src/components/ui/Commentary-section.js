//component that will contain all the comments of a product
import CommentWrapper from "./Comment-wrapper.js";
import api from "../../api/api.js";

async function obtainAllComments (id){
    // Call the login function
    const response = await api.comments.getComments(id)
        return response.json();
}

export default function CommentarySection() {
    return{
        render: async () => {
            //obtain the id of the product from the url
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');

            //obtain the comments from the server
            const response = await obtainAllComments(id);
            console.log("DATA IS: ", response);

            

            //create the comments
            const comentarios = response.map((comment) => {
                //convert the date to only day, month and year
                const date = new Date(comment.Fecha_creacion);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('es-MX', options);
                return CommentWrapper().render(comment.IDComentario, comment.Nombre, comment.Foto, comment.Texto, comment.Valoracion, formattedDate, comment.Status);
            }).join('\n');1

            return `
                <div class="w-full p-4">
                    <div class="flex items-center px-20 mt-4">
                        <h2 class="text-2xl text-white font-semibold">Comentarios</h2>
                    </div>
                    <div class="flex flex-col gap-8 px-20 justify-center items-center">
                        ${comentarios}
                    </div>
                </div>
            `;
        }
    }
}