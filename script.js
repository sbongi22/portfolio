// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Verificar si hay tema guardado en localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
} else {
    // Dark mode por defecto
    html.setAttribute('data-theme', 'dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animar hamburguesa
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'rotate(0) translate(0, 0)';
    spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'rotate(0) translate(0, 0)';
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(0) translate(0, 0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0, 0)';
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Altura del navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinksArray.forEach(link => {
                link.style.color = 'var(--text-secondary)';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--text-primary)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===== Form Validation & Submission =====
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        // Ocultar mensajes previos
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validación de campos vacíos
        if (!name || !email || !message) {
            event.preventDefault();
            errorText.textContent = 'Por favor completa todos los campos.';
            errorMessage.style.display = 'block';
            return;
        }

        // Validar formato del email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            event.preventDefault();
            errorText.textContent = 'Por favor ingresa un email válido.';
            errorMessage.style.display = 'block';
            return;
        }

        // Validar longitud mínima del mensaje
        if (message.length < 10) {
            event.preventDefault();
            errorText.textContent = 'El mensaje debe tener al menos 10 caracteres.';
            errorMessage.style.display = 'block';
            return;
        }

        // Si pasa todas las validaciones, el formulario se enviará
        // Nota: Formspree manejará el envío y la redirección
    });
}

// ===== Intersection Observer para animaciones =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animar project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Animar skills
document.querySelectorAll('.skill-item').forEach((skill, index) => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateX(-20px)';
    skill.style.transition = `opacity 0.4s ease ${index * 0.05}s, transform 0.4s ease ${index * 0.05}s`;
    fadeInObserver.observe(skill);
});

// ===== Navbar Background on Scroll =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Typing Effect para hero (opcional) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    // Agregar efecto de entrada
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 100);
}

// ===== Prevenir comportamiento de arrastre en imágenes =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
});
