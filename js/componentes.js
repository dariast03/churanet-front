const toast = {
    success: (msg) => `
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
</svg>
    <div class="pl-4 text-sm font-normal">${msg}</div>
`,
    error: (msg) => `
<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 20 20">
    <path
        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
</svg>
<div class="pl-4 text-sm font-normal">${msg}</div>
`
}

const reacciones = {
    like: `<img name="like" class="md:w-10 w-5  cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/like.svg" alt="">`,
    love: `<img name="love" class="md:w-10 w-5 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/love.svg" alt="">`,
    haha: ` <img name="haha" class="md:w-10 w-5   cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/haha.svg" alt="">`,
    wow: ` <img name="wow" class="md:w-10 w-5 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/wow.svg" alt="">`,
    angry: `<img name="angry" class="md:w-10 w-5 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/angry.svg" alt="">`,
    sad: ` <img name="sad" class="md:w-10 w-5 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/sad.svg" alt="">`,
}


const publicacionForm = (publicacion = null) => {
    const formulario = `<form id="publicacionForm-${publicacion?.id || 0}" enctype="multipart/form-data" onsubmit=${!publicacion ? "nuevaPublicacion(event)" : "editarPublicacionAJAX(event)"} class="${publicacion ? "hidden" : ""}">
    <img id="previsualizacionImagen-${publicacion?.id || 0}" class="mt-2 max-w-[300px]  w-full" src="#" alt="Vista previa de la imagen"
        style="display: none;">

       ${publicacion ? ` <input type="hidden" value="${publicacion.id}" name="id"/>
       <input type="hidden" value="${publicacion?.imagen || ""}" name="imagenOriginal"/>
       <input type="hidden" value="${publicacion.fecha}" name="fecha"/>
       <input type="hidden" value="${publicacion.userId}" name="userId"/>` : ""}

        <div
            class="w-full mt-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea name="contenido" rows="4"
                    class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Describenos algo de tu dia" required value="">${publicacion?.contenido || ""}</textarea>
            </div>

            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button onclick="console.log('comentar!!!!')"
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-socialBlue rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:opacity-80">
                    Publicar
                </button>

                <button type="button" onclick="cargarImagen(${publicacion?.id || 0})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path
                            d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                    </svg>
                </button>
            </div>
        </div>
        <div class="mt-4 hidden">
            <input type="file" name="imagen" accept="image/*" placeholder="Selecciona una imagen"
                onchange="previsualizacionImagenTest(${publicacion?.id || 0})">
        </div>
    </form>`

    if (publicacion) return formulario

    return `<div class=" bg-white  px-2 md:px-5 py-4 rounded-lg shadow-lg mb-5">
    <h2 class="text-xl font-semibold mb-4">Realizar Publicacion</h2>
${formulario}
    
</div>`
}


const comentarioComponent = (comentario) => {
    return ` <div class="border rounded-md p-3">
    <div class="flex justify-between">
        <a href="usuario.html?id=${comentario.userId}" class="flex gap-3 items-center">
            <img src="https://ui-avatars.com/api/?name=${nombreCompleto(comentario.user).replaceAll(" ", "+")}" class="object-cover w-8 h-8 rounded-full 
border-2 border-emerald-400  shadow-emerald-400
" />
            <h3 class="font-bold">${comentario.user.nombres} ${comentario.user.apellidos}</h3>
        </a>
    </div>
    <p class="text-gray-600 mt-2">${comentario.contenido}
    </p>
</div>`
}

