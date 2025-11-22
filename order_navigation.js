
// Навигация по странице
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для внутренней навигации
    const navLinks = document.querySelectorAll('.page-nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Обработка кнопки "Вернуться наверх" в правом углу
    const backToTopBtn = document.querySelector('.back-to-top.fixed');
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Показ/скрытие кнопки при скролле
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        // Изначально скрываем кнопку
        backToTopBtn.style.display = 'none';
    }
});