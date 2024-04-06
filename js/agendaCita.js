
//Que empiece en Enero
var mesActual = 0;

document.addEventListener("DOMContentLoaded", ()=>{

    autenticarUsuario();

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (event) => {

        event.preventDefault();
        
        const esValido = !esCitaExistente();
        
        esValido ? manejarExito() : manejarError();

    });

    agregarHistorialCita();

    const cerrarModal = document.querySelector('.cerrarModal');
    const modal = document.querySelector('.modal');

    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    agregarCalendario();

});

const mesSiguiente = ()=>{

    if(mesActual + 1 >= 12){

        return;
    }

    ++mesActual;

    agregarCalendario();
};

const mesAnterior = () =>{

    if(mesActual <= 0){

        return;

    }

    --mesActual;

    agregarCalendario();

}

//campo
//0 anno
//1 mes
//2 dia
const obtenerCampoFecha = (fecha, campo) =>{

    const mes = fecha.split("-");

    //El mes se encuentra en medio de la fecha
    return mes[campo];

};

const obtenerCitaMes = () => {

    const listaCita = JSON.parse(localStorage.getItem("cita"));
    const usuario = JSON.parse(localStorage.getItem("inicioSesion"));
    const listaCitaMes = [];

    if(listaCita === null){

        return listaCitaMes;

    }

    for (let indice = 0; indice < listaCita.length; indice++) {
        
        const cita = listaCita[indice];
        
        if(usuario.cedula === cita.usuario && mesActual+1 == obtenerCampoFecha(cita.fecha, 1)){
            
            listaCitaMes.push(cita);

        }
    }

    //Ordenarlo para que coincida con el iterador
    listaCitaMes.sort((primerElemento, segundoElemento) => {
        if (primerElemento.fecha < segundoElemento.fecha){
            return -1
        }
        if (primerElemento.fecha > segundoElemento.fecha){ 
            return 1;
        }
        return 0;
    });

    return listaCitaMes;

};

//contadorCitaMes indice donde se encuentra la info de la cita
const mostrarDetalleCita = (indiceCitaMes) =>{

    const listaCita = obtenerCitaMes();
    const modal = document.querySelector('.modal');

    document.getElementById("medicoModal").textContent = listaCita[indiceCitaMes].medico;

    document.getElementById("especialidadModal").textContent = listaCita[indiceCitaMes].especialidad;

    document.getElementById("horaModal").textContent = listaCita[indiceCitaMes].hora;

    document.getElementById("estado").textContent = listaCita[indiceCitaMes].estado;

    document.getElementById("fechaModal").textContent = listaCita[indiceCitaMes].fecha;

    document.getElementById("nombreUsuario").textContent = obtenerNombreUsuario(listaCita[indiceCitaMes].usuario);

    modal.style.display = 'block';

};

const obtenerNombreUsuario = (cedula) =>{

    const listaUsuario = JSON.parse(localStorage.getItem("usuario"));

    if(listaUsuario === null){

        return "Desconocido";

    }

    for (let indice = 0; indice < listaUsuario.length; indice++) {
        
        const usuario = listaUsuario[indice];

        if(usuario.cedula === cedula){

            return usuario.nombre;

        }
        
    }

}

const agregarCalendario = () =>{
    
    const nombreMes = [
        "Enero", "Febrero", "Marzo", "Abril","Mayo", "Junio", "Julio", "Agosto","Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const annoActual = 2024;

    const listaCitaMes = obtenerCitaMes();

    var contadorCitaMes = 0;

    const tablaCalendario = document.getElementById("tablaCalendario");
    const mes = document.getElementById("mes");
    mes.textContent = nombreMes[mesActual];

    tablaCalendario.innerHTML = "";

    //Dias correspondientes al mes actual
    const diaTotal = new Date(annoActual, mesActual + 1, 0).getDate();
    const primerDiaSemana = new Date(annoActual, mesActual, 1).getDay();

    var fila = document.createElement("tr");

    // Agregar días vacíos antes del primer día del mes
    for (let indice = 0; indice < primerDiaSemana; indice++) {

        const dato = document.createElement("td");

        fila.appendChild(dato);
    }

    // Agregar los días del mes
    for (let indice = 1; indice <= diaTotal; indice++) {
        
        const diaSemana = new Date(annoActual, mesActual, indice).getDay();

        if(listaCitaMes.length > 0 && obtenerCampoFecha((listaCitaMes[contadorCitaMes]).fecha, 2) == indice){
            
            fila.innerHTML += `<td><button class="citaPendiente" onclick="mostrarDetalleCita(${contadorCitaMes});">${indice}</button></td>`;

            if(contadorCitaMes + 1 < listaCitaMes.length){

                ++contadorCitaMes;
    
            }

        }
        else{

            fila.innerHTML += `<td><button>${indice}</button></td>`
        
        }

        //Si llega al límite del día calendario debe seguir en otra
        
        if (diaSemana === 6 || indice === diaTotal) {
            tablaCalendario.appendChild(fila);
            fila = document.createElement("tr");
        }
    }

};

const agregarHistorialCita = () =>{

    const listaCita = JSON.parse(localStorage.getItem("cita"));
    const usuario = JSON.parse(localStorage.getItem("inicioSesion"));

    if(listaCita === null){

        return null;

    }

    const tablaCita = document.getElementById("tablaCita");
    tablaCita.innerHTML = "";

    listaCita.forEach(cita => {
        
        if(cita.usuario === usuario.cedula){

            const fila = document.createElement("tr");
            
            const medico = document.createElement("td");
            medico.textContent = cita.medico;

            const hora = document.createElement("td");
            hora.textContent = cita.hora;

            const fecha = document.createElement("td");
            fecha.textContent = cita.fecha

            fila.appendChild(medico);
            fila.appendChild(hora);
            fila.appendChild(fecha);

            tablaCita.appendChild(fila);
        }

    });

};

const esCitaExistente = () =>{

    const listaCita = JSON.parse(localStorage.getItem("cita"));
    const usuario = JSON.parse(localStorage.getItem("inicioSesion"));
    const {especialidad, medico, fecha, hora} = obtenerDatosFormulario();

    if(listaCita === null){

        return false;

    }

    for (let indice = 0; indice < listaCita.length; indice++) {
        
        const cita = listaCita[indice];
        
        //No se puede elegir una cita identicamente existente
        if(cita.medico === medico && cita.especialidad === especialidad && cita.fecha === fecha && cita.hora === hora){

            return true;

        }

        //No elegir 2 citas para la misma hora un mismo día para un usuario
        if(cita.usuario === usuario.cedula && cita.fecha === fecha && cita.hora === hora){

            return true;

        }

    }

    return false;
}

const obtenerDatosFormulario = () =>{

    const especialidad = document.getElementById("especialidad").value.trim();
    
    const medico = document.getElementById("medico").value.trim();

    const fecha = formatearFecha(document.getElementById("fecha").value.trim());

    const hora = document.getElementById("hora").value.trim();    

    return {especialidad, medico, fecha, hora};

};

const formatearFecha = (fecha) =>{

    //utilizar guiones siempre, ya que algunos navegadores no la separan con barra inclinada
    return fecha.replace(/\D/g, "-");

}

const obtenerHoraMedico = () =>{

    const listaMedico = obtenerListaMedico();
    const hora = document.getElementById("hora");
    const nombreMedico = document.getElementById("medico").value;
    const especialidad = document.getElementById("especialidad").value;

    hora.innerHTML = "";

    for (let indice = 0; indice < listaMedico.length; indice++) {
        
        const medico = listaMedico[indice];

        if(medico.nombre === nombreMedico && medico.especialidad === especialidad){

            const horario = medico.horario;
            
            horario.forEach(elemento => {
               
                const opcion = document.createElement("option");    
                opcion.textContent = elemento;
                hora.appendChild(opcion);
            });

            return;

        }  
    }

};  

const obtenerMedicoPorEspecialidad = () =>{

    const listaMedico = obtenerListaMedico();
    const especialidad = document.getElementById("especialidad").value;
    
    const selectMedico = document.getElementById("medico");
    selectMedico.innerHTML = "";

    //Eliminar la hora si existe para obligar al usuario a seleccionar una hora
    const selectHora = document.getElementById("hora");
    selectHora.innerHTML = "";

    //Poner una opcion por defecto
    const opcionPorDefecto = document.createElement("option");    
    opcionPorDefecto.textContent = "Seleccione una opción";
    selectMedico.appendChild(opcionPorDefecto);

    for (let indice = 0; indice < listaMedico.length; indice++) {

        const medico = listaMedico[indice];
        
        if(medico.especialidad === especialidad){

            const opcion = document.createElement("option");
            opcion.textContent = medico.nombre;
            
            selectMedico.appendChild(opcion);
        }

    }


};

const programarCita = () =>{

    const listaCita = JSON.parse(localStorage.getItem("cita"));
    const usuario = JSON.parse(localStorage.getItem("inicioSesion"));

    const nuevaCita = obtenerDatosFormulario();    
    nuevaCita.usuario = usuario.cedula;
    nuevaCita.estado = "pendiente";

    if(listaCita === null){

        localStorage.setItem("cita", JSON.stringify([nuevaCita]));

    }else{

        listaCita.push(nuevaCita);
        localStorage.setItem("cita", JSON.stringify(listaCita));
    }

};

const manejarExito = () => {

    alert("Cita programada");
    programarCita();
    agregarHistorialCita();
    agregarCalendario();

};

const manejarError = () => {
    
    alert("Esta cita no se encuentra disponible");

};