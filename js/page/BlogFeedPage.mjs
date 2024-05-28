import { fetchPosts } from 'Exam-project/js/pageAPI/etchPosts.mjs';
import { createCarousel } from 'Exam-project/js/pageElementes/carousel.mjs';
import { addHeader } from 'Exam-project/js/pageElementes/header.mjs';
import { addFooter } from 'Exam-project/js/pageElementes/footer.mjs';
import { clearAndLoadCSS} from 'Exam-project/js/pageElementes/stylesManager.mjs';
import { loadCSS} from 'Exam-project/js/pageElementes/stylesLoader.mjs';
import { initializeFilters } from 'Exam-project/js/pageElementes/filterSort.mjs'; 


//Function to Create BlogFeedPage
export const displayBlogFeedPage = async () => {
    try {
        await loadCSS('../../styles/blogFeed.css');
    } catch (error) {
        console.error('Error loading CSS:', error);
        return;
    }

    //Import pageElements
    clearAndLoadCSS('../../styles/blogFeed.css');
    
    addHeader();
    addFooter();

     // Clear existing content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';  

    //Create Container for all the elements
    const contentContainer = document.createElement('section');
    contentContainer.className = 'content-container';
    appContainer.appendChild(contentContainer);

    //Import Post from API
    let posts;
    try {
        posts = await fetchPosts();
    } catch (error) {
        console.error('Error fetching posts:', error);
        appContainer.textContent = 'Failed to load posts.';
        return;
    }

    const tags = ['Conservation', 'Nature', 'Sustainability', 'Technology', 'Wildlife'];

    // Initialize filters and sort functionality
    initializeFilters(tags, contentContainer, posts, createCarousel, createPostGrid);

    // Function to create the post grid
    function createPostGrid(posts) {
        const gridContainer = document.createElement('section');
        gridContainer.className = 'post-grid';
        gridContainer.setAttribute('aria-label', 'Blog Posts');

        //Create html for post on Cards
        posts.forEach(post => {
            const postCard = document.createElement('article');
            postCard.className = 'post-card';
            postCard.tabIndex = 0; 
            postCard.setAttribute('role', 'button');
            postCard.setAttribute('aria-pressed', 'false');
            postCard.setAttribute('aria-label', post.title);

            //Function-1 to Export to BlogPostPage
            postCard.addEventListener('click', () => {
                localStorage.setItem('postSelected', JSON.stringify(post));
                window.location.hash = `post/index.html/${post.id}`;
            });

            //Function-2 to Export to BlogPostPage
            postCard.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    localStorage.setItem('postSelected', JSON.stringify(post));
                    window.location.hash = `post/index.html/${post.id}`;
                }
            });

            const img = document.createElement('img');
            img.src = post.media.url;
            img.alt = post.media.alt;
            postCard.appendChild(img);

            const title = document.createElement('h3');
            title.textContent = post.title;
            postCard.appendChild(title);

            gridContainer.appendChild(postCard);
        });

        return gridContainer;
    }
};
