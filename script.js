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
    const mobileOverlay = document.getElementById('mobile-overlay');
    const closeMenu = document.getElementById('close-menu');
    
    const toggleMenu = (show) => {
        mobileMenuToggle.classList.toggle('active', show);
        mobileNav.classList.toggle('active', show);
        mobileOverlay.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : 'auto';
    };

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            const isActive = mobileNav.classList.contains('active');
            toggleMenu(!isActive);
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => toggleMenu(false));
    }

    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => toggleMenu(false));
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });

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

    // AI Chatbot Knowledge Base & Logic
    const chatContainer = document.getElementById('chat-container');
    const userQuery = document.getElementById('user-query');
    const sendQuery = document.getElementById('send-query');

    const satyamData = {
        greeting: "Hello! I'm Satyam's virtual assistant. I can tell you about his skills, education, projects, or how to contact him. How can I help you today?",
        skills: "Satyam is a specialized MERN Stack Developer. He's also proficient in C, C++, Python, Java, Go, Rust, and Spring Boot.",
        education: "He is currently pursuing a B.Tech degree at Gurukula Kangri University.",
        interests: "Satyam is deeply interested in Artificial Intelligence (AI) and Machine Learning (ML).",
        contact: "You can reach Satyam via his Discord Community, GitHub, LinkedIn, or the contact form below.",
        discord: "Satyam's Discord Community is available here: https://discord.com/channels/1492154438217895986/1492154438217895989",
        projects: "Satyam has built several projects including a modern React/Node.js web app and an interactive data visualization tool using D3.js.",
        goals: "He is passionate about exploring and adopting emerging technologies to stay ahead in the tech industry.",
        default: "That's a great question! I'm not entirely sure about that specific detail, but you can definitely ask Satyam directly through the contact form or on Discord."
    };

    const addMessage = (text, sender) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.innerHTML = `<strong>${sender === 'bot' ? 'AI' : 'You'}:</strong> ${text}`;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const handleChat = () => {
        const query = userQuery.value.trim().toLowerCase();
        if (!query) return;

        addMessage(userQuery.value, 'user');
        userQuery.value = '';

        setTimeout(() => {
            let response = satyamData.default;

            if (query === 'hi' || query === 'hello' || query === 'hey' || query.includes('hello satyam') || query.includes('hi satyam') || query === 'namaste') {
                response = satyamData.greeting;
            } else if (query.includes('skill') || query.includes('tech') || query.includes('language')) {
                response = satyamData.skills;
            } else if (query.includes('education') || query.includes('college') || query.includes('university') || query.includes('study')) {
                response = satyamData.education;
            } else if (query.includes('interest') || query.includes('ai') || query.includes('ml')) {
                response = satyamData.interests;
            } else if (query.includes('contact') || query.includes('reach') || query.includes('email')) {
                response = satyamData.contact;
            } else if (query.includes('discord')) {
                response = satyamData.discord;
            } else if (query.includes('project') || query.includes('build')) {
                response = satyamData.projects;
            } else if (query.includes('goal') || query.includes('future')) {
                response = satyamData.goals;
            } else if (query.includes('who') || query.includes('about')) {
                response = "Satyam is a passionate developer building the future, specializing in web tech and AI.";
            }

            addMessage(response, 'bot');
        }, 500);
    };

    if (sendQuery && userQuery) {
        sendQuery.addEventListener('click', handleChat);
        userQuery.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat();
        });
    }

    // Clear and Refresh functionality
    const clearBtn = document.getElementById('clear-chat');
    const refreshBtn = document.getElementById('refresh-chat');

    const resetChat = () => {
        chatContainer.innerHTML = `
            <div class="chat-message bot-message">
                <strong>AI:</strong> Hello! I'm Satyam's virtual assistant. What would you like to know about him?
            </div>
        `;
    };

    if (clearBtn) {
        clearBtn.addEventListener('click', resetChat);
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', resetChat);
    }

    // Handle "Become a Sponsor" and "Start Chatting" button clicks inside sections
    const sponsorBtns = document.querySelectorAll('button.sponsor-btn');

    sponsorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Thank you for your interest! This would redirect to your Stripe/GitHub Sponsors page.');
        });
    });

    // Remove old AI chatbot alert logic since we have real chat now
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
