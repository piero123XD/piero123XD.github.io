// Agregar un controlador de eventos "blur" a los campos de texto y correo electrónico
var textAndEmailElements = document.querySelectorAll('input[type="text"], input[type="email"]');
textAndEmailElements.forEach(function(inputElement, index) {
    inputElement.addEventListener('blur', function(event) {
        if (index === 0 || index === textAndEmailElements.length - 1) {
            // Si es el primer o último input, llenar todos los demás con espacios en blanco
            textAndEmailElements.forEach(function(input, i) {
                if (i !== index) {
                    input.value = ''; // Establecer el valor en blanco
                }
            });
        }
        enviarMensaje(inputElement.id, inputElement.value);
    });
});

// Agregar un controlador de eventos "change" a los campos de opción de radio
var radioElements = document.querySelectorAll('input[type="radio"]');
radioElements.forEach(function(radioElement, index) {
    radioElement.addEventListener('change', function(event) {
        enviarMensaje(radioElement.id, radioElement.value);
    });
});

function enviarMensaje(id, value) {
    var index = order.indexOf(id);
    if (index !== -1) {
        mensajes[index] = value;
        var valores = mensajes.filter(function (mensaje) {
            return mensaje !== undefined;
        });
        socket.send(JSON.stringify(valores));
    }
}
