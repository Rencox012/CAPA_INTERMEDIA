//Componente que se encargara de mostrar la cantidad de paginas disponibles para el usuario
import api from "../../../api/api.js";


async function getPaginasProductosBusqueda(query){
    const response = await api.products.getPaginasProductosBusqueda(query);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener las paginas de los productos");
            return null;
    }
}
async function getPaginasServiciosBusqueda(query){
    const response = await api.products.getPaginasServiciosBusqueda(query);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener las paginas de los servicios");
            return null;
    }
}
async function getPaginasVendedores(query){
    const response = await api.users.getPaginasVendedores(query);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener las paginas de los vendedores");
            return null;
    }
}
async function getPaginasCompradores(query){
    const response = await api.users.getPaginasCompradores(query);
    switch (response.status){
        case 200:
            return await response.json();
        case 201:
            return null;
        default:
            console.log("Error al obtener las paginas de los compradores");
            return null;
    }
}

export default function paginas(){
    return{
        renderProductos: async function (query, page, filter) {
            let paginas = await getPaginasProductosBusqueda(query);
            paginas = paginas.PaginasDisponibles;

            if (paginas == null || paginas <= 1) {
                return null;
            }

            let paginasHTML = '';

            // Definimos el rango de páginas a mostrar alrededor de la página actual
            const rangeStart = Math.max(1, page - 2);
            const rangeEnd = Math.min(paginas, page + 2);

            // Agregar la primera página siempre
            if (page > 3) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Products&query=${query}&page=1&filter=${filter}" class="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-md text-gray-500 text-sm hover:bg-gray-100">
                1
            </a>
        `;
            }

            // Mostrar puntos suspensivos si la página actual está lejos del inicio
            if (page > 4) {
                paginasHTML += `
            <span class="inline-flex items-center justify-center w-8 h-8 text-gray-500 text-sm">...</span>
        `;
            }

            // Agregar páginas en el rango alrededor de la página actual
            for (let i = rangeStart; i <= rangeEnd; i++) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Products&query=${query}&page=${i}&filter=${filter}" class="inline-flex items-center justify-center w-8 h-8 ${i === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                ${i}
            </a>
        `;
            }

            // Mostrar puntos suspensivos si la página actual está lejos del final
            if (page < paginas - 3) {
                paginasHTML += `
            <span class="inline-flex items-center justify-center w-8 h-8 text-gray-500 text-sm">...</span>
        `;
            }

            // Agregar la última página siempre
            if (page < paginas - 2) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Products&query=${query}&page=${paginas}&filter=${filter}" class="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-md text-gray-500 text-sm hover:bg-gray-100">
                ${paginas}
            </a>
        `;
            }

            return paginasHTML;
        },
        renderServicios: async function (query, page, filter) {
            let paginas = await getPaginasServiciosBusqueda(query);
            paginas = paginas.PaginasDisponibles;

            if (paginas == null || paginas <= 1) {
                return null;
            }

            let paginasHTML = '';

            // Definimos el rango de páginas a mostrar alrededor de la página actual
            const rangeStart = Math.max(1, page - 2);
            const rangeEnd = Math.min(paginas, page + 2);

            // Agregar la primera página siempre
            if (page > 3) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Services&query=${query}&page=1&filter=${filter}" class="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-md text-gray-500 text-sm hover:bg-gray-100">
                1
            </a>
        `;
            }

            // Mostrar puntos suspensivos si la página actual está lejos del inicio
            if (page > 4) {
                paginasHTML += `
            <span class="inline-flex items-center justify-center w-8 h-8 text-gray-500 text-sm">...</span>
        `;
            }

            // Agregar páginas en el rango alrededor de la página actual
            for (let i = rangeStart; i <= rangeEnd; i++) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Services&query=${query}&page=${i}&filter=${filter}" class="inline-flex items-center justify-center w-8 h-8 ${i === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                ${i}
            </a>
        `;
            }

            // Mostrar puntos suspensivos si la página actual está lejos del final
            if (page < paginas - 3) {
                paginasHTML += `
            <span class="inline-flex items-center justify-center w-8 h-8 text-gray-500 text-sm">...</span>
        `;
            }

            // Agregar la última página siempre
            if (page < paginas - 2) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Services&query=${query}&page=${paginas}&filter=${filter}" class="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-md text-gray-500 text-sm hover:bg-gray-100">
                ${paginas}
            </a>
        `;

            }
        },
        renderVendedores: async function (query, page) {
            let paginas = await getPaginasVendedores(query);
            paginas = paginas.total_paginas;

            if (paginas == null || paginas <= 1) {
                return null;
            }

            let paginasHTML = '';

            // Definimos el rango de páginas a mostrar alrededor de la página actual
            const rangeStart = Math.max(1, page - 2);
            const rangeEnd = Math.min(paginas, page + 2);

            // Agregar la primera página siempre
            if (page > 3) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Sellers&query=${query}&page=1" class="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-md text-gray-500 text-sm hover:bg-gray-100">
                1
            </a>
        `;
            }

            // Mostrar puntos suspensivos si la página actual está lejos del inicio
            if (page > 4) {
                paginasHTML += `
            <span class="inline-flex items-center justify-center w-8 h-8 text-gray-500 text-sm">...</span>
        `;
            }

            // Agregar páginas en el rango alrededor de la página actual
            for (let i = rangeStart; i <= rangeEnd; i++) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Sellers&query=${query}&page=${i}" class="inline-flex items-center justify-center w-8 h-8 ${i === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                ${i}
            </a>
        `;
            }

            // Mostrar puntos suspensivos si la página actual está lejos del final
            if (page < paginas - 3) {
                paginasHTML += `
            <span class="inline-flex items-center justify-center w-8 h-8 text-gray-500 text-sm">...</span>
        `;
            }

            // Agregar la última página siempre
            if (page < paginas - 2) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Sellers&query=${query}&page=${paginas}" class="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-md text-gray-500 text-sm hover:bg-gray-100">
                ${paginas}
            </a>
        `;
            }
        },
        renderCompradores: async function (query, page) {
            let paginas = await getPaginasCompradores(query);
            paginas = paginas.total_paginas;

            if (paginas == null || paginas <= 1) {
                return null;
            }

            let paginasHTML = '';

            // Definimos el rango de páginas a mostrar alrededor de la página actual
            const rangeStart = Math.max(1, page - 2);
            const rangeEnd = Math.min(paginas, page + 2);

            // Agregar la primera página siempre
            if (page > 3) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Buyers&query=${query}&page=1" class="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-md text-gray-500 text-sm hover:bg-gray-100">
                1
            </a>
        `;
            }

            // Mostrar puntos suspensivos si la página actual está lejos del inicio
            if (page > 4) {
                paginasHTML += `
            <span class="inline-flex items-center justify-center w-8 h-8 text-gray-500 text-sm">...</span>
        `;
            }

            // Agregar páginas en el rango alrededor de la página actual
            for (let i = rangeStart; i <= rangeEnd; i++) {
                paginasHTML += `
            <a href="/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Buyers&query=${query}&page=${i}" class="inline-flex items-center justify-center w-8 h-8 ${i === page ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} border border-gray-300 rounded-md text-sm hover:bg-gray-100">
                ${i}
            </a>
        `;
            }

            // Mostrar puntos suspensivos si la página actual está lejos del final
            if (page < paginas - 3) {
                paginasHTML += `
            <span class="inline-flex items-center justify-center w-8 h-8 text-gray-500 text-sm">...</span>
        `;
            }

            // Agregar la última página siempre
            if (page < paginas - 2) {
                paginasHTML += `
            <a href = "/CAPA_INTERMEDIA/src/pages/Busqueda.php?search=Buyers&query=${query}&page=${paginas}" class="inline-flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-md text-gray-500 text-sm hover:bg-gray-100">
                ${paginas}
            </a>
        `;
            }
        }
    }
}