/**
 * Antik Bilge - Main JavaScript
 * Single Page Navigation
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.page-section');

    // Show section function
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(function(section) {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update active link
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Mobile Menu Toggle
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Navigation click handler
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                showSection(sectionId);
            }

            // Close mobile menu
            if (hamburger && nav) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Header shadow on scroll
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');

            alert('Teşekkürler ' + name + '! Mesajınız alındı. En kısa sürede size dönüş yapacağız.');
            this.reset();
        });
    }

    // Check URL hash on load
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        showSection(hash);
    }
});
