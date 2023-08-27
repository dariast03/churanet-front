

const editarPublicacion = (id) => {
    $(`#publicacionForm-${id}`).toggle()
    $(`#publicacionContenido-${id}`).toggle()
}

const cargarImagen = (id) => {
    $(`#publicacionForm-${id} input`).trigger("click")
}

const previsualizacionImagenTest = (id) => {
    const inputFIle = $(`#publicacionForm-${id} input[type="file"]`)
    const selectedImage = inputFIle[0].files;
    if (selectedImage) {
        if (selectedImage[0].size > 100000) {
            alert("La imagen es demasiado grande. Por favor, selecciona una imagen más pequeña.");
            inputFIle.val("")
            $(`#previsualizacionImagen-${id}`).css("display", "none")
            return;
        }
        $(`#previsualizacionImagen-${id}`).css("display", "block").attr("src", URL.createObjectURL(selectedImage[0]))
    }
}

const mostrarCajaComentarios = (id) => {
    $(`[data-lista-comentarios|='${id}']`).toggle()
    obtenerComentarios(id)
}

const reaccionarPublicacion = (e) => {
    const postId = new Number(e.target.getAttribute('data-id'))
    const type = e.target.name
    $(`[data-dropdown-toggle|='reacciones-${postId}']`).html(reacciones[type])


    const userId = getUserAuth().id

    const reactionData = {
        userId,
        postId,
        type,
        fecha: new Date().getTime()
    };

    $.ajax({
        url: BASE_URL + "/reactions",
        method: "POST",
        data: JSON.stringify(reactionData),
        contentType: "application/json",
        success: (response) => {
            obtenerPublicaciones()
        },
        error: (error) => {
            console.error("Error al reaccionar:", error);
        }
    });

}

const base64 = (imagenFile) => {
    return new Promise((resolve, reject) => {
        if (imagenFile.name !== "") {
            const fileReader = new FileReader();
            fileReader.onload = function (fileLoadedEvent) {
                const base = fileLoadedEvent.target.result;
                resolve(base);
            };
            fileReader.readAsDataURL(imagenFile);
        } else {
            resolve("");
        }
    });
}

const editarPublicacionAJAX = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(new FormData(e.target).entries());
    const imagenFile = formData.get('imagen');

    if (imagenFile.name === "") {
        data.imagen = data.imagenOriginal
        delete data.imagenOriginal
    } else {
        data.imagen = await base64(imagenFile)
    }

    data.id = Number(data.id)
    data.userId = Number(data.userId)
    data.fecha = Number(data.fecha)

    $.ajax({
        url: BASE_URL + "/posts/" + data.id,
        method: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
            $('#publicacionForm').trigger("reset");
            showToast("Se ha editado el post con exito", "success", () => {
            })
            obtenerPublicaciones()

        },
        error: (error) => {
            console.error("Error al crear la publicación:", error);
        }
    });
}

const obtenerComentarios = (id) => {
    $.ajax({
        url: BASE_URL + `/comments?postId=${id}&_expand=user`,
        method: "GET",
        dataType: "json",
        success: (data) => {
            console.log(data)
            $(`#lista-comentarios-${id}`).html("")

            data.forEach((comentario) => {
                $(`#lista-comentarios-${id}`).append(comentarioComponent(comentario));
            });
        },
        error: (error) => {
            alert("HUBO UN ERROR AL CARGAR LLOS COMENTARIOS")
        },
    });
}

const obtenerPublicaciones = () => {
    $.ajax({
        url: BASE_URL + "/posts?_sort=fecha&_order=desc&_embed=comments&_embed=reactions&_expand=user",
        method: "GET",
        dataType: "json",
        success: (data) => {
            $("#publicaciones").html("")

            data.forEach((publicacion) => {
                const reacciones = publicacion.reactions.length
                const comentarios = publicacion.comments.length

                const userAuth = JSON.parse(localStorage.getItem("usuario"))

                publicacion.reactions.sort((a, b) => {
                    return b.fecha - a.fecha;
                });

                const reaccion = publicacion.reactions.find(react => react.userId === userAuth.id)?.type
                $("#publicaciones").append(publicacionComponent({ ...publicacion, reacciones, comentarios, reaccion }));
            });
            dropwDownListener()
            modalImanges()
        },
        error: (error) => {
            alert("HUBO UN ERROR AL CARGAR LAS PUBLICACIONES")
        },
    });
}

const nuevaPublicacion = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(new FormData(e.target).entries());
    const imagenFile = formData.get('imagen');

    data.imagen = await base64(imagenFile)

    const publicacion = {
        ...data,
        fecha: new Date().getTime(),
        userId: getUserAuth().id,
    }

    $.ajax({
        url: BASE_URL + "/posts",
        method: "POST",
        data: JSON.stringify(publicacion),
        contentType: "application/json",
        success: (response) => {
            console.log(response)
            $('#publicacionForm').trigger("reset");
            showToast("Se ha publicado el post con exito", "success", () => {
            })
            obtenerPublicaciones()

        },
        error: (error) => {
            console.error("Error al crear la publicación:", error);
        }
    });
}

const nuevoComentario = (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target).entries());

    data.postId = Number(data.postId)
    data.userId = Number(data.userId)
    data.fecha = new Date().getTime()

    $.ajax({
        url: BASE_URL + "/comments",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
            showToast("Se ha comentado con exito", "success", () => {
            })
            $(`#formularioComentario-${data.postId}`).trigger("reset")
            obtenerComentarios(data.postId)
        },
        error: (error) => {
            alert("Error al crear el comentario: " + JSON.stringify(error));
        }
    });
}

const modalImanges = () => {
    $(".modal-img").on("click", (e) => {
        const srcImagen = $(e.target).attr("src");
        $(".modal-imagen").attr("src", srcImagen);
        $(".modal").css("display", "flex");
        $(".modal").fadeIn();
    });

    $(".modal").on("click", () => {
        $(".modal").fadeOut();
    });

    $(".modal-contenido").on("click", (e) => {
        e.stopPropagation();
    });
}

const dropwDownListener = () => {
    //   console.log($('[data-dropdown-toggle^="reacciones-"]'))
    /*  $('[data-dropdown-toggle^="reacciones-"]').each((x) => {
         console.log(x)
 
         const options = {
             placement: 'bottom',
             triggerType: 'click',
             offsetSkidding: 0,
             offsetDistance: 10,
             delay: 300,
             ignoreClickOutsideClass: false,
             onHide: () => {
                 console.log('dropdown has been hidden');
             },
             onShow: () => {
                 console.log('dropdown has been shown');
             },
             onToggle: () => {
                 console.log('dropdown has been toggled');
             }
           };
     }) */
    //console.log($('[id^="reacciones-"]'))
    $('[data-dropdown-toggle^="reacciones-"]').each(function (e, elem) {
        const options = {
            placement: 'top',
            triggerType: 'hover',
            offsetSkidding: 0,
            offsetDistance: 10,
            delay: 300,
            ignoreClickOutsideClass: false,
        };

        const dropdownComponent = $(`#${elem.getAttribute("data-dropdown-toggle")}`)[0]

        new Dropdown(dropdownComponent, this, options);
    });
}


$(() => {
    $("#formNuevaPublicacion").append(publicacionForm())
    obtenerPublicaciones()
});