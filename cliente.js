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

// Objeto para mantener un seguimiento de los valores por ID
var valoresPorID = {};

// Agregar un controlador de eventos "input" a los campos de texto y correo electrónico
var textAndEmailElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="radio"]');
textAndEmailElements.forEach(function(inputElement) {
    inputElement.addEventListener('input', function(event) {
        enviarMensaje(inputElement);
    });
});

function enviarMensaje(inputElement) {
    // Asigna un valor vacío si el campo está vacío o no está seleccionado (en caso de radio)
    if (inputElement.type === 'radio') {
        valoresPorID[inputElement.id] = inputElement.checked ? 'on' : '';
    } else {
        valoresPorID[inputElement.id] = inputElement.value || '';
    }

    // Crea un arreglo de valores ordenados por ID
    var valoresOrdenados = Array.from(textAndEmailElements).map(function (el) {
        return valoresPorID[el.id];
    });

    // Envía el arreglo al servidor como mensaje WebSocket
    socket.send(JSON.stringify(valoresOrdenados));
}
