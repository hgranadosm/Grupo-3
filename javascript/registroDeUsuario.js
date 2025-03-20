
const $inputs = document.querySelectorAll('#formulario input, #formulario textarea');
const $formulario = document.getElementById('formulario');


const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    apellido1: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    apellido2: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    correo: /^[a-zA-Z0-9\_]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    identificacion: /^\d{9,11}$/,
    telefono: /^\d{8,11}$/,
    contraseña: /^.{4,12}$/,
    detalle: /^(?=[\s\S]{4,300}$)[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ,.-\s;]+$/,
};


const campos = {
    nombre: false,
    apellido1: false,
    apellido2: false,
    correo: false,
    identificacion: false,
    telefono: false,
    contraseña: false,
    detalle: false,
};


const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "Nombre");
            break;
        case "apellido1":
            validarCampo(expresiones.apellido1, e.target, "Apellido1");
            break;
        case "apellido2":
            validarCampo(expresiones.apellido2, e.target, "Apellido2");
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, "Correo");
            break;
        case "identificacion":
            validarCampo(expresiones.identificacion, e.target, "Identificacion");
            break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, "Telefono");
            break;
        case "contraseña":
            validarCampo(expresiones.contraseña, e.target, "Contraseña");
            break;
        case "detalle":
            validarCampo(expresiones.detalle, e.target, "detalle");
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


$inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
});


$formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const $formularioCamposRequeridos = document.getElementById('formularioCamposRequeridos');
    const $formularioMensajeExito = document.getElementById('formularioMensaje-exito');

    if (campos.nombre && campos.apellido1 && campos.apellido2 && campos.correo && campos.identificacion && campos.telefono && campos.contraseña && campos.detalle) {
        
        $formularioMensajeExito.classList.add('formularioMensaje-exito-activo');
        $formularioCamposRequeridos.classList.remove('formularioCamposRequeridos-activo');

        $formulario.reset();

        document.querySelectorAll('.formularioGrupo-correcto').forEach((icono) => {
            icono.classList.remove('formularioGrupo-correcto');
        });

        setTimeout(() => {
            $formularioMensajeExito.classList.remove('formularioMensaje-exito-activo');
        }, 5000);

    } else {
        $formularioCamposRequeridos.classList.add('formularioCamposRequeridos-activo');
    }
});
