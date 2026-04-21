document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Move actions into nav-links only on mobile
            if (window.innerWidth <= 1024 && navActions) {
                if(navLinks.classList.contains('active')) {
                    navLinks.appendChild(navActions);
                    navActions.style.display = 'flex';
                }
            }

            const icon = hamburger.querySelector('i');
            if(icon) {
                if(navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Dropdown toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dd => {
        const link = dd.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            // Prevent navigation for top-level dropdown items
            e.preventDefault();
            e.stopPropagation();

            // Close other dropdowns
            dropdowns.forEach(other => {
                if (other !== dd) other.classList.remove('open');
            });

            dd.classList.toggle('open');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        dropdowns.forEach(dd => dd.classList.remove('open'));
    });

    // Handle window resize to clean up mobile states
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1024) {
            navLinks.classList.remove('active');
            dropdowns.forEach(dd => dd.classList.remove('open'));
            
            // Move actions back to their original place if they were moved
            const navContainer = document.querySelector('.navbar .container');
            const hamburger = document.querySelector('.hamburger');
            if (navActions && navContainer && navActions.parentElement === navLinks) {
                navContainer.insertBefore(navActions, hamburger);
            }
        }
    });

    // Active nav link
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-link');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href) && href !== 'index.html') {
            item.classList.add('active');
        } else if ((currentPath === '/' || currentPath.endsWith('/index.html')) && href === 'index.html') {
            item.classList.add('active');
        }
    });

    // RTL Toggle Logic
    const rtlToggle = document.getElementById('rtl-toggle');
    const htmlTag = document.documentElement;

    // Check for saved preference
    const currentDir = localStorage.getItem('direction') || 'ltr';
    htmlTag.setAttribute('dir', currentDir);
    if(rtlToggle) {
        rtlToggle.textContent = currentDir === 'ltr' ? 'RTL' : 'LTR';
    }

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRTL = htmlTag.getAttribute('dir') === 'rtl';
            const newDir = isRTL ? 'ltr' : 'rtl';
            
            htmlTag.setAttribute('dir', newDir);
            localStorage.setItem('direction', newDir);
            rtlToggle.textContent = newDir === 'ltr' ? 'RTL' : 'LTR';

            if(typeof gsap !== 'undefined') {
                gsap.from("body", { opacity: 0, duration: 0.5 });
            }
        });
    }
});

