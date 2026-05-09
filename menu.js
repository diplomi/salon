// ============================================
// 🍔 MENU.JS - УПРОЩЁННЫЙ И РАБОЧИЙ ВАРИАНТ
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. НАХОДИМ ВСЕ ЭЛЕМЕНТЫ
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    const links = document.querySelectorAll(".nav a");
    const logo = document.querySelector(".logo");
    const menuOverlay = document.querySelector(".menu-overlay");
    
    // 2. ПРОВЕРКА НАЛИЧИЯ ЭЛЕМЕНТОВ
    if (!burger || !nav) return;
    
    // 3. ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ МЕНЮ
    function toggleMenu() {
        burger.classList.toggle("active");
        nav.classList.toggle("open");
        
        // Показываем/скрываем оверлей (он уже содержит блюр)
        if (menuOverlay) {
            menuOverlay.classList.toggle("active");
        }
        
        // Блокируем скролл при открытом меню
        if (nav.classList.contains("open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }
    
    // 4. ФУНКЦИЯ ЗАКРЫТИЯ МЕНЮ
    function closeMenu() {
        burger.classList.remove("active");
        nav.classList.remove("open");
        document.body.style.overflow = "";
        
        // Скрываем оверлей
        if (menuOverlay) {
            menuOverlay.classList.remove("active");
        }
    }
    
    // 5. ОБРАБОТЧИК КЛИКА НА БУРГЕР
    burger.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });
    
    // 6. ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ НА ССЫЛКУ (только на мобильных)
    links.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // 7. ЗАКРЫТИЕ МЕНЮ ПРИ КЛИКЕ ВНЕ ЕГО
    if (menuOverlay) {
        menuOverlay.addEventListener("click", () => {
            if (window.innerWidth <= 768 && nav.classList.contains("open")) {
                closeMenu();
            }
        });
    }
    
    // 8. КЛИК ПО ЛОГОТИПУ - СКРОЛЛ НАВЕРХ
    if (logo) {
        logo.addEventListener("click", function(e) {
            e.preventDefault();
            closeMenu();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
    
    // 9. АНИМАЦИЯ ПОЯВЛЕНИЯ СЕКЦИЙ
    const sections = document.querySelectorAll(".section");
    if (sections.length > 0) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.15 });
        
        sections.forEach(section => observer.observe(section));
    }
    
    // 10. ЗАКРЫТИЕ МЕНЮ ПРИ УВЕЛИЧЕНИИ ЭКРАНА (переход на десктоп)
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    // ================================
    // 💎 PRICE MODAL
    // ================================
    
    const openPrice = document.getElementById("openPrice");
    const priceModal = document.getElementById("priceModal");
    const closePrice = document.getElementById("closePrice");
    const closePriceBtns = document.querySelectorAll(".close-price-btn");
    
    if (openPrice && priceModal && closePrice) {
        openPrice.addEventListener("click", (e) => {
            e.preventDefault();
            priceModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
        
        closePrice.addEventListener("click", () => {
            priceModal.classList.remove("active");
            document.body.style.overflow = "";
        });
        
        priceModal.addEventListener("click", (e) => {
            if (e.target === priceModal) {
                priceModal.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
    
    // Закрытие модального окна при клике на кнопку "Записаться" в карточках
    if (closePriceBtns.length > 0) {
        closePriceBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (priceModal) {
                    priceModal.classList.remove("active");
                    document.body.style.overflow = "";
                }
            });
        });
    }
    
    // ================================
    // 🎯 ПЛАВНЫЙ СКРОЛЛ ДЛЯ ВСЕХ ССЫЛОК
    // ================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Закрываем мобильное меню если открыто
                if (window.innerWidth <= 768 && nav.classList.contains("open")) {
                    closeMenu();
                }
                
                // Плавный скролл к элементу
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});