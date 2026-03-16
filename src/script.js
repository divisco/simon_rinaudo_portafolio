console.log("Hecho por Simón Rinaudo ^_____^");
// --- NAVEGACIÓN Y MENÚ MÓVIL ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

// Toggle menú móvil
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
}));

// Efecto sticky navbar shadow
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- ANIMACIONES ON SCROLL (REVEAL) ---
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Dejar de observar una vez que se muestra
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// Activar animaciones de hero inmediatamente
setTimeout(() => {
    const heroElements = document.querySelectorAll('#sobre-mi .reveal');
    heroElements.forEach(el => el.classList.add('active'));
}, 100);

// --- ACTIVE LINK HIGHLIGHTING ---
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// --- HOVER EFECTO DINÁMICO EN TARJETAS (OPCIONAL 3D) ---
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Efecto de brillo que sigue el cursor
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- CARRUSEL DE VIDEOS ---
const track = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (track && prevBtn && nextBtn) {
    let currentIndex = 0;

    // Función para actualizar la posición
    const updateCarousel = () => {
        const slides = track.querySelectorAll('.video-slide');
        if (!slides.length) return;

        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        const moveAmount = slideWidth + gap;

        track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
    };

    nextBtn.addEventListener('click', () => {
        const slides = track.querySelectorAll('.video-slide');
        const containerWidth = document.querySelector('.carousel-track-container').getBoundingClientRect().width;
        const slideWidth = slides[0].getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
        const itemWidth = slideWidth + gap;

        // Calcular cuántos elementos caben en el contenedor visible
        // Math.floor o Math.max(1, Math.floor)
        const visibleElements = Math.max(1, Math.floor((containerWidth + gap) / itemWidth));

        if (currentIndex < slides.length - visibleElements) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Recalcular al cambiar de tamaño de ventana para evitar desalineación
    window.addEventListener('resize', updateCarousel);
}
