/**
 * Antik Bilge - Main JavaScript
 * Single page sections - no scroll between them
 * URL hash based navigation for page refresh support
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.getElementById('hamburger');
    const categoryMenu = document.querySelector('.category-menu');
    const topNavLinks = document.querySelectorAll('.top-nav a');
    const mainSection = document.querySelector('.articles');
    const aboutSection = document.getElementById('hakkimizda');
    const participationSection = document.getElementById('katilim');
    const contactSection = document.getElementById('iletisim');
    const footer = document.querySelector('.footer');

    // All page sections (Hakkımızda, Katılım, İletişim)
    const pageSections = [aboutSection, participationSection, contactSection];
    const validSections = ['hakkimizda', 'katilim', 'iletisim'];

    // Show only one section
    function showSection(sectionId, updateHash) {
        // Hide main content and all page sections
        if (mainSection) mainSection.style.display = 'none';
        pageSections.forEach(function(section) {
            if (section) section.style.display = 'none';
        });

        // Show the target section
        const target = document.getElementById(sectionId);
        if (target) {
            target.style.display = 'block';
            window.scrollTo(0, 0);
            // Update URL hash (without triggering hashchange)
            if (updateHash !== false) {
                history.replaceState(null, null, '#' + sectionId);
            }
        }
    }

    // Show home (articles)
    function showHome(updateHash) {
        pageSections.forEach(function(section) {
            if (section) section.style.display = 'none';
        });
        if (mainSection) mainSection.style.display = 'block';
        if (footer) footer.style.display = 'block';
        window.scrollTo(0, 0);
        // Clear URL hash
        if (updateHash !== false) {
            history.replaceState(null, null, window.location.pathname);
        }
    }

    // Handle navigation based on hash
    function handleHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash && validSections.includes(hash)) {
            showSection(hash, false);
        } else {
            showHome(false);
        }
    }

    // Top nav click handlers (Hakkımızda, Katılım, İletişim)
    topNavLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const sectionId = href.replace('#', '');
            showSection(sectionId);
        });
    });

    // Logo click - go home
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            showHome();
        });
    }

    // Handle browser back/forward buttons
    window.addEventListener('hashchange', handleHash);

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
    }

    // Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            alert('Teşekkürler ' + name + '! Mesajınız alındı.');
            this.reset();
        });
    }

    // =====================================================
    // Image Protection - Prevent download/save
    // =====================================================
    const protectedImages = document.querySelectorAll('.about-logo, .protected-image');

    protectedImages.forEach(function(img) {
        // Prevent right-click context menu
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // Prevent drag
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        });

        // Prevent touch hold on mobile
        img.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
    });

    // Initialize - check hash and show appropriate section
    handleHash();
});
