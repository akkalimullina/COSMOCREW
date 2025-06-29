document.addEventListener('DOMContentLoaded', function() {
  // Десктопные hover-эффекты
  const desktopHoverSettings = {
    'garage': {
      normal: './images/cuarter-image/garage.svg',
      hover: './images/cuarter-image/garage-hover.svg'
    },
    'catien': {
      normal: './images/cuarter-image/catien.svg',
      hover: './images/cuarter-image/catien-hover.svg'
    },
    'punkt': {
      normal: './images/cuarter-image/punkt.svg',
      hover: './images/cuarter-image/punkt-hover.svg'
    },
    'autopark': {
      normal: './images/cuarter-image/autopark.svg',
      hover: './images/cuarter-image/autopark-hover.svg'
    },
    'PCS': {
      normal: './images/cuarter-image/PCS.svg',
      hover: './images/cuarter-image/PCS-hover.svg'
    }
  };

  // Мобильные hover-эффекты (если нужны)
  const mobileHoverSettings = {
    'garage-mobile': {
      normal: './images/cuarter-image/garage-mobile.svg',
      hover: './images/cuarter-image/garage-hover-mobile.svg'
    },
    'catien-mobile': {
      normal: './images/cuarter-image/catien-mobile.svg',
      hover: './images/cuarter-image/catien-hover-mobile.svg'
    },
    'punkt-mobile': {
      normal: './images/cuarter-image/punkt-mobile.svg',
      hover: './images/cuarter-image/punkt-hover-mobile.svg'
    },
    'autopark-mobile': {
      normal: './images/cuarter-image/autopark-mobile.svg',
      hover: './images/cuarter-image/autopark-hover-mobile.svg'
    },
    'PCS-mobile': {
      normal: './images/cuarter-image/PCS-mobile.svg',
      hover: './images/cuarter-image/PCS-hover-mobile.svg'
    }
  };

  // Применяем hover-эффекты для десктопной версии
  Object.keys(desktopHoverSettings).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('mouseover', function() {
        this.src = desktopHoverSettings[id].hover;
      });
      element.addEventListener('mouseout', function() {
        this.src = desktopHoverSettings[id].normal;
      });
    }
  });

  // Применяем hover-эффекты для мобильной версии (если нужны)
  Object.keys(mobileHoverSettings).forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('mouseover', function() {
        this.src = mobileHoverSettings[id].hover;
      });
      element.addEventListener('mouseout', function() {
        this.src = mobileHoverSettings[id].normal;
      });
    }
  });
});

