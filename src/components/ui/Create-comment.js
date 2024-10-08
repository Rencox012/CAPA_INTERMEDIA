//component that contains the make a comment form, allowing the user to write and leave a review based in stars from 0 to 5
import { User } from "../../utility/classes/user.js";
import api from "../../api/api.js";
async function handleSubmitComment(id){
    //obtain the values from the form
    const comment = document.getElementById('Texto-Comentario').value;
    //obtain which radio button is checked
    try {   
        const rating = document.querySelector('input[name="rating"]:checked').value;
        if(rating == null){
            alert("Por favor selecciona una calificación");
            return false;
        }
    }
    catch (error) {
        alert("Por favor selecciona una calificación");
        return false;
    }
    const rating = document.querySelector('input[name="rating"]:checked');
    const userID = User.GetUID();
    //send the comment to the server
    await api.comments.createComment(id, comment, rating.value, userID)
        .then(response => {
            if(response.status == 201){
                alert("Comentario enviado");
                //reload the page to see the comment
                window.location.reload();
            }
        })
        .catch(error => {
            console.log("Error: ", error);
        });
}

export function assignFunctions(){
    //assign the function to the form
    document.getElementById('comentario').addEventListener('submit', (event) => {
        event.preventDefault();
        const id = new URLSearchParams(window.location.search).get('id');
        handleSubmitComment(id);
    });
}


export default function CreateComment(){
    return{
        render: () => {
            console.log ("RENDERING CREATE COMMENT");
            return `
            <div class=" mx-24 p-4 bg-white/10 rounded-2xl">
                <div class="flex items-center px-20 mt-4">
                    <h2 class="text-2xl text-white font-semibold">Deja un comentario</h2>
                </div>
                <div class="flex flex-col gap-8 px-20 justify-center items-center">
                    <form class="w-full flex flex-col gap-4 items-center" method= "POST" id="comentario">
                        <input type="text" class="w-11/12 h-40 p-4 rounded-lg shadow-lg" placeholder="Escribe tu comentario aquí" id="Texto-Comentario">
                        <div class="flex items-center gap-4">
                            <button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg">Enviar</button>
                            <div class="flex items-center gap-2">
                                <span class="text-white">Calificación:</span>
                                <div class="flex items-center gap-2">
                                    <fieldset id="rating" class = "flex items-center gap-2" required>
                                        <input type="radio" id="1" name="rating" value="1">
                                        <label for="1" class="text-white">1</label>
                                        <input type="radio" id="2" name="rating" value="2">
                                        <label for="2" class="text-white">2</label>
                                        <input type="radio" id="3" name="rating" value="3">
                                        <label for="3" class="text-white">3</label>
                                        <input type="radio" id="4" name="rating" value="4">
                                        <label for="4" class="text-white">4</label>
                                        <input type="radio" id="5" name="rating" value="5">
                                        <label for="5" class="text-white">5</label>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            `;
        }
    }
}