const images = [
  { src: 'images/baul1.svg', caption: 'Сюда полезет все, что нужно взять в космос' },
  { src: 'images/sticker2.svg', caption: 'На тачку ровного пацана' },
  { src: 'images/zapivon1.svg', caption: 'Хрючево для крепких парней' },
  { src: 'images/cd2.svg', caption: 'Четкий музон сделает любую поездку кайфовой' },
  { src: 'images/chockolate1.svg', caption: 'Бетонная шоколадка для крепких зубов' },
  { src: 'images/сd1.svg', caption: 'Четкий музон сделает любую поездку кайфовой' },
  { src: 'images/chockolate1.svg', caption: 'Бетонная шоколадка для реальных пацанчиков' },
  { src: 'images/notebook1.svg', caption: 'Для великих мыслей' },
  { src: 'images/sticker1.svg', caption: 'На тачку ровного пацана' },
  { src: 'images/gazel.svg', caption: 'Ездит на смеси бензина и Балтики 9' },
  { src: 'images/notebook2.svg', caption: 'Чтобы записать поименно кто кому и когда' },
  { src: 'images/semki.svg', caption: 'Единственное что питает в условиях гравитации' },
  { src: 'images/zapivon2.svg', caption: 'Таким и тачку заправить можно' },
  { src: 'images/tickets.svg', caption: 'Подари своим опам' },
  { src: 'images/baul2.svg', caption: 'Сюда полезет все, что нужно взять в космос' },
  { src: 'images/chockolate2.svg', caption: 'Бетонная шоколадка для реальных пацанчиков' }
];

function renderImages() {
  const container = document.getElementById('images-container');
  
  images.forEach(item => {
      const gridItem = document.createElement('div');
      gridItem.className = 'grid-item';
      
      const redLight = document.createElement('div');
      redLight.className = 'red-light';
      
      const img = document.createElement('img');
      img.className = 'grid-image';
      img.src = item.src;
      img.alt = item.caption;
      img.dataset.caption = item.caption;
      
      gridItem.appendChild(redLight);
      gridItem.appendChild(img);
      container.appendChild(gridItem);
  });
}

function initModal() {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalCaption = document.getElementById('modalCaption');
  const closeBtn = document.getElementById('closeModal');
  
  function openModal(src, alt, caption) {
      modal.style.display = 'flex';
      modalImg.src = src;
      modalCaption.textContent = caption || alt || 'Описание отсутствует';
      document.body.style.overflow = 'hidden';
  }
  
  function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
  }
  
  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target.classList.contains('modal')) {
          closeModal();
      }
  });
  
  document.addEventListener('click', function(e) {
      if (e.target.classList.contains('grid-image')) {
          const caption = e.target.dataset.caption || e.target.alt;
          openModal(e.target.src, e.target.alt, caption);
          e.preventDefault();
      }
  });
}

function initBookButton() {
  const bookButton = document.querySelector('img.book-butter');
  if (bookButton) {
      bookButton.addEventListener('click', function(e) {
          e.preventDefault();
          window.location.href = 'book.html';
      });
  }
}

function initIntroModal() {
  const modal = document.getElementById('introModal');
  if (modal) {
      setTimeout(function() {
          modal.style.animation = 'fadeOut 0.5s forwards';
          setTimeout(function() {
              modal.remove();
          }, 500);
      }, 1000);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  renderImages();
  initModal();
  initBookButton();
  initIntroModal();
});