document.addEventListener('DOMContentLoaded', function() {
  const leftPage = document.querySelector('.left-page');
  const centerPage = document.querySelector('.center-page');
  const rightPage = document.querySelector('.right-page');
  const thumbnailsContainer = document.querySelector('.thumbnails');
  const rotateModal = document.querySelector('.rotate-modal');

  const customImages = [
    'images/bookpages/cosmocrew2.jpg',
    'images/bookpages/cosmocre3.jpg',
    'images/bookpages/cosmocrew4.jpg',
    'images/bookpages/cosmocre5.jpg',
    'images/bookpages/cosmocrew6.jpg',
    'images/bookpages/cosmocrew7.jpg',
    'images/bookpages/cosmocrew8.jpg',
    'images/bookpages/cosmocrew9.jpg',
    'images/bookpages/cosmocrew10.jpg',
    'images/bookpages/cosmocrew11.jpg',
    'images/bookpages/cosmocrew12.jpg',
    'images/bookpages/cosmocrew13.jpg',
    'images/bookpages/cosmocrew14.jpg',
    'images/bookpages/cosmocrew15.jpg',
    'images/bookpages/cosmocrew16.jpg',
    'images/bookpages/cosmocrew17.jpg',
    'images/bookpages/cosmocrew18.jpg',
    'images/bookpages/cosmocrew19.jpg',
    'images/bookpages/cosmocrew20.jpg',
    'images/bookpages/cosmocrew21.jpg',
    'images/bookpages/cosmocrew22.jpg',
    'images/bookpages/cosmocrew23.jpg',
    'images/bookpages/cosmocrew24.jpg',
    'images/bookpages/cosmocrew25.jpg'
  ];

  // Создаем 25 страниц, используя ваши изображения
  const bookPages = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    imageUrl: customImages[i] || `images/book pages/default.jpg` // fallback, если нет изображения
  }));

  let currentPage = 12; // Стартовая позиция в середине

  // Создаем миниатюры
  bookPages.forEach((page, index) => {
    const thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.setAttribute('data-page', index);
    thumbnail.style.backgroundImage = `url(${page.imageUrl})`;
    thumbnailsContainer.appendChild(thumbnail);
  });

  const thumbnails = document.querySelectorAll('.thumbnail');

  // Обработчики для листания страниц
  leftPage.addEventListener('click', () => navigate(-1));
  rightPage.addEventListener('click', () => navigate(1));

  // Обработчики для миниатюр
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', function() {
      currentPage = parseInt(this.getAttribute('data-page'));
      updateBookView();
    });
  });

  // Навигация
  function navigate(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 0 && newPage < bookPages.length) {
      currentPage = newPage;
      updateBookView();
    }
  }

  // Обновление вида книги
  function updateBookView() {
    leftPage.style.backgroundImage = currentPage > 0 ? `url(${bookPages[currentPage - 1].imageUrl})` : '';
    leftPage.style.opacity = currentPage > 0 ? '0.6' : '0';

    centerPage.style.backgroundImage = `url(${bookPages[currentPage].imageUrl})`;

    rightPage.style.backgroundImage = currentPage < bookPages.length - 1 ? `url(${bookPages[currentPage + 1].imageUrl})` : '';
    rightPage.style.opacity = currentPage < bookPages.length - 1 ? '0.6' : '0';

    // Обновляем активную миниатюру
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === currentPage);
    });

    centerActiveThumbnail();
  }

  // Центрирование активной миниатюры
  function centerActiveThumbnail() {
    const activeThumb = document.querySelector('.thumbnail.active');
    if (activeThumb) {
      const containerWidth = thumbnailsContainer.offsetWidth;
      const thumbWidth = activeThumb.offsetWidth;
      const scrollPosition = activeThumb.offsetLeft - (containerWidth / 2) + (thumbWidth / 2);

      thumbnailsContainer.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }

  // Горизонтальный скролл колесиком мыши
 thumbnailsContainer.addEventListener('wheel', function(e) {
  e.preventDefault();
  this.scrollLeft += (e.deltaY || e.deltaX) * 0.5;
}, { passive: false });

  // Drag-scroll для миниатюр
  let isDown = false;
  let startX;
  let scrollLeft;

  thumbnailsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    thumbnailsContainer.style.cursor = 'grabbing';
    startX = e.pageX - thumbnailsContainer.offsetLeft;
    scrollLeft = thumbnailsContainer.scrollLeft;
  });

  thumbnailsContainer.addEventListener('mouseleave', () => {
    isDown = false;
    thumbnailsContainer.style.cursor = 'grab';
  });

  thumbnailsContainer.addEventListener('mouseup', () => {
    isDown = false;
    thumbnailsContainer.style.cursor = 'grab';
  });

  thumbnailsContainer.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - thumbnailsContainer.offsetLeft;
    const walk = (x - startX) * 1.5;
    thumbnailsContainer.scrollLeft = scrollLeft - walk;
  });

  // Функция для динамической замены изображений
  window.insertImageToPage = function(pageIndex, imageUrl) {
    if (pageIndex >= 0 && pageIndex < bookPages.length) {
      bookPages[pageIndex].imageUrl = imageUrl;

      // Обновляем миниатюру
      if (thumbnails[pageIndex]) {
        thumbnails[pageIndex].style.backgroundImage = `url(${imageUrl})`;
      }

      // Если это текущая страница, обновляем вид
      if (currentPage === pageIndex) {
        updateBookView();
      }
    }
  };

  // Показываем модальное окно на 1.5 секунды для мобильных
  if (window.innerWidth <= 768) {
      setTimeout(() => {
          rotateModal.style.display = 'none';
      }, 1500);
  } else {
      rotateModal.style.display = 'none';
  }

  // Инициализация
  updateBookView();
});