//Componente que contendra el form para crear un producto nuevo
import api from "../../../api/api.js";
import {User} from "../../../utility/classes/User.js";
let selectedCategoriesArray = [

];

function handlePicturesChange(){
    const coverPhotoInput = document.getElementById('coverPhoto');
    const productPhotos = document.querySelectorAll('.product-photo');

    // Manejar la foto de portada
    coverPhotoInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const parent = coverPhotoInput.parentElement;
                parent.style.backgroundImage = `url(${e.target.result})`;
                parent.style.backgroundSize = 'cover';
                parent.style.backgroundPosition = 'center';
            }
            reader.readAsDataURL(file);
        }
    });

    // Manejar las fotos del producto
    productPhotos.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const parent = input.parentElement;
                    parent.style.backgroundImage = `url(${e.target.result})`;
                    parent.style.backgroundSize = 'cover';
                    parent.style.backgroundPosition = 'center';
                    parent.querySelector('span').style.display = 'none';
                }
                reader.readAsDataURL(file);
            }
        });
    });
}

function handleMaxTags(){
    //Once we hit the 3 tags, disable the tag select, and enable it once we remove a tag
    const tagSelect = document.getElementById('categorySelect');
    const selectedTags = document.getElementById('selectedCategories');

    tagSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedTags.children.length >= 3) {
            console.log(selectedTags.children.length);
           this.setAttribute('enabled', 'disabled');
        }
    }
    );

    //when the selectedCategoriesSet is smaller than 3 we can enable the tag select
    selectedTags.addEventListener('change', function() {
        if (selectedTags.children.length <= 2) {
            console.log(selectedTags.children.length);
            tagSelect.removeAttribute('disabled');
        }
    }
    );
}

function updateSelectedCategories() {
    const selectedCategories = document.getElementById('selectedCategories');
    selectedCategories.innerHTML = '';
    selectedCategoriesArray.forEach(category => {
        const categoryElement = document.createElement('span');
        categoryElement.className = 'bg-blue-500 text-white px-2 py-1 rounded-full text-sm';
        categoryElement.id = category.id;
        categoryElement.textContent = category.name;

        const removeButton = document.createElement('button');
        removeButton.className = 'ml-2 text-xs';
        removeButton.textContent = '×';
        removeButton.onclick = function() {
            //remove the category from the array
            selectedCategoriesArray = selectedCategoriesArray.filter(c => c.id !== category.id);
            //Add the category back to the select
            const categorySelect = document.getElementById('categorySelect');
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
            updateSelectedCategories();
        };

        categoryElement.appendChild(removeButton);
        selectedCategories.appendChild(categoryElement);
    });
}

function handleCategoriaSelect(){
    const categorySelect = document.getElementById('categorySelect');
    const selectedCategories = document.getElementById('selectedCategories');


    // Manejar la selección de categorías
    categorySelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        if (selectedOption.value && selectedCategoriesArray.length < 3) {
            //Push the category name along with the id to the selectedCategoriesSet
            selectedCategoriesArray.push({
                id: selectedOption.value,
                name: selectedOption.textContent
            })
            updateSelectedCategories();
            //remove the selected option from the select
            this.remove(this.selectedIndex);
        }
        this.selectedIndex = 0;
    });
}

