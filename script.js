document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const loginContainer = document.querySelector('.login-container');
    
    initializeSidebarState();
    
    if (loginForm) {
        const usernameInput = document.getElementById('username');
        const usernameError = document.getElementById('usernameError');
        
        if (usernameInput) {
            usernameInput.addEventListener('input', function() {
                const username = this.value.trim();
                if (username.length > 0 && username.length < 4) {
                    usernameError.textContent = 'Username must be at least 4 characters long';
                } else {
                    usernameError.textContent = '';
                }
            });
        }
        
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('passwordError');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', function() {
                const password = this.value.trim();
                if (password.length > 0 && password.length < 6) {
                    passwordError.textContent = 'Password must be at least 6 characters long';
                } else {
                    passwordError.textContent = '';
                }
            });
        }
        
        // ✅ UPDATED LOGIN LOGIC
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = usernameInput ? usernameInput.value.trim() : '';
            const password = passwordInput ? passwordInput.value.trim() : '';
            
            if (usernameError) usernameError.textContent = '';
            if (passwordError) passwordError.textContent = '';
            if (loginError) {
                loginError.classList.remove('show');
                loginError.textContent = '';
            }
            if (loginContainer) loginContainer.classList.remove('shake');
            
            let isValid = true;
            
            if (username === '') {
                if (usernameError) usernameError.textContent = 'Username is required';
                isValid = false;
            } else if (username.length < 4) {
                if (usernameError) usernameError.textContent = 'Username must be at least 4 characters long';
                isValid = false;
            }
            
            if (password === '') {
                if (passwordError) passwordError.textContent = 'Password is required';
                isValid = false;
            } else if (password.length < 6) {
                if (passwordError) passwordError.textContent = 'Password must be at least 6 characters long';
                isValid = false;
            }
            
            if (!isValid) return;
            
            // ❌ Reject ONLY the specific pair
            if (username === 'hmanuelll' && password === 'Emmanuel04') {
                if (loginContainer) loginContainer.classList.add('shake');
                if (loginError) {
                    loginError.textContent = 'This username & password are not allowed';
                    loginError.classList.add('show');
                }
                return;
            }
            
            // ✅ Accept any other valid login
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 500);
        });
    }
    
    function initializeSidebarState() {
        const sidebar = document.querySelector('.sidebar');
        const container = document.querySelector('.container');
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const showSidebarBtn = document.querySelector('.show-sidebar-btn');
        
        if (sidebar && container && sidebarToggle) {
            const sidebarState = localStorage.getItem('sidebarState');
            if (sidebarState === 'collapsed') {
                sidebar.classList.add('collapsed');
                container.classList.add('full-width');
                sidebarToggle.textContent = '→';
                sidebarToggle.setAttribute('data-tooltip', 'Show Sidebar');
                if (showSidebarBtn) showSidebarBtn.style.display = 'flex';
            } else {
                sidebar.classList.remove('collapsed');
                container.classList.remove('full-width');
                sidebarToggle.textContent = '←';
                sidebarToggle.setAttribute('data-tooltip', 'Hide Sidebar');
                if (showSidebarBtn) showSidebarBtn.style.display = 'none';
            }
        }
    }
    
    function updateDateTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const dateTimeString = now.toLocaleDateString('en-US', options);
        
        const dateTimeElement = document.getElementById('datetime');
        if (dateTimeElement) {
            dateTimeElement.textContent = dateTimeString;
        }
    }
    
    setInterval(updateDateTime, 1000);
    updateDateTime();
    
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        if (slides.length === 0) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    let slideInterval;
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    if (prevBtn) prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    if (slides.length > 0) {
        showSlide(0);
    }
    
    const lightModeToggle = document.getElementById('lightModeToggle');
    if (lightModeToggle) {
        lightModeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            document.body.classList.toggle('light-mode');
            
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('lightMode', 'enabled');
                lightModeToggle.textContent = '🌙 Dark Mode';
                refreshUIForLightMode();
            } else {
                localStorage.setItem('lightMode', 'disabled');
                lightModeToggle.textContent = '☀️ Light Mode';
                refreshUIForLightMode();
            }
        });
        
        if (localStorage.getItem('lightMode') === 'enabled') {
            document.body.classList.add('light-mode');
            lightModeToggle.textContent = '🌙 Dark Mode';
            setTimeout(refreshUIForLightMode, 10);
        }
    }
    
    function refreshUIForLightMode() {
        const settingsDropdown = document.querySelector('.settings-dropdown');
        if (settingsDropdown && settingsDropdown.classList.contains('show')) {
            settingsDropdown.classList.remove('show');
            setTimeout(() => {
                settingsDropdown.classList.add('show');
            }, 10);
        }
        
        const logoutConfirm = document.querySelector('.logout-confirm');
        if (logoutConfirm && logoutConfirm.classList.contains('show')) {
            logoutConfirm.classList.remove('show');
            setTimeout(() => {
                logoutConfirm.classList.add('show');
            }, 10);
        }
        
        const academicDropdowns = document.querySelectorAll('.dropdown');
        academicDropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
                setTimeout(() => {
                    dropdown.classList.add('active');
                }, 10);
            }
        });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutConfirm = document.querySelector('.logout-confirm');
    const confirmYes = document.querySelector('.confirm-yes');
    const confirmNo = document.querySelector('.confirm-no');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (logoutConfirm) logoutConfirm.classList.add('show');
        });
    }
    
    if (confirmYes) {
        confirmYes.addEventListener('click', function() {
            if (logoutConfirm) logoutConfirm.classList.remove('show');
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        });
    }
    
    if (confirmNo) {
        confirmNo.addEventListener('click', function() {
            if (logoutConfirm) logoutConfirm.classList.remove('show');
        });
    }
    
    if (logoutConfirm) {
        logoutConfirm.addEventListener('click', function(e) {
            if (e.target === logoutConfirm) {
                logoutConfirm.classList.remove('show');
            }
        });
    }
    
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.container');
    const showSidebarBtn = document.querySelector('.show-sidebar-btn');
    
    if (sidebarToggle && sidebar && container) {
        sidebarToggle.addEventListener('click', function() {
            const isCollapsed = sidebar.classList.contains('collapsed');
            
            if (isCollapsed) {
                sidebar.classList.remove('collapsed');
                container.classList.remove('full-width');
                sidebarToggle.textContent = '←';
                sidebarToggle.setAttribute('data-tooltip', 'Hide Sidebar');
                localStorage.setItem('sidebarState', 'expanded');
                if (showSidebarBtn) showSidebarBtn.style.display = 'none';
            } else {
                sidebar.classList.add('collapsed');
                container.classList.add('full-width');
                sidebarToggle.textContent = '→';
                sidebarToggle.setAttribute('data-tooltip', 'Show Sidebar');
                localStorage.setItem('sidebarState', 'collapsed');
                if (showSidebarBtn) showSidebarBtn.style.display = 'flex';
            }
        });
    }
    
    if (showSidebarBtn) {
        showSidebarBtn.addEventListener('click', function() {
            if (sidebar && container && sidebarToggle) {
                sidebar.classList.remove('collapsed');
                container.classList.remove('full-width');
                sidebarToggle.textContent = '←';
                sidebarToggle.setAttribute('data-tooltip', 'Hide Sidebar');
                localStorage.setItem('sidebarState', 'expanded');
                showSidebarBtn.style.display = 'none';
            }
        });
    }
    
    // MOBILE DROPDOWN FUNCTIONALITY
    const academicDropdowns = document.querySelectorAll('.dropdown');
    
    academicDropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        if (dropdownLink) {
            // Desktop hover functionality
            dropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    academicDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    dropdown.classList.add('active');
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    setTimeout(() => {
                        if (!dropdown.matches(':hover')) {
                            dropdown.classList.remove('active');
                        }
                    }, 100);
                }
            });
            
            // Mobile click functionality
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    academicDropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    // Close dropdowns when clicking outside (mobile only)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.dropdown')) {
                academicDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        } else {
            // Desktop - close dropdowns when clicking outside
            if (!e.target.closest('.dropdown')) {
                academicDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });
    
    // Close dropdowns when a dropdown link is clicked (to navigate)
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                academicDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });
    
    const settingsBtn = document.querySelector('.settings-btn');
    const settingsDropdown = document.querySelector('.settings-dropdown');
    
    if (settingsBtn && settingsDropdown) {
        settingsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            settingsDropdown.classList.toggle('show');
        });
        
        document.addEventListener('click', function() {
            settingsDropdown.classList.remove('show');
        });
        
        settingsDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // MOBILE MENU FUNCTIONALITY
    const menuToggle = document.querySelector('.menu-toggle');
    const overlay = document.querySelector('.overlay');
    
    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', function() {
            const isActive = sidebar.classList.contains('active');
            
            if (isActive) {
                // Close sidebar
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                menuToggle.textContent = '☰';
                // Close any open dropdowns when closing sidebar
                academicDropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            } else {
                // Open sidebar
                sidebar.classList.add('active');
                overlay.classList.add('active');
                menuToggle.textContent = '✕';
            }
        });
        
        overlay.addEventListener('click', function() {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            menuToggle.textContent = '☰';
            // Close any open dropdowns when closing via overlay
            academicDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        });
        
        const navLinks = document.querySelectorAll('.nav-menu a, .dropdown-content a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            });
        });
    }
    
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'home.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
        
        const dropdownLinks = document.querySelectorAll('.dropdown-content a');
        dropdownLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    setActivePage();
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .game-card, .artist-card, tr, .photo-item, .sport-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

function initAdvancedSlideshow() {
    const slides = document.querySelectorAll('.advanced-slideshow .slide');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');
    const counter = document.querySelector('.slide-counter');
    
    let currentIndex = 0;
    
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        thumbs.forEach(thumb => thumb.classList.remove('active'));
        
        currentIndex = (index + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        thumbs[currentIndex].classList.add('active');
        
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${slides.length}`;
        }
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    }
    
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => showSlide(index));
    });
    
    setInterval(() => showSlide(currentIndex + 1), 4000);
    
    showSlide(0);
}

if (document.querySelector('.advanced-slideshow')) {
    initAdvancedSlideshow();
}
