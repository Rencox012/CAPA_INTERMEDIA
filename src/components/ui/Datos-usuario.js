//Componente que recive los datos del usuario y lo renderiza en la pantalla

export default function DatosUsuario() {
    return{
        render: (foto, nombre, apellidos, direccion, email) => {
            return `
            
                <h1 class="text-white text-2xl font-semibold mt-10">Información del perfil</h1>
                <div id = "foto-perfil" class = "relative w-1/4 rounded-full bg-gray-500/50">
                    <!--Boton para cambiar la foto de perfil, solo sera visible cuando el usuario ponga el mouse encima-->
                    <img src="data:image/png;base64,${foto}" class="w-full h-full rounded-full object-cover" alt="Foto de perfil">

                    <button class=" absolute inset-0 top-0 z-20 w-full h-full bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="size-6">
                            <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
                            <path fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div id = "informacion" class = "flex w-full flex-row gap-4 items-center justify-center">
                    <div class="flex flex-col gap-4 w-1/2 items-center justify-center pt-5">
                        <!-- Toda la informacion del usuario en text inputs, por si desea cambiarla -->
                        <label for="Nombre" class="text-white">Nombre</label>
                        <input type="text" class="w-2/4 p-2 rounded-lg shadow-lg text-center" value="${nombre}" id="Nombre">
                        <label for="Apellido" class="text-white">Apellidos</label>
                        <input type="text" class="w-2/4 p-2 rounded-lg shadow-lg text-center" value="${apellidos}" id="Apellido">
                        <label for="Direccion" class="text-white">Direccion</label>
                        <input type="text" class="w-2/4 p-2 rounded-lg shadow-lg text-center" value="${direccion}" id="Direccion">
                        <label for="Correo" class="text-white">Correo</label>
                        <input type="text" class="w-2/4 p-2 rounded-lg shadow-lg text-center" value="${email}" id="Correo">
                        <button class=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-50 mt-4 disabled:bg-slate-500 disabled:cursor-not-allowed" id="guardar" disabled >Guardar cambios</button>
                    </div>
                </div>
            `;
        }
    }
}