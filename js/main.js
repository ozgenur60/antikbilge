/**
 * Antik Bilge - Main JavaScript
 * Single page navigation with URL hash support
 */

(function() {
    'use strict';

    // Valid section IDs
    var validSections = ['hakkimizda', 'katilim', 'iletisim'];

    // Get current hash from URL
    function getHash() {
        return window.location.hash.replace('#', '');
    }

    // Show specific section, hide others
    function showSection(sectionId) {
        var mainSection = document.querySelector('.articles');
        var aboutSection = document.getElementById('hakkimizda');
        var participationSection = document.getElementById('katilim');
        var contactSection = document.getElementById('iletisim');
        var pageSections = [aboutSection, participationSection, contactSection];

        // Hide main articles section
        if (mainSection) {
            mainSection.style.display = 'none';
        }

        // Hide all page sections
        pageSections.forEach(function(section) {
            if (section) {
                section.style.display = 'none';
            }
        });

        // Show target section
        var target = document.getElementById(sectionId);
        if (target) {
            target.style.display = 'block';
            window.scrollTo(0, 0);
        }
    }

    // Show home page (articles)
    function showHome() {
        var mainSection = document.querySelector('.articles');
        var aboutSection = document.getElementById('hakkimizda');
        var participationSection = document.getElementById('katilim');
        var contactSection = document.getElementById('iletisim');
        var pageSections = [aboutSection, participationSection, contactSection];

        // Hide all page sections
        pageSections.forEach(function(section) {
            if (section) {
                section.style.display = 'none';
            }
        });

        // Show main articles section
        if (mainSection) {
            mainSection.style.display = 'block';
        }

        window.scrollTo(0, 0);
    }

    // Handle navigation based on current URL hash
    function handleNavigation() {
        var hash = getHash();

        if (hash && validSections.indexOf(hash) !== -1) {
            showSection(hash);
        } else {
            showHome();
        }
    }

    // Navigate to a section (updates URL and shows section)
    function navigateTo(sectionId) {
        if (validSections.indexOf(sectionId) !== -1) {
            // Use pushState for browser history support
            history.pushState({ section: sectionId }, '', '#' + sectionId);
            showSection(sectionId);
        }
    }

    // Navigate to home
    function navigateHome() {
        history.pushState({ section: 'home' }, '', window.location.pathname);
        showHome();
    }

    // Initialize when DOM is ready
    function init() {
        // Handle top navigation clicks
        var topNavLinks = document.querySelectorAll('.top-nav a');
        topNavLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                var href = this.getAttribute('href');
                var sectionId = href.replace('#', '');
                navigateTo(sectionId);
            });
        });

        // Handle ALL logo clicks (header and footer)
        var allLogos = document.querySelectorAll('.logo');
        allLogos.forEach(function(logo) {
            logo.addEventListener('click', function(e) {
                e.preventDefault();
                navigateHome();
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', function(e) {
            handleNavigation();
        });

        // Mobile Menu Toggle
        var hamburger = document.getElementById('hamburger');
        var categoryMenu = document.querySelector('.category-menu');

        if (hamburger && categoryMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                categoryMenu.classList.toggle('active');
                document.body.style.overflow = categoryMenu.classList.contains('active') ? 'hidden' : '';
            });

            categoryMenu.querySelectorAll('a').forEach(function(link) {
                link.addEventListener('click', function() {
                    hamburger.classList.remove('active');
                    categoryMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }

        // Form Handling
        var contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                var formData = new FormData(this);
                var name = formData.get('name');
                alert('Teşekkürler ' + name + '! Mesajınız alındı.');
                this.reset();
            });
        }

        // Image Protection
        var protectedImages = document.querySelectorAll('.about-logo, .protected-image');
        protectedImages.forEach(function(img) {
            img.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                return false;
            });
            img.addEventListener('dragstart', function(e) {
                e.preventDefault();
                return false;
            });
        });

        // Initialize - show correct section based on URL hash
        handleNavigation();
    }

    // Run init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
