const loginUsuario = (data) => {
    $.ajax({
        url: BASE_URL.slice(0, BASE_URL.length - 4) + "/login",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: (response) => {
            localStorage.setItem("usuario", JSON.stringify(response.user))
            showToast("Has iniciado sesion con exito", "success", () => {
                window.location.href = "home.html"
            })
        },
        error: (error) => {
            showToast(error.responseJSON, "error")
        }
    });
}


$(() => {

    $("#formulario").on("submit", (e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target).entries());
        if (Object.values(data).includes("")) {
            showToast("Llene todos los campos", "error")
            return
        }

        loginUsuario(data)
    })
})