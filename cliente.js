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
inputElements.forEach(function(inputElement) {
    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement);
    });
});

// Agrega un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement) {
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement);
    });
});

function enviarMensaje(inputElement) {
    // Obtiene el valor del campo de entrada
    var valor = inputElement.type === "radio" ? inputElement.value : inputElement.value;
    // Obtiene el ID del elemento
    var id = inputElement.id;
    // Almacena el valor en el objeto mensajes utilizando el ID como clave
    mensajes[id] = valor;
    // Ordena los mensajes de manera ascendente por los IDs numéricos
    var mensajesOrdenados = {};
    Object.keys(mensajes).sort(function(a, b) {
        return parseInt(a.replace("mensaje", "")) - parseInt(b.replace("mensaje", ""));
    }).forEach(function(key) {
        mensajesOrdenados[key] = mensajes[key];
    });
    socket.send(JSON.stringify(mensajesOrdenados));
}
