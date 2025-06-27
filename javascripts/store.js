 // Показываем модальное окно при загрузке страницы
 window.onload = function() {
  // Автоматическое скрытие через 3 секунды
  setTimeout(function() {
      const modal = document.getElementById('introModal');
      modal.style.animation = 'fadeOut 0.5s forwards';
      
      // Полное удаление из DOM после анимации
      setTimeout(function() {
          modal.remove();
      }, 100);
  }, 1000);
  
  renderImages(); // Ваша существующая функция
};

const images = [
    'images/baul1.svg',
    'images/sticker2.svg',
    'images/zapivon1.svg',
    'images/cd2.svg',
    'images/chockolate1.svg',
    'images/сd1.svg',
    'images/chockolate1.svg',
    'images/notebook1.svg',
    'images/sticker1.svg',
    'images/gazel.svg',
    'images/notebook2.svg',
    'images/semki.svg',
    'images/zapivon2.svg',
    'images/tickets.svg',
    'images/baul2.svg',
    'images/chockolate2.svg' 
  ];


  function renderImages() {
    const container = document.getElementById('images-container');
    
    images.forEach(imageSrc => {
      // Создаём контейнер для каждого элемента
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      
      // Создаём элемент для красного фона
      const redLight = document.createElement('div');
      redLight.className = 'red-light';
      
      // Создаём основное изображение
      const img = document.createElement('img');
      img.className = 'grid-image';
      img.src = imageSrc;
      img.alt = 'Товар';
      
      // Добавляем элементы в контейнер
      gridItem.appendChild(redLight);
      gridItem.appendChild(img);
      
      // Добавляем контейнер в сетку
      container.appendChild(gridItem);
    });
  }

  const gridItems = document.querySelectorAll('.image-grid');

  gridItems.forEach(item => {
    // Создаем элемент тени для каждого элемента grid-item
    const shadow = document.createElement('div');
    shadow.className = 'shadow';
    item.appendChild(shadow);
  });
  
  window.onload = renderImages;

// Находим элемент изображения по классу
const bookButton = document.querySelector('img.book-butter');

// Добавляем обработчик события клика
bookButton.addEventListener('click', function() {
  // Переходим на страницу book.html
  window.location.href = 'book.html';
});