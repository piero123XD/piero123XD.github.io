// Definir un array de IDs en el orden deseado
var idsEnOrden = ["mensaje1", "mensaje2", "mensaje3", "mensaje4", "mensaje5"];

// Crear un objeto para almacenar los valores de los elementos
var valores = {};

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
    // Crear un array con los valores en el orden deseado según las IDs
    var valoresEnOrden = idsEnOrden.map(function(id) {
        return valores[id] || '';
    });

    socket.send(JSON.stringify(valoresEnOrden));
}
