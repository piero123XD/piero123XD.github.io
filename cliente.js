var socket = new WebSocket("ws://localhost:8770");
var mensajes = {};

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

// Almacena una lista de los IDs de los elementos en el orden en que aparecen
var elementIds = [];

// Agrega un controlador de eventos "blur" a cada campo de entrada
var inputElements = document.querySelectorAll('input[type="text"], input[type="email"]');
inputElements.forEach(function(inputElement) {
    var id = inputElement.id;
    elementIds.push(id);
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(id);
    });
});

// Agrega un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement) {
    var id = radioElement.id;
    elementIds.push(id);
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(id);
    });
});

function enviarMensaje(id) {
    var inputElement = document.getElementById(id);
    var valor = inputElement.type === "radio" ? inputElement.value : inputElement.value;
    mensajes[id] = valor;
    var mensajesOrdenados = {};

    // Recorre los IDs en el orden original y crea un nuevo objeto
    elementIds.forEach(function(elementId) {
        mensajesOrdenados[elementId] = mensajes[elementId];
    });

    socket.send(JSON.stringify(mensajesOrdenados));
}
