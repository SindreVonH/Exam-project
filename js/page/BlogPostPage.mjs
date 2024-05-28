import { addHeader } from 'Exam-project\js\pageElementes\header.mjs';
import { addFooter } from 'Exam-project\js\pageElementes\footer.mjs';
import { clearAndLoadCSS} from '../pageElementes/stylesManager.mjs';
import { loadCSS} from '../pageElementes/stylesLoader.mjs';


//Function to create BlogPostPage
export const displayBlogPostPage = async () => {
    try {
        await loadCSS('../../styles/blogPost.css');
    } catch (error) {
        console.error('Error loading CSS:', error);
        return;
    }

    //Import pageElements

    clearAndLoadCSS('../../styles/blogPost.css');

    addHeader();
    addFooter();

    // Clear existing content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';  

    //Import post data in JSON from blogFeedPage

    const hashParts = window.location.hash.split('/');
    const postId = hashParts[2];
    const post = JSON.parse(localStorage.getItem('postSelected'));

    if (!post || post.id !== postId) {
        appContainer.textContent = 'Failed to load post.';
        return;
    }

    //Create HTML

    const postContainer = document.createElement('article');
    postContainer.className = 'post-container';
    postContainer.setAttribute('aria-label', `Blog post titled ${post.title}`);

    const postImage = document.createElement('img');
    postImage.src = post.media.url;
    postImage.alt = post.media.alt;
    postContainer.appendChild(postImage);

    const postTitle = document.createElement('h1');
    postTitle.textContent = post.title;
    postContainer.appendChild(postTitle);

    const postMeta = document.createElement('section');
    postMeta.className = 'post-meta';
    postMeta.innerHTML = `
        <p>Written by ${post.author.name}</p>
        <p>Publish - ${new Date(post.created).toLocaleDateString()}</p>
    `;
    postContainer.appendChild(postMeta);

    const postContent = document.createElement('article');
    postContent.className = 'post-content';
    postContent.innerHTML = post.body;
    postContainer.appendChild(postContent);

    appContainer.appendChild(postContainer);
};