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

// Agregar un controlador de eventos "blur" a los campos de texto y correo electrónico
var elementosConIndices = {};

textAndEmailElements.forEach(function(inputElement, index) {
    elementosConIndices[inputElement] = index;
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement);
    });
});

radioElements.forEach(function(radioElement, index) {
    elementosConIndices[radioElement] = index;
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement);
    });
});

function enviarMensaje(inputElement) {
    var index = elementosConIndices[inputElement];
    
    if (index !== undefined) {
        mensajes[index] = inputElement.value;
        socket.send(JSON.stringify(mensajes));
    }
}