function validationPrecio(){
    //Nos aseguramos que el precio nunca sea negativo o 0
    const precioInput = document.getElementById('precio');
    precioInput.addEventListener('input', function(e) {
        if (e.target.value <= 0) {
            e.target.value = 0;
        }
        //Nos aseguramos que el precio no entren letras o algo diferente a un número
        if (isNaN(e.target.value)) {
            e.target.value = 0;
        }

    }
    );
}
function validationCantidad(){
    //Nos aseguramos que la cantidad nunca sea negativa o 0
    const cantidadInput = document.getElementById('cantidad');
    cantidadInput.addEventListener('input', function(e) {
        if (e.target.value <= 0) {
            e.target.value = 0;
        }
        //Nos aseguramos que la cantidad no entren letras o algo diferente a un número
        if (isNaN(e.target.value)) {
            e.target.value = 0;
        }
    }
    );
}
function handleFormSubmit(){
    //get the form
    const form = document.getElementById('productForm');
    // Manejar el envío del formulario
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const user = User.load();

        //Primero, checamos que hay al menos una foto de los product-photos
        const productPhotos = document.querySelectorAll('.product-photo');
        let hasPhotos = false;
        productPhotos.forEach(photo => {
            if (photo.files.length > 0) {
                hasPhotos = true;
            }
        });
        if (!hasPhotos) {
            alert('Debes subir al menos una foto del producto');
            return
        }
        //Start by getting all information from the from
        const coverPhoto = document.getElementById('coverPhoto').files[0];
        const nombreProducto = document.getElementById('nombre-producto').value;
        const videoUrl = document.getElementById('video-url').value;
        let videoId = ""
        //Change the format of the video, from a normal link to an embed link
        if(videoUrl.includes('youtu.be')){
            //If the video is a shortened link, get the id after the / and before anny & or ? in the url
            videoId = videoUrl.split('/')[3];
            if(videoId.includes('&')){
                videoId = videoId.split('&')[0];
            }
            if(videoId.includes('?')){
                videoId = videoId.split('?')[0];
            }
        }else{
            videoId = videoUrl.split('v=')[1];
            if(videoId.includes('&')){
                videoId = videoId.split('&')[0];
            }
        }

        const newVideoUrl = `https://www.youtube.com/embed/${videoId}`;

        const tipo = document.getElementById('tipo-select').value;
        //Use the array to send the selected categories to the api, there must be at least 1
        if (selectedCategoriesArray.length < 1) {
            alert('Debes seleccionar al menos una categoría');
            return;
        }
        //Get the selected categories
        const selectedCategories = selectedCategoriesArray.map(category => category.id);

        //Si el input de cantidad esta deshabilitado, asignarle un valor de 1
        const cantidad = document.getElementById('cantidad').value || 1;
        const precio = document.getElementById('precio').value || 0;
        const descripcion = document.getElementById('descripcion').value;
        const userId = user.uid;

        //call the api
        const response = await api.products.insertProducto(userId, nombreProducto, cantidad, descripcion, precio, coverPhoto, tipo)
        let productoId = "";
        switch(response.status){
            case 200:
                const data = await response.json();
                productoId = data;
                break;
            case 400:
                alert('Error al crear el producto');
                return;
            default:
                alert('Error desconocido');
                return;

        }
        //Once we have the product id, we can add the photos from the productPhotos array
        for (const photo of productPhotos) {
            const photoFile = photo.files[0];
            if (photoFile) {
                const photoResponse = await api.products.insertMultimedia(productoId, photoFile, "Foto");
                switch(photoResponse.status){
                    case 200:
                        break;
                    case 400:
                        alert('Error al subir las fotos');
                        return;
                    default:
                        alert('Error desconocido');
                        return;
                }
            }
        }
        //We
        //Send the video url the same way as the photos
        const videoResponse = await api.products.insertMultimedia(productoId, newVideoUrl, "Video");

        switch(videoResponse.status){
            case 200:
                break;
            case 400:
                alert('Error al subir el video');
                return;
            default:
                alert('Error desconocido');
                return;
        }
        //Send them to the api
        for (const category of selectedCategories) {
            const response = await api.categories.insertCategoriesProducto(productoId, category);
            switch(response.status){
                case 200:
                    break;
                case 400:
                    alert('Error al insertar las categorías');
                    return;
                default:
                    alert('Error desconocido');
                    return;
            }
        }

        //Alert the user that the product was created and send it to the product page
        alert('Producto creado exitosamente');
        window.location.href = `producto.php?id=${productoId}`;
    });
}
function handleSelectedTipo(){
    //SI el producto es un servicio, deshabilitar la cantidad y el precio
    const tipoSelect = document.getElementById('tipo-select');
    const cantidadInput = document.getElementById('cantidad');
    const precioInput = document.getElementById('precio');

    tipoSelect.addEventListener('change', function(e) {
        if (e.target.value === 'servicio') {
            cantidadInput.setAttribute('disabled', 'disabled');
            precioInput.setAttribute('disabled', 'disabled');
        } else {
            cantidadInput.removeAttribute('disabled');
            precioInput.removeAttribute('disabled');
        }
    });
}
function handleShowModal(){
    //get the button
    const createCategoryButton = document.getElementById('createCategory');
    //get the modal modal-creacCategoria
    const modal = document.getElementById('modal-creacCategoria');
    //attach the event listener
    createCategoryButton.addEventListener('click', function() {
        modal.classList.remove('hidden');
    });
}
export function addListeners(){
    handlePicturesChange();
    handleFormSubmit();
    handleSelectedTipo();
    validationPrecio();
    validationCantidad();
    handleCategoriaSelect();
    handleMaxTags();
    handleShowModal();
}

async function getCategories(){
    const response = await api.categories.getCategoriasActivas();
    let categories = [];
    switch(response.status){
        case 200:
            categories = await response.json();
            break;
        case 400:
            alert('Error al obtener las categorías');
            return;
    }
    return categories;
}

