export const initializeFilters = (tags, contentContainer, posts, createCarousel, createPostGrid) => {
    let selectedTags = [];
    let isSortedAscending = true;

//Filter functionality

    const tagContainer = document.createElement('section');
    tagContainer.className = 'tag-container';
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-button';
        button.textContent = tag;
        button.addEventListener('click', () => toggleTagFilter(button, tag));
        tagContainer.appendChild(button);
    });

    function toggleTagFilter(button, tag) {
        button.classList.toggle('active');
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter(t => t !== tag);
        } else {
            selectedTags.push(tag);
        }
        filterPosts();
    }

    contentContainer.appendChild(tagContainer);

//Sort functionality

    const sortButton = document.createElement('button');
    sortButton.className = 'sort-button';
    sortButton.textContent = 'Sort: Newest First';
    sortButton.addEventListener('click', toggleSortOrder);
    tagContainer.appendChild(sortButton);

    
    function toggleSortOrder() {
        isSortedAscending = !isSortedAscending;
        sortButton.textContent = isSortedAscending ? 'Sort: Newest First' : 'Sort: Oldest First';
        filterPosts();
    }
//Update and creating new post for the grid and carousel after sorting and filtering

    function filterPosts() {
        let filteredPosts = posts.filter(post => {
            if (selectedTags.length === 0) return true;
            return selectedTags.every(tag => post.tags.includes(tag));
        });

        if (!isSortedAscending) {
            filteredPosts = filteredPosts.reverse();
        }

        const newCarouselPosts = filteredPosts.slice(0, 3);
        const newGridPosts = filteredPosts.slice(3, 15);

        const existingCarousel = contentContainer.querySelector('.carousel-container');
        if (existingCarousel) {
            const newCarousel = createCarousel(newCarouselPosts);
            existingCarousel.replaceWith(newCarousel);
        } else {
            const initialCarousel = createCarousel(newCarouselPosts);
            contentContainer.appendChild(initialCarousel);
        }

        const existingPostGrid = contentContainer.querySelector('.post-grid');
        if (existingPostGrid) {
            const newPostGrid = createPostGrid(newGridPosts);
            existingPostGrid.replaceWith(newPostGrid);
        } else {
            const initialPostGrid = createPostGrid(newGridPosts);
            contentContainer.appendChild(initialPostGrid);
        }
    }

    filterPosts();
};
