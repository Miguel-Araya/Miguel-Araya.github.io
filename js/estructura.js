//Coloca el footer y el header
//Con rutas tomando referencia que esta fuera de pages
//Las rutas son distintas, dependiendo si esta afuera o no de la carpeta pages
const colocarEstructura = (esFueraPages)=>{

    const rutaArchivo = 
    ["index.html", "inicioSesion.html", "servicio.html",
     "agendaCita.html", "busquedaMedico.html",
      "preguntaFrecuente.html", "informacionContacto.html", 
      "sobreNosotros.html", "terminoUso.html"
    ];

    //Si está fuera de pages, entonces está a nivel de index.html
    if(esFueraPages){

        for (let indice = 1; indice < rutaArchivo.length; indice++) {
            
            rutaArchivo[indice] = `pages/${rutaArchivo[indice]}`; 

        }

    }
    //A nivel de pages
    else{

        rutaArchivo[0] = `../${rutaArchivo[0]}`;
        
    }

    const body = document.body;

    const header = document.createElement("header");
    const contenidoHeader = `
    <h1>Clínica Árbol de Seda</h1>
    <nav>

        <ul>

            <li><a href="${rutaArchivo[0]}">Inicio</a></li>
            <li><a href="${rutaArchivo[1]}">Registro / Inicio de sesión</a></li>
            <li><a href="${rutaArchivo[2]}">Servicios</a></li>
            <li><a href="${rutaArchivo[3]}">Agenda de citas</a></li>
            <li><a href="${rutaArchivo[4]}">Búsqueda de médicos</a></li>
            
        </ul>

    </nav>
    `;
    
    const footer = document.createElement("footer");

    const contenidoFooter = `

        <p><strong>Clínica Árbol de Seda</strong></p>

        <div>

            <a href="https://www.instagram.com/">Instagram</a>

            <a href="https://www.facebook.com/">Facebook</a>

        </div>

        <a href="${rutaArchivo[6]}">Información de contacto</a>

        <a href="${rutaArchivo[7]}">Sobre nosotros</a>

        <div class="vertical">

            <a href="${rutaArchivo[8]}">Política de privacidad y términos de uso</a>

            <a href="${rutaArchivo[5]}">Preguntas frecuentes</a>
        </div>

    <p>Derechos de autor 2024</p>
    `;

    header.innerHTML = contenidoHeader;
    //Insertar el header como primer elemento del body
    body.insertBefore(header, body.firstChild);

    //Insertar footer
    footer.innerHTML = contenidoFooter;
    body.appendChild(footer);
    
};