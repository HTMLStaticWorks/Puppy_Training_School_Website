document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const fadeUpElements = document.querySelectorAll('.animate-fade-up');
        fadeUpElements.forEach((el) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });

        const imgReveals = document.querySelectorAll('.img-reveal');
        imgReveals.forEach((el) => {
            gsap.to(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleClass: 'is-revealed'
                }
            });
        });
        
        const staggerContainers = document.querySelectorAll('.stagger-container');
        staggerContainers.forEach(container => {
            const items = container.querySelectorAll('.stagger-item');
            gsap.fromTo(items, 
                { opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: container,
                        start: 'top 80%'
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power2.out'
                }
            );
        });
    } else {
        gsap.to('.animate-fade-up', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 });
    }

    // Single fade-in for page elements
    gsap.to('.animate-fade-in', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2
    });
});

