
const $inputs = document.querySelectorAll('#formulario input, #formulario textarea');
const $formulario = document.getElementById('formulario');


const expresiones = {
    correo:/^[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    password: /^.{4,12}$/,
};


const campos = {
    correo: false,
    password: false,
};


const validarFormulario = (e) => {
    switch (e.target.name) {
        case "correo":
            validarCampo(expresiones.correo, e.target, "Correo");
            break;
        case "password":
            validarCampo(expresiones.password, e.target, "Password");
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


    if (campos.correo  && campos.password) {

        //agarro la info del form
        const formData = new FormData($formulario);
        const datosFormulario = JSON.stringify(Object.fromEntries(formData.entries())); // la convierto a texto

        
        // llamo al api
        const response = await fetch('/login', {
            method: 'POST',
            body: datosFormulario,
            headers: {
                'Content-Type': 'application/json'
            }
        });

         //evaluo la respuesta
         if(response.ok) {
            $formulario.reset();
            window.location.href='/index';
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


function preventBack() { window.history.forward(); }
setTimeout("preventBack()", 0);
window.onunload = function () { null };
        
        

   
        
       

   