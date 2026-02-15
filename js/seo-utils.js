/**
 * Antik Bilge - SEO Utilities
 * URL normalization and SEO helper functions
 */

(function() {
    'use strict';

    /**
     * Turkish character mapping for URL slugs
     */
    var TURKISH_CHAR_MAP = {
        'ç': 'c', 'Ç': 'C',
        'ğ': 'g', 'Ğ': 'G',
        'ı': 'i', 'I': 'I',
        'İ': 'I', 'i': 'i',
        'ö': 'o', 'Ö': 'O',
        'ş': 's', 'Ş': 'S',
        'ü': 'u', 'Ü': 'U',
        'â': 'a', 'Â': 'A',
        'î': 'i', 'Î': 'I',
        'û': 'u', 'Û': 'U'
    };

    /**
     * Normalize Turkish characters to ASCII equivalents
     * @param {string} str - Input string
     * @returns {string} - Normalized string
     */
    function normalizeTurkish(str) {
        if (!str) return '';

        return str.split('').map(function(char) {
            return TURKISH_CHAR_MAP[char] || char;
        }).join('');
    }

    /**
     * Generate SEO-friendly URL slug from text
     * @param {string} text - Input text (title, etc.)
     * @returns {string} - URL-safe slug
     */
    function generateSlug(text) {
        if (!text) return '';

        return normalizeTurkish(text)
            .toLowerCase()
            .trim()
            // Replace spaces and underscores with hyphens
            .replace(/[\s_]+/g, '-')
            // Remove all non-alphanumeric characters except hyphens
            .replace(/[^a-z0-9-]/g, '')
            // Remove multiple consecutive hyphens
            .replace(/-+/g, '-')
            // Remove leading/trailing hyphens
            .replace(/^-+|-+$/g, '');
    }

    /**
     * Generate article URL from title
     * @param {string} title - Article title
     * @returns {string} - Full article URL path
     */
    function generateArticleUrl(title) {
        var slug = generateSlug(title);
        return '/articles/' + slug + '.html';
    }

    /**
     * Extract article data from page for structured data
     * @returns {Object} - Article metadata
     */
    function extractArticleData() {
        var data = {
            title: '',
            description: '',
            category: '',
            datePublished: '',
            readingTime: '',
            url: window.location.href,
            image: ''
        };

        // Get title
        var h1 = document.querySelector('.article-header h1');
        if (h1) data.title = h1.textContent.trim();

        // Get description from meta
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) data.description = metaDesc.getAttribute('content');

        // Get category
        var category = document.querySelector('.article-header .article-category');
        if (category) data.category = category.textContent.trim();

        // Get date
        var dateEl = document.querySelector('.article-header .date');
        if (dateEl) data.datePublished = dateEl.textContent.trim();

        // Get reading time
        var readTimeEl = document.querySelector('.article-header .read-time');
        if (readTimeEl) data.readingTime = readTimeEl.textContent.trim();

        // Get main image
        var mainImage = document.querySelector('.article-body figure img');
        if (mainImage) data.image = mainImage.src;

        return data;
    }

    /**
     * Update canonical URL if needed
     */
    function ensureCanonical() {
        var canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = window.location.href.split('?')[0].split('#')[0];
            document.head.appendChild(canonical);
        }
    }

    /**
     * Add lazy loading to images without it
     */
    function addLazyLoading() {
        var images = document.querySelectorAll('img:not([loading])');
        images.forEach(function(img) {
            // Skip above-the-fold images (first 2)
            var allImages = Array.from(document.querySelectorAll('img'));
            var index = allImages.indexOf(img);

            if (index > 1) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    /**
     * Ensure all images have alt text
     */
    function ensureAltText() {
        var images = document.querySelectorAll('img:not([alt]), img[alt=""]');
        images.forEach(function(img) {
            // Generate alt from src filename
            var src = img.src || '';
            var filename = src.split('/').pop().split('.')[0];
            var alt = filename
                .replace(/-/g, ' ')
                .replace(/_/g, ' ')
                .replace(/\b\w/g, function(l) { return l.toUpperCase(); });

            img.setAttribute('alt', alt || 'Görsel');
            console.warn('SEO: Auto-generated alt text for image:', img.src);
        });
    }

    /**
     * Initialize SEO utilities
     */
    function init() {
        ensureCanonical();
        addLazyLoading();
        ensureAltText();
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose utilities globally
    window.AntikBilgeSEO = {
        normalizeTurkish: normalizeTurkish,
        generateSlug: generateSlug,
        generateArticleUrl: generateArticleUrl,
        extractArticleData: extractArticleData
    };
})();
