document.addEventListener('DOMContentLoaded', () => {
    // Hide Header on Scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.top = "-100px";
        } else {
            // Scrolling up
            header.style.top = "0";
        }
        lastScrollTop = scrollTop;
    });

    // Mobile Menu Toggle Logic
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
            });
        });
    }

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    const updateThemeIcon = (theme) => {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    };

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    // Smooth Scrolling for all links (nav-link and nav-btn)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle "Become a Sponsor" and "Start Chatting" button clicks inside sections
    const sponsorBtns = document.querySelectorAll('button.sponsor-btn');
    const aiBtns = document.querySelectorAll('button.ai-chatbot-btn');

    sponsorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Thank you for your interest! This would redirect to your Stripe/GitHub Sponsors page.');
        });
    });

    aiBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('AI Chatbot: Hello! I can help you learn more about Satyam. What would you like to know?');
        });
    });

    // Handle Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
});
