//accion de click y este atento para obtener informacion
document.addEventListener("DOMContentLoaded", ()=>{

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (event) => {
        
        event.preventDefault();

        const {cedula, nombre, apellido, celular, correo, contrasenna} = obtenerDatosFormulario();
        
        const esValido = validarCedula(cedula) && validarNombre(nombre) && validarApellido(apellido) && validarCelular(celular) &&  validarContrasenna(contrasenna) && validarCorreo(correo) && confirmarContrasenna(contrasenna) && esCedulaUnica(cedula);

        esValido ? manejarExito() : manejarError();

    });

});

const obtenerDatosFormulario = () => {

    const cedula = document.getElementById("cedula").value.trim();

    const nombre = document.getElementById("nombre").value.trim();

    const apellido = document.getElementById("apellido").value.trim();

    const celular = document.getElementById("celular").value.trim();

    const correo = document.getElementById("correo").value.trim();

    const contrasenna= document.getElementById("contrasenna").value.trim();
    
    return {cedula, nombre, apellido, celular, cedula, correo, contrasenna};

};

const esCedulaUnica = (cedula) => {

    var listaUsuario = JSON.parse(localStorage.getItem("usuario"));

    if(listaUsuario === null){

        return true;

    }

    //Revisa la cedula de todos los usuario registrados
    for (let indice = 0; indice < listaUsuario.length; indice++) {
        
        const elemento = listaUsuario[indice];
        
        if(elemento.cedula === cedula){

            return false;

        }

    }

    return true;

};

const agregarUsuario = () => {
    
    const {cedula, nombre, apellido, celular, correo, contrasenna} = obtenerDatosFormulario();
    
    var usuario = localStorage.getItem("usuario");

    const nuevoUsuario = {

        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        celular: celular, 
        correo: correo,
        contrasenna: CryptoJS.SHA256(contrasenna).toString()
    };

    if(usuario === null){

        localStorage.setItem("usuario", JSON.stringify([nuevoUsuario]));

    }else{
        
        var listaUsuario = JSON.parse(usuario);

        listaUsuario.push(nuevoUsuario);

        localStorage.setItem("usuario", JSON.stringify(listaUsuario));
        
    }

    console.log("usuario", usuario);

};

const manejarExito = () => {

    agregarUsuario();
    
    alert("Registro exitoso");

    limpiarCamposTexto();

};

const manejarError = () => {

    alert("Los datos no son válidos");

};