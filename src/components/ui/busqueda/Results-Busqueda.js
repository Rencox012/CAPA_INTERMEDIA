import api from "../../../api/api.js";
import CardWrapper from "../Card-wrapper.js";
import TarjetaUsuario from "./tarjetaUsuario.js";

async function getBusquedaProductos(query, filter, page){
    const response = await api.products.getBusquedaProductos(query, filter, page);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        case 404:
            alert ("No se encontraron productos. Regresando a la página principal");
            window.location.href = "../index.php";
        default:
            console.log("Error al obtener los productos");
            return null;
    }
}
async function getFotoProducto(productoID){
    const response = await api.products.getProductPicture(productoID);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener la foto del producto");
            return null;
    }
}
async function getBusquedaServicios(query, filter, page){
    const response = await api.products.getBusquedaServicios(query, filter, page);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        case 404:
            alert ("No se encontraron servicios. Regresando a la página principal");
            window.location.href = "../index.php";
        default:
            console.log("Error al obtener los servicios");
            return null;
    }
}
async function getBusquedaVendedores(query, page){
    const response = await api.users.getBusquedaVendedores(query, page);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        case 404:
            alert ("No se encontraron vendedores. Regresando a la página principal");
            window.location.href = "../index.php";
        default:
            console.log("Error al obtener los vendedores");
            return null;
    }
}
async function getBusquedaCompradores(query, page){
    const response = await api.users.getBusquedaCompradores(query, page);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        case 404:
            alert ("No se encontraron compradores. Regresando a la página principal");
            window.location.href = "../index.php";
        default:
            console.log("Error al obtener los compradores");
            return null;
    }
}

export default function Results(){
    return{
        renderProductos: async function(query, filter, page){
            const productos = await getBusquedaProductos(query, filter, page);

            let productosHTML = await Promise.all(productos.map(async producto => {
                const foto = await getFotoProducto(producto.IDProducto);
                    return await CardWrapper().render(producto.NombreProducto, producto.Calificacion, producto.Precio, foto[0].Portada, producto.NombreVendedor, producto.IDProducto, producto.Tipo);
            })
            );
            return productosHTML.join('');
        },
        renderServicios: async function(query, filter, page){
            const servicios = await getBusquedaServicios(query, filter, page);

            let serviciosHTML = await Promise.all(servicios.map(async servicio => {
                const foto = await getFotoProducto(servicio.IDProducto);
                    return await CardWrapper().render(servicio.NombreProducto, servicio.Calificacion, servicio.Precio, foto[0].Portada, servicio.NombreVendedor, servicio.IDProducto, servicio.Tipo);
            })
            );
            return serviciosHTML.join('');
        },
        renderVendedores: async function(query, page){
            const vendedores = await getBusquedaVendedores(query, page);

            let vendedoresHTML = await Promise.all(vendedores.map(async vendedor => {
                    return await TarjetaUsuario().render(vendedor);
            })
            );
            return vendedoresHTML.join('');
        },
        renderCompradores: async function(query, page){
            const compradores = await getBusquedaCompradores(query, page);

            let compradoresHTML = await Promise.all(compradores.map(async comprador => {
                    return await TarjetaUsuario().render(comprador);
            })
            );
            return compradoresHTML.join('');
        },
    }
}