const publicacionComponent = (publicacion) => {
    return `<div class="publicacion px-2  md:px-5 py-4 bg-white shadow rounded-lg min-w-full mb-2" data-id-parent="5">
    <div class="flex justify-between">
        <a href="usuario.html?id=${publicacion.userId}" class="flex mb-4">
            <img class="w-12 h-12 rounded-full object-cover" src="https://ui-avatars.com/api/?name=${nombreCompleto(publicacion.user).replaceAll(" ", "+")}" />

            <div class="ml-2 mt-0.5">
                <span class="block font-medium text-base leading-snug :text-gray-100">
                    ${publicacion.user.nombres} ${publicacion.user.apellidos}
                </span>
                <span class="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">
                   ${new Date(publicacion.fecha).toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                </span>
            </div>
        </a>

        ${publicacion.userId == getUserAuth().id ? `<button onclick="editarPublicacion(${publicacion.id})">
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
   </svg>
</button>`: ""}

    </div>
<div id="publicacionContenido-${publicacion.id}">
<p class="text-gray-800 leading-snug md:leading-normal mb-5 whitespace-pre" style="text-wrap:balance;">
${publicacion.contenido}
</p>
</div>
  
<!-- EDITAR FORM -->
${publicacionForm(publicacion)}
  <!--FIN EDITAR FORM -->

   ${publicacion.imagen ? `<div class="max-w-[500px] mx-auto">
   <img class='h-96  object-cover object-center modal-img '
   src="${publicacion.imagen}"
   alt="" 
   style="width:100%;"/>
   </div>` : ""}

    <div class="flex justify-between items-center mt-5">
        <div class="flex items-center ">
            <button data-dropdown-toggle="reacciones-${publicacion.id}" data-dropdown-placement="top"
            data-dropdown-trigger="hover"  class="shadow-2xl p-2 rounded-xl " type="button">
        ${publicacion.reaccion ? reacciones[publicacion.reaccion] : " <span>ME GUSTA</span>"}
            </button>

        <span class=" text-gray-500 dark:text-gray-400  font-light text-xs md:text-base">
        ${publicacion.reacciones}
    </span>
        </div>


        <!-- Dropdown menu -->
        <div id="reacciones-${publicacion.id}"
            class="z-10 hidden bg-white divide-y divide-gray-100 shadow p-2.5 rounded-full dark:bg-gray-700 dark:divide-gray-600">

            <div class="flex gap-2">
                <img data-id="${publicacion.id}" onclick="reaccionarPublicacion(event)" name="like" class="md:w-10 w-8 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/like.svg" alt="">
                <img data-id="${publicacion.id}" onclick="reaccionarPublicacion(event)" name="love" class="md:w-10 w-8 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/love.svg" alt="">
                <img data-id="${publicacion.id}" onclick="reaccionarPublicacion(event)" name="haha" class="md:w-10 w-8 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/haha.svg" alt="">
                <img data-id="${publicacion.id}" onclick="reaccionarPublicacion(event)" name="wow" class="md:w-10 w-8 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/wow.svg" alt="">
                <img data-id="${publicacion.id}" onclick="reaccionarPublicacion(event)" name="angry" class="md:w-10 w-8 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/angry.svg" alt="">
                <img data-id="${publicacion.id}" onclick="reaccionarPublicacion(event)" name="sad" class="md:w-10 w-8 cursor-pointer hover:scale-125 transition-transform duration-300"
                    src="../assets/icons/sad.svg" alt="">

            </div>

        </div>
        <button data-id="${publicacion.id}" onclick="mostrarCajaComentarios(${publicacion.id})"
            class="ml-1 text-gray-500 dark:text-gray-400 font-light">
         <div>
         ${publicacion.comentarios} <i class="bi bi-chat-dots-fill"></i></div>
        </button>
    </div>

    <!-- CAJA COMENTARIOS -->
    <div data-lista-comentarios="${publicacion.id}" class='mt-5 hidden'>
        <div>
        </div>
        <div class="flex flex-col gap-2">
            <!-- LISTA COMENTARIOS -->
           <div id="lista-comentarios-${publicacion.id}"></div>
            <!--FIN LISTA COMENTARIOS -->
        </div>

        <form
        id="formularioComentario-${publicacion.id}"
            onsubmit="nuevoComentario(event)"
            class="w-full mt-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <input type="hidden" name="userId" value="${getUserAuth().id}"/>
            <input type="hidden" name="postId" value="${publicacion.id}"/>
            <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <textarea id="comment" rows="4"
                name="contenido"
                    class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Escribe algun comentario" required value=""></textarea>
            </div>

            <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-socialBlue rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:opacity-90Gu">
                    Comentar
                </button>
            </div>
        </form>
    </div>
    <!-- FIN CAJA COMENTARIOS -->
</div>`
}

