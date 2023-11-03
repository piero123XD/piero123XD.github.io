var socket = new WebSocket("ws://localhost:8770");
var valoresCampos = {};

socket.onopen = function(event) {
    console.log("Conexión WebSocket abierta");
};

socket.onmessage = function(event) {
    console.log("Mensaje recibido del servidor: " + event.data);
};

socket.onclose = function(event) {
    if (event.wasClean) {
        console.log("Conexión WebSocket cerrada de manera limpia, código=" + event.code);
    } else {
        console.error("Conexión WebSocket cerrada de manera inesperada");
    }
};

socket.onerror = function(error) {
    console.error("Error en la conexión WebSocket: " + error.message);
};

// Agregar un controlador de eventos "blur" a los campos de texto y correo electrónico
var textAndEmailElements = document.querySelectorAll('input[type="text"], input[type="email"]');
textAndEmailElements.forEach(function(inputElement) {
    inputElement.addEventListener('blur', function(event) {
        valoresCampos[inputElement.id] = inputElement.value;
        enviarMensaje(valoresCampos);
    });
});

// Agregar un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement) {
    radioElement.addEventListener('change', function(event) {
        valoresCampos[radioElement.id] = radioElement.value;
        enviarMensaje(valoresCampos);
    });
});

function enviarMensaje(valoresCampos) {
    // Ordenar los valores de los campos en función de sus ID
    var camposOrdenados = Object.keys(valoresCampos).sort().map(function(id) {
        return { id: id, value: valoresCampos[id] };
    });

    socket.send(JSON.stringify(camposOrdenados));
}
