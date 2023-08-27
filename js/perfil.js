let map;
let marcador;


const eventoMarcador = () => {
    map.on('click', (e) => {
        if (marcador) {
            map.removeLayer(marcador);
        }
        marcador = L.marker(e.latlng).addTo(map);
        $("#latitud").val(e.latlng.lat);
        $("#longitud").val(e.latlng.lng);
    });
}

const obtenerPerfil = () => {
    const id = getUserAuth().id

    $.ajax({
        url: BASE_URL + `/users/${id}?_embed=profiles`,
        method: "GET",
        dataType: "json",
        success: (data) => {
            $("#formPerfil").html(perfilFormComponent(data))
            $("#id").val(data?.profiles[0]?.id)
            $("#userId").val(getUserAuth().id)
            $("#nombres").val(data.nombres)
            $("#apellidos").val(data.apellidos)
            $("#correo").val(data.email)
            $("#biografia").val(data?.profiles[0]?.biografia || "")
            $("#fechaNacimiento").val(data?.profiles[0]?.fechaNacimiento || "")
            $("#sexo").val(data?.profiles[0]?.sexo || "masculino")
            $("#telefono").val(data?.profiles[0]?.telefono || "")
            $("#facebook").val(data?.profiles[0]?.redes?.facebook || "")
            $("#instagram").val(data?.profiles[0]?.redes?.instagram || "")
            $("#whatsapp").val(data?.profiles[0]?.redes?.whatsapp || "")
            $("#x").val(data?.profiles[0]?.redes?.x || "")

            const latitud = data?.profiles[0]?.ubicacion?.latitud;
            const longitud = data?.profiles[0]?.ubicacion?.longitud;

            if (latitud && longitud) {
                map = L.map('map').setView([0, 0], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                marcador = L.marker([latitud, longitud]).addTo(map);
                map.setView([latitud, longitud], 13);
                $("#latitude").val(latitud);
                $("#longitude").val(longitud);
                eventoMarcador()
            } else {
                map = L.map('map').setView([0, 0], 13);

                if ("geolocation" in navigator) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        const { latitude, longitude } = position.coords;
                        map.setView([latitude, longitude], 13);

                        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }).addTo(map);

                        marcador = L.marker([latitude, longitude]).addTo(map);
                        $("#latitud").val(latitude);
                        $("#longitud").val(longitude);
                        eventoMarcador()
                    });
                }


            }

        },
        error: (error) => {
            alert("HUBO UN ERROR AL CARGAR LLOS COMENTARIOS")
        },
    });
}

const editarPerfil = async (data) => {
    $.ajax({
        url: BASE_URL + "/profiles/" + data.id,
        method: "PUT",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
            //  $('#publicacionForm').trigger("reset");
            showToast("Se ha actualizado tu informacion con exito", "success", () => {
            })
            //obtenerPublicaciones()

        },
        error: (error) => {
            console.error("Error al actualiar el perfil", error);
        }
    });
}

const crearPerfil = (data) => {
    $.ajax({
        url: BASE_URL + "/profiles",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
            $("#id").val(response?.id)
            showToast("Se ha actualizado tu informacion con exito", "success", () => {
            })
        },
        error: (error) => {
            console.error("Error al actualiar el perfil", error);
        }
    });
}

const onSubmitFormulario = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const { facebook, whatsapp, instagram, x, latitud, longitud } = data

    data.redes = {
        facebook,
        whatsapp,
        instagram,
        x
    }

    data.id = Number(data.id)
    data.userId = Number(data.userId)

    data.ubicacion = {
        latitud: Number(latitud),
        longitud: Number(longitud)
    }

    delete data.facebook
    delete data.whatsapp
    delete data.instagram
    delete data.x
    delete data.latitud
    delete data.longitud

    if (data.id == 0) {
        delete data.id
        crearPerfil(data)
    } else {
        editarPerfil(data)
    }
}
$(() => {
    obtenerPerfil()
})