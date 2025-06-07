document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    // Check user preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Set initial dark mode state
    if (isDarkMode) {
        htmlElement.classList.add('dark');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        localStorage.setItem('darkMode', htmlElement.classList.contains('dark'));
    });
    
    // Language switcher functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('language') || 'en';
    
    // Set initial language
    setLanguage(currentLang);
    
    // Highlight active language button
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
        
        // Add click event to language buttons
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('language', lang);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    function setLanguage(lang) {
        // Get all elements with data-en and data-pl attributes
        const elements = document.querySelectorAll('[data-en][data-pl]');
        
        elements.forEach(element => {
            element.textContent = element.getAttribute(`data-${lang}`);
        });
        
        // Update document language
        document.documentElement.lang = lang;
    }
     // Projects filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-accent');
                btn.classList.add('bg-secondary');
            });
            
            // Add active class to clicked button
            button.classList.add('active');
            button.classList.remove('bg-secondary');
            button.classList.add('bg-accent');
            
            // Filter projects
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                // Scroll to top when Home button is clicked
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize projects filter - set first button (All) as active
    const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allFilterBtn) {
        allFilterBtn.classList.add('bg-accent');
        allFilterBtn.classList.remove('bg-secondary');
    }
    
    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    function highlightNavOnScroll() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav items
                navItems.forEach(item => {
                    item.classList.remove('bg-gray-100', 'dark:bg-dark-primary', 'font-bold');
                });
                
                // Add active class to current section's nav item
                const activeNavItem = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('bg-gray-100', 'dark:bg-dark-primary', 'font-bold');
                }
            }
        });
        
        // Check if we're at the top of the page
        if (scrollPosition < 100) {
            navItems.forEach(item => {
                if (item.getAttribute('href') === '#') {
                    item.classList.add('bg-gray-100', 'dark:bg-dark-primary', 'font-bold');
                } else {
                    item.classList.remove('bg-gray-100', 'dark:bg-dark-primary', 'font-bold');
                }
            });
        }
    }
    
    // Initial call to highlight the correct nav item
    highlightNavOnScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Add scroll animation to make cards appear with a fade-in effect
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Select all the elements you want to animate on scroll
    const animateElements = document.querySelectorAll('.project-card, .bg-white');
    
    // Set initial styles and observe each element
    animateElements.forEach(element => {
        element.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
        observer.observe(element);
    });
});
