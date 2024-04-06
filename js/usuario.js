const formatoContrasenna = () => {

    const contrasenna = document.getElementById("contrasenna");
    var formato = contrasenna.value; 
    
    //Aceptar cantidad máxima de caracteres
    const tamanno = formato.length;
    if (tamanno > 11) {

        formato = formato.substring(0,11);
    }

    //Aplicar máscara
    contrasenna.value = formato;

};

const obtenerListaMedico = () =>{

    const listaMedico = [

        {
            nombre: "Juan Un Doctor con un nombre extranamente grande",
            especialidad: "Oftalmología",
            ubicacion: "Cartago",
            identificacion: "1132", 
            horario: ["8:00", "9:00", 
            "10:00", "11:00"],
            telefono: "8923-1209",
            resenna: "Buen médico",
            calificacion: 4,
            biografia: "Médico con más de 20 años de experiencia en el campo de la medicina. Graduado con honores de la Facultad de Medicina de la Universidad de Costa Rica. Durante su carrera, ha demostrado un compromiso excepcional con la excelencia clínica y la atención compasiva hacia sus pacientes. Su enfoque centrado en el paciente y su habilidad para comunicarse de manera efectiva le han valido el respeto y la admiración de sus colegas y pacientes por igual."
        
        },

        {
            nombre: "Otro Juan",
            especialidad: "Oftalmología",
            ubicacion: "Cartago",
            identificacion: "1132", 
            horario: ["12:00", "13:00", 
            "14:00", "15:00"],
            telefono: "8923-1209",
            resenna: "Buen médico",
            calificacion: 4,
            biografia: "Médico con más de 20 años de experiencia en el campo de la medicina. Graduado con honores de la Facultad de Medicina de la Universidad de Costa Rica. Durante su carrera, ha demostrado un compromiso excepcional con la excelencia clínica y la atención compasiva hacia sus pacientes. Su enfoque centrado en el paciente y su habilidad para comunicarse de manera efectiva le han valido el respeto y la admiración de sus colegas y pacientes por igual."
        
        },

        {
            nombre: "Alberto",
            especialidad: "Dermatología",
            ubicacion: "Turrialba",
            identificacion: "1133",
            horario: ["12:00", "13:00", 
            "14:00", "15:00"],
            telefono: "8711-1108",
            resenna: "Excelente médico",
            calificacion: 5,
            biografia: "Médico con más de 20 años de experiencia en el campo de la medicina. Graduado con honores de la Facultad de Medicina de la Universidad de Costa Rica. Durante su carrera, ha demostrado un compromiso excepcional con la excelencia clínica y la atención compasiva hacia sus pacientes. Su enfoque centrado en el paciente y su habilidad para comunicarse de manera efectiva le han valido el respeto y la admiración de sus colegas y pacientes por igual."
        },

        {
            nombre: "Luis",
            especialidad: "Dermatología",
            ubicacion: "Turrialba",
            identificacion: "1134",
            horario: ["8:00", "9:00", 
            "10:00", "11:00"],
            telefono: "8623-0709",
            resenna: "Buen médico",
            calificacion: 4,
            biografia: "Médico con más de 20 años de experiencia en el campo de la medicina. Graduado con honores de la Facultad de Medicina de la Universidad de Costa Rica. Durante su carrera, ha demostrado un compromiso excepcional con la excelencia clínica y la atención compasiva hacia sus pacientes. Su enfoque centrado en el paciente y su habilidad para comunicarse de manera efectiva le han valido el respeto y la admiración de sus colegas y pacientes por igual."
        
        },
        
        {
            nombre: "Beatriz",
            especialidad: "Dermatología",
            ubicacion: "Alajuela",
            identificacion: "2244",
            horario: ["8:00", "9:00", 
            "10:00", "11:00"],
            telefono: "8923-1209",
            resenna: "Buen médico",
            calificacion: 4,
            biografia: "Médico con más de 20 años de experiencia en el campo de la medicina. Graduado con honores de la Facultad de Medicina de la Universidad de Costa Rica. Durante su carrera, ha demostrado un compromiso excepcional con la excelencia clínica y la atención compasiva hacia sus pacientes. Su enfoque centrado en el paciente y su habilidad para comunicarse de manera efectiva le han valido el respeto y la admiración de sus colegas y pacientes por igual."
            
        },
        
        {
            nombre: "Carlos",
            especialidad: "Dermatología",
            ubicacion: "Heredia",
            identificacion: "3355",
            horario: ["12:00", "13:00", 
            "14:00", "15:00"],
            telefono: "8923-1209",
            resenna: "Buen médico",
            calificacion: 4,
            biografia: "Médico con más de 20 años de experiencia en el campo de la medicina. Graduado con honores de la Facultad de Medicina de la Universidad de Costa Rica. Durante su carrera, ha demostrado un compromiso excepcional con la excelencia clínica y la atención compasiva hacia sus pacientes. Su enfoque centrado en el paciente y su habilidad para comunicarse de manera efectiva le han valido el respeto y la admiración de sus colegas y pacientes por igual."
        
        },
        
        {
            nombre: "Diana",
            especialidad: "Dermatología",
            ubicacion: "Cartago",
            identificacion: "4466",
            horario: ["12:00", "13:00", 
            "14:00", "15:00"],
            telefono: "8923-1209",
            resenna: "Buen médico",
            calificacion: 4,
            biografia: "Médico con más de 20 años de experiencia en el campo de la medicina. Graduado con honores de la Facultad de Medicina de la Universidad de Costa Rica. Durante su carrera, ha demostrado un compromiso excepcional con la excelencia clínica y la atención compasiva hacia sus pacientes. Su enfoque centrado en el paciente y su habilidad para comunicarse de manera efectiva le han valido el respeto y la admiración de sus colegas y pacientes por igual."
        
        }
        
    ];

    return listaMedico;
};

