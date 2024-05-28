export function createCarousel(posts) {

// Carousel functionality

    const carouselContainer = document.createElement('section');
    carouselContainer.className = 'carousel-container';

    const carouselInner = document.createElement('article');
    carouselInner.className = 'carousel-inner';
    carouselInner.setAttribute('role', 'list');
    carouselContainer.appendChild(carouselInner);

    posts.slice(0, 3).forEach((post, index) => {
        const carouselItem = document.createElement('article');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        carouselItem.tabIndex = 0; 
        carouselItem.setAttribute('role', 'listitem');
        carouselItem.setAttribute('aria-label', `Post ${index + 1} of ${posts.length}`);

        carouselItem.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                localStorage.setItem('postSelected', JSON.stringify(post));
                window.location.hash = `post/index.html/${post.id}`;
            }
        });

        const img = document.createElement('img');
        img.src = post.media.url;
        img.alt = post.media.alt;
        img.style.cursor = 'pointer';  
        img.addEventListener('click', () => {
            localStorage.setItem('postSelected', JSON.stringify(post));
            window.location.hash = `post/index.html/${post.id}`;
        });
        carouselItem.appendChild(img);

        const title = document.createElement('h2');
        title.textContent = post.title;
        carouselItem.appendChild(title);

        carouselInner.appendChild(carouselItem);
    });

// Buttons for the Carousel

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-prev';
    prevButton.tabIndex = 0; 
    prevButton.setAttribute('aria-label', 'Previous slide');
    const prevIcon = document.createElement('span');
    prevIcon.className = 'gg-arrow-left-o'; 
    prevButton.appendChild(prevIcon);
    prevButton.addEventListener('click', () => showPrevSlide());
    carouselContainer.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-next';
    nextButton.tabIndex = 0; 
    nextButton.setAttribute('aria-label', 'Next slide');
    const nextIcon = document.createElement('span');
    nextIcon.className = 'gg-arrow-right-o'; 
    nextButton.appendChild(nextIcon);
    nextButton.addEventListener('click', () => showNextSlide());
    carouselContainer.appendChild(nextButton);

// Button functionality

    let currentIndex = 0;

    function showPrevSlide() {
        currentIndex = (currentIndex === 0) ? posts.length - 1 : currentIndex - 1;
        updateCarousel();
    }

    function showNextSlide() {
        currentIndex = (currentIndex === posts.length - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    }

    function updateCarousel() {
        const items = carouselInner.querySelectorAll('.carousel-item');
        items.forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    }

    return carouselContainer;
}