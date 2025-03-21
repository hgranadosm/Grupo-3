const $inputs = document.querySelectorAll('#formulario input, #formulario textarea');
const $formulario = document.getElementById('formulario');


const expresiones = {
    titulo: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    descripcion: /^(?=[\s\S]{4,300}$)[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ,.-\s;]+$/,
};


const campos = {
    titulo: false,
    fecha: false,
    descripcion: false,
};


const validarFormulario = (e) => {
    switch (e.target.name) {
        case "titulo":
            validarCampo(expresiones.titulo, e.target, "titulo");
            break;
        case "fecha":
            validarCampofecha(e.target, "fecha");
            break;
        case "descripcion":
            validarCampo(expresiones.descripcion, e.target, "descripcion");
            break;
    }
};


const validarCampo = (expresion, input, campo) => {
    const grupo = document.getElementById(`grupo${campo}`);
    const icono = grupo.querySelector('i');
    const errorMensaje = grupo.querySelector('.formularioInput-error');

    if (expresion.test(input.value)) {
        grupo.classList.remove("formularioGrupo-incorrecto");
        grupo.classList.add("formularioGrupo-correcto");
        icono.classList.remove("bxs-x-circle");
        icono.classList.add("bxs-check-circle");
        errorMensaje.classList.remove("formularioInput-error-activo");
        campos[campo.toLowerCase()] = true;
    } else {
        grupo.classList.add("formularioGrupo-incorrecto");
        grupo.classList.remove("formularioGrupo-correcto");
        icono.classList.add("bxs-x-circle");
        icono.classList.remove("bxs-check-circle");
        errorMensaje.classList.add("formularioInput-error-activo");
        campos[campo.toLowerCase()] = false;
    }
};

const validarCampofecha = (input, campo) => {
    const grupo = document.getElementById(`grupo${campo}`);
    const icono = grupo.querySelector('i');
    const errorMensaje = grupo.querySelector('.formularioInput-error');

    const valorFecha = input.value; 

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const hoyString = hoy.toISOString().split('T')[0]; 

    if (valorFecha >= hoyString) {
        grupo.classList.remove("formularioGrupo-incorrecto");
        grupo.classList.add("formularioGrupo-correcto");
        icono.classList.remove("bxs-x-circle");
        icono.classList.add("bxs-check-circle");
        errorMensaje.classList.remove("formularioInput-error-activo");
        campos[campo.toLowerCase()] = true;
    } else {
        grupo.classList.add("formularioGrupo-incorrecto");
        grupo.classList.remove("formularioGrupo-correcto");
        icono.classList.add("bxs-x-circle");
        icono.classList.remove("bxs-check-circle");
        errorMensaje.classList.add("formularioInput-error-activo");
        campos[campo.toLowerCase()] = false;
    }
};



$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});


$formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const $formularioCamposRequeridos = document.getElementById('formularioCamposRequeridos');
    const $formularioMensajeExito = document.getElementById('formularioMensaje-exito');

    if (campos.titulo && campos.fecha && campos.descripcion) {
        $formularioMensajeExito.classList.add('formularioMensaje-exito-activo');
        $formularioCamposRequeridos.classList.remove('formularioCamposRequeridos-activo');

        document.querySelectorAll('.formularioGrupo-correcto').forEach((icono) => {
            icono.classList.remove('formularioGrupo-correcto');
        });

        $formulario.reset();

        setTimeout(() => {
            $formularioMensajeExito.classList.remove('formularioMensaje-exito-activo');
            location.reload();
        }, 2000);

    } else {
        $formularioCamposRequeridos.classList.add('formularioCamposRequeridos-activo');
    }
});
