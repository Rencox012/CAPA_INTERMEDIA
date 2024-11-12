
import ProductoWrapper, { productosArray } from "./Producto-wrapper.js";
import api from "../../../api/api.js";
import {User} from "../../../utility/classes/User.js";

function handleCardInput(){
    //function that makes sure no letters are introduced in the card number, and to separate the number in groups of 4, not allowing more than 16 digits
    const cardNumber = document.getElementById("NumeroTarjeta");
    cardNumber.addEventListener("input", (e) => {
        const value = e.target.value;
        const newValue = value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
        if(newValue.length > 19){
            e.target.value = value.slice(0, 19);
        }
        else{
            e.target.value = newValue;
        }
    }
    );
}
function handleDayInput(){
    //function that makes sure no letters are introduced in the day, and to separate the number in groups of 2, not allowing more than 2 digits and it to be greater than 31
    const day = document.getElementById("Dia");
    day.addEventListener("input", (e) => {
        const value = e.target.value;
        const newValue = value.replace(/\D/g, "").replace(/(.{2})/g, "$1 ").trim();
        if(newValue.length > 2){
            e.target.value = value.slice(0, 2);
        }
        else{
            e.target.value = newValue;
        }
    }
    );
}
function handleMonthInput(){
    //function that makes sure no letters are introduced in the month, and to separate the number in groups of 2, not allowing more than 2 digits and it to be greater than 12
    const month = document.getElementById("Mes");
    month.addEventListener("input", (e) => {
        const value = e.target.value;
        const newValue = value.replace(/\D/g, "").replace(/(.{2})/g, "$1 ").trim();
        if(newValue.length > 2){
            e.target.value = value.slice(0, 2);
        }
        else{
            e.target.value = newValue;
        }
    }
    );
}
function handleNameInput(){
    //function that makes sure no numbers are introduced in the name
    const name = document.getElementById("NombreTitular");
    name.addEventListener("input", (e) => {
        const value = e.target.value;
        const newValue = value.replace(/\d/g, "");
        e.target.value = newValue;
    }
    );
}
function handleCCVInput(){
    //function that makes sure no letters are introduced in the ccv, and to separate the number in groups of 3, not allowing more than 3 digits
    const ccv = document.getElementById("CCV");
    ccv.addEventListener("input", (e) => {
        const value = e.target.value;
        const newValue = value.replace(/\D/g, "").replace(/(.{3})/g, "$1 ").trim();
        if(newValue.length > 3){
            e.target.value = value.slice(0, 3);
        }
        else{
            e.target.value = newValue;
        }
    }
    );
}
function handleCardValidation(){
    //we validate that the introduced card is a valid card
    let cardNumber = document.getElementById("NumeroTarjeta").value;
    const cardHolder = document.getElementById("NombreTitular").value;
    const expirationDate = document.getElementById("Dia").value + "/" + document.getElementById("Mes").value;
    const ccv = document.getElementById("CCV").value;

    //trim the spaces from the card
    cardNumber = cardNumber.replace(/\s/g, "");
    if(cardNumber.length != 16){
        alert("El número de tarjeta debe tener 16 dígitos");
        return false;
    }
    if(cardHolder.length < 1){
        alert("El nombre del titular no puede estar vacío");
        return false;
    }
    if(expirationDate.length != 5){
        alert("La fecha de vencimiento debe tener el formato MM/YY");
        return false;
    }
    if(ccv.length != 3){
        alert("El código de seguridad debe tener 3 dígitos");
        return false;
    }
    return true;
}

async function handlePay(){
    const valid = handleCardValidation();
    if(!valid){
        return;
    }
    const usuario = User.load();

    for (const producto of productosArray) {
        const total = producto.Precio * producto.CantidadEnCarrito;
        const response = await api.transactions.insertTransacction(producto.IDElemento, producto.IDProducto, producto.CantidadEnCarrito, usuario.uid, total, "Tarjeta de crédito");
        if(response.status !== 200){
            console.error("Error al insertar la transacción");
        }
        else{
            console.log("Transacción insertada correctamente");
            //remove all elements from the productos array
            productosArray.splice(0, productosArray.length);
            //reload the products in page
            const newProductos = await ProductoWrapper().updateProductos();
            //Replace the current page with the new one
            const objetosContainer = document.getElementById('Carrito-objetos-container');
            objetosContainer.innerHTML = newProductos;
        }
        console.log(response);
    }
}

export function assignListeners(){
    const pagar = document.getElementById("pagar");
    if(pagar){
        pagar.addEventListener("click", async () => {
            await handlePay();
        });
    }
    handleCardInput();
    handleDayInput();
    handleMonthInput();
    handleNameInput();
    handleCCVInput();
}

export default function MetodosPago(){
    return{
        render: async () => {

            //calculate the total from the productos array, taking the price and the quantity
            let total = 0;
            productosArray.forEach(producto => {
                total += producto.Precio * producto.CantidadEnCarrito;
            });
            return `
                <span class="text-white text-center text-2xl font-semibold mt-10">Métodos de pago</span>
                <div
                class="flex flex-row gap-3 justify-start items-center mt-10"
                >
                    <button
                    class="w-full h-full p-2 mt-2 bg-zinc-500 hover:bg-zinc-300 hover:scale-110 transition-all duration-300 rounded-lg"
                    >
                    Tarjeta de crédito
                    </button>
                    <div id="paypal-button-container"></div>
                    <p id="result-message"></p>
                </div>

                <div class="flex flex-col justify-start items-center mt-10" id="tarjeta-credito">
                    <span class="text-white text-center text-xl font-semibold">Tarjeta de crédito</span>
                    <label for="NumeroTarjeta" class="text-white">Numero de tarjeta</label>
                    <input type="text" class="w-full p-2 mt-2" placeholder="Número de tarjeta" id="NumeroTarjeta">
                    <label for="NombreTitular" class="text-white">Nombre del titular</label>
                    <input type="text" class="w-full p-2 mt-2" placeholder="Nombre del titular" id="NombreTitular">
                    <label for="FechaVencimiento" class="text-white mt-4">Fecha de vencimiento</label>
                    <div
                    class="flex justify-between items-center w-full pb-5"
                    >
                        <label for="" class="text-white pr-1">Dia</label>
                        <input type="text" class="w-2/6 p-2 mt-2" placeholder="Dia" id="Dia">
                        <label for="" class="text-white">Mes</label>
                        <input type="text" class="w-2/6 p-2 mt-2" placeholder="Mes" id="Mes">
                    </div>
                    
                    <label for="CCV" class="text-white">Código de seguridad</label>
                    <input type="text" class="w-4/6 p-2 mt-2" placeholder="Código de seguridad" id="CCV">
                </div>

                <div class="flex flex-col justify-start items-center mt-10">
                    <span class="text-white text-center text-xl font-semibold">Total</span>
                    <span class="text-white text-center text-xl font-semibold" id="total">$${total}</span>
                </div>
                <div class="flex w-full flex-row justify-center items-center mt-10">
                    <button class="w-full h-full p-2 mt-2 bg-zinc-500 hover:bg-zinc-300 hover:scale-110 transition-all duration-300 rounded-lg"
                    id="pagar"
                    >
                    Pagar
                    </button>
                </div>
                    `;
        }
    }
}