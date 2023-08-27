



const obtenerUsuarios = (query = "") => {
    $.ajax({
        url: BASE_URL + `/users?_sort=id&_order=desc&_embed=profiles&q=${query}`,
        method: "GET",
        dataType: "json",
        success: (data) => {
            $("#usuarios").html("")

            data.forEach((usuario) => {
                $("#usuarios").append(usuarioCardComponent(usuario));
            });
        },
        error: function (error) {
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

$(() => {
    obtenerUsuarios()

    $("#buscar-usuarios").on("input", (e) => {
        obtenerUsuarios(e.target.value)
    })
});


//PRODUCTO
/*
id
nombre
laboratorioId
presentacion -> jarabe, pastill, pomada

SELECT DE LABORATORIOS
*/