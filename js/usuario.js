const obtenerUsuario = (id) => {
    $.ajax({
        url: BASE_URL + `/users/${id}?_embed=profiles`,
        method: "GET",
        dataType: "json",
        success: (data) => {
            $("#usuario").html("")

            $("#usuario").append(userInfoComponent(data));

            if (data?.profiles[0]?.ubicacion.latitud) {
                const map = L.map('map').setView([0, 0], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);
                const latitud = data?.profiles[0]?.ubicacion.latitud
                const longitud = data?.profiles[0]?.ubicacion.longitud
                let marcador = L.marker([latitud, longitud]).addTo(map);
                map.setView([latitud, longitud], 13);
            }
        },
        error: (error) => {
            alert("HUBO UN ERROR AL CARGAR LAS PUBLICACIONES")
        },
    });
}


$(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userId = urlParams.get('id')
    obtenerUsuario(userId)


});
