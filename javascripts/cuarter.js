// Альтернативный вариант с JavaScript (можно использовать вместо inline-атрибутов)
document.addEventListener('DOMContentLoaded', function() {
    // Настройки для каждого элемента
    const hoverSettings = {
      'garage': {
        normal: './images/cuarter-image/garage.svg',
        hover: 'images/cuarter-image/garage-hover.svg'
      },
      'catien': {
        normal: './images/cuarter-image/catien.svg',
        hover: 'images/cuarter-image/catien-hover.svg'
      },
      'punkt': {
        normal: './images/cuarter-image/punkt.svg',
        hover: 'images/cuarter-image/punk-hover.svg'
      },
      'autopark': {
        normal: './images/cuarter-image/autopark.svg',
        hover: './images/cuarter-image/autopark-hover.svg'
      }
    };
    
    // Добавляем обработчики событий
    Object.keys(hoverSettings).forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('mouseover', function() {
          this.src = hoverSettings[id].hover;
        });
        element.addEventListener('mouseout', function() {
          this.src = hoverSettings[id].normal;
        });
      }
    });
  });