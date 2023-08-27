let map, marcador; const eventoMarcador = () => { map.on("click", (e => { marcador && map.removeLayer(marcador), marcador = L.marker(e.latlng).addTo(map), $("#latitud").val(e.latlng.lat), $("#longitud").val(e.latlng.lng) })) }, obtenerPerfil = () => { const e = getUserAuth().id; $.ajax({ url: BASE_URL + `/users/${e}?_embed=profiles`, method: "GET", dataType: "json", success: e => { $("#formPerfil").html(perfilFormComponent(e)), $("#id").val(e?.profiles[0]?.id), $("#userId").val(getUserAuth().id), $("#nombres").val(e.nombres), $("#apellidos").val(e.apellidos), $("#correo").val(e.email), $("#biografia").val(e?.profiles[0]?.biografia || ""), $("#fechaNacimiento").val(e?.profiles[0]?.fechaNacimiento || ""), $("#sexo").val(e?.profiles[0]?.sexo || "masculino"), $("#telefono").val(e?.profiles[0]?.telefono || ""), $("#facebook").val(e?.profiles[0]?.redes?.facebook || ""), $("#instagram").val(e?.profiles[0]?.redes?.instagram || ""), $("#whatsapp").val(e?.profiles[0]?.redes?.whatsapp || ""), $("#x").val(e?.profiles[0]?.redes?.x || ""); const a = e?.profiles[0]?.ubicacion?.latitud, o = e?.profiles[0]?.ubicacion?.longitud; a && o ? (map = L.map("map").setView([0, 0], 13), L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map), marcador = L.marker([a, o]).addTo(map), map.setView([a, o], 13), $("#latitude").val(a), $("#longitude").val(o), eventoMarcador()) : (map = L.map("map").setView([0, 0], 13), "geolocation" in navigator && navigator.geolocation.getCurrentPosition((e => { const { latitude: a, longitude: o } = e.coords; map.setView([a, o], 13), L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map), marcador = L.marker([a, o]).addTo(map), $("#latitud").val(a), $("#longitud").val(o), eventoMarcador() }))) }, error: e => { alert("HUBO UN ERROR AL CARGAR LLOS COMENTARIOS") } }) }, editarPerfil = async e => { $.ajax({ url: BASE_URL + "/profiles/" + e.id, method: "PUT", data: JSON.stringify(e), contentType: "application/json", success: e => { showToast("Se ha actualizado tu informacion con exito", "success", (() => { })) }, error: e => { console.error("Error al actualiar el perfil", e) } }) }, crearPerfil = e => { $.ajax({ url: BASE_URL + "/profiles", method: "POST", data: JSON.stringify(e), contentType: "application/json", success: e => { $("#id").val(e?.id), showToast("Se ha actualizado tu informacion con exito", "success", (() => { })) }, error: e => { console.error("Error al actualiar el perfil", e) } }) }, onSubmitFormulario = e => { e.preventDefault(); const a = Object.fromEntries(new FormData(e.target).entries()), { facebook: o, whatsapp: r, instagram: t, x: i, latitud: l, longitud: s } = a; a.redes = { facebook: o, whatsapp: r, instagram: t, x: i }, a.id = Number(a.id), a.userId = Number(a.userId), a.ubicacion = { latitud: Number(l), longitud: Number(s) }, delete a.facebook, delete a.whatsapp, delete a.instagram, delete a.x, delete a.latitud, delete a.longitud, 0 == a.id ? (delete a.id, crearPerfil(a)) : editarPerfil(a) }; $((() => { obtenerPerfil() }));