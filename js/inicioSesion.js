
document.addEventListener("DOMContentLoaded", ()=>{

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (event) => {

        //variable
        event.preventDefault();

        const {cedula, contrasenna} = obtenerDatosFormulario();
        
        var intentoRestante = obtenerIntentoRestante(cedula);
        
        const esValido = esContrasennaCorrecta(cedula, contrasenna) && intentoRestante > 0;

        esValido ? manejarExito(cedula) : manejarError(intentoRestante);

    });

});

const obtenerDatosFormulario = () => {

    const cedula = document.getElementById("cedula").value.trim();
    
    const contrasenna = document.getElementById("contrasenna").value.trim();

    return {cedula, contrasenna};

};

const obtenerIntentoRestante = (cedula) => {

    var listaIntento = JSON.parse(localStorage.getItem("intentoRestante"));
    var intentoRestante = 3;

    if(listaIntento === null){

        return intentoRestante;

    }else{

        for (let indice = 0; indice < listaIntento.length; indice++) {

            const elemento = listaIntento[indice];
            
            if(elemento.cedula === cedula){

                intentoRestante = parseInt(elemento.intentoRestante);

            }

        }

    }

    return intentoRestante;

}

esContrasennaCorrecta = (cedula, contrasenna) =>{

    const listaUsuario = JSON.parse(localStorage.getItem("usuario"));

    if(listaUsuario === null){

        return false;

    }

    const verificarContrasenna = CryptoJS.SHA256(contrasenna).toString();

    for (let indice = 0; indice < listaUsuario.length; indice++) {
        
        const elemento = listaUsuario[indice];

        if(elemento.cedula === cedula && elemento.contrasenna === verificarContrasenna){
            
            return true;

        }
        
    }

    return false;

};

const manejarExito = (cedula) => {
    
    alert("Inicio sesión exitoso");

    localStorage.setItem("inicioSesion", JSON.stringify({cedula:cedula}));

    window.location.href = "../index.html";

    //limpiarCamposTexto();

};

const esUsuarioIntento = (cedula) => {

    const listaIntento = localStorage.getItem("intentoRestante");

    for (let indice = 0; indice < listaIntento.length; indice++) {
        
        const elemento = listaIntento[indice];

        if(elemento.cedula === cedula){

            return true;

        }

    }

    return false;
};

const actualizarIntentoRestante = (intentoRestante)=>{

    var listaIntento = JSON.parse(localStorage.getItem("intentoRestante"));
    var listaIntentoActualizada = [];

    const cedula = document.getElementById("cedula").value.trim();
    
    //En caso de que no se haya registrado ese usuario no se debe actualizar los intentos restantes
    if(!esUsuarioExistente(cedula)){

        return;

    }

    if(listaIntento === null){
        
        --intentoRestante;

        const nuevoIntento = {

            cedula: cedula,
            intentoRestante: intentoRestante

        };

        localStorage.setItem("intentoRestante", JSON.stringify([nuevoIntento]));
        
    }
    //No esta agregado en la lista de usuarios que ha hecho intentos
    else if(!esUsuarioIntento(cedula)){

        --intentoRestante;

        const nuevoIntento = {

            cedula: cedula,
            intentoRestante: intentoRestante

        };

        //En este caso, no se utiliza la lista actualizada ya que se puede agregar al final
        listaIntento.push(nuevoIntento);

        localStorage.setItem("intentoRestante", JSON.stringify(listaIntento));
        
    }
    //Caso en que se encuentra en la lista de usuario que ha hecho intentos
    else{
        
        var indice;

        for (indice = 0; indice < listaIntento.length; indice++) {

            var elemento = listaIntento[indice];
            
            if(elemento.cedula === cedula){

                --intentoRestante;

                elemento.intentoRestante = intentoRestante;
                
                listaIntentoActualizada.push(elemento);

                break;

            }else{

                listaIntentoActualizada.push(elemento);

            }

        }

        //terminar de actualizar los intentosPendientes restantes
        ++indice;
        while(indice < listaIntentoActualizada.length){

            const elemento = listaIntento[indice];

            listaIntentoActualizada.push(elemento);

        }

        localStorage.setItem("intentoRestante", JSON.stringify(listaIntentoActualizada));

    }

    //Actualizar texto en html
    var intento = document.getElementById("intento");
        
    intento.textContent = `Intentos restantes: ${intentoRestante}`;
    
};

const manejarError = (intentoRestante) => {

    if(intentoRestante > 0){

        alert("Los datos no son válidos");
        
        actualizarIntentoRestante(intentoRestante);

    }else{

        alert("Intentos máximos fallidos");

    }

};