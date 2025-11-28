#!/usr/bin/env node
/**
 * Build script to sync partials across all HTML pages.
 *
 * Usage: node scripts/build-partials.js
 *
 * This script reads the nav and footer partials from src/partials/
 * and updates all HTML files with the latest versions.
 *
 * The {{BASE_URL}} placeholder is replaced with:
 * - "./" for root-level pages (index.html, about.html, etc.)
 * - "/" for nested pages (blog/*, josh-ai-consulting/*, etc.)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const PARTIALS_DIR = path.join(ROOT_DIR, 'src', 'partials');

// Read partials
function readPartial(name) {
    const filePath = path.join(PARTIALS_DIR, `${name}.html`);
    return fs.readFileSync(filePath, 'utf8');
}

// Get all HTML files (excluding partials and node_modules)
function getHtmlFiles(dir, files = []) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        // Skip directories we don't want to process
        if (entry.isDirectory()) {
            if (['node_modules', 'src', '.git'].includes(entry.name)) continue;
            getHtmlFiles(fullPath, files);
        } else if (entry.name.endsWith('.html')) {
            files.push(fullPath);
        }
    }

    return files;
}

// Determine base URL based on file depth
function getBaseUrl(filePath) {
    const relativePath = path.relative(ROOT_DIR, filePath);
    const depth = relativePath.split(path.sep).length - 1;
    return depth === 0 ? './' : '/';
}

// Update nav in HTML content
function updateNav(content, navHtml, baseUrl) {
    const navWithBase = navHtml.replace(/\{\{BASE_URL\}\}/g, baseUrl);

    // Match from opening nav tag to closing nav tag
    const navRegex = /<nav class="navbar"[^>]*>[\s\S]*?<\/nav>/;

    if (navRegex.test(content)) {
        return content.replace(navRegex, navWithBase.trim());
    }
    return content;
}

// Update footer in HTML content
function updateFooter(content, footerHtml, baseUrl) {
    const footerWithBase = footerHtml.replace(/\{\{BASE_URL\}\}/g, baseUrl);

    // Match from opening footer tag to closing footer tag
    const footerRegex = /<footer class="site-footer"[^>]*>[\s\S]*?<\/footer>/;

    if (footerRegex.test(content)) {
        return content.replace(footerRegex, footerWithBase.trim());
    }
    return content;
}

// Main build function
function build() {
    console.log('Building partials...\n');

    const navHtml = readPartial('nav');
    const footerHtml = readPartial('footer');

    const htmlFiles = getHtmlFiles(ROOT_DIR);

    let updatedCount = 0;

    for (const filePath of htmlFiles) {
        const relativePath = path.relative(ROOT_DIR, filePath);
        const baseUrl = getBaseUrl(filePath);

        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        content = updateNav(content, navHtml, baseUrl);
        content = updateFooter(content, footerHtml, baseUrl);

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content);
            console.log(`  Updated: ${relativePath}`);
            updatedCount++;
        } else {
            console.log(`  Skipped: ${relativePath} (no changes)`);
        }
    }

    console.log(`\nDone! Updated ${updatedCount} file(s).`);
}

build();
