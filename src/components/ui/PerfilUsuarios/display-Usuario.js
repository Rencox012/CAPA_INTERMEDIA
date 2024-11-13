//(componente que contendra la informacion del usuario
import api from "../../../api/api.js";
const user = {
    type: 'vendedor', // 'comprador' o 'vendedor'
    isPrivate: false,
    photo: '/placeholder.svg?height=150&width=150',
    firstName: 'Juan',
    lastName: 'Pérez',
    wishLists: [
        { name: 'Electrónicos', items: ['Smartphone', 'Laptop', 'Auriculares'] },
        { name: 'Libros', items: ['El Quijote', '1984', 'Cien años de soledad'] }
    ],
    products: ['Camiseta', 'Pantalón', 'Zapatos', 'Gorra']
};

async function getUserInfo(userID) {
    const response = await api.users.getUserInfo(userID);
    switch (response.status) {
        case 200:
            return await response.json();
        case 404:
            return null;
        default:
            throw new Error('Error al obtener la información del usuario');
    }
}
async function getUserFoto(userId){
    const response = await api.users.getUsuarioFoto(userId);
    switch (response.status) {
        case 200:
            return await response.json();
        case 404:
            return null;
        default:
            throw new Error('Error al obtener la información del usuario');
    }
}
async function getListasUsuario(userId){
    const response = await api.lists.getListasOtroUsuario(userId);
    switch (response.status) {
        case 200:
            return await response.json();
        case 404:
            return null;
        default:
            throw new Error('Error al obtener la información del usuario');
    }
}
async function getProductosLista(listaId){
    const response = await api.lists.getProductosLista(listaId);
    switch (response.status) {
        case 200:
            let data = await response.json();
            return data['data'];
        case 201:
            return [];
        case 404:
            return null;
        default:
            throw new Error('Error al obtener la información del usuario');
    }
}
async function getProductosUsuario(idUsuaro){
    const response = await api.products.getProductosUsuario(idUsuaro);
    switch (response.status) {
        case 200:
            return await response.json();
        case 404:
            return null;
        default:
            throw new Error('Error al obtener la información del usuario');
    }
}
async function getProductoFoto(productoId){
    const response = await api.products.getProductPicture(productoId);
    switch (response.status) {
        case 200:
            return await response.json();
        case 404:
            return null;
        default:
            throw new Error('Error al obtener la información del usuario');
    }
}
export default function InfoUsuario(){
    return{
        async render() {
            const paramsUrl = new URLSearchParams(window.location.search);
            const userID = paramsUrl.get('id');
            const user = await getUserInfo(userID);
            const userFoto = await getUserFoto(userID);
            let listas = [];
            let productos = [];
            if(user.Rol === 'comprador'){
                 listas = await getListasUsuario(userID);
            }
            else{
                productos = await getProductosUsuario(userID);
            }



            const profileContainer = document.getElementById('userProfile');
            let profileHTML = `
                <div class="flex items-center mb-6">
                    <img src="data:image/png;base64,${userFoto.Foto}"
                    alt="Foto de perfil" class="w-24 h-full rounded-full mr-4 object-cover">
                    <div>
                        <h1 class="text-2xl font-bold text-white">${user.Nombre} ${user.Apellidos}</h1>
                        <p class="text-gray-400">${user.Rol.charAt(0).toUpperCase() + user.Rol.slice(1)}</p>
                    </div>
                </div>
            `;

            if (user.Rol === 'comprador') {
                if (user.Publico === 0) {
                    profileHTML += `<p class="text-gray-400">Esta cuenta es privada.</p>`;
                } else {
                    profileHTML += `
                        <div class="mb-4">
                            <label for="wishlist" class="block text-gray-400 mb-2">Lista de deseos:</label>
                            <select id="wishlist" class="bg-dark-100 text-gray-100 rounded p-2 w-full">
                                ${listas.map(list => `<option value="${list.IDLista}" name="${list.Nombre}">${list.Nombre}</option>`).join('')}
                            </select>
                        </div>
                        <div id="wishlistItems" class="bg-dark-100 rounded p-4">
                            <!-- Los items de la lista de deseos se mostrarán aquí -->
                        </div>
                    `;
                }
            } else if (user.Rol === 'vendedor') {
                profileHTML += `
                    <h2 class="text-xl font-semibold mb-4">Productos ofrecidos:</h2>
                    <ul class="bg-dark-100 rounded p-4 gap-4">
                        ${
                    await Promise.all(productos.map(async product => {
                        const foto = await getProductoFoto(product.IDProducto);
                        return `<li class="flex items-center mb-2">
                            <img src="data:image/png;base64,${foto[0].Portada}" alt="Foto del producto" class="w-8 h-8 object-cover rounded-full mr-2">
                            <a href="/CAPA_INTERMEDIA/src/pages/producto.php?id=${product.IDProducto}">
                            <p class="text-white font-semibold">${product.Nombre}</p>
                            <p class="text-gray-400">$${product.Precio}</p>
                            </a>
                        </li>`;
                    })
                    ).then(items => items.join(''))
                }
                    </ul>
                `;
            }

            profileContainer.innerHTML = profileHTML;

            if (user.Rol === 'comprador' && user.Publico === 1) {
                const wishlistSelect = document.getElementById('wishlist');
                const wishlistItems = document.getElementById('wishlistItems');

                async function updateWishlistItems() {
                    //get the selected list
                    const selectedList = listas.find(list => list.IDLista === wishlistSelect.value);
                    let productosLista = await getProductosLista(selectedList.IDLista);
                    if(productosLista.length === 0 || productosLista === null || productosLista === undefined){
                        wishlistItems.innerHTML = `
                        <h3 class="font-semibold mb-2">${selectedList.Nombre}</h3>
                        <p>No hay productos en esta lista</p>
                        `;
                        return;
                    }
                    wishlistItems.innerHTML = `
                        <h3 class="font-semibold mb-2 text-white">${selectedList.Nombre}</h3>
                        <ul>
                            ${
                            await Promise.all(productosLista.map(async product => {
                                const productPicture = await getProductoFoto(product.IDProducto);
                                return `<li class="mb-2 flex items-center">
                                    <img src="data:image/png;base64,${productPicture[0].Portada}" alt="Foto del producto" class="w-8 h-8 object-cover rounded-full mr-2">
                                    <a href="/CAPA_INTERMEDIA/src/pages/producto.php?id=${product.IDProducto}">
                                    <p class="text-white">${product.NombreProducto}</p>
                                    </a>
                                </li>`;
                            })).then(items => items.join(''))
                            }
                        </ul>
                    `;
                }

                wishlistSelect.addEventListener('change', updateWishlistItems);
                updateWishlistItems(); // Mostrar la primera lista por defecto
            }
        }
    }
}