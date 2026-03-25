// Formatear número de tarjeta
document.getElementById('cardnumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = formattedValue.substring(0, 19);
});

// Validar que solo contenga números
document.getElementById('cardnumber').addEventListener('keypress', function(e) {
    if (!/\d/.test(e.key)) {
        e.preventDefault();
    }
});

// Formatear fecha de vencimiento (MM/YY)
document.getElementById('expiry').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// Validar que CVV solo contenga números
document.getElementById('cvv').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
});

// Validar que teléfono solo contenga números
document.getElementById('telefono').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^\d\s\-\+\(\)]/g, '');
});

document.getElementById('contact-telefono').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^\d\s\-\+\(\)]/g, '');
});

// Validar formulario de pago antes de enviar
document.querySelector('.form-pago').addEventListener('submit', function(e) {
    const cardNumber = document.getElementById('cardnumber').value.replace(/\s/g, '');
    const cvv = document.getElementById('cvv').value;
    const expiry = document.getElementById('expiry').value;

    // Validar número de tarjeta (debe tener 13-19 dígitos)
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        e.preventDefault();
        alert('El número de tarjeta debe tener entre 13 y 19 dígitos');
        return false;
    }

    // Validar CVV (debe tener 3-4 dígitos)
    if (cvv.length < 3 || cvv.length > 4) {
        e.preventDefault();
        alert('El CVV debe tener 3 o 4 dígitos');
        return false;
    }

    // Validar fecha de vencimiento (formato MM/YY)
    const expiryRegex = /^\d{2}\/\d{2}$/;
    if (!expiryRegex.test(expiry)) {
        e.preventDefault();
        alert('La fecha de vencimiento debe estar en formato MM/YY');
        return false;
    }

    // Validar que la tarjeta no esté expirada
    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (parseInt(year) < currentYear || 
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        e.preventDefault();
        alert('La tarjeta está expirada. Por favor, use una tarjeta válida');
        return false;
    }

    // Mensajes personalizados según el resultado
    console.log('Formulario de pago enviado correctamente');
});

// Mensaje después del envío del formulario
document.querySelector('.form-pago').addEventListener('submit', function() {
    setTimeout(function() {
        alert('¡Consulta agendada exitosamente! Pronto nos pondremos en contacto.');
    }, 500);
});

// Mensaje de confirmación para contacto
document.querySelector('.form-contacto').addEventListener('submit', function() {
    setTimeout(function() {
        alert('¡Mensaje enviado! Nos comunicaremos pronto.');
    }, 500);
});

// Prevenir el envío por defecto en Netlify
document.querySelector('.form-pago').addEventListener('submit', function(e) {
    if (this.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    }
}, false);

document.querySelector('.form-contacto').addEventListener('submit', function(e) {
    if (this.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    }
}, false);