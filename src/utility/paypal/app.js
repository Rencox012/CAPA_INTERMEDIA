import { productosArray } from "../../components/ui/carrito/Producto-wrapper.js";
import api from "../../api/api.js";
import { User } from "../classes/User.js";
import ProductoWrapper from "../../components/ui/carrito/Producto-wrapper.js";
paypal.Buttons({
    createOrder: (data, actions) => {
        console.log(productosArray);
        const total = productosArray.reduce((sum, producto) => sum + producto.Precio * producto.CantidadEnCarrito, 0);

        const itemTotal = productosArray.reduce((sum, producto) => sum + producto.Precio * producto.CantidadEnCarrito, 0);

        if (total <= 0) {
            alert("No puedes comprar sin productos en el carrito");
            return;
        }

        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: total.toFixed(2), // The overall total amount
                    currency_code: "USD",
                    breakdown: {
                        item_total: {
                            value: total.toFixed(2), // Total of all items
                            currency_code: "USD"
                        }
                    }
                },
                description: 'Compra de productos',
                items: productosArray.map(producto => ({
                    name: producto.Nombre,
                    unit_amount: {
                        value: producto.Precio,
                        currency_code: "USD"
                    },
                    quantity: producto.CantidadEnCarrito
                }))
            }]
        });
    },
    onApprove: (data, actions) => {
        return actions.order.capture().then( async function(details) {
            document.getElementById('result-message').textContent = 'Pago completado por ' + details.payer.name.given_name;
            console.log('Detalles de la transacción:', details);

            const usuario = User.load();

            //For each product in the array, we create a transaction using the api
            for (const producto of productosArray) {
                const total = producto.Precio * producto.CantidadEnCarrito;
                const response = await api.transactions.insertTransacction(producto.IDElemento, producto.IDProducto, producto.CantidadEnCarrito, usuario.uid, total, "Paypal");
                if(response.status !== 200){
                    console.error("Error al insertar la transacción");
                    alert ("Error al insertar la transacción");
                    }
                    else{
                        console.log("Transacción insertada correctamente");

                    }
                console.log(response);
            }
            //once all the transactions are inserted, clean the array
            productosArray.length = 0;
            //reload the total
            const total = document.getElementById("total");
            total.innerHTML = "$0";
            alert("Compra realizada con éxito");
            location.reload();
        });
    },
    onError: (err) => {
        console.error("Error en el pago", err);
    }
}).render('#paypal-button-container');
