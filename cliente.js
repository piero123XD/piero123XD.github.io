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

// Agrega un controlador de eventos "blur" a cada campo de entrada
var inputElements = document.querySelectorAll('input[type="text"], input[type="email"]');
inputElements.forEach(function(inputElement, index) {
    var id = "mensaje" + pad(index, 2); // Función para formatear el ID
    inputElement.id = id; // Asigna un ID único a cada elemento
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement, id);
    });
});

// Agrega un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement, index) {
    var id = "mensaje" + pad(index, 2); // Función para formatear el ID
    radioElement.id = id; // Asigna un ID único a cada elemento
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement, id);
    });
});

// Función para formatear el ID con ceros a la izquierda
function pad(num, size) {
    var s = "00" + num;
    return s.substr(s.length - size);
}

function enviarMensaje(inputElement, id) {
    var valor = inputElement.type === "radio" ? inputElement.value : inputElement.value;
    mensajes[id] = valor;
    socket.send(JSON.stringify(mensajes));
}
