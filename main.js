/**
 * Josh Pirtle Portfolio - Main JavaScript
 *
 * Features:
 * - Dark mode toggle with localStorage persistence
 * - Reusable modal component with focus trap
 * - Smooth scrolling for anchor links
 * - Mobile navigation toggle
 * - Back to top button
 * - Accessibility enhancements
 *
 * All code is vanilla JavaScript with no dependencies.
 */

(function() {
    'use strict';

    // ==========================================================================
    // DARK MODE TOGGLE
    // Remembers user preference using localStorage
    // ==========================================================================

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check for saved preference or system preference
    function getPreferredTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Apply theme to the page
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark');
            if (darkModeToggle) {
                darkModeToggle.setAttribute('aria-pressed', 'true');
            }
        } else {
            body.classList.remove('dark');
            if (darkModeToggle) {
                darkModeToggle.setAttribute('aria-pressed', 'false');
            }
        }
    }

    // Initialize theme on page load
    applyTheme(getPreferredTheme());

    // Toggle dark mode when button is clicked
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';

            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // ==========================================================================
    // MOBILE NAVIGATION TOGGLE
    // Hamburger menu for mobile devices
    // ==========================================================================

    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', !isExpanded);
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navToggle.contains(event.target) || navMenu.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        });
    }

    // ==========================================================================
    // MODAL COMPONENT
    // Reusable modal for project details with focus trap
    // ==========================================================================

    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    let lastFocusedElement = null;

    // Project content for modals (can be expanded as needed)
    const projectData = {
        'project-ai-workflow': {
            title: 'AI Workflow Automation',
            content: `
                <h3>AI Workflow Automation</h3>
                <p>A custom AI-powered documentation system built for a small business client who was spending hours each week on repetitive documentation tasks.</p>
                <h4>The Challenge</h4>
                <p>The client's team was manually processing customer inquiries, creating follow-up documents, and updating their CRM—all by hand. This led to inconsistencies, delays, and staff burnout.</p>
                <h4>The Solution</h4>
                <ul>
                    <li>Built a custom prompt system using Claude to analyze incoming requests</li>
                    <li>Created automated document templates that populate with AI-extracted data</li>
                    <li>Integrated with existing tools (email, CRM) via Zapier</li>
                    <li>Trained the team on using and maintaining the system</li>
                </ul>
                <h4>Results</h4>
                <p>60% reduction in documentation time. The team now focuses on customer relationships instead of paperwork.</p>
            `
        },
        'project-senior-tech': {
            title: 'Senior Tech Support Program',
            content: `
                <h3>Senior Tech Support Program</h3>
                <p>A specialized tech support service designed from the ground up for older adults who want to use technology confidently.</p>
                <h4>The Approach</h4>
                <p>Most tech support is designed for people who already understand technology. This program takes a different approach:</p>
                <ul>
                    <li>No jargon—every concept explained in plain language</li>
                    <li>Patient, in-home visits that work on the client's schedule</li>
                    <li>Focus on empowerment, not dependency</li>
                    <li>Written "cheat sheets" left behind for common tasks</li>
                </ul>
                <h4>Services Offered</h4>
                <ul>
                    <li>Mac and PC setup, maintenance, and troubleshooting</li>
                    <li>iPhone and iPad support</li>
                    <li>Home network setup and security</li>
                    <li>Video calling setup (FaceTime, Zoom) for staying connected</li>
                    <li>Scam awareness and online safety training</li>
                </ul>
                <h4>Impact</h4>
                <p>Currently serving 50+ regular clients, with a 100% referral-based growth model.</p>
            `
        }
    };

    // Open modal with specific content
    function openModal(contentKey) {
        if (!modalOverlay || !modalContent) return;

        // Store the element that triggered the modal
        lastFocusedElement = document.activeElement;

        const data = projectData[contentKey];
        if (data) {
            modalContent.innerHTML = data.content;
        } else {
            modalContent.innerHTML = '<p>Content coming soon.</p>';
        }

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        body.classList.add('modal-open');

        // Focus the close button for accessibility
        if (modalClose) {
            setTimeout(function() {
                modalClose.focus();
            }, 100);
        }
    }

    // Close the modal
    function closeModal() {
        if (!modalOverlay) return;

        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        body.classList.remove('modal-open');

        // Return focus to the element that triggered the modal
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    // Attach click handlers to modal trigger buttons
    const modalTriggers = document.querySelectorAll('[data-modal]');
    modalTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            const contentKey = this.getAttribute('data-modal');
            openModal(contentKey);
        });
    });

    // Close modal on close button click
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal on overlay click (but not modal content click)
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // ==========================================================================
    // SMOOTH SCROLLING
    // Enhances anchor link navigation with smooth scroll behavior
    // Note: CSS scroll-behavior: smooth handles most cases, but this adds
    // offset for the fixed navbar
    // ==========================================================================

    const navbarHeight = 70; // Approximate height of fixed navbar

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#" (home link)
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();

                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    // ==========================================================================
    // NAVBAR SCROLL EFFECT
    // Adds a subtle shadow to navbar when scrolled
    // ==========================================================================

    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        }, { passive: true });
    }

    // ==========================================================================
    // BACK TO TOP BUTTON
    // Shows/hides based on scroll position
    // ==========================================================================

    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        }, { passive: true });

        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

})();
