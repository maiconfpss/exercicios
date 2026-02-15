document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 0. DICIONÁRIO MULTI-IDIOMA (v16)
    // ============================================
    const translations = {
        pt: {
            nav_home: "Início",
            nav_projects: "Projetos",
            nav_about: "Sobre",
            nav_skills: "Habilidades",
            nav_contact: "Contato",
            hero_subtitle: "Aspirante a Desenvolvedor Front-end",
            hero_divider: "Construindo e aprendendo todos os dias",
            hero_scroll: "Role para baixo",
            projects_title: "Meus Projetos",
            view_project: "Ver Projeto",
            project1_title: "Projeto Star Bucks",
            project1_desc: "Projeto feito YT Larissa Kich.",
            project2_title: "Projeto Faster UI",
            project2_desc: "Projeto qualquer feito do figma.",
            project3_title: "Tech Start",
            project3_desc: "Projecto pededio pro Claude AI.",
            project4_title: "Projeto Future",
            project4_desc: "Aqui apenas pra completar o grid.",
            view_more_github: "Ver Mais no GitHub",
            about_title: "Sobre Mim",
            about_p1: "Olá! Sou um desenvolvedor apaixonado por criar experiências digitais únicas. Com foco em Front-end, busco sempre unir design e código para entregar interfaces que não são apenas funcionais, mas também visualmente impactantes.",
            about_p2: "Estou sempre estudando novas tecnologias e aprimorando minhas habilidades para resolver problemas complexos com soluções simples e elegantes.",
            skills_title: "Habilidades",
            skill_js_next: "JavaScript Proximo",
            contact_title: "Contato",
            contact_instagram: "Chamar no Direct",
            contact_email_title: "Email",
            contact_email_btn: "Enviar Email",
            contact_map_title: "Localização",
            contact_map_desc: "Mulungu do Morro - Bahia, Brasil",
            contact_map_btn: "Abrir Mapa",
            footer_copy: "&copy; 2k26 maiconfpss. Todos os direitos reservados."
        },
        en: {
            nav_home: "Home",
            nav_projects: "Projects",
            nav_about: "About",
            nav_skills: "Skills",
            nav_contact: "Contact",
            hero_subtitle: "Aspiring Front-end Developer",
            hero_divider: "Building and learning every day",
            hero_scroll: "Scroll down",
            projects_title: "My Projects",
            view_project: "View Project",
            project1_title: "Star Bucks Project",
            project1_desc: "Project made via YT Larissa Kich.",
            project2_title: "Faster UI Project",
            project2_desc: "Random project made from Figma.",
            project3_title: "Tech Start",
            project3_desc: "Project requested from Claude AI.",
            project4_title: "Future Project",
            project4_desc: "Just here to complete the grid.",
            view_more_github: "View More on GitHub",
            about_title: "About Me",
            about_p1: "Hello! I am a developer passionate about creating unique digital experiences. With a focus on Front-end, I always seek to unite design and code to deliver interfaces that are not only functional but also visually impactful.",
            about_p2: "I am always studying new technologies and improving my skills to solve complex problems with simple and elegant solutions.",
            skills_title: "Skills",
            skill_js_next: "Next JavaScript",
            contact_title: "Contact",
            contact_instagram: "Message on Direct",
            contact_email_title: "Email",
            contact_email_btn: "Send Email",
            contact_map_title: "Location",
            contact_map_desc: "Mulungu do Morro - Bahia, Brazil",
            contact_map_btn: "Open Map",
            footer_copy: "&copy; 2k26 maiconfpss. All rights reserved."
        }
    };

    const langToggles = document.querySelectorAll('#lang-toggle, #lang-toggle-mobile');
    let currentLang = localStorage.getItem('language') || 'pt';

    function setLanguage(lang) {
        document.body.classList.add('lang-fade');

        setTimeout(() => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (translations[lang][key]) {
                    if (element.tagName === 'A' && element.querySelector('i')) {
                        const icon = element.querySelector('i').outerHTML;
                        element.innerHTML = `${icon} ${translations[lang][key]}`;
                    } else {
                        element.innerHTML = translations[lang][key];
                    }
                }
            });

            // Re-fix specifically for project view buttons which are nested complexly
            document.querySelectorAll('.btn-project[data-i18n="view_project"]').forEach(btn => {
                const icon = btn.querySelector('i').outerHTML;
                btn.innerHTML = `${icon} ${translations[lang]['view_project']}`;
            });

            document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';

            // Update All Toggle UI (Desktop and Mobile)
            langToggles.forEach(toggle => {
                toggle.querySelectorAll('span').forEach(span => {
                    span.classList.toggle('active-lang', span.textContent === lang.toUpperCase());
                });
            });

            document.body.classList.remove('lang-fade');
        }, 200);
    }

    langToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            currentLang = currentLang === 'pt' ? 'en' : 'pt';
            localStorage.setItem('language', currentLang);
            setLanguage(currentLang);
        });
    });

    // Inicializar idioma
    setLanguage(currentLang);

    // ============================================
    // 0. PRELOADER (Cinematográfico)
    // ============================================
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        // Delay para apreciar a animação de entrada do texto
        setTimeout(() => {
            // Adiciona classe que faz o preloader subir (efeito cortina)
            if (preloader) {
                preloader.classList.add('hide-preloader');
            }
            // Animação hero sem reveal/active — copiado do v10 (sem delay de transition)
        }, 1500); // 1.5s de exibição do nome
    });

    // ============================================
    // 0.4 TEMA CLARO/ESCURO (Dark Mode Toggle)
    // ============================================
    const themeToggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const body = document.body;

    function updateThemeUI(isLight) {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.className = isLight ? 'fas fa-sun' : 'fas fa-moon';
                // Adiciona classe ao botão para controle via CSS
                toggle.classList.toggle('sun-theme', isLight);
                toggle.classList.toggle('moon-theme', !isLight);
            }
        });
    }

    // Carregar preferência
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        updateThemeUI(true);
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            // Efeito visual de clique no ícone
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.classList.remove('theme-click-anim');
                void icon.offsetWidth; // Trigger reflow para reiniciar animação
                icon.classList.add('theme-click-anim');
            }

            body.classList.toggle('light-mode');
            const isLight = body.classList.contains('light-mode');
            updateThemeUI(isLight);
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    });



    // ============================================
    // 0.2 PARTICLES SYSTEM (Inserido com Cuidado)
    // ============================================
    const canvas = document.getElementById('hero-particles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particlesArray = [];
        const numberOfParticles = 50;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Velocidade ultraleve (flutuação)
                this.speedX = (Math.random() * 0.4) - 0.2;
                this.speedY = (Math.random() * 0.4) - 0.2;
                this.size = Math.random() * 2 + 0.5; // Tamanho variado (0.5px a 2.5px)

                // Sistema de Opacidade Variável (Piscar suave)
                this.opacity = Math.random() * 0.5 + 0.1; // Começa entre 0.1 e 0.6
                this.opacitySpeed = Math.random() * 0.005 + 0.002;
                this.opacityDirection = 1; // 1 = aumentando, -1 = diminuindo
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Rebater suavemente
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

                // Atualizar Opacidade (Efeito Pulsação)
                if (this.opacityDirection === 1) {
                    this.opacity += this.opacitySpeed;
                    if (this.opacity >= 0.4) this.opacityDirection = -1; // Teto de brilho
                } else {
                    this.opacity -= this.opacitySpeed;
                    if (this.opacity <= 0.05) this.opacityDirection = 1; // Piso de brilho
                }
            }

            draw() {
                // Usa a opacidade dinâmica da partícula
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ============================================
    // 1. MENU MOBILE
    // ============================================
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.close-menu-btn');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav a');

    function toggleMenu() {
        const isOpen = mobileOverlay.classList.contains('active');
        if (isOpen) {
            mobileOverlay.classList.remove('active');
        } else {
            mobileOverlay.classList.add('active');
        }
    }

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });


    // ============================================
    // OTIMIZAÇÃO DE SCROLL (requestAnimationFrame)
    // ============================================

    // Selecionando elementos uma única vez (Cache)
    const header = document.querySelector('.header');
    const heroContent = document.querySelector('.hero-content');
    const heroFadeLayer = document.querySelector('.hero-fade-layer');
    const revealElements = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');
    const projectCards = document.querySelectorAll('.project-card');
    const scrollLine = document.getElementById('scroll-line');

    let ticking = false;

    // Função de Loop Otimizado
    function updateScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight - windowHeight;

        // 0. Update Scroll Line
        if (scrollLine) {
            const scrollPercent = (scrollY / totalHeight) * 100;
            scrollLine.style.width = scrollPercent + '%';
        }

        // 1. Header Scroll
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 2. Animação Hero — Copiado do v10 (sem delay, texto e fade independentes)
        // Texto some primeiro ao rolar (opacidade + translateY)
        if (heroContent) {
            const textTranslate = scrollY * 0.4;
            const textOpacity = 1 - (scrollY / 300);

            if (textOpacity >= 0) {
                heroContent.style.opacity = textOpacity;
                heroContent.style.transform = `translateY(${textTranslate}px)`;
            } else {
                heroContent.style.opacity = 0;
            }
        }

        // Fade geral (escurecimento da imagem para próxima seção)
        if (heroFadeLayer) {
            const fadeOpacity = Math.min(scrollY / 700, 1);
            heroFadeLayer.style.opacity = fadeOpacity;
        }

        // 3. Efeito Pilha 3D (Scale) - AQUI OCORRIA A TREMEDEIRA
        projectCards.forEach((card, index) => {
            // Obter estilo computado é caro, ideal seria cachear, mas o top muda com media query.
            // Assumimos valores fixos baseados na lógica do CSS para performance.
            // Mobile: 120px + i*20 | PC: 130px + i*20

            // Deteção simples de "PC vs Mobile" pela largura
            const isMobile = window.innerWidth <= 900;
            const baseTop = isMobile ? 120 : 130;
            const stickyValue = baseTop + (index * 20);

            const rect = card.getBoundingClientRect();

            // card.offsetTop não serve pois é relativo ao parent.
            // rect.top é relativo à viewport.

            if (rect.top <= stickyValue + 2) {
                // Card Travado
                const nextCard = projectCards[index + 1];
                if (nextCard) {
                    const nextRect = nextCard.getBoundingClientRect();
                    const distanceTotal = windowHeight - stickyValue;
                    const distanceCurrent = nextRect.top - stickyValue;

                    let progress = distanceCurrent / distanceTotal;
                    progress = Math.max(0, Math.min(1, progress));

                    const targetScale = 0.93;
                    const currentScale = targetScale + ((1 - targetScale) * progress);

                    // Aplicar transform (sem brightness pra evitar escurecimento estranho)
                    card.style.transform = `scale(${currentScale})`;
                }
            } else {
                // Reset
                card.style.transform = 'scale(1)';
            }
        });

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScroll);
            ticking = true;
        }
    });

    // 4. Observers (Eles já são otimizados pelo navegador, mantém separados fora do loop de scroll)

    // Scroll Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // Active Menu Observer
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(sec => sectionObserver.observe(sec));

    // Chama uma vez para configurar estado inicial
    updateScroll();

});
