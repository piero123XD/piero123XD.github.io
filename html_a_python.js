var socket = new WebSocket("ws://localhost:8769");
var mensajes = [];

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

var inputElements = document.querySelectorAll('input[type="text"]');
inputElements.forEach(function(inputElement, index) {
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement, index);
    });
});

function enviarMensaje(inputElement, index) {
    mensajes[index] = inputElement.value;

    // Comprueba si se han ingresado los 12 mensajes
    if (mensajes.length === 12) {
        // Habilita la edición y el envío de mensajes editados
        habilitarEdicion();
    }
}

function habilitarEdicion() {
    inputElements.forEach(function(inputElement, index) {
        inputElement.removeAttribute("readonly"); // Permite la edición
        inputElement.addEventListener('blur', function(event) {
            mensajes[index] = inputElement.value;
            socket.send(JSON.stringify(mensajes));
        });
    });
}
