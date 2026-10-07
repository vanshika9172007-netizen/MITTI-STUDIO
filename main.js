(function () {
    'use strict';

    // Mobile navigation
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');

    function setMenu(open) {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.querySelector('.nav-toggle__label').textContent = open ? 'Close' : 'Menu';
    }

    toggle.addEventListener('click', function () {
        setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
            setMenu(false);
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setMenu(false);
            toggle.focus();
        }
    });

    window.matchMedia('(min-width: 900px)').addEventListener('change', function (e) {
        if (e.matches) {
            setMenu(false);
        }
    });

    // Add a shadow to the header when scrolling
    const header = document.querySelector('.site-header');

    function updateHeader() {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
    }

    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    // Simple email validation for the signup form
    const form = document.querySelector('.join-form');
    const emailInput = document.getElementById('email');
    const message = form.querySelector('.form-message');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const value = emailInput.value.trim();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

        message.classList.remove('is-error', 'is-success');
        emailInput.setAttribute('aria-invalid', String(!valid));

        if (!valid) {
            message.textContent = 'Enter an email address like you@example.com.';
            message.classList.add('is-error');
            emailInput.focus();
            return;
        }

        message.textContent = 'Thanks. We will email the dates to ' + value + '.';
        message.classList.add('is-success');
        form.reset();
    });

    // Keep the footer year up to date
    document.getElementById('year').textContent = new Date().getFullYear();
})();