function initCardGallery(imageUrls) {
    const container = document.getElementById('cardsContainer');
    if (!container) return;
    
    const cardCount = imageUrls.length;
    const cardWidthVW = 15;
    const aspectRatio = 100/3;
    const overlapFactor = 0.3;

    function vwToPx(vw) {
        return (vw * window.innerWidth) / 100;
    }

    const cardWidthPx = vwToPx(cardWidthVW);
    const cardHeightPx = cardWidthPx / aspectRatio;
    const stepX = (window.innerWidth - cardWidthPx) / (cardCount - 1) * overlapFactor;
    const stepY = (window.innerHeight - cardHeightPx) / (cardCount - 1) * overlapFactor;

    //  карточки
    imageUrls.forEach((imgUrl, i) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.left = `${i * stepX}px`;
        card.style.top = `${i * stepY}px`;
        card.style.zIndex = i;

        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = `Gallery image ${i + 1}`;
        card.appendChild(img);

        container.appendChild(card);
    });

    // Респонсив
    window.addEventListener('resize', function() {
        const cards = document.querySelectorAll('.card');
        const newCardWidthPx = vwToPx(cardWidthVW);
        const newCardHeightPx = newCardWidthPx / aspectRatio;
        const newStepX = (window.innerWidth - newCardWidthPx) / (cardCount - 1) * overlapFactor;
        const newStepY = (window.innerHeight - newCardHeightPx) / (cardCount - 1) * overlapFactor;

        cards.forEach((card, i) => {
            card.style.left = `${i * newStepX}px`;
            card.style.top = `${i * newStepY}px`;
        });
    });
}