document.addEventListener('DOMContentLoaded', () => {
    const posters = [
        'images/posters/poster1.png',
        'images/posters/poster2.png',
        'images/posters/poster3.png',
        'images/posters/poster4.png',
        'images/posters/poster5.png',
        'images/posters/poster6.png',
        'images/posters/poster7.png',
        'images/posters/poster8.png',
        'images/posters/poster9.png',
        'images/posters/poster10.png',
        'images/posters/poster11.png',
        'images/posters/poster12.png',
        'images/posters/poster13.png',
        'images/posters/poster15.png',
        'images/posters/poster16.png',
        'images/posters/poster18.png',
        'images/posters/poster19.png',
        'images/posters/poster17.png'
    ];

    const container = document.getElementById('posters-container');
    const activePosters = [];
    const maxPosters = 15;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    function getRandomSize() {
        // Размеры от 50px до 250px на десктопах
        let baseSize = 50 + Math.random() * 200;
        
        // Адаптация под разные экраны
        if (window.innerWidth <= 768) {
            baseSize = 40 + Math.random() * 100; // 40-140px на мобильных
        } else if (window.innerWidth <= 1024) {
            baseSize = 50 + Math.random() * 150; // 50-200px на планшетах
        }
        
        return {
            width: baseSize,
            height: baseSize / 0.69 // Сохраняем соотношение сторон
        };
    }

    function createPoster() {
        if (activePosters.length >= maxPosters) return;

        const poster = document.createElement('img');
        const randomPoster = posters[Math.floor(Math.random() * posters.length)];
        poster.src = randomPoster;
        poster.className = 'falling-poster';
        
        // Случайный размер
        const size = getRandomSize();
        poster.style.width = `${size.width}px`;
        poster.style.height = `${size.height}px`;
        
        // Начальная позиция
        const startX = Math.random() * (screenWidth - size.width);
        const startY = -size.height;
        
        poster.style.left = `${startX}px`;
        poster.style.top = `${startY}px`;
        
        container.appendChild(poster);
        
        // Скорость падения зависит от размера (большие падают медленнее)
        const speed = 1 + Math.random() * 2 + (size.width / 250);
        
        activePosters.push({
            element: poster,
            y: startY,
            speed: speed,
            height: size.height
        });
        
        // Клик для увеличения
        poster.addEventListener('click', () => zoomPoster(randomPoster));
        
        // Интервал между созданием постеров (чем больше постер, тем реже он появляется)
        const nextPosterDelay = 300 + Math.random() * 1700 * (size.width / 200);
        setTimeout(createPoster, nextPosterDelay);
    }
    
    function animatePosters() {
        for (let i = activePosters.length - 1; i >= 0; i--) {
            const p = activePosters[i];
            p.y += p.speed;
            p.element.style.top = `${p.y}px`;
            
            if (p.y > screenHeight) {
                container.removeChild(p.element);
                activePosters.splice(i, 1);
            }
        }
        requestAnimationFrame(animatePosters);
    }
    
    // Функции увеличения и закрытия остаются без изменений
    function zoomPoster(posterSrc) {
        const zoomedContainer = document.getElementById('zoomedContainer');
        const closeBtn = document.querySelector('.close-btn');
        
        zoomedContainer.innerHTML = `<img src="${posterSrc}" class="zoomed-image">`;
        zoomedContainer.style.display = 'flex';
        closeBtn.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    window.closeZoomedImage = function() {
        const zoomedContainer = document.getElementById('zoomedContainer');
        const closeBtn = document.querySelector('.close-btn');
        
        zoomedContainer.style.display = 'none';
        closeBtn.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    // Старт
    for (let i = 0; i < 5; i++) {
        setTimeout(createPoster, Math.random() * 1000);
    }
    animatePosters();
});