
const $inputs = document.querySelectorAll('#formulario input, #formulario textarea');
const $formulario = document.getElementById('formulario');


const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    apellido1: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    apellido2: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    correo:/^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    identificacion: /^\d{9,11}$/,
    telefono: /^\d{8,11}$/,
    detalle: /^(?=[\s\S]{4,300}$)[a-zA-Z0-9áéíóúÁÉÍÓÚüÜ,.-\s;]+$/,
};


const campos = {
    nombre: false,
    apellido1: false,
    apellido2: false,
    correo: false,
    identificacion: false,
    telefono: false,
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


$formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    // aquí tomo los elementos que tienen mensajes informativos
    const $formularioCamposRequeridos = document.getElementById('formularioCamposRequeridos');
    const $formularioMensajeExito = document.getElementById('formularioMensaje-exito');
    const $errorEnApi = document.getElementById('ErrorEnApi');

    $errorEnApi.classList.remove('formularioCamposRequeridos-activo'); // le quito cualquier clase activa al div de error del api

    //agarro la info del form
    const formData = new FormData($formulario);
    const valores = Object.fromEntries(new FormData($formulario).entries());
    
    if (  expresiones.nombre.test(valores.nombre) &&
    expresiones.apellido1.test(valores.apellido1) &&
    expresiones.apellido2.test(valores.apellido2) &&
    expresiones.identificacion.test(valores.identificacion) &&
    expresiones.telefono.test(valores.telefono) &&
    expresiones.detalle.test(valores.detalle)) {
        
        const datosFormulario = JSON.stringify(Object.fromEntries(formData.entries())); // la convierto a texto

        // llamo al api
        const response = await fetch('/editProfile', {
            method: 'POST',
            body: datosFormulario,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //evaluo la respuesta
        if(response.ok) {
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
            //esta parte se ejecuta cuando el api da error
            $errorEnApi.innerText = response.statusText;
            $errorEnApi.classList.add('formularioCamposRequeridos-activo');
        }
    } else {
        // esta parte se ejecuta cuando las validaciones de los campos están mal
        $errorEnApi.classList.remove('formularioCamposRequeridos-activo');
        $formularioCamposRequeridos.classList.add('formularioCamposRequeridos-activo');
    }
});

      
function cerrarSesion() {
    fetch('/logout', {
        method: 'POST',
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url;
        } else {
            alert('No se pudo cerrar sesión.');
        }
    })
    .catch(error => {
        console.error('Error al cerrar sesión:', error);
        alert('Error al cerrar sesión.');
    });
}