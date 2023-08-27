



const obtenerUsuarios = (query = "") => {
    $.ajax({
        url: BASE_URL + `/users?_sort=id&_order=desc&_embed=profiles&q=${query}`,
        method: "GET",
        dataType: "json",
        success: (data) => {
            $("#usuarios").html("")
            let usuariosBloqueados = [];
            localStorage.getItem("usuariosBloqueados") &&
                (usuariosBloqueados = JSON.parse(localStorage.usuariosBloqueados) || []);
            let count = 0;

            data.forEach((usuario) => {
                usuariosBloqueados.includes(usuario.id) ||
                    usuario.id == getUserAuth().id ||
                    ($("#usuarios").append(usuarioCardComponent(usuario)), count++);
            });

            if (0 == count) {
                $("#usuarios").html("<h1>NO HAY USUARIOS </h1>")
            }
            dropwDownListener();
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

const dropwDownListener = () => {
    $('[data-dropdown-toggle^="dropdown-"]').each(function (e, o) {
        const t = $(`#${o.getAttribute("data-dropdown-toggle")}`)[0];
        new Dropdown(t, this, {
            placement: "bottom",
            triggerType: "hover",
            offsetSkidding: 0,
            offsetDistance: 10,
            delay: 300,
            ignoreClickOutsideClass: !1,
        });
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