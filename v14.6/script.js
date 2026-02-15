document.addEventListener('DOMContentLoaded', () => {

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

    let ticking = false;

    // Função de Loop Otimizado
    function updateScroll() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;

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

});
