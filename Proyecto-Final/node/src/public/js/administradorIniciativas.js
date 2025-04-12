function actualizarEstado(id, nuevoEstado) {
    fetch(`/actualizarEstado/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nuevoEstado })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        location.reload(); 
    })
    .catch(error => {
        console.error('Error al actualizar estado:', error);
        alert('Ocurrió un error al actualizar el estado.');
    });
}

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
