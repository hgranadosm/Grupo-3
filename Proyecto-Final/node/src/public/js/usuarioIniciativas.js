
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


function preventBack() { window.history.forward(); }
setTimeout("preventBack()", 0);
window.onunload = function () { null };