// Cyberpunk Security Portfolio - Fixed JavaScript
class CyberSecurityApp {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'home';
        this.currentTheme = 'dark';
        this.currentLanguage = 'en';
        this.terminalMode = false;
        this.matrixMode = false;
        this.userProgress = {
            xp: 0,
            level: 'CYBER_ROOKIE',
            badges: [],
            labsCompleted: [],
            gamesPlayed: [],
            activitiesLog: []
        };
        this.musicPlayer = {
            isPlaying: false,
            currentTrack: 0,
            volume: 0.7,
            shuffle: false,
            repeat: false,
            playlist: []
        };
        this.gameStats = {
            highScores: {},
            totalGamesPlayed: 0,
            achievements: []
        };
        
        this.init();
    }

    init() {
        this.showLoadingScreen();
        this.loadUserData();
        this.setupEventListeners();
        this.populateContent();
        this.initializeMusicPlayer();
        this.startAnimations();
        setTimeout(() => this.hideLoadingScreen(), 3000);
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            this.createMatrixEffect(loadingScreen);
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }

    createMatrixEffect(container) {
        const matrixChars = '01';
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.opacity = '0.1';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        container.appendChild(canvas);
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        
        const drops = [];
        const columns = Math.floor(canvas.width / 20);
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        const matrixInterval = setInterval(drawMatrix, 50);
        
        setTimeout(() => {
            clearInterval(matrixInterval);
            if (canvas.parentNode) {
                canvas.remove();
            }
        }, 3000);
    }

    loadUserData() {
        const savedUser = localStorage.getItem('cyberSecUser');
        const savedProgress = localStorage.getItem('userProgress');
        const savedGameStats = localStorage.getItem('gameStats');
        
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateAuthUI();
        }
        
        if (savedProgress) {
            this.userProgress = { ...this.userProgress, ...JSON.parse(savedProgress) };
            this.updateProgressUI();
        }
        
        if (savedGameStats) {
            this.gameStats = { ...this.gameStats, ...JSON.parse(savedGameStats) };
        }

        const savedTheme = localStorage.getItem('theme') || 'dark';
        const savedLanguage = localStorage.getItem('language') || 'en';
        
        this.setTheme(savedTheme);
        this.setLanguage(savedLanguage);
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Navigation - Fixed implementation
        document.querySelectorAll('[data-section]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const section = element.getAttribute('data-section');
                console.log('Navigation clicked:', section);
                this.navigateToSection(section);
            });
        });

        // Theme and language controls
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleTheme();
            });
        }

        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleLanguage();
            });
        }

        // Mobile menu
        const mobileToggle = document.getElementById('mobile-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMobileMenu();
            });
        }

        // Authentication - Fixed implementation
        const authBtn = document.getElementById('auth-btn');
        if (authBtn) {
            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Auth button clicked');
                this.showAuthModal();
            });
        }

        document.querySelectorAll('.auth-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showAuthModal();
            });
        });

        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.logout();
            });
        }

        // Auth forms
        this.setupAuthForms();

        // Modal controls
        this.setupModalControls();

        // Tools - Fixed implementation
        this.setupToolControls();

        // Games - Fixed implementation
        this.setupGameControls();

        // Music player
        this.setupMusicControls();

        // Fun tools
        this.setupFunTools();

        // Password strength checker
        this.initPasswordChecker();

        // Counter animations
        this.setupCounters();

        // Keyboard shortcuts and easter eggs
        this.setupEasterEggs();
    }

    setupAuthForms() {
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                this.handleLogin(e);
            });
        }

        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                this.handleSignup(e);
            });
        }

        const showSignup = document.getElementById('show-signup');
        if (showSignup) {
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchAuthForm('signup');
            });
        }

        const showLogin = document.getElementById('show-login');
        if (showLogin) {
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchAuthForm('login');
            });
        }
    }

    setupModalControls() {
        document.querySelectorAll('.modal-close').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeAllModals();
            });
        });

        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeAllModals();
                }
            });
        });
    }

    setupToolControls() {
        // Quick access tools - Fixed
        document.querySelectorAll('.tool-card[data-tool]').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tool = card.getAttribute('data-tool');
                console.log('Tool clicked:', tool);
                this.navigateToSection('tools');
                setTimeout(() => this.openToolModal(tool), 300);
            });
        });

        // Tool navigation buttons
        document.querySelectorAll('.tool-nav-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tool = e.target.getAttribute('data-tool');
                this.switchTool(tool);
            });
        });

        // Password generator
        const generatePasswordBtn = document.getElementById('generate-password');
        if (generatePasswordBtn) {
            generatePasswordBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.generateSecurePassword();
            });
        }
    }

    setupGameControls() {
        document.querySelectorAll('.game-card[data-game]').forEach(card => {
            const button = card.querySelector('button');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const game = card.getAttribute('data-game');
                    console.log('Game clicked:', game);
                    this.startGame(game);
                });
            }
        });
    }

    setupMusicControls() {
        const playPause = document.getElementById('play-pause');
        if (playPause) {
            playPause.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.togglePlayPause();
            });
        }

        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.previousTrack();
            });
        }

        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.nextTrack();
            });
        }

        const shuffleBtn = document.getElementById('shuffle-btn');
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleShuffle();
            });
        }

        const repeatBtn = document.getElementById('repeat-btn');
        if (repeatBtn) {
            repeatBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleRepeat();
            });
        }

        const volumeSlider = document.getElementById('volume-slider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.setVolume(e.target.value / 100);
            });
        }

        document.querySelectorAll('.playlist-card').forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const playlist = card.getAttribute('data-playlist');
                this.switchPlaylist(playlist);
            });
        });
    }

    setupFunTools() {
        const generateMeme = document.getElementById('generate-meme');
        if (generateMeme) {
            generateMeme.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.generateMeme();
            });
        }

        const newJoke = document.getElementById('new-joke');
        if (newJoke) {
            newJoke.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.generateNewJoke();
            });
        }

        const toggleMatrix = document.getElementById('toggle-matrix');
        if (toggleMatrix) {
            toggleMatrix.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMatrixMode();
            });
        }

        const fakeHacker = document.getElementById('fake-hacker');
        if (fakeHacker) {
            fakeHacker.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.activateFakeHacker();
            });
        }

        const fakeVirus = document.getElementById('fake-virus');
        if (fakeVirus) {
            fakeVirus.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.activateFakeVirus();
            });
        }

        const fakeUpdate = document.getElementById('fake-update');
        if (fakeUpdate) {
            fakeUpdate.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.activateFakeUpdate();
            });
        }
    }

    setupCounters() {
        const counters = document.querySelectorAll('.counter');
        const observerOptions = {
            threshold: 0.7
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    this.animateCounter(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    setupEasterEggs() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        let userInput = [];

        document.addEventListener('keydown', (e) => {
            userInput.push(e.code);
            userInput = userInput.slice(-konamiCode.length);

            if (userInput.join('') === konamiCode.join('')) {
                this.activateKonamiCode();
                userInput = [];
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTerminalMode();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'M') {
                e.preventDefault();
                this.toggleMatrixMode();
            }
        });
    }

    initPasswordChecker() {
        const passwordInput = document.getElementById('password-input');
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.checkPasswordStrength(e.target.value);
            });
        }
    }

    navigateToSection(sectionId) {
        console.log('Navigating to section:', sectionId);
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            console.log('Section shown:', sectionId);
            this.addSectionAnimation(targetSection);
        } else {
            console.error('Section not found:', sectionId);
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.currentSection = sectionId;
        this.closeMobileMenu();
        
        // Show notification
        this.showNotification(`Section loaded: ${sectionId.toUpperCase()}`, 'info');
    }

    addSectionAnimation(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.offsetHeight; // Trigger reflow
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(this.currentTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }
        
        localStorage.setItem('theme', theme);
        this.showNotification(`Theme: ${theme.toUpperCase()} MODE`, 'info');
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'hi' : 'en';
        this.setLanguage(this.currentLanguage);
    }

    setLanguage(language) {
        this.currentLanguage = language;
        
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = language.toUpperCase();
        }
        
        localStorage.setItem('language', language);
        this.showNotification(`Language: ${language.toUpperCase()}`, 'info');
    }

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }

    showAuthModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.classList.remove('hidden');
            this.switchAuthForm('login');
            console.log('Auth modal shown');
        } else {
            console.error('Auth modal not found');
        }
    }

    switchAuthForm(form) {
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const title = document.getElementById('auth-title');

        if (form === 'login') {
            if (loginForm) loginForm.classList.remove('hidden');
            if (signupForm) signupForm.classList.add('hidden');
            if (title) title.textContent = 'SYSTEM_ACCESS';
        } else {
            if (loginForm) loginForm.classList.add('hidden');
            if (signupForm) signupForm.classList.remove('hidden');
            if (title) title.textContent = 'CREATE_ACCOUNT';
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('login-email')?.value;
        const password = document.getElementById('login-password')?.value;

        if (email && password) {
            this.currentUser = {
                name: 'Cyber_Explorer',
                email: email,
                avatar: null,
                joinDate: new Date().toISOString(),
                accessLevel: 'AUTHENTICATED'
            };

            localStorage.setItem('cyberSecUser', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            this.closeAllModals();
            this.showNotification('ACCESS GRANTED - Welcome to the Matrix!', 'success');
            this.awardXP(25, 'System authentication successful');
        }
    }

    handleSignup(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name')?.value;
        const email = document.getElementById('signup-email')?.value;
        const password = document.getElementById('signup-password')?.value;
        const confirm = document.getElementById('signup-confirm')?.value;

        if (password !== confirm) {
            this.showNotification('PASSWORD MISMATCH - Security protocols failed!', 'error');
            return;
        }

        if (name && email && password) {
            this.currentUser = {
                name: name,
                email: email,
                avatar: null,
                joinDate: new Date().toISOString(),
                accessLevel: 'NEW_USER'
            };

            localStorage.setItem('cyberSecUser', JSON.stringify(this.currentUser));
            this.updateAuthUI();
            this.closeAllModals();
            this.showNotification('ACCOUNT CREATED - Matrix initialization complete!', 'success');
            this.awardXP(50, 'New user registration');
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('cyberSecUser');
        this.updateAuthUI();
        this.showNotification('SYSTEM LOGOUT - Connection terminated', 'info');
        this.navigateToSection('home');
    }

    updateAuthUI() {
        const authBtn = document.getElementById('auth-btn');
        const userAvatar = document.getElementById('user-avatar');

        if (this.currentUser) {
            if (authBtn) authBtn.classList.add('hidden');
            if (userAvatar) userAvatar.classList.remove('hidden');
        } else {
            if (authBtn) authBtn.classList.remove('hidden');
            if (userAvatar) userAvatar.classList.add('hidden');
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
        });
    }

    openToolModal(toolName) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content cyber-modal">
                <div class="modal-header">
                    <h3>${this.getToolTitle(toolName)}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div id="tool-interface">${this.getToolInterface(toolName)}</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listener for close button
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Initialize tool functionality
        this.initializeToolFunctionality(toolName, modal);
    }

    getToolTitle(toolName) {
        const titles = {
            'password-checker': '🔐 PASSWORD_SECURITY_ANALYZER',
            'hash-calculator': '🔢 CRYPTOGRAPHIC_HASH_GENERATOR',
            'network-scanner': '🌐 NETWORK_SECURITY_SCANNER',
            'crypto-tool': '🛡️ QUANTUM_CRYPTO_SUITE',
            'ai-chatgpt': '🤖 AI_ASSISTANT_INTERFACE',
            'prank-tools': '😈 SOCIAL_ENGINEERING_SIMULATOR'
        };
        return titles[toolName] || 'CYBER_TOOL';
    }

    getToolInterface(toolName) {
        const interfaces = {
            'password-checker': `
                <div style="padding: 1rem;">
                    <h4 style="color: var(--neon-cyan); margin-bottom: 1rem;">Password Security Analysis</h4>
                    <input type="password" id="modal-password-input" class="cyber-input" placeholder="Enter password to analyze" style="width: 100%; margin-bottom: 1rem;">
                    <div class="password-strength" id="modal-password-strength">
                        <div class="strength-bar">
                            <div class="strength-fill"></div>
                        </div>
                        <div class="strength-label">Enter a password</div>
                    </div>
                    <button class="cyber-btn" id="modal-generate-password" style="margin-top: 1rem;">
                        <span>GENERATE_SECURE_PASSWORD</span>
                        <div class="btn-glow"></div>
                    </button>
                    <div class="generated-password" id="modal-generated-password" style="margin-top: 1rem;"></div>
                </div>
            `,
            'hash-calculator': `
                <div style="padding: 1rem;">
                    <h4 style="color: var(--neon-cyan); margin-bottom: 1rem;">Cryptographic Hash Generator</h4>
                    <textarea id="hash-input-text" class="cyber-input" rows="3" placeholder="Enter text to hash" style="width: 100%; margin-bottom: 1rem;"></textarea>
                    <select id="hash-algorithm-select" class="cyber-input" style="width: 100%; margin-bottom: 1rem;">
                        <option value="md5">MD5</option>
                        <option value="sha1">SHA-1</option>
                        <option value="sha256">SHA-256</option>
                        <option value="sha512">SHA-512</option>
                    </select>
                    <button class="cyber-btn" id="calculate-hash-btn">
                        <span>CALCULATE_HASH</span>
                        <div class="btn-glow"></div>
                    </button>
                    <div style="margin-top: 1rem;">
                        <label style="color: var(--text-primary);">Hash Result:</label>
                        <input type="text" id="hash-result-output" class="cyber-input" readonly style="width: 100%; margin-top: 0.5rem; font-family: monospace;">
                    </div>
                </div>
            `,
            'ai-chatgpt': `
                <div style="padding: 1rem;">
                    <h4 style="color: var(--neon-cyan); margin-bottom: 1rem;">AI Assistant Interface</h4>
                    <div id="chat-messages" style="height: 300px; overflow-y: auto; border: 1px solid var(--neon-cyan); border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: var(--bg-primary);">
                        <div style="color: var(--neon-green);">[AI]: Hello! I'm your cybersecurity AI assistant. How can I help you today?</div>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="text" id="chat-input" class="cyber-input" placeholder="Ask me anything about cybersecurity..." style="flex: 1;">
                        <button class="cyber-btn" id="send-message">
                            <span>SEND</span>
                            <div class="btn-glow"></div>
                        </button>
                    </div>
                </div>
            `
        };
        
        return interfaces[toolName] || `
            <div style="padding: 2rem; text-align: center;">
                <h4 style="color: var(--neon-cyan);">TOOL INITIALIZATION...</h4>
                <p style="color: var(--text-secondary);">Advanced cybersecurity module loading...</p>
                <div style="margin-top: 2rem;">
                    <button class="cyber-btn" onclick="this.closest('.modal').remove()">
                        <span>CLOSE</span>
                        <div class="btn-glow"></div>
                    </button>
                </div>
            </div>
        `;
    }

    initializeToolFunctionality(toolName, modal) {
        switch (toolName) {
            case 'password-checker':
                this.initModalPasswordChecker(modal);
                break;
            case 'hash-calculator':
                this.initHashCalculator(modal);
                break;
            case 'ai-chatgpt':
                this.initAIChat(modal);
                break;
        }
    }

    initModalPasswordChecker(modal) {
        const passwordInput = modal.querySelector('#modal-password-input');
        const generateBtn = modal.querySelector('#modal-generate-password');
        
        if (passwordInput) {
            passwordInput.addEventListener('input', (e) => {
                this.checkModalPasswordStrength(e.target.value, modal);
            });
        }
        
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateSecurePasswordInModal(modal);
            });
        }
    }

    checkModalPasswordStrength(password, modal) {
        const strengthBar = modal.querySelector('.strength-fill');
        const strengthLabel = modal.querySelector('.strength-label');
        
        if (!strengthBar || !strengthLabel) return;

        let score = 0;
        let feedback = '';

        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        strengthBar.className = 'strength-fill';
        
        if (score === 0) {
            feedback = 'Enter password';
        } else if (score <= 2) {
            strengthBar.classList.add('weak');
            feedback = 'WEAK - Vulnerable to attacks';
        } else if (score === 3) {
            strengthBar.classList.add('fair');
            feedback = 'FAIR - Needs improvement';
        } else if (score === 4) {
            strengthBar.classList.add('good');
            feedback = 'GOOD - Acceptable security';
        } else {
            strengthBar.classList.add('strong');
            feedback = 'STRONG - Fortress-level security';
        }

        strengthLabel.textContent = feedback;
    }

    generateSecurePasswordInModal(modal) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        const length = 16;
        let password = '';
        
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        
        const generatedPassword = modal.querySelector('#modal-generated-password');
        if (generatedPassword) {
            generatedPassword.textContent = password;
            generatedPassword.style.background = 'var(--bg-secondary)';
            generatedPassword.style.border = '1px solid var(--neon-green)';
            generatedPassword.style.borderRadius = '8px';
            generatedPassword.style.padding = '1rem';
            generatedPassword.style.fontFamily = 'monospace';
            generatedPassword.style.color = 'var(--neon-green)';
            generatedPassword.style.textAlign = 'center';
            generatedPassword.style.cursor = 'pointer';
            generatedPassword.title = 'Click to copy';
            
            generatedPassword.addEventListener('click', () => {
                navigator.clipboard.writeText(password).then(() => {
                    this.showNotification('PASSWORD COPIED TO CLIPBOARD', 'success');
                });
            });
        }
        
        this.showNotification('SECURE PASSWORD GENERATED', 'success');
        this.awardXP(5, 'Generated secure password');
    }

    initHashCalculator(modal) {
        const calculateBtn = modal.querySelector('#calculate-hash-btn');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.calculateHashInModal(modal);
            });
        }
    }

    calculateHashInModal(modal) {
        const input = modal.querySelector('#hash-input-text')?.value;
        const algorithm = modal.querySelector('#hash-algorithm-select')?.value;
        const output = modal.querySelector('#hash-result-output');

        if (!input || !output) return;

        // Simple hash simulation (not cryptographically secure)
        let hash = '';
        
        switch (algorithm) {
            case 'md5':
                hash = this.simpleHash(input, 32);
                break;
            case 'sha1':
                hash = this.simpleHash(input, 40);
                break;
            case 'sha256':
                hash = this.simpleHash(input, 64);
                break;
            case 'sha512':
                hash = this.simpleHash(input, 128);
                break;
        }

        output.value = hash;
        this.showNotification(`${algorithm.toUpperCase()} hash calculated`, 'success');
        this.awardXP(10, 'Used hash calculator');
    }

    simpleHash(str, length) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        
        const hashStr = Math.abs(hash).toString(16);
        return hashStr.padEnd(length, '0').substring(0, length);
    }

    initAIChat(modal) {
        const sendBtn = modal.querySelector('#send-message');
        const chatInput = modal.querySelector('#chat-input');
        const chatMessages = modal.querySelector('#chat-messages');
        
        if (sendBtn) {
            sendBtn.addEventListener('click', () => {
                this.sendAIMessage(modal);
            });
        }
        
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendAIMessage(modal);
                }
            });
        }
    }

    sendAIMessage(modal) {
        const chatInput = modal.querySelector('#chat-input');
        const chatMessages = modal.querySelector('#chat-messages');
        
        if (!chatInput || !chatMessages) return;
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        const userDiv = document.createElement('div');
        userDiv.style.color = 'var(--neon-cyan)';
        userDiv.style.marginBottom = '0.5rem';
        userDiv.textContent = `[YOU]: ${message}`;
        chatMessages.appendChild(userDiv);
        
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            const aiResponses = [
                "That's an excellent question about cybersecurity! Let me analyze that for you.",
                "Based on current threat intelligence, I'd recommend implementing multi-factor authentication.",
                "Interesting! In the context of quantum computing, that approach could be vulnerable.",
                "From a defensive perspective, you should consider using zero-trust architecture.",
                "That's a common attack vector. I suggest implementing proper input validation.",
                "Great question! Network segmentation would be your best defense here.",
                "According to the latest OWASP guidelines, that's classified as a high-risk vulnerability."
            ];
            
            const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
            
            const aiDiv = document.createElement('div');
            aiDiv.style.color = 'var(--neon-green)';
            aiDiv.style.marginBottom = '0.5rem';
            aiDiv.textContent = `[AI]: ${response}`;
            chatMessages.appendChild(aiDiv);
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        chatMessages.scrollTop = chatMessages.scrollHeight;
        this.awardXP(5, 'Chatted with AI assistant');
    }

    startGame(gameType) {
        const modal = document.getElementById('game-modal');
        const title = document.getElementById('game-title');
        const container = document.getElementById('game-container');

        if (!modal || !title || !container) return;

        title.textContent = this.getGameTitle(gameType);
        container.innerHTML = '';

        modal.classList.remove('hidden');

        switch (gameType) {
            case 'cyber-memory':
                this.createCyberMemoryGame(container);
                break;
            case 'password-race':
                this.createPasswordRaceGame(container);
                break;
            case 'binary-puzzle':
                this.createBinaryPuzzleGame(container);
                break;
            case 'hacker-typing':
                this.createHackerTypingGame(container);
                break;
            case 'cyber-snake':
                this.createCyberSnakeGame(container);
                break;
            case 'security-trivia':
                this.createSecurityTriviaGame(container);
                break;
            default:
                container.innerHTML = `
                    <div style="text-align: center; padding: 2rem;">
                        <h3 style="color: var(--neon-cyan);">GAME MODULE LOADING...</h3>
                        <p style="color: var(--text-secondary);">Advanced gaming algorithms initializing...</p>
                        <div style="margin-top: 2rem;">
                            <button class="cyber-btn" onclick="this.closest('.modal').classList.add('hidden')">
                                <span>CLOSE</span>
                                <div class="btn-glow"></div>
                            </button>
                        </div>
                    </div>
                `;
        }
        
        this.gameStats.totalGamesPlayed++;
        this.saveGameStats();
    }

    getGameTitle(gameType) {
        const titles = {
            'cyber-memory': 'CYBER_MEMORY_MATRIX',
            'password-race': 'PASSWORD_CRACKING_RACE',
            'binary-puzzle': 'BINARY_DECODE_CHALLENGE',
            'hacker-typing': 'ELITE_HACKER_TYPING',
            'cyber-snake': 'QUANTUM_SNAKE_PROTOCOL',
            'security-trivia': 'CYBERSEC_KNOWLEDGE_TEST'
        };
        return titles[gameType] || 'CYBER_GAME_PROTOCOL';
    }

    createCyberMemoryGame(container) {
        const symbols = ['🔒', '🔑', '🛡️', '🔐', '🗝️', '🔓', '💾', '⚡'];
        const cards = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        
        let flippedCards = [];
        let matchedPairs = 0;
        let moves = 0;
        let gameStartTime = Date.now();

        const gameHTML = `
            <div class="game-container">
                <div class="game-stats" style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-family: Orbitron;">
                    <span style="color: var(--neon-cyan);">MOVES: <span id="move-count">0</span></span>
                    <span style="color: var(--neon-green);">MATCHES: <span id="match-count">0</span></span>
                    <span style="color: var(--neon-pink);">TIME: <span id="time-count">00:00</span></span>
                </div>
                <div class="game-board memory-board" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-bottom: 1rem;"></div>
                <div class="game-controls" style="text-align: center;">
                    <button class="cyber-btn" id="new-memory-game">
                        <span>NEW_GAME</span>
                        <div class="btn-glow"></div>
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = gameHTML;
        const gameBoard = container.querySelector('.memory-board');

        // Create timer
        const timer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - gameStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const seconds = (elapsed % 60).toString().padStart(2, '0');
            const timeDisplay = container.querySelector('#time-count');
            if (timeDisplay) timeDisplay.textContent = `${minutes}:${seconds}`;
        }, 1000);

        cards.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.className = 'game-cell';
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.style.cssText = `
                aspect-ratio: 1;
                background: var(--bg-primary);
                border: 1px solid var(--neon-cyan);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 2rem;
                transition: all 0.3s ease;
                min-width: 60px;
                min-height: 60px;
            `;
            
            card.addEventListener('click', () => {
                if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
                if (flippedCards.length >= 2) return;

                card.textContent = symbol;
                card.classList.add('flipped');
                card.style.background = 'var(--neon-cyan)';
                card.style.color = 'var(--bg-primary)';
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    moves++;
                    const moveCount = container.querySelector('#move-count');
                    if (moveCount) moveCount.textContent = moves;

                    setTimeout(() => {
                        if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                            flippedCards.forEach(c => {
                                c.classList.add('matched');
                                c.style.background = 'var(--neon-green)';
                                c.style.borderColor = 'var(--neon-green)';
                            });
                            matchedPairs++;
                            const matchCount = container.querySelector('#match-count');
                            if (matchCount) matchCount.textContent = matchedPairs;
                            
                            if (matchedPairs === symbols.length) {
                                clearInterval(timer);
                                const finalTime = Math.floor((Date.now() - gameStartTime) / 1000);
                                this.showNotification(`MISSION COMPLETE! Time: ${finalTime}s, Moves: ${moves}`, 'success');
                                this.awardXP(100 - moves * 2, 'Completed cyber memory challenge');
                            }
                        } else {
                            flippedCards.forEach(c => {
                                c.textContent = '';
                                c.classList.remove('flipped');
                                c.style.background = 'var(--bg-primary)';
                                c.style.color = 'var(--text-primary)';
                            });
                        }
                        flippedCards = [];
                    }, 1000);
                }
            });

            gameBoard.appendChild(card);
        });

        // New game button
        const newGameBtn = container.querySelector('#new-memory-game');
        if (newGameBtn) {
            newGameBtn.addEventListener('click', () => {
                clearInterval(timer);
                this.createCyberMemoryGame(container);
            });
        }
    }

    // Music Player Functions
    initializeMusicPlayer() {
        this.musicPlayer.playlist = this.getPlaylist('cyberpunk');
        this.populateTrackList();
        this.initializeVisualizer();
        this.updateNowPlaying();
    }

    getPlaylist(type) {
        const playlists = {
            cyberpunk: [
                { title: 'Neon Dreams', artist: 'CyberSynth', duration: '3:45' },
                { title: 'Digital Uprising', artist: 'Matrix Sound', duration: '4:12' },
                { title: 'Quantum Pulse', artist: 'Neural Network', duration: '3:58' },
                { title: 'Electric Shadows', artist: 'Cyber Phantom', duration: '4:33' }
            ],
            coding: [
                { title: 'Algorithm Flow', artist: 'Code Master', duration: '5:21' },
                { title: 'Binary Beats', artist: 'Logic Loop', duration: '4:45' },
                { title: 'Recursive Dreams', artist: 'Function Call', duration: '3:67' },
                { title: 'Stack Overflow', artist: 'Debug Mode', duration: '4:18' }
            ],
            anime: [
                { title: 'Opening Theme', artist: 'Solo Leveling OST', duration: '1:30' },
                { title: 'Battle Music', artist: 'Demon Slayer OST', duration: '2:45' },
                { title: 'Emotional Scene', artist: 'Angel Next Door', duration: '3:12' },
                { title: 'Credits Roll', artist: 'Alya Russian Feelings', duration: '1:45' }
            ],
            guitar: [
                { title: 'Acoustic Dreams', artist: 'Yamaha Sessions', duration: '4:20' },
                { title: 'Strings of Emotion', artist: 'Fender Vibes', duration: '3:55' },
                { title: 'Melancholic Guitar', artist: 'Cort Acoustics', duration: '5:10' },
                { title: 'Solo Performance', artist: 'Guitar Hero', duration: '3:30' }
            ]
        };
        return playlists[type] || playlists.cyberpunk;
    }

    switchPlaylist(playlistType) {
        document.querySelectorAll('.playlist-card').forEach(card => {
            card.classList.remove('active');
        });
        
        const activeCard = document.querySelector(`[data-playlist="${playlistType}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
        }
        
        this.musicPlayer.playlist = this.getPlaylist(playlistType);
        this.musicPlayer.currentTrack = 0;
        this.populateTrackList();
        this.updateNowPlaying();
        this.showNotification(`Playlist: ${playlistType.toUpperCase()}`, 'info');
    }

    populateTrackList() {
        const trackList = document.getElementById('track-list');
        if (!trackList) return;
        
        trackList.innerHTML = this.musicPlayer.playlist.map((track, index) => `
            <div class="track-item ${index === this.musicPlayer.currentTrack ? 'active' : ''}" data-track="${index}" style="display: flex; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--border-subtle); cursor: pointer; transition: all 0.3s ease; background: ${index === this.musicPlayer.currentTrack ? 'var(--color-bg-1)' : 'transparent'};">
                <div>
                    <div style="color: var(--text-primary); font-weight: 500;">${track.title}</div>
                    <div style="color: var(--text-secondary); font-size: 0.9rem;">${track.artist}</div>
                </div>
                <div style="color: var(--neon-cyan); font-family: monospace;">${track.duration}</div>
            </div>
        `).join('');
        
        // Add click handlers for tracks
        trackList.querySelectorAll('.track-item').forEach(item => {
            item.addEventListener('click', () => {
                const trackIndex = parseInt(item.getAttribute('data-track'));
                this.selectTrack(trackIndex);
            });
        });
    }

    selectTrack(index) {
        this.musicPlayer.currentTrack = index;
        this.updateNowPlaying();
        this.populateTrackList();
    }

    updateNowPlaying() {
        const track = this.musicPlayer.playlist[this.musicPlayer.currentTrack];
        if (!track) return;
        
        const titleEl = document.getElementById('track-title');
        const artistEl = document.getElementById('track-artist');
        
        if (titleEl) titleEl.textContent = track.title;
        if (artistEl) artistEl.textContent = track.artist;
    }

    togglePlayPause() {
        this.musicPlayer.isPlaying = !this.musicPlayer.isPlaying;
        const playPauseBtn = document.getElementById('play-pause');
        
        if (playPauseBtn) {
            playPauseBtn.textContent = this.musicPlayer.isPlaying ? '⏸️' : '▶️';
        }
        
        if (this.musicPlayer.isPlaying) {
            this.startVisualizerAnimation();
            this.showNotification('♪ ' + this.musicPlayer.playlist[this.musicPlayer.currentTrack].title, 'info');
        } else {
            this.stopVisualizerAnimation();
            this.showNotification('Music paused', 'info');
        }
    }

    nextTrack() {
        this.musicPlayer.currentTrack = (this.musicPlayer.currentTrack + 1) % this.musicPlayer.playlist.length;
        this.updateNowPlaying();
        this.populateTrackList();
        
        this.showNotification('► ' + this.musicPlayer.playlist[this.musicPlayer.currentTrack].title, 'info');
    }

    previousTrack() {
        this.musicPlayer.currentTrack = this.musicPlayer.currentTrack === 0 
            ? this.musicPlayer.playlist.length - 1 
            : this.musicPlayer.currentTrack - 1;
        this.updateNowPlaying();
        this.populateTrackList();
        
        this.showNotification('◄ ' + this.musicPlayer.playlist[this.musicPlayer.currentTrack].title, 'info');
    }

    toggleShuffle() {
        this.musicPlayer.shuffle = !this.musicPlayer.shuffle;
        this.showNotification(`Shuffle: ${this.musicPlayer.shuffle ? 'ON' : 'OFF'}`, 'info');
    }

    toggleRepeat() {
        this.musicPlayer.repeat = !this.musicPlayer.repeat;
        this.showNotification(`Repeat: ${this.musicPlayer.repeat ? 'ON' : 'OFF'}`, 'info');
    }

    setVolume(volume) {
        this.musicPlayer.volume = volume;
        this.showNotification(`Volume: ${Math.round(volume * 100)}%`, 'info');
    }

    initializeVisualizer() {
        const canvas = document.getElementById('visualizer-canvas');
        if (!canvas) return;
        
        this.visualizerCtx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        this.audioData = new Uint8Array(128);
    }

    startVisualizerAnimation() {
        if (this.visualizerAnimation) return;
        
        const animate = () => {
            if (!this.musicPlayer.isPlaying) return;
            
            // Generate fake audio data
            for (let i = 0; i < this.audioData.length; i++) {
                this.audioData[i] = Math.random() * 255;
            }
            
            this.drawVisualizer();
            this.visualizerAnimation = requestAnimationFrame(animate);
        };
        
        animate();
    }

    stopVisualizerAnimation() {
        if (this.visualizerAnimation) {
            cancelAnimationFrame(this.visualizerAnimation);
            this.visualizerAnimation = null;
        }
    }

    drawVisualizer() {
        if (!this.visualizerCtx) return;
        
        const canvas = this.visualizerCtx.canvas;
        const width = canvas.width;
        const height = canvas.height;
        
        this.visualizerCtx.clearRect(0, 0, width, height);
        
        const barWidth = width / this.audioData.length;
        
        for (let i = 0; i < this.audioData.length; i++) {
            const barHeight = (this.audioData[i] / 255) * height * 0.8;
            
            const gradient = this.visualizerCtx.createLinearGradient(0, height - barHeight, 0, height);
            gradient.addColorStop(0, '#00ffff');
            gradient.addColorStop(0.5, '#ff00ff');
            gradient.addColorStop(1, '#39ff14');
            
            this.visualizerCtx.fillStyle = gradient;
            this.visualizerCtx.fillRect(i * barWidth, height - barHeight, barWidth - 1, barHeight);
        }
    }

    // Fun Tools Functions
    generateMeme() {
        const topText = document.getElementById('meme-top')?.value || '';
        const bottomText = document.getElementById('meme-bottom')?.value || '';
        const preview = document.getElementById('meme-preview');
        
        if (!preview) return;
        
        if (topText || bottomText) {
            preview.innerHTML = `
                <div style="position: relative; width: 300px; height: 300px; background: linear-gradient(45deg, var(--neon-cyan), var(--neon-pink)); border-radius: 15px; display: flex; flex-direction: column; justify-content: space-between; padding: 20px; color: white; font-family: Impact, sans-serif; text-align: center; margin: 0 auto;">
                    <div style="font-size: 1.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); text-transform: uppercase;">${topText}</div>
                    <div style="font-size: 1.5rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); text-transform: uppercase;">${bottomText}</div>
                </div>
            `;
            this.showNotification('CYBERPUNK MEME GENERATED!', 'success');
            this.awardXP(5, 'Created a cyberpunk meme');
        } else {
            preview.innerHTML = '<div style="color: var(--text-secondary); text-align: center; padding: 2rem;">Enter text to generate meme</div>';
        }
    }

    generateNewJoke() {
        const jokes = [
            "Why don't hackers ever get stressed? Because they know how to handle exceptions!",
            "What's a hacker's favorite season? Phishing season!",
            "Why do cybersecurity experts make bad comedians? Their jokes are too encrypted!",
            "What do you call a security expert who works from home? A remote access specialist!",
            "Why did the firewall break up with the antivirus? There were too many false positives!",
            "What's the best way to communicate with malware? Don't - it's not a trusted source!",
            "Why do passwords never get invited to parties? They're always getting cracked under pressure!",
            "What did the ethical hacker say to the black hat? 'I'm going to report you to your supervisor!'",
            "Why don't quantum computers get viruses? They exist in a superposition of infected and clean!",
            "What's a cyberpunk's favorite type of music? Synthwave - it's always in the mainframe!"
        ];

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        const jokeDisplay = document.getElementById('current-joke');
        if (jokeDisplay) {
            jokeDisplay.textContent = randomJoke;
            jokeDisplay.style.animation = 'pulse-neon 0.5s ease';
        }
        
        this.awardXP(2, 'Generated a cyberpunk joke');
    }

    toggleMatrixMode() {
        this.matrixMode = !this.matrixMode;
        
        if (this.matrixMode) {
            this.createFullScreenMatrix();
            this.showNotification('MATRIX MODE ACTIVATED - Welcome to the real world', 'success');
        } else {
            this.removeFullScreenMatrix();
            this.showNotification('MATRIX MODE DEACTIVATED - Back to simulation', 'info');
        }
        
        this.awardXP(10, 'Toggled Matrix mode');
    }

    createFullScreenMatrix() {
        if (document.getElementById('matrix-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.id = 'matrix-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.1;
        `;
        
        document.body.appendChild(overlay);
        this.createMatrixEffect(overlay);
    }

    removeFullScreenMatrix() {
        const overlay = document.getElementById('matrix-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    activateFakeHacker() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.background = 'rgba(0, 0, 0, 0.95)';
        modal.innerHTML = `
            <div style="color: var(--neon-green); font-family: monospace; padding: 2rem; width: 80%; max-width: 600px; background: var(--bg-primary); border: 1px solid var(--neon-green); border-radius: 10px;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <h2 style="color: var(--neon-green);">SYSTEM BREACH DETECTED</h2>
                    <div style="font-size: 0.9rem; margin-bottom: 1rem;">Unauthorized access attempt in progress...</div>
                </div>
                <div id="hacker-text" style="min-height: 200px; overflow-y: auto; line-height: 1.4;"></div>
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="cyber-btn" onclick="this.closest('.modal').remove()">
                        <span>CLOSE_TERMINAL</span>
                        <div class="btn-glow"></div>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const hackerLines = [
            'Initializing neural interface...',
            'Bypassing firewall protocols...',
            'Access granted to mainframe...',
            'Downloading sensitive data...',
            'Uploading virus payload...',
            'Erasing digital footprints...',
            'Mission accomplished.',
            'Connection terminated.'
        ];
        
        const hackerTextEl = modal.querySelector('#hacker-text');
        let lineIndex = 0;
        
        const typeHackerLine = () => {
            if (lineIndex < hackerLines.length) {
                hackerTextEl.innerHTML += `> ${hackerLines[lineIndex]}<br>`;
                hackerTextEl.scrollTop = hackerTextEl.scrollHeight;
                lineIndex++;
                setTimeout(typeHackerLine, 1000);
            }
        };
        
        typeHackerLine();
        this.awardXP(5, 'Activated fake hacker screen');
    }

    activateFakeVirus() {
        this.showNotification('🚨 VIRUS SCAN INITIATED - Scanning 50,847 files...', 'error');
        
        setTimeout(() => {
            this.showNotification('⚠️ THREAT DETECTED: Harmless_Prank.exe', 'error');
        }, 2000);
        
        setTimeout(() => {
            this.showNotification('✅ QUARANTINE SUCCESSFUL - System is secure', 'success');
        }, 4000);
        
        this.awardXP(5, 'Ran fake virus scan');
    }

    activateFakeUpdate() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div style="background: var(--bg-card); border: 1px solid var(--neon-blue); border-radius: 15px; padding: 3rem; text-align: center; max-width: 500px;">
                <h3 style="color: var(--neon-blue); margin-bottom: 2rem;">SYSTEM UPDATE</h3>
                <div style="margin-bottom: 2rem;">
                    <div style="font-size: 2rem; margin-bottom: 1rem;">⚙️</div>
                    <div>Installing Cyberpunk OS v2.77...</div>
                </div>
                <div style="width: 100%; height: 20px; background: rgba(30, 144, 255, 0.2); border-radius: 10px; overflow: hidden; margin-bottom: 2rem;">
                    <div id="update-progress" style="height: 100%; background: var(--neon-blue); width: 0%; transition: width 0.5s ease;"></div>
                </div>
                <div id="update-status">Preparing installation...</div>
                <button class="cyber-btn" onclick="this.closest('.modal').remove()" style="margin-top: 2rem;">
                    <span>CANCEL</span>
                    <div class="btn-glow"></div>
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const progressBar = modal.querySelector('#update-progress');
        const statusEl = modal.querySelector('#update-status');
        const statuses = ['Preparing...', 'Downloading...', 'Installing...', 'Configuring...', 'Almost done...', 'Complete!'];
        
        let progress = 0;
        
        const updateProgress = () => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            statusEl.textContent = statuses[Math.floor((progress / 100) * (statuses.length - 1))];
            
            if (progress < 100) {
                setTimeout(updateProgress, 1000);
            } else {
                statusEl.textContent = 'Update complete! (Just kidding 😄)';
            }
        };
        
        updateProgress();
        this.awardXP(5, 'Ran fake system update');
    }

    // Utility Functions
    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }

    startAnimations() {
        const glitchElements = document.querySelectorAll('.glitch-text');
        glitchElements.forEach(el => {
            setInterval(() => {
                el.style.animation = 'none';
                el.offsetHeight;
                el.style.animation = 'glitch 0.3s ease-in-out';
            }, Math.random() * 5000 + 3000);
        });
    }

    populateContent() {
        this.populateNewsFeed();
        this.updateProgressUI();
        this.loadAchievements();
    }

    populateNewsFeed() {
        const newsData = [
            'BREAKING: New quantum encryption algorithm released • ',
            'ALERT: Zero-day vulnerability discovered in popular framework • ',
            'UPDATE: AI-powered threat detection reaches 99.8% accuracy • ',
            'RESEARCH: Cyberpunk security protocols now standard • ',
            'WARNING: Increase in sophisticated phishing campaigns • '
        ];
        
        const ticker = document.getElementById('news-ticker');
        if (ticker) {
            ticker.innerHTML = newsData.join('').repeat(3);
        }
        
        const preview = document.getElementById('news-preview');
        if (preview) {
            preview.innerHTML = newsData.slice(0, 3).map(item => 
                `<div class="news-card">
                    <h4 style="color: var(--neon-cyan); margin-bottom: 0.5rem; font-size: 1rem;">${item.split(':')[0]}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.4;">${item.split(':')[1]?.replace(' • ', '') || ''}</p>
                    <div style="font-size: 0.7rem; color: var(--neon-green); margin-top: 0.5rem; text-transform: uppercase;">● LIVE</div>
                </div>`
            ).join('');
        }
    }

    loadAchievements() {
        const achievements = [
            { id: 'first-login', name: 'System Access', icon: '🔓', earned: !!this.currentUser },
            { id: 'game-player', name: 'Game Master', icon: '🎮', earned: this.gameStats.totalGamesPlayed > 0 },
            { id: 'xp-hunter', name: 'XP Hunter', icon: '⭐', earned: this.userProgress.xp >= 100 },
            { id: 'cyber-ninja', name: 'Cyber Ninja', icon: '🥷', earned: this.userProgress.xp >= 500 },
        ];
        
        const achievementsGrid = document.getElementById('achievements-grid');
        if (achievementsGrid) {
            achievementsGrid.innerHTML = achievements.map(achievement => 
                `<div class="achievement-badge ${achievement.earned ? 'earned' : ''}" style="background: var(--bg-secondary); border: 1px solid ${achievement.earned ? 'var(--neon-green)' : 'var(--border-subtle)'}; border-radius: 10px; padding: 1rem; text-align: center; transition: all 0.3s ease; opacity: ${achievement.earned ? '1' : '0.3'};">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${achievement.icon}</div>
                    <div style="font-size: 0.7rem; color: var(--text-secondary);">${achievement.name}</div>
                </div>`
            ).join('');
        }
    }

    // XP and Progress System
    awardXP(amount, activity) {
        this.userProgress.xp += amount;
        this.logActivity(activity);
        this.updateLevel();
        this.saveUserProgress();
        this.updateProgressUI();
        this.showXPAnimation(amount);
    }

    showXPAnimation(amount) {
        const xpElement = document.createElement('div');
        xpElement.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--neon-green);
            font-family: var(--font-primary);
            font-size: 2rem;
            font-weight: bold;
            z-index: 5000;
            pointer-events: none;
            text-shadow: 0 0 20px var(--neon-green);
        `;
        xpElement.textContent = `+${amount} XP`;
        
        document.body.appendChild(xpElement);
        
        xpElement.animate([
            { transform: 'translate(-50%, -50%)', opacity: 1 },
            { transform: 'translate(-50%, -100px)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => xpElement.remove();
    }

    updateLevel() {
        const xp = this.userProgress.xp;
        if (xp >= 1000) {
            this.userProgress.level = 'CYBER_MASTER';
        } else if (xp >= 500) {
            this.userProgress.level = 'ELITE_HACKER';
        } else if (xp >= 250) {
            this.userProgress.level = 'SECURITY_EXPERT';
        } else if (xp >= 100) {
            this.userProgress.level = 'CYBER_SPECIALIST';
        } else if (xp >= 50) {
            this.userProgress.level = 'DIGITAL_WARRIOR';
        } else {
            this.userProgress.level = 'CYBER_ROOKIE';
        }
    }

    logActivity(activity) {
        this.userProgress.activitiesLog.unshift({
            activity,
            timestamp: new Date().toISOString(),
            id: Date.now()
        });

        if (this.userProgress.activitiesLog.length > 50) {
            this.userProgress.activitiesLog = this.userProgress.activitiesLog.slice(0, 50);
        }
    }

    updateProgressUI() {
        document.querySelectorAll('#user-xp, #profile-xp').forEach(el => {
            if (el) el.textContent = this.userProgress.xp.toLocaleString();
        });

        document.querySelectorAll('#user-level, #profile-level').forEach(el => {
            if (el) el.textContent = this.userProgress.level;
        });

        document.querySelectorAll('#profile-badges').forEach(el => {
            if (el) el.textContent = this.userProgress.badges.length;
        });
    }

    saveUserProgress() {
        localStorage.setItem('userProgress', JSON.stringify(this.userProgress));
    }

    saveGameStats() {
        localStorage.setItem('gameStats', JSON.stringify(this.gameStats));
    }

    // Easter Eggs
    activateKonamiCode() {
        this.showNotification('🎉 KONAMI CODE ACTIVATED! Secret cyber powers unlocked!', 'success');
        this.awardXP(100, 'Discovered the legendary Konami Code');
        
        document.body.style.animation = 'rainbow 3s infinite';
        this.createParticleExplosion();
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }

    createParticleExplosion() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                width: 10px;
                height: 10px;
                background: var(--neon-cyan);
                border-radius: 50%;
                pointer-events: none;
                z-index: 5000;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 50) * Math.PI * 2;
            const velocity = Math.random() * 300 + 100;
            
            particle.animate([
                { transform: 'translate(-50%, -50%)', opacity: 1 },
                { 
                    transform: `translate(${Math.cos(angle) * velocity - 50}%, ${Math.sin(angle) * velocity - 50}%)`,
                    opacity: 0 
                }
            ], {
                duration: 2000,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    toggleTerminalMode() {
        this.terminalMode = !this.terminalMode;
        
        if (this.terminalMode) {
            document.body.classList.add('terminal-mode');
            this.showNotification('TERMINAL MODE ACTIVATED - Entering the matrix...', 'success');
        } else {
            document.body.classList.remove('terminal-mode');
            this.showNotification('TERMINAL MODE DEACTIVATED - Returning to GUI...', 'info');
        }
        
        this.awardXP(15, 'Toggled terminal mode');
    }

    showNotification(message, type = 'info') {
        const notifications = document.getElementById('notifications');
        if (!notifications) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icons = {
            success: '✅',
            error: '🚨',
            info: 'ℹ️',
            warning: '⚠️'
        };
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">${icons[type] || 'ℹ️'}</span>
                <span>${message}</span>
            </div>
        `;

        notifications.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    window.app = new CyberSecurityApp();
});

// Add dynamic CSS for animations
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .terminal-mode * {
        background: #000 !important;
        color: #00ff00 !important;
        border-color: #00ff00 !important;
    }
    
    .earned {
        animation: glow-pulse 2s infinite alternate !important;
    }
    
    @keyframes glow-pulse {
        0% { box-shadow: 0 0 20px rgba(57, 255, 20, 0.5); }
        100% { box-shadow: 0 0 40px rgba(57, 255, 20, 0.8); }
    }
`;
document.head.appendChild(dynamicStyles);