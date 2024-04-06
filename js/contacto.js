document.addEventListener("DOMContentLoaded", ()=>{

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (event) => {
        
        event.preventDefault();

        const {correo} = obtenerDatosFormulario();
        
        const esValido = validarCorreo(correo);

        esValido ? manejarExito() : manejarError();

    });

});

const obtenerDatosFormulario = () =>{

    const correo = document.getElementById("correo").value.trim();
    
    return {correo};

};

const manejarExito = () => {
    
    limpiarCamposTexto();
    alert("Envío exitoso");
    
};

const manejarError = () => {

    alert("Los datos no son válidos");
    
};