const usuarioCardComponent = (usuario) => {
    return `     <div
class="min-w-full sm:min-w-[250px]  max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
<div class="flex justify-end px-4 pt-4">
    <button id="dropdownButton-${usuario.id}" data-dropdown-toggle="dropdown-${usuario.id}"
        class="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
        type="button">
        <span class="sr-only">Abrir Menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 16 3">
            <path
                d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
    </button>
    <!-- Dropdown menu -->
    <div id="dropdown-${usuario.id}"
        class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul class="py-2" aria-labelledby="dropdownButton-${usuario.id}">
            <li>
                <a href="usuario.html?id=${usuario.id}"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Ver
                    perfil</a>
            </li>
            <li>
                <a href=""
                    class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Bloquear</a>
            </li>
        </ul>
    </div>
</div>
<div class="flex flex-col items-center pb-10">
    <a href="usuario.html?id=${usuario.id}">
    <img class="w-24 h-24 mb-3 rounded-full shadow-lg" src="https://ui-avatars.com/api/?name=${nombreCompleto(usuario).replaceAll(" ", "+")}"
        alt="${usuario.nombres}" />
    </a>
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">${nombreCompleto(usuario)}</h5>
    <span class="text-sm text-gray-500 dark:text-gray-400">${usuario.email}</span>
    <div class="flex mt-4 space-x-3 md:mt-6">
        <a 
            class="inline-flex items-center px-4 py-2 cursor-pointer text-sm font-medium text-center text-white bg-socialBlue rounded-lg hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Agregar</a>
        <a 
            class="inline-flex items-center px-4 py-2 cursor-pointer  text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Chatear</a>
    </div>
</div>
</div>`
}


const perfilFormComponent = (usuario) => {
    return ` <section class="bg-white dark:bg-gray-900 w-full">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <div class="flex justify-between items-center mb-4">
            <h2 class=" text-xl font-bold text-gray-900 dark:text-white">INFORMACION DE PERFIL</h2>
            <button class="p-4" onclick="informacionPerfil(${usuario.id})"><i class="bi bi-file-earmark-pdf-fill "
                    style="font-size: 1.5rem; color: red;"></i></button>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-3">
            <div class="w-full">
                <label for="nombres"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                <input type="text" name="nombres" id="nombres" disabled
                    class="disabled:bg-gray-200  disabled:opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tus nombres" required="">
            </div>

            <div class="w-full">
                <label for="apellidos"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                <input type="text" name="apellidos" id="apellidos" disabled
                    class="disabled:bg-gray-200  disabled:opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tus apellidos" required="">
            </div>

            <div class="w-full">
                <label for="correo"
                    class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo</label>
                <input type="email" name="correo" id="correo" disabled
                    class="disabled:bg-gray-200  disabled:opacity-60 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tu dirección de correo" required="">
            </div>
        </div>

        <form onsubmit="onSubmitFormulario(event)">
            <input type="hidden" name="id" id="id" />
            <input type="hidden" name="userId" id="userId" />

            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="sm:col-span-2">
                    <label for="biografia"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biografía</label>
                    <textarea id="biografia" name="biografia" rows="4"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Escribe tu biografía"></textarea>
                </div>

                <div class="w-full">
                    <label for="fechaNacimiento"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha
                        Nacimiento</label>
                    <input type="date" name="fechaNacimiento" id="fechaNacimiento"
                    placeholder="Tu fecha"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                </div>

                <div>
                    <label for="sexo"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo</label>
                    <select id="sexo" name="sexo"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option value="masculino" selected>Masculino</option>
                        <option value="femenino">Femenino</option>
                        <option value="otro">Otro</option>
                    </select>
                </div>

                <div>
                    <label
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teléfono</label>

                    <input type="tel" name="telefono" id="telefono"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Teléfono">
                </div>

                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Redes
                        Sociales</label>
                    <div class="flex flex-col gap-2">
                        <input type="text" name="facebook" id="facebook"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Facebook">
                        <input type="text" name="instagram" id="instagram"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Instagram">
                        <input type="text" name="whatsapp" id="whatsapp"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="WhatsApp">
                        <input type="text" name="x" id="x"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="X">
                    </div>
                </div>

                <div>
                    <label for="ubicacion"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ubicación</label>
                    <div id="map" class="w-full h-64 border rounded"></div>
                    <input type="hidden" id="latitud" name="latitud">
                    <input type="hidden" id="longitud" name="longitud">
                </div>
            </div>


            <button type="submit"
                class="mt-4 bg-socialBlue text-white px-4 py-2 rounded hover:opacity-90">Guardar Cambios</button>
        </form>

    </div>
</section>`
}

