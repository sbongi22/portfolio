document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        errorMessage.style.display = 'none'; // Oculta el mensaje de error al comenzar
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validación simple
        if (!name || !email || !message) {
            event.preventDefault();
            errorMessage.style.display = 'block'; // Mensaje de error
            return;
        }

        // Validar formato del correo electrónico
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            event.preventDefault();
            errorMessage.textContent = "Por favor, ingresa un correo electrónico válido.";
            errorMessage.style.display = 'block';
            return;
        }

        // Mensaje de éxito
        successMessage.style.display = 'block';
    });
});
