// Crear un objeto para almacenar los valores de los elementos
var valores = {};

// Agregar un controlador de eventos "blur" a los campos de texto y correo electrónico
var textAndEmailElements = document.querySelectorAll('input[type="text"], input[type="email"]');
textAndEmailElements.forEach(function(inputElement) {
    inputElement.addEventListener('blur', function(event) {
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
    // Obtener los valores como un array en el orden deseado según sus IDs
    var inputElements = document.querySelectorAll('input[type="text"], input[type="email"], input[type="radio"]');
    var mensajes = Array.from(inputElements).map(function(inputElement) {
        return valores[inputElement.id] || '';
    });

    socket.send(JSON.stringify(mensajes));
}
