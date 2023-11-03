var socket = new WebSocket("ws://localhost:8770");
var contadorMensajes = 0;

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

var inputElements = document.querySelectorAll('input[type="text"], input[type="email"]');
inputElements.forEach(function(inputElement) {
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement);
    });
});

var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement) {
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement);
    });
});

function enviarMensaje(inputElement) {
    var valor = inputElement.type === "radio" ? inputElement.value : inputElement.value;
    var idMensaje = "mensaje" + contadorMensajes;
    contadorMensajes++;
    socket.send(JSON.stringify({ [idMensaje]: valor }));
}
