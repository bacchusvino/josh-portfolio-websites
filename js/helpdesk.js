/**
 * MyGeekMac Help Desk Interface
 * Senior-first, calm, accessible interactions
 */

(function() {
    'use strict';

    // ==========================================================================
    // SLIDING PANELS
    // Opens scenario panels when buttons are clicked (slow slide from right)
    // ==========================================================================

    const panelOverlay = document.getElementById('panel-overlay');
    const scenarioButtons = document.querySelectorAll('[data-panel]');
    let activePanel = null;
    let lastFocusedElement = null;

    // Panel mapping - includes new computer panel
    const panelMap = {
        'device-issues': document.getElementById('panel-device-issues'),
        'computer': document.getElementById('panel-computer'),
        'security': document.getElementById('panel-security'),
        'ai-help': document.getElementById('panel-ai-help'),
        'learning': document.getElementById('panel-learning')
    };

    function openPanel(panelId) {
        const panel = panelMap[panelId];
        if (!panel || !panelOverlay) return;

        // Store focus for return
        lastFocusedElement = document.activeElement;

        // Show overlay and panel with slow transition
        panelOverlay.classList.add('active');
        panelOverlay.setAttribute('aria-hidden', 'false');
        panel.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');

        // Prevent body scroll
        document.body.classList.add('panel-open');

        // Track active panel
        activePanel = panel;

        // Focus first interactive element in panel (delayed for animation)
        const firstFocusable = panel.querySelector('button, a, input, textarea, select');
        if (firstFocusable) {
            setTimeout(function() { firstFocusable.focus(); }, 500);
        }
    }

    function closePanel() {
        if (!activePanel || !panelOverlay) return;

        // Hide overlay and panel
        panelOverlay.classList.remove('active');
        panelOverlay.setAttribute('aria-hidden', 'true');
        activePanel.classList.remove('active');
        activePanel.setAttribute('aria-hidden', 'true');

        // Allow body scroll
        document.body.classList.remove('panel-open');

        // Return focus
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }

        activePanel = null;
    }

    // Attach click handlers to scenario buttons
    scenarioButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var panelId = this.getAttribute('data-panel');
            openPanel(panelId);
        });
    });

    // Close on overlay click
    if (panelOverlay) {
        panelOverlay.addEventListener('click', closePanel);
    }

    // Close on back/close button click
    document.querySelectorAll('.panel__back, .panel__close').forEach(function(button) {
        button.addEventListener('click', closePanel);
    });

    // Close on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && activePanel) {
            closePanel();
        }
    });

    // Focus trap within panel
    document.addEventListener('keydown', function(event) {
        if (!activePanel || event.key !== 'Tab') return;

        var focusableElements = activePanel.querySelectorAll(
            'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        var firstFocusable = focusableElements[0];
        var lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }
        }
    });

    // ==========================================================================
    // RATE QUESTION MODAL (Senior + Military Discounts)
    // Multi-step flow: Rate Question → Rate Confirmation → Contact Options
    // ==========================================================================

    var discountModal = document.getElementById('discount-modal');

    // Step views
    var rateQuestionView = document.getElementById('rate-question-view');
    var rateSeniorView = document.getElementById('rate-senior-view');
    var rateMilitaryView = document.getElementById('rate-military-view');
    var rateStandardView = document.getElementById('rate-standard-view');
    var rateContactView = document.getElementById('rate-contact-view');

    // Buttons
    var rateContinueBtn = document.getElementById('rate-continue');
    var rateSkipBtn = document.getElementById('rate-skip');
    var seniorContinueBtn = document.getElementById('senior-continue');
    var militaryContinueBtn = document.getElementById('military-continue');
    var standardContinueBtn = document.getElementById('standard-continue');
    var discountCloseBtn = document.getElementById('discount-close');

    // Radio inputs
    var rateRadios = document.querySelectorAll('input[name="rate-selection"]');

    // State management
    var rateAnswered = sessionStorage.getItem('rateAnswered');
    var selectedRate = sessionStorage.getItem('selectedRate') || null;

    // All view elements for easy iteration
    var allViews = [rateQuestionView, rateSeniorView, rateMilitaryView, rateStandardView, rateContactView];

    function showRateView(viewId) {
        // Hide all views
        allViews.forEach(function(view) {
            if (view) view.classList.remove('active');
        });

        // Show requested view
        var targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');

            // Focus first focusable element in view
            setTimeout(function() {
                var focusable = targetView.querySelector('button:not([disabled]), input, a');
                if (focusable) focusable.focus();
            }, 100);
        }
    }

    function openDiscountModal() {
        if (!discountModal) return;

        // If already answered, skip to contact view
        if (rateAnswered) {
            showRateView('rate-contact-view');
        } else {
            // Reset selection state
            rateRadios.forEach(function(radio) {
                radio.checked = false;
            });
            if (rateContinueBtn) rateContinueBtn.disabled = true;
            showRateView('rate-question-view');
        }

        discountModal.classList.add('active');
        document.body.classList.add('panel-open');

        // Close any open scenario panels first
        if (activePanel) {
            closePanel();
        }

        // Focus first option after animation
        setTimeout(function() {
            var firstOption = discountModal.querySelector('.rate-option__card');
            if (firstOption) firstOption.focus();
        }, 300);
    }

    function closeDiscountModal() {
        if (!discountModal) return;
        discountModal.classList.remove('active');
        document.body.classList.remove('panel-open');
    }

    // Handle rate option selection
    rateRadios.forEach(function(radio) {
        radio.addEventListener('change', function() {
            selectedRate = this.value;

            // Enable continue button
            if (rateContinueBtn) rateContinueBtn.disabled = false;

            // Update visual state on all options
            document.querySelectorAll('.rate-option').forEach(function(option) {
                var input = option.querySelector('input');
                if (input && input.checked) {
                    option.classList.add('selected');
                } else {
                    option.classList.remove('selected');
                }
            });
        });
    });

    // Make option cards clickable and keyboard accessible
    document.querySelectorAll('.rate-option__card').forEach(function(card) {
        card.setAttribute('tabindex', '0');

        card.addEventListener('click', function() {
            var input = this.parentElement.querySelector('input');
            if (input) {
                input.checked = true;
                input.dispatchEvent(new Event('change'));
            }
        });

        card.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                var input = this.parentElement.querySelector('input');
                if (input) {
                    input.checked = true;
                    input.dispatchEvent(new Event('change'));
                }
            }
        });
    });

    // Continue from rate question to confirmation
    if (rateContinueBtn) {
        rateContinueBtn.addEventListener('click', function() {
            if (!selectedRate) return;

            // Save to session
            sessionStorage.setItem('rateAnswered', 'true');
            sessionStorage.setItem('selectedRate', selectedRate);
            rateAnswered = true;

            // Show appropriate confirmation view
            if (selectedRate === 'senior') {
                showRateView('rate-senior-view');
            } else if (selectedRate === 'military') {
                showRateView('rate-military-view');
            } else {
                showRateView('rate-standard-view');
            }
        });
    }

    // Skip button - goes to standard rate
    if (rateSkipBtn) {
        rateSkipBtn.addEventListener('click', function() {
            sessionStorage.setItem('rateAnswered', 'true');
            sessionStorage.setItem('selectedRate', 'standard');
            rateAnswered = true;
            selectedRate = 'standard';
            showRateView('rate-standard-view');
        });
    }

    // Continue buttons from confirmation views to contact
    if (seniorContinueBtn) {
        seniorContinueBtn.addEventListener('click', function() {
            showRateView('rate-contact-view');
        });
    }

    if (militaryContinueBtn) {
        militaryContinueBtn.addEventListener('click', function() {
            showRateView('rate-contact-view');
        });
    }

    if (standardContinueBtn) {
        standardContinueBtn.addEventListener('click', function() {
            showRateView('rate-contact-view');
        });
    }

    // Close button
    if (discountCloseBtn) {
        discountCloseBtn.addEventListener('click', closeDiscountModal);
    }

    // Close on overlay click (not card)
    if (discountModal) {
        discountModal.addEventListener('click', function(event) {
            if (event.target === discountModal) {
                closeDiscountModal();
            }
        });
    }

    // Close on Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && discountModal && discountModal.classList.contains('active')) {
            closeDiscountModal();
        }
    });

    // Attach discount modal to "Talk to Josh" buttons
    document.querySelectorAll('[data-open-discount]').forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            openDiscountModal();
        });
    });

    // Also attach to primary contact links in panels that should trigger the discount flow
    document.querySelectorAll('.panel__actions .btn-action--primary').forEach(function(button) {
        // Only if it's a link, not already handled
        if (button.tagName === 'A' && button.getAttribute('href') === '/contact.html') {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                openDiscountModal();
            });
        }
    });

    // ==========================================================================
    // CAREGIVER TOGGLE
    // Show/hide caregiver fields when checkbox is toggled
    // ==========================================================================

    var caregiverCheckbox = document.getElementById('include-caregiver');
    var caregiverFields = document.getElementById('caregiver-fields');

    if (caregiverCheckbox && caregiverFields) {
        caregiverCheckbox.addEventListener('change', function() {
            if (this.checked) {
                caregiverFields.classList.add('active');
                // Focus first field
                var firstInput = caregiverFields.querySelector('input');
                if (firstInput) {
                    setTimeout(function() { firstInput.focus(); }, 100);
                }
            } else {
                caregiverFields.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // NAVIGATION SCROLL EFFECT
    // Adds background to nav when scrolled
    // ==========================================================================

    var nav = document.querySelector('.nav-minimal');

    if (nav) {
        function updateNavOnScroll() {
            if (window.scrollY > 20) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', updateNavOnScroll, { passive: true });
        updateNavOnScroll(); // Check on load
    }

    // ==========================================================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================================================

    var navToggle = document.getElementById('nav-toggle');
    var navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                if (navMenu.classList.contains('active')) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                }
            }
        });

        // Close menu on Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.setAttribute('aria-expanded', 'false');
                navMenu.classList.remove('active');
                navToggle.focus();
            }
        });
    }

    // ==========================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================================================

    var navHeight = 72;

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(event) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                event.preventDefault();

                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                var offsetPosition = targetPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL
                history.pushState(null, null, targetId);
            }
        });
    });

    // ==========================================================================
    // FORM ENHANCEMENTS
    // ==========================================================================

    var forms = document.querySelectorAll('form');

    forms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            var submitButton = form.querySelector('[type="submit"]');
            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }
        });
    });

    // ==========================================================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // Fade in elements as they scroll into view
    // ==========================================================================

    if ('IntersectionObserver' in window) {
        var observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements that should animate in
        document.querySelectorAll('.story-card, .ai-card, .pricing-card').forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Add styles for visible state
        var style = document.createElement('style');
        style.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
        document.head.appendChild(style);
    }

})();
