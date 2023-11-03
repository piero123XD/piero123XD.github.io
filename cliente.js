var socket = new WebSocket("ws://localhost:8769");
var mensajes = {}; // Usamos un objeto para almacenar los datos con claves únicas
var order = []; // Usamos un array para mantener el orden de los campos

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
textAndEmailElements.forEach(function(inputElement, index) {
    // Usar el id como clave única en el objeto mensajes
    mensajes[inputElement.id] = inputElement.value;
    order[index] = inputElement.id;

    inputElement.addEventListener('blur', function(event) {
        enviarMensaje(inputElement.id);
    });
});

// Agregar un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement, index) {
    // Usar el id como clave única en el objeto mensajes
    mensajes[radioElement.id] = radioElement.checked;
    order[index] = radioElement.id;

    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement.id);
    });
});

function enviarMensaje(inputId) {
    // Crear un array ordenado de acuerdo al orden de los campos
    var orderedData = order.map(function (id) {
        return mensajes[id];
    });

    socket.send(JSON.stringify(orderedData));
}