export default function creationForm(){
    return{
        render: async () => {

            const categories = await getCategories();

            //prepare the HTML for each category
            let categoriesHTML = '';

            categories.forEach(category => {
                categoriesHTML += `<option value="${category.IDCategoria}">${category.Nombre}</option>`;
            }
            );

            return `
            <form id="productForm" class="space-y-6">
                <!-- Foto de Portada -->
                <div class="space-y-2">
                    <label class="block font-medium">Foto de Portada</label>
                    <div class="flex items-center justify-center w-full">
                        <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-500">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="mb-2 text-sm text-gray-400">Click para subir la foto de portada</p>
                            </div>
                            <input id="coverPhoto" type="file" class="hidden" accept="image/*" required/>
                        </label>
                    </div>
                </div>

                <!-- Galería de Fotos -->
                <div class="space-y-2">
                    <label class="block font-medium">Fotos del Producto (Máximo 4)</label>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div class="relative aspect-square">
                            <label class="flex items-center justify-center w-full h-full border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-500">
                                <input type="file" class="hidden product-photo" accept="image/*" />
                                <span class="text-gray-400">+</span>
                            </label>
                        </div>
                        <div class="relative aspect-square">
                            <label class="flex items-center justify-center w-full h-full border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-500">
                                <input type="file" class="hidden product-photo" accept="image/*" />
                                <span class="text-gray-400">+</span>
                            </label>
                        </div>
                        <div class="relative aspect-square">
                            <label class="flex items-center justify-center w-full h-full border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-500">
                                <input type="file" class="hidden product-photo" accept="image/*" />
                                <span class="text-gray-400">+</span>
                            </label>
                        </div>
                        <div class="relative aspect-square">
                            <label class="flex items-center justify-center w-full h-full border-2 border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-gray-500">
                                <input type="file" class="hidden product-photo" accept="image/*" />
                                <span class="text-gray-400">+</span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Nombre del Producto -->
                <div>
                    <label class="block font-medium mb-2">Nombre del Producto</label>
                    <input id="nombre-producto" type="text" class="w-full px-4 py-2 rounded-lg bg-dark-300 border border-gray-600 focus:border-blue-500 focus:outline-none" required>
                </div>

                <!-- Url de youtube -->
                <div>
                    <label class="block font-medium mb-2">Url de youtube</label>
                    <input id="video-url" type="text" class="w-full px-4 py-2 rounded-lg bg-dark-300 border border-gray-600 focus:border-blue-500 focus:outline-none" required>
                </div>

                <!-- Tipo -->
                <div>
                    <label class="block font-medium mb-2">Tipo</label>
                    <select id="tipo-select" class="w-full px-4 py-2 rounded-lg bg-dark-300 border border-gray-600 focus:border-blue-500 focus:outline-none" required>
                        <option value="producto">Producto</option>
                        <option value="servicio">Servicio</option>
                    </select>
                </div>

                <!-- Categorías -->
                <div>
                    <label class="block font-medium mb-2">Categorías (Máximo 3)</label>
                    <div id="selectedCategories" class="flex flex-wrap gap-2 mb-2"></div>
                    <select id="categorySelect" class="w-full px-4 py-2 rounded-lg bg-dark-300 border border-gray-600 focus:border-blue-500 focus:outline-none">
                        <option value="">Selecciona una categoría</option>
                        ${categoriesHTML}
                    </select>
                </div>
                <!--Creador de categorias-->
                <div>
                    <label class="block font-medium mb-2">No encuentras lo que buscas? Crea una nueva categoria.</label>
                    <button id="createCategory" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                        Crear Categoria
                    </button>
                </div>

                <!-- Cantidad -->
                <div>
                    <label class="block font-medium mb-2">Cantidad</label>
                    <input id="cantidad" type="number" min="    1" class="w-full px-4 py-2 rounded-lg bg-dark-300 border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50">
                </div>

                <!-- Precio -->
                <div>
                    <label class="block font-medium mb-2">Precio</label>
                    <div class="relative">
                        <span class="absolute left-3 top-2 text-gray-400"
                        >
                        $
                        </span>
                        <input id="precio" type="number" min="0" step="0.01" class="w-full pl-8 pr-4 py-2 rounded-lg bg-dark-300 border border-gray-600 focus:border-blue-500 focus:outline-none disabled:opacity-50">
                    </div>
                </div>

                <!-- Descripción -->
                <div>
                    <label class="block font-medium mb-2">Descripción</label>
                    <textarea id="descripcion" rows="4" class="w-full px-4 py-2 rounded-lg bg-dark-300 border border-gray-600 focus:border-blue-500 focus:outline-none" required></textarea>
                </div>

                <!-- Botón de Envío -->
                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200">
                    Publicar
                </button>
            </form>
            `
        }
    }
}