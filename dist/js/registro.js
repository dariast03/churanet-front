const registrarUsuario = e => { $.ajax({ url: BASE_URL.slice(0, BASE_URL.length - 4) + "/register", method: "POST", data: JSON.stringify(e), contentType: "application/json", success: e => { localStorage.setItem("usuario", JSON.stringify(e.user)), showToast("Te has registrado con exito", "success", (() => { window.location.href = "home.html" })) }, error: e => { showToast(e.responseJSON, "error") } }) }; $((() => { $("#formulario").on("submit", (e => { e.preventDefault(); const s = Object.fromEntries(new FormData(e.target).entries()); Object.values(s).includes("") ? showToast("Llene todos los campos", "error") : registrarUsuario(s) })) }));