#!/usr/bin/env node
/**
 * Antik Bilge - Sitemap Generator
 *
 * Automatically generates sitemap.xml by scanning HTML files
 * Run: node scripts/generate-sitemap.js
 *
 * Features:
 * - Scans all HTML files in the repository
 * - Generates proper lastmod dates from git or file modification time
 * - Sets appropriate priority and changefreq based on page type
 * - Outputs sitemap.xml to repository root
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const SITE_URL = 'https://antikbilge.com';
const ROOT_DIR = path.join(__dirname, '..');

// Page type configurations
const PAGE_CONFIG = {
    'index.html': { priority: '1.0', changefreq: 'daily' },
    'articles/': { priority: '0.8', changefreq: 'monthly' },
    '404.html': { priority: '0.1', changefreq: 'yearly', exclude: true },
    'gizlilik-politikasi.html': { priority: '0.3', changefreq: 'yearly' },
    'cerez-politikasi.html': { priority: '0.3', changefreq: 'yearly' },
    'kullanim-sartlari.html': { priority: '0.3', changefreq: 'yearly' },
    'default': { priority: '0.5', changefreq: 'monthly' }
};

/**
 * Get the last modification date from git or file stats
 */
function getLastModified(filePath) {
    try {
        // Try to get the last commit date for this file
        const gitDate = execSync(
            `git log -1 --format="%ci" -- "${filePath}"`,
            { cwd: ROOT_DIR, encoding: 'utf-8' }
        ).trim();

        if (gitDate) {
            return new Date(gitDate).toISOString().split('T')[0];
        }
    } catch (e) {
        // Git command failed, fallback to file stats
    }

    try {
        const stats = fs.statSync(filePath);
        return stats.mtime.toISOString().split('T')[0];
    } catch (e) {
        return new Date().toISOString().split('T')[0];
    }
}

/**
 * Get configuration for a specific page
 */
function getPageConfig(relativePath) {
    // Check for exact match first
    if (PAGE_CONFIG[relativePath]) {
        return PAGE_CONFIG[relativePath];
    }

    // Check for directory prefix match
    for (const [key, config] of Object.entries(PAGE_CONFIG)) {
        if (key.endsWith('/') && relativePath.startsWith(key)) {
            return config;
        }
    }

    return PAGE_CONFIG['default'];
}

/**
 * Recursively find all HTML files
 */
function findHtmlFiles(dir, files = []) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Skip hidden directories and node_modules
            if (!item.startsWith('.') && item !== 'node_modules' && item !== 'scripts') {
                findHtmlFiles(fullPath, files);
            }
        } else if (item.endsWith('.html')) {
            files.push(fullPath);
        }
    }

    return files;
}

/**
 * Generate sitemap XML content
 */
function generateSitemap() {
    const htmlFiles = findHtmlFiles(ROOT_DIR);
    const urls = [];

    for (const filePath of htmlFiles) {
        const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
        const config = getPageConfig(relativePath);

        // Skip excluded pages
        if (config.exclude) {
            console.log(`Skipping: ${relativePath}`);
            continue;
        }

        // Build URL
        let url = SITE_URL + '/';
        if (relativePath !== 'index.html') {
            url += relativePath;
        }

        const lastmod = getLastModified(filePath);

        urls.push({
            loc: url,
            lastmod: lastmod,
            changefreq: config.changefreq,
            priority: config.priority
        });

        console.log(`Added: ${url} (priority: ${config.priority})`);
    }

    // Sort URLs: homepage first, then articles, then others
    urls.sort((a, b) => {
        if (a.loc === SITE_URL + '/') return -1;
        if (b.loc === SITE_URL + '/') return 1;
        if (a.loc.includes('/articles/') && !b.loc.includes('/articles/')) return -1;
        if (!a.loc.includes('/articles/') && b.loc.includes('/articles/')) return 1;
        return parseFloat(b.priority) - parseFloat(a.priority);
    });

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const url of urls) {
        xml += '  <url>\n';
        xml += `    <loc>${url.loc}</loc>\n`;
        xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
        xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
        xml += `    <priority>${url.priority}</priority>\n`;
        xml += '  </url>\n';
    }

    xml += '</urlset>\n';

    return xml;
}

/**
 * Main execution
 */
function main() {
    console.log('Generating sitemap for Antik Bilge...\n');

    const sitemap = generateSitemap();
    const outputPath = path.join(ROOT_DIR, 'sitemap.xml');

    fs.writeFileSync(outputPath, sitemap, 'utf-8');

    console.log(`\nSitemap generated successfully: ${outputPath}`);
    console.log(`Total URLs: ${(sitemap.match(/<url>/g) || []).length}`);
}

main();
