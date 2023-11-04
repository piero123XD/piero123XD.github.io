var socket = new WebSocket("ws://localhost:8770");
var valores = {};

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

// Agregar un controlador de eventos "input" a los campos de texto y correo electrónico
var textAndEmailElements = document.querySelectorAll('input[type="text"], input[type="email"]');
textAndEmailElements.forEach(function(inputElement) {
    inputElement.addEventListener('input', function(event) {
        valores[inputElement.id] = inputElement.value;
        enviarMensaje(valores);
    });
});

// Agregar un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement) {
    radioElement.addEventListener('change', function(event) {
        valores[radioElement.id] = radioElement.value;
        enviarMensaje(valores);
    });
});

function enviarMensaje(valores) {
    var idsEnOrden = Object.keys(valores); // Obtener las IDs en el orden en que se han almacenado
    var valoresEnOrden = idsEnOrden.map(function(id) {
        return valores[id];
    });
    socket.send(JSON.stringify(valoresEnOrden));
}
