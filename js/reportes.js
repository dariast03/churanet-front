const informacionPerfil = (id) => {
    $.ajax({
        url: BASE_URL + `/users/${id}?_embed=profiles`,
        method: "GET",
        dataType: "json",
        success: (data) => {
            const doc = new jsPDF();
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.text("INFORMACION USUARIO", 105, 20, null, null, "center");

            doc.setFontSize(16);
            doc.text(`${data.nombres} ${data.apellidos}`, 105, 30, null, null, "center");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text("Información Personal", 20, 50);

            doc.setFont("helvetica", "bold");
            doc.text("Nombres:", 20, 60);
            doc.setFont("helvetica", "normal");
            doc.text(`${data.nombres}`, 60, 60);

            doc.setFont("helvetica", "bold");
            doc.text("Apellidos:", 20, 70);
            doc.setFont("helvetica", "normal");
            doc.text(`${data.apellidos}`, 60, 70);

            doc.setFont("helvetica", "bold");
            doc.text("Email:", 20, 80);
            doc.setFont("helvetica", "normal");
            doc.text(`${data.email}`, 60, 80);

            doc.setFont("helvetica", "bold");
            doc.text("Fecha de Nacimiento:", 20, 90);
            doc.setFont("helvetica", "normal");
            doc.text(`${data?.profiles[0]?.fechaNacimiento || "S/F"}`, 75, 90);

            doc.setFont("helvetica", "bold");
            doc.text("Sexo:", 20, 100);
            doc.setFont("helvetica", "normal");
            doc.text(`${data?.profiles[0]?.sexo || "S/S"}`, 60, 100);

            if (data?.profiles[0]?.telefono) {
                doc.setFont("helvetica", "bold");
                doc.text("Teléfono:", 20, 110);
                doc.setFont("helvetica", "normal");
                doc.text(`${data?.profiles[0]?.telefono || "S/T"}`, 60, 110);
            }

            doc.setFont("helvetica", "bold");
            doc.text("Redes Sociales", 20, 130);

            doc.setFont("helvetica", "normal");
            doc.text(`Facebook: ${data?.profiles[0]?.redes?.facebook || "S/R"}`, 20, 140);
            doc.text(`Instagram: ${data?.profiles[0]?.redes?.instagram || "S/R"}`, 20, 150);
            doc.text(`Whatsapp: +${data?.profiles[0]?.redes?.whatsapp || "S/R"}`, 20, 160);
            doc.text(`X: ${data?.profiles[0]?.redes?.x || "S/R"}`, 20, 170);

            doc.setFont("helvetica", "bold");
            doc.text("Ubicación", 20, 190);

            doc.setFont("helvetica", "normal");
            doc.text(`Latitud: ${data?.profiles[0]?.ubicacion?.latitud || "S/U"}`, 20, 200);
            doc.text(`Longitud: ${data?.profiles[0]?.ubicacion?.longitud || "S/U"}`, 20, 210);

            doc.setFont("helvetica", "bold");
            doc.text("Biografía", 20, 230);

            doc.setFont("helvetica", "normal");
            doc.text(data?.profiles[0]?.biografia || "S/B", 20, 240, { maxWidth: 170 });

            // Guardar el PDF
            doc.save("perfil_usuario.pdf");
            /* $("#id").val(data?.profiles[0]?.id)
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
                marcador = L.marker([latitud, longitud]).addTo(map);
                map.setView([latitud, longitud], 13);
                $("#latitude").val(latitud);
                $("#longitude").val(longitud);
            } */

        },
        error: (error) => {
            alert("HUBO UN ERROR AL CARGAR LLOS COMENTARIOS")
        },
    });
}