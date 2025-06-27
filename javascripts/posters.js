

const imagePaths = [
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

// Настройки анимации
const config = {
    minImages: 6,
    maxImages: 11,
    minSpeed: 1.5,
    maxSpeed: 3,
    minSize: 60,
    maxSize: 120,
    spawnInterval: 500,
    aspectRatio: 1.74,
    verticalSpacing: 150
};

let fallingImages = [];
let lastSpawnTime = 0;
let animationId;
let nextXPositions = [];

// Инициализация
function init() {
    preloadImages();
    initXPositions();
    animate();
    window.addEventListener('resize', handleResize);
}

// Инициализация возможных позиций по X
function initXPositions() {
    nextXPositions = [];
    const columns = Math.floor(window.innerWidth / (config.maxSize + 20));
    const step = window.innerWidth / columns;
    
    for (let i = 0; i < columns; i++) {
        nextXPositions.push(i * step);
    }
}

// Предзагрузка изображений
function preloadImages() {
    imagePaths.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Анимация
function animate(timestamp) {
    if (!lastSpawnTime) lastSpawnTime = timestamp;
    
    if (timestamp - lastSpawnTime > config.spawnInterval) {
        spawnFallingImages();
        lastSpawnTime = timestamp;
    }
    
    updateFallingImages();
    removeOffscreenImages();
    
    animationId = requestAnimationFrame(animate);
}

// Создание новых падающих изображений
function spawnFallingImages() {
    const currentCount = fallingImages.length;
    const targetCount = Math.floor(Math.random() * (config.maxImages - config.minImages + 1)) + config.minImages;
    
    if (currentCount < targetCount && nextXPositions.length > 0) {
        createFallingImage();
    }
}

// Создание одного падающего изображения
function createFallingImage() {
    const img = document.createElement('img');
    img.className = 'falling-image';
    
    const randomImageIndex = Math.floor(Math.random() * imagePaths.length);
    img.src = imagePaths[randomImageIndex];
    
    const width = Math.floor(Math.random() * (config.maxSize - config.minSize + 1)) + config.minSize;
    const height = width * config.aspectRatio;
    
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
    
    let x;
    if (nextXPositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * nextXPositions.length);
        x = nextXPositions[randomIndex];
        nextXPositions.splice(randomIndex, 1);
    } else {
        x = Math.random() * (window.innerWidth - width);
    }
    
    const y = -height;
    
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;
    
    const speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
    
    document.body.appendChild(img);
    
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        showZoomedImage(img.src);
    });
    
    fallingImages.push({
        element: img,
        x,
        y,
        speed,
        width,
        height,
        initialX: x
    });
}

// Обновление позиций падающих изображений
function updateFallingImages() {
    fallingImages.forEach(img => {
        img.y += img.speed;
        img.element.style.top = `${img.y}px`;
        img.element.style.left = `${img.x + Math.sin(img.y * 0.01) * 5}px`;
    });
}

// Удаление изображений, вышедших за пределы экрана
function removeOffscreenImages() {
    fallingImages = fallingImages.filter(img => {
        if (img.y > window.innerHeight) {
            img.element.remove();
            nextXPositions.push(img.initialX);
            return false;
        }
        return true;
    });
}

// Показать увеличенное изображение
function showZoomedImage(src) {
    const container = document.getElementById('zoomedContainer');
    container.innerHTML = '';
    
    const zoomedImg = document.createElement('img');
    zoomedImg.className = 'zoomed-image';
    zoomedImg.src = src;
    
    container.appendChild(zoomedImg);
    document.querySelector('.close-btn').style.display = 'block';
}

// Закрыть увеличенное изображение
function closeZoomedImage() {
    const container = document.getElementById('zoomedContainer');
    container.innerHTML = '';
    document.querySelector('.close-btn').style.display = 'none';
}

// Обработчик изменения размера окна
function handleResize() {
    fallingImages.forEach(img => img.element.remove());
    fallingImages = [];
    initXPositions();
}

// Обработчик клика по документу для закрытия увеличенного изображения
document.addEventListener('click', (e) => {
    if (e.target === document.body || e.target === document.documentElement) {
        closeZoomedImage();
    }
});

// Запуск при загрузке страницы
window.addEventListener('load', init);



// Оптимизированная функция анимации
function optimizedAnimate(timestamp) {
    if (!lastSpawnTime) lastSpawnTime = timestamp;
    
    // Оптимизация: обновляем позиции только каждые 2 кадра
    if (timestamp % 2 < 1) {
        updateFallingImages();
        removeOffscreenImages();
    }
    
    if (timestamp - lastSpawnTime > config.spawnInterval) {
        spawnFallingImages();
        lastSpawnTime = timestamp;
    }
    
    animationId = requestAnimationFrame(optimizedAnimate);
}

// Задержка старта анимации до полной загрузки
window.addEventListener('load', () => {
    preloadImages(() => {
        initXPositions();
        optimizedAnimate();
    });
});

function setupImageGrid() {
    const container = document.querySelector('.zoomed-image-container'); // ваш контейнер
    const screenWidth = window.innerWidth;
    
    // Настройки для разных устройств
    const isMobile = screenWidth <= 390; // breakpoint для мобильных
    
    // Количество колонок и отступы
    const columns = isMobile ? 3 : 2;
    const gap = isMobile ? 5 : 10;
    
    // Рассчитываем ширину каждого изображения
    const containerWidth = container.offsetWidth;
    const imageWidth = (containerWidth - (gap * (columns - 1))) / columns;
    
    // Применяем стили к изображениям
    imagePaths.forEach(img => {
      img.style.width = `${imageWidth}px`;
      img.style.marginRight = `${gap}px`;
      img.style.marginBottom = `${gap}px`;
    });
    
    // Очищаем правый margin у последних элементов в ряду
    for (let i = columns; i < imagePaths.length; i += columns) {
        imagePaths[i - 1].style.marginRight = '0';
    }
  }