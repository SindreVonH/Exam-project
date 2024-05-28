import { getPosts, deletePost } from '/Exam-project/js/pageAPI/fetchPostAdmin.mjs';
import { addHeader } from '/Exam-project/js/pageElementes/header.mjs';
import { addFooter } from '/Exam-project/js/pageElementes/footer.mjs';
import { clearAndLoadCSS} from '/Exam-project/js/pageElementes/stylesManager.mjs';
import { loadCSS} from '/Exam-project/js/pageElementes/stylesLoader.mjs';

//Function to create dashboard
export const displayDashboardPage = async () => {
    try {
        await loadCSS('/Exam-project/styles/dashboard.css');
    } catch (error) {
        console.error('Error loading CSS:', error);
        return;
    }

    //Import pageElements
    clearAndLoadCSS('/Exam-project/styles/dashboard.css');
    
    addHeader();
    addFooter();

    // Clear existing content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';  

    // Create a container for the entire section
    const contentContainer = document.createElement('Section');
    contentContainer.className = 'content-container';
    appContainer.appendChild(contentContainer);

    const welcomeMessage = document.createElement('h2');
    welcomeMessage.textContent = 'Welcome to your Dashboard';

    const buttonContainer = document.createElement('Section');
    buttonContainer.className = 'button-container';

    //Logout button functionality
    const logoutButton = document.createElement('button');
    logoutButton.textContent = 'Log Out';
    logoutButton.className = 'logout-button';
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.hash = '#account/login.html';
    });

    //Create post button functionality
    const managePostsButton = document.createElement('button');
    managePostsButton.textContent = 'Create Post';
    managePostsButton.className = 'new-post-button';
    managePostsButton.addEventListener('click', () => {
        window.location.hash = 'posts/create.html';
    });

    buttonContainer.appendChild(logoutButton);
    buttonContainer.appendChild(managePostsButton);

    contentContainer.appendChild(welcomeMessage);
    contentContainer.appendChild(buttonContainer);

    //Create html for Post Cards and Fetch post to display posts
    const postsContainer = document.createElement('Section');
    postsContainer.className = 'posts-container';
    contentContainer.appendChild(postsContainer);

    try {
        const user = JSON.parse(localStorage.getItem('user'));
        const posts = await getPosts(user.name);
        if (posts.length > 0) {
            posts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.className = 'post-card';

                const title = document.createElement('h3');
                title.textContent = post.title;
                postCard.appendChild(title);

                const tags = document.createElement('p');
                tags.textContent = `Tags: ${post.tags.join(', ')}`;
                postCard.appendChild(tags);

                const image = document.createElement('img');
                image.src = post.media.url;
                image.alt = post.media.alt;
                postCard.appendChild(image);

                //Edit button functionality
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit blog post';
                editButton.className = 'edit-button';
                editButton.addEventListener('click', () => {
                    localStorage.setItem('postToEdit', JSON.stringify(post));
                    window.location.hash = 'posts/edit.html';
                });
                postCard.appendChild(editButton);

                //Delete button functionality
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete blog post';
                deleteButton.className = 'delete-button';
                deleteButton.addEventListener('click', async () => {
                    const confirmDelete = confirm('Are you sure you want to delete this post?');
                    if (confirmDelete) {
                        try {
                            await deletePost(user.name, post.id);
                            alert('Post deleted successfully!');
                            displayDashboardPage(); 
                        } catch (error) {
                            console.error('Error deleting post:', error);
                            alert('An error occurred while deleting the post.');
                        }
                    }
                });
                postCard.appendChild(deleteButton);

                postsContainer.appendChild(postCard);
            });
        } else {
            const noPostsMessage = document.createElement('p');
            noPostsMessage.textContent = 'No posts available.';
            postsContainer.appendChild(noPostsMessage);
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'An error occurred while fetching posts.';
        postsContainer.appendChild(errorMessage);
    }
};