/* ===================================================
   Ruiz Clima y Gas — Landing Page Scripts
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Sticky header ---------- */
    const header = document.getElementById('header');
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile menu ---------- */
    const burger = document.getElementById('burgerBtn');
    const nav = document.getElementById('mainNav');

    burger.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        burger.classList.toggle('active', isOpen);
        burger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu on link click
    nav.querySelectorAll('.header__link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            burger.classList.remove('active');
            burger.setAttribute('aria-expanded', 'false');
        });
    });

    /* ---------- Smooth scroll for anchors ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* ---------- Scroll reveal (IntersectionObserver) ---------- */
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all
        revealElements.forEach(el => el.classList.add('visible'));
    }

    /* ---------- Hero form ---------- */
    const heroForm = document.getElementById('heroForm');
    heroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phone = heroForm.querySelector('input[name="telefono"]').value.trim();
        if (phone.length < 9) {
            alert('Por favor, introduce un número de teléfono válido.');
            return;
        }
        // In production: send to backend / CRM
        alert('¡Gracias! Te llamaremos lo antes posible al ' + phone + '.');
        heroForm.reset();
    });

    /* ---------- Contact form ---------- */
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = contactForm.querySelector('#cf-nombre').value.trim();
        const telefono = contactForm.querySelector('#cf-telefono').value.trim();
        const consent = contactForm.querySelector('#cf-consent').checked;

        if (!nombre) {
            alert('Por favor, introduce tu nombre.');
            return;
        }
        if (telefono.length < 9) {
            alert('Por favor, introduce un número de teléfono válido.');
            return;
        }
        if (!consent) {
            alert('Debes aceptar la política de privacidad para continuar.');
            return;
        }

        // In production: send to backend / CRM / email
        alert('¡Formulario enviado correctamente! Te contactaremos lo antes posible, ' + nombre + '.');
        contactForm.reset();
    });

    /* ---------- Active nav link highlight ---------- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__link');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
});
