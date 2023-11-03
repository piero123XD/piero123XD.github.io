var socket = new WebSocket("ws://localhost:8770");
var mensajes = {};

socket.onopen = function(event) {
    console.log("Conexión WebSocket abierta 2");
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

// Almacena una lista de los IDs de los elementos en el orden en que aparecen
var elementIds = [];

var inputElements = document.querySelectorAll('input[type="text"], input[type="email"]');
inputElements.forEach(function(inputElement) {
    elementIds.push(inputElement.id); // Almacena el ID
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement);
    });
});

var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement) {
    elementIds.push(radioElement.id); // Almacena el ID
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement);
    });
});

function enviarMensaje(inputElement) {
    var valor = inputElement.type === "radio" ? inputElement.value : inputElement.value;
    var id = inputElement.id; // Obtiene el ID del elemento
    mensajes[id] = valor; // Utiliza el ID como clave en el objeto mensajes
    var mensajesOrdenados = {};

    // Recorre los IDs en el orden original y crea un nuevo objeto
    for (var i = 0; i < elementIds.length; i++) {
        var elementId = elementIds[i];
        mensajesOrdenados[elementId] = mensajes[elementId];
    }

    socket.send(JSON.stringify(mensajesOrdenados));
}
