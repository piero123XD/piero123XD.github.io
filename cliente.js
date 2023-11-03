var socket = new WebSocket("ws://localhost:8770");
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

// Definir el orden deseado de las IDs de los campos
var order = ['mensaje0', 'mensaje1', 'mensaje2', 'mensaje3', 'mensaje4', 'mensaje5', 'mensaje6', 'mensaje7', 'mensaje8', 'mensaje9', 'mensaje10', 'mensaje11'];

// Agregar un controlador de eventos "blur" a los campos de texto y correo electrónico
var textAndEmailElements = document.querySelectorAll('input[type="text"], input[type="email"]');
textAndEmailElements.forEach(function(inputElement) {
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement.id, inputElement.value);
    });
});

// Agregar un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement) {
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement.id, radioElement.value);
    });
});

function enviarMensaje(id, value) {
    var index = order.indexOf(id);
    if (index !== -1) {
        mensajes[index] = value; // Almacena solo el valor en el arreglo en la posición correcta
        var valores = mensajes.map(function (mensaje) {
            return mensaje !== undefined ? mensaje : ""; // Reemplaza los valores no definidos con una cadena vacía
        });
        socket.send(JSON.stringify(valores));
    }
}
