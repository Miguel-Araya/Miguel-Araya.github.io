document.addEventListener("DOMContentLoaded", ()=>{

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (event) => {

        //variable
        event.preventDefault();

        const {cedula} = obtenerDatosFormulario();
        
        const esValido = esUsuarioExistente(cedula) && validarCedula(cedula);

        esValido ? manejarExito(cedula) : manejarError();

    });

});

const obtenerDatosFormulario = () => {

    const cedula = document.getElementById("cedula").value.trim();

    return {cedula};

};

const reestablecerIntento = (cedula) =>{

    const listaIntento = JSON.parse(localStorage.getItem("intentoRestante"));
    
    if(listaIntento === null){

        return;
    }

    for (let indice = 0; indice < listaIntento.length; indice++) {
        const usuario = listaIntento[indice];
        
        if(usuario.cedula === cedula){

            listaIntento[indice].intentoRestante = 3;

        }

    }

    //actualizar la lista intento
    localStorage.setItem("intentoRestante", JSON.stringify(listaIntento));

};

const manejarExito = (cedula) => {
    
    alert("Se ha enviado un código a tu correo");

    reestablecerIntento(cedula);

    window.location.href = "./inicioSesion.html";

};

const manejarError = () => {

    alert("Los datos no son válidos");

};