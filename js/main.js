/**
 * Antik Bilge - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.getElementById('hamburger');
    const categoryMenu = document.querySelector('.category-menu');

    // Mobile Menu Toggle
    if (hamburger && categoryMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            categoryMenu.classList.toggle('active');
            document.body.style.overflow = categoryMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        categoryMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                categoryMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && categoryMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                categoryMenu.classList.remove('active');
                document.body.style.overflow = '';
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
});
