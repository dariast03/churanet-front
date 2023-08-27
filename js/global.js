const BASE_URL = 'https://famous-worm-moccasins.cyclic.app/api'


const showToast = (msg, type = "success", test) => {
    $("#toast").html(toast[type](msg))
    $("#toast").show("slow")

    setTimeout(() => {
        $("#toast").hide("fast")

        if (test) {
            test()
        }
    }, 2000);
}

const logout = () => {
    localStorage.removeItem("usuario")
    window.location = "login.html"
}

const solicitarUbicacion = () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            //alert("PERMISO ACEPTADO ", position)
        });
    }
}
const verifyLogin = () => {
    const isLogin = window.location.pathname.includes("login.html") || window.location.pathname.includes("registro.html")
    const authLocalStorage = localStorage.getItem("usuario")

    if (!authLocalStorage) {
        if (!isLogin) window.location = "login.html"
    }
    else {
        if (isLogin) window.location = "home.html"
    }
}



$(() => {
    verifyLogin()
    solicitarUbicacion()
})