const formatoNombre = () =>{

    const nombre = document.getElementById("nombre");
    var formato = nombre.value; 
    
    //Aceptar cantidad máxima de caracteres
    const tamanno = formato.length;
    if (tamanno > 20) {

        formato = nombre.value.substring(0,20);

    }

    //Aplicar máscara
    nombre.value = formato;

};

const formatoApellido = () => {

    const apellido = document.getElementById("apellido");
    var formato = apellido.value; 
    
    //Aceptar cantidad máxima de caracteres
    const tamanno = formato.length;
    if (tamanno > 30) {

        formato = apellido.value.substring(0,30);

    }

    //Aplicar máscara
    apellido.value = formato;


};

const formatoCedula = () => {

    const cedula = document.getElementById("cedula");
    var formato = cedula.value.trim(); 
    formato = formato.replace(/\D/g, ""); //Elimina caracteres distintos a un dígito 0-9, para el formato numérico

    //Colocar guiones
    const tamanno = formato.length;
    if (tamanno > 2 && tamanno <= 6) {

        formato = `${formato.substring(0, 2)}-${formato.substring(2, 6)}`;

    } else if (tamanno > 6) {

        formato = `${formato.substring(0, 2)}-${formato.substring(2, 6)}-${formato.substring(6, 10)}`;
    
    }

    //Aplicar máscara
    cedula.value = formato;

};

const formatoCelular = () => {

    const celular = document.getElementById("celular");
    var formato = celular.value.trim(); 
    formato = formato.replace(/\D/g, ""); //Elimina caracteres distintos a un dígito 0-9, para el formato numérico

    //Colocar guiones
    const tamanno = formato.length;
    if (tamanno > 4) {

        formato = `${formato.substring(0, 4)}-${formato.substring(4, 8)}`;

    }

    //Aplicar máscara
    celular.value = formato;

};

const confirmarContrasenna = (contrasenna) => {

    const confirmarContrasenna = document.getElementById("confirmarContrasenna");
    
    return confirmarContrasenna.value.trim() === contrasenna;

};

//vista HTML
const autenticarUsuario = () => {

    const sesionUsuario = JSON.parse(localStorage.getItem("inicioSesion"));

    if(sesionUsuario === null){

        alert("Necesita iniciar sesion");

        window.location.href = "../index.html";

    }

};

const esUsuarioExistente = (cedula) =>{

    const listaUsuario = JSON.parse(localStorage.getItem("usuario"));

    if(listaUsuario === null){

        return false;

    }

    for (let indice = 0; indice < listaUsuario.length; indice++) {

        const elemento = listaUsuario[indice];
        
        if(elemento.cedula === cedula){

            return true;
        }

    }

    return false;

};

const validarCorreo = (correo) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
};

const validarNombre = (texto) => {

    return /^(?=.*[A-Z])(?=.*[a-z]).{1,20}$/.test(texto);

};

const validarApellido = (texto) => {

    return /^(?=.*[A-Z])(?=.*[a-z]).{1,30}$/.test(texto);

};

const validarCedula = (cedula) => {

    return /^\d{2}-\d{4}-\d{4}/.test(cedula);

};

const validarCelular = (celular) =>{

    return /^\d{4}-\d{4}/.test(celular);

}

const validarContrasenna = (contrasenna) => {

    // / -> inicia una expresion regular
    // (?=.*\d) utilice simbolos especiales
    // (?=.*[!@#$%^&*]) que no tenga estos caracteres
    // test() es un metodo que tienen las expresiones regulares
    // \d que inice con cualquier cosa

    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,11}$/.test(contrasenna);
};

const limpiarCamposTexto = () => {

    const campos = document.querySelectorAll("#formulario input[type='email'], #formulario input[type='password'], #formulario input[type='text'], #formulario input[type='number']");
    //Lo toma como un vector
    campos.forEach((campo) => campo.value = "");

};