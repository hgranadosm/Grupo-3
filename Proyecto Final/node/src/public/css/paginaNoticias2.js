
const noticias = [
    { 
        titulo: "Nuevo correo del Concejo Municipal", 
        fecha: "11 marzo 2025", 
        mes: "MARZO", 
        resumen: "Nuevo correo del Concejo Municipal",
        imagen: "img/correo_concejo.png",
        enlace: "./cambioCorreo.html"
    },
    { 
        titulo: "Resiclaje en parques", 
        fecha: "3 marzo 2025", 
        mes: "MARZO", 
        resumen: " Reciclaje en Parques",
        imagen: "img/comunidad.jpg",
        enlace: "./reciclaje.html"
    },  
    { 
        titulo: "Comité cantonal para lo persona joven ", 
        fecha: "5 febrero 2025", 
        mes: "FEBRERO", 
        resumen: " Comité cantonal para la persona joven",
        imagen: "img/comite_joven.jpg",
        enlace: "./comiteCantonal.html"
    },
    { 
        titulo: "Feria dew la salud ", 
        fecha: "8 enero 2025", 
        mes: "ENERO", 
        resumen: " Feria de la salud 2025",
        imagen: "img/salud.jpg",
        enlace: "./feriaSalud.html"
     }
     ,
    { 
        titulo: "Control Vial ", 
        fecha: "2 enero 2025", 
        mes: "ENERO", 
        resumen: " Refuerzo en el Control Vial de Montes de Oca",
        imagen: "img/controlVial.jpg",
        enlace: "./controlVial.html"
     }

];



function mostrarNoticias() {
    const contenedor = document.getElementById("contenedorNoticias");

    noticias.forEach(noticia => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("noticia");

        const contenedorImagen = document.createElement("div");
        contenedorImagen.classList.add("contenedorImagen");
        
        const imagen = document.createElement("img");
        imagen.classList.add("imagenNoticia");
        imagen.src = noticia.imagen;
        imagen.alt = noticia.titulo;
        
        contenedorImagen.appendChild(imagen);

        const infoNoticias = document.createElement("div");
        infoNoticias.classList.add("infoNoticias");
        
        const fechaNoticia = document.createElement("p");
        fechaNoticia.classList.add("fechaNoticia");
        fechaNoticia.textContent = noticia.mes;
        
        const fechaCompleta = document.createElement("p");
        fechaCompleta.classList.add("fechaNoticia");
        fechaCompleta.textContent = noticia.fecha;
        
        const resumenNoticias = document.createElement("p");
        resumenNoticias.classList.add("resumenNoticias");
        resumenNoticias.textContent = noticia.resumen;
        
        const leerMas = document.createElement("a");
        leerMas.classList.add("leerMas");
        leerMas.href = noticia.enlace;
        leerMas.textContent = "Leer más";

        // Agregar los elementos a la tarjeta
        infoNoticias.appendChild(fechaNoticia);
        infoNoticias.appendChild(fechaCompleta);
        infoNoticias.appendChild(resumenNoticias);
        infoNoticias.appendChild(leerMas);
        
        tarjeta.appendChild(contenedorImagen);
        tarjeta.appendChild(infoNoticias);
        
        // Agregar la tarjeta al contenedor principal
        contenedor.appendChild(tarjeta);
    });
}

mostrarNoticias();

