const nombreCompleto = (usuario) => usuario.nombres + " " + usuario.apellidos

const getUserAuth = () => {
    if (!localStorage.getItem("usuario")) window.location = "login.html"
    return JSON.parse(localStorage.usuario)
}


const formatearFechaYYYYMMDD = (date) => {
    const anio = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const dia = String(date.getDate()).padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
}