const userInfoComponent = (usuario) => {
    return ` <div class="bg-gray-100">
    <div class="">
        <div class="flex flex-col  bg-white p-4 border">
            <div class="flex flex-col items-center">
            <img src="https://ui-avatars.com/api/?name=${nombreCompleto(usuario).replaceAll(" ", "+")}"
                class="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0 " />
            <h1 class="text-xl font-bold">${nombreCompleto(usuario)}</h1>
            <div class="mt-6 flex flex-wrap gap-4 justify-center">

            <button class="p-4 flex items-center" onclick="informacionPerfil(${usuario.id})">
            DESCARGAR PERFIL <i class="ml-2 bi bi-file-earmark-pdf-fill "
            style="font-size: 1.5rem; color: red;"></i></button>
            </div></div>
            <div>
                <div class="mb-5">
                    <h2 class="text-xl font-bold ">Biografia</h2>
                    <p class="text-gray-700">
                    ${usuario?.profiles[0]?.biografia || "S/B"}
                    </p>
                </div>

                <div class="mb-5">
                    <h2 class="text-xl font-bold ">Correo</h2>
                    <a  href="mailto:${usuario.email}" class="text-gray-700">
                        ${usuario.email}
                    </a>
                </div>

                <div class="mb-5">
                    <h2 class="text-xl font-bold ">Fecha Nacimiento</h2>
                    <p class="text-gray-700">
                    ${usuario?.profiles[0]?.fechaNacimiento || "S/F"}
                    </p>
                </div>

                <div class="mb-5">
                    <h2 class="text-xl font-bold ">Sexo</h2>
                    <p class="text-gray-700">
                    ${usuario?.profiles[0]?.sexo || "S/S"}
                    </p>
                </div>

                <div class="mb-5">
                    <h2 class="text-xl font-bold ">De</h2>
                    <p class="text-gray-700">
                    ${usuario?.profiles[0]?.ubicacion.latitud ? ` <div id="map" class="w-full h-64 border rounded"></div>` : "S/U"}
                    </p>
                </div>

                <div class="mb-5">
                    <h2 class="text-xl font-bold ">Contacto</h2>

                    <a href="tel:${usuario?.profiles[0]?.telefono}" class="text-gray-700">
                    ${usuario?.profiles[0]?.telefono || "S/T"} <span class="font-bold"> Personal</span>
                    </a>
                </div>

                ${usuario?.profiles[0]?.redes ? ` <h3 class="font-semibold text-center mt-3 -mb-2">Redes Sociales</h3>
                <div class="flex justify-center items-center gap-6 my-6">
                ${Object.entries(usuario?.profiles[0]?.redes).map(element => {
        return `  <a href="${element[1]}" target="__blank">${element[0]}</a>`
    })}
                </div>` : ""}
               

                
                
            </div>
        </div>
    </div>
</div>`
}