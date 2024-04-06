//Mantener una lista para ordenarla y hacer la paginacion
var listaMedico = [];

var paginaActual = -1;

const cantidadPorPagina = 3;

//Última página
var paginaLimite = -1

document.addEventListener("DOMContentLoaded", ()=>{

    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (event) => {

        //variable
        event.preventDefault();

        mostrarMedico();
        
    });
    
    const cerrarModal = document.querySelector('.cerrarModal');
    const modal = document.querySelector('.modal');

    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

});

const mostrarDetalleMedico = (medico) =>{

    const horario = medico.horario;
    const ultimoHorario = horario.length-1;
    const modal = document.querySelector('.modal');
    
    document.getElementById("nombreModal").textContent = medico.nombre;

    document.getElementById("especialidadModal").textContent = medico.especialidad;

    document.getElementById("horario").textContent = `${horario[0]}-${horario[ultimoHorario]}`;

    document.getElementById("telefono").textContent = medico.telefono;

    document.getElementById("resenna").textContent = medico.resenna;

    document.getElementById("calificacion").textContent = medico.calificacion;

    document.getElementById("biografia").textContent = medico.biografia;

    modal.style.display = 'block';

};

const obtenerDatosFormulario = () => {

    const nombre = document.getElementById("nombre").value.trim();

    const especialidad = document.getElementById("especialidad").value.trim();

    const ubicacion = document.getElementById("ubicacion").value.trim();

    const identificacion = document.getElementById("identificacion").value.trim();

    return {nombre, especialidad, ubicacion, identificacion};

};

const obtenerResultadoFiltro = () =>{

    const listaMedico = obtenerListaMedico();
    
    const {nombre, especialidad, ubicacion, identificacion} = obtenerDatosFormulario();
    
    const listaResultado = listaMedico.filter( medico => (medico.nombre.toLowerCase().includes(nombre.toLowerCase()) && medico.especialidad.toLowerCase().includes(especialidad.toLowerCase()) && medico.ubicacion.toLowerCase().includes(ubicacion.toLowerCase()) && medico.identificacion.toLowerCase().includes(identificacion.toLowerCase())));

    return listaResultado;
}

//Sugerencias en base a un filtro de los campos de búsqueda
const obtenerOpcionSugerencia = (campo) =>{

    const listaMedico = obtenerListaMedico();
    
    const {nombre, especialidad, ubicacion, identificacion} = obtenerDatosFormulario();
    
    const listaResultado = [];

    listaMedico.forEach((medico) =>{

        //Coincide con el filtro y valida si es repetido o no, para 
        //evitar las palabras repetidas en la lista de sugerencia
        if(medico.nombre.toLowerCase().includes(nombre.toLowerCase()) && medico.especialidad.toLowerCase().includes(especialidad.toLowerCase()) && medico.ubicacion.toLowerCase().includes(ubicacion.toLowerCase()) && medico.identificacion.toLowerCase().includes(identificacion.toLowerCase()) && !listaResultado.includes(medico[campo])){
            
            listaResultado.push(medico[campo]);

        }

    });

    return listaResultado;

}

//Qué campo (nombre, especialidad...) se va a ingresar el autocompletado
//También representa una propiedad o característica de los médicos
const autoCompletar = (campo)=>{

    const listaOpcionSugerencia = obtenerOpcionSugerencia(campo);
    
    const listaSugerencia = document.getElementById("listaSugerencia");

    //Eliminar los elementos agregados anteriormente a la lista de sugerencia
    listaSugerencia.innerHTML = '';

    //Agregar las opciones de sugerencia
    listaOpcionSugerencia.forEach((valorOpcion) =>{

        const opcion = document.createElement("option");

        opcion.value = valorOpcion;
        
        listaSugerencia.appendChild(opcion);
        
    });

};

const ordenarListaMedico = () => {
    
    const ordenar = document.getElementById("ordenar");
    const campo = ordenar.value;
    
    //Las que son cadena se acomodan de manera ascendente --> A-B
    if(listaMedico.length >= 1 && isNaN(listaMedico[0][campo])){
        listaMedico.sort((primerElemento, segundoElemento) => {
            if (primerElemento[campo] < segundoElemento[campo]){
                return -1
            }
            if (primerElemento[campo] > segundoElemento[campo]){ 
                return 1;
            }
            return 0;
        });
    }
    //Los numericos se colocan de manera descentede 5-1
    else{

        listaMedico.sort((primerElemento, segundoElemento) => {
            if (segundoElemento[campo] < primerElemento[campo]){
                return -1
            }
            if (segundoElemento[campo] > primerElemento[campo]){
                return 1
            }
            return 0;
        });

    }
    
    reiniciarPaginacion();

};

const agregarTablaMedico = (listaMedico) =>{

    const tablaMedico = document.getElementById('tablaMedico');

    tablaMedico.innerHTML = "";

    listaMedico.forEach(medico =>{

        const fila = document.createElement("tr"); 

        const nombre = document.createElement("td");
        nombre.textContent = medico.nombre;

        const especialidad = document.createElement("td");
        especialidad.textContent = medico.especialidad;

        const ubicacion = document.createElement("td");
        ubicacion.textContent = medico.ubicacion;

        var detalle = document.createElement("button");
        detalle.textContent = "Detalle";
        detalle.onclick = () => mostrarDetalleMedico(medico);
        
        fila.appendChild(nombre);
        fila.appendChild(especialidad);
        fila.appendChild(ubicacion);        
        fila.appendChild(detalle);

        tablaMedico.appendChild(fila);
    });

};

const paginaAnterior = () =>{

    if(paginaActual <= 0){
        
        return;
    }

    --paginaActual;

    paginacion();

}; 

const paginaSiguiente = () =>{

    if(paginaActual+1 >= paginaLimite){
        
        return;

    }

    ++paginaActual;

    paginacion();

};

const paginacion = () =>{

    const pagina = document.getElementById("pagina");
    
    //A nivel visual de usuario se suma 1, pero para calculos se necesita
    //sin agregar el 1, ya que comienza la pagina desde cero, a nivel de cálculo
    pagina.textContent = paginaActual+1;

    const listaPaginacion = listaMedico.slice((paginaActual*cantidadPorPagina), (paginaActual*cantidadPorPagina)+cantidadPorPagina);

    agregarTablaMedico(listaPaginacion);

};

const reiniciarPaginacion = () =>{

    const pagina = document.getElementById("pagina");
    pagina.textContent = "1";

    paginaLimite = Math.ceil(listaMedico.length/cantidadPorPagina);

    //Para hacer cálculos comienza desde cero
    paginaActual = 0;

    paginacion();
};

//El usuario a escrito en al menos un campo
const existeCampoIngresado = ()=>{

    const campoFiltro = Object.values(obtenerDatosFormulario());

    for (let indice = 0; indice < campoFiltro.length; indice++) {
        
        if(campoFiltro[indice] !== ""){

            return true;
        }
        
    }

    return false;

};   

//Mostrar en la tabla los resultados
const mostrarMedico = () =>{

    if(!existeCampoIngresado()){

        return;
        
    }

    const listaFiltro = obtenerResultadoFiltro();
    
    listaMedico = listaFiltro;

    reiniciarPaginacion();

};