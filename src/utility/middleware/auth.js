//Middleware para verificar si el usuario esta autenticado, o tiene permisos para estar en cierta pagina
import {User} from "../classes/User.js";

export default function auth(){
    return{
        isLoggedIn: () =>{
            const user = User.load()
            if(user === null || user === undefined){
                return false
            }
            return true
        },
        isAdmin: () => {
            const user = User.load()
            if(user === null || user === undefined){
                return false
            }
            return user.rol === "Admin" || user.rol === "superAdmin"
        },
        isVendedor: () =>{
            const user = User.load()
            if(user === null || user === undefined){
                return false
            }
            return user.rol === "Vendedor" || user.rol === "vendedor"
        },
        isOwner: (idUsuario) =>{
            const user = User.load()
            if(user === null || user === undefined){
                return false
            }
            return user.uid === idUsuario
        }
    }
}