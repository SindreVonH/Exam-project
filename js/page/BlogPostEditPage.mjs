import { getSinglePost, updatePost } from 'Exam-project/js/pageAPI/fetchUpdate.mjs';
import { addHeader } from 'Exam-project/js/pageElementes/header.mjs';
import { addFooter } from 'Exam-project/js/pageElementes/footer.mjs';
import { clearAndLoadCSS} from 'Exam-project/js/pageElementes/stylesManager.mjs';
import { loadCSS} from 'Exam-project/js/pageElementes/stylesLoader.mjs';

//Function to create postEditPage
export const displayEditPostPage = async () => {
    try {
        await loadCSS('Exam-project/styles/postForm.css');
    } catch (error) {
        console.error('Error loading CSS:', error);
        return;
    }

    //Import pageElements
    clearAndLoadCSS('Exam-project/styles/postForm.css');
    
    addHeader();
    addFooter();

    //Import Post data from dashboard
    const postToEditJSON = localStorage.getItem('postToEdit');
    if (!postToEditJSON) {
        console.error('No post data found in localStorage.');
        return;
    }
    
    const postData = JSON.parse(postToEditJSON);
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.name;
    const postId = postData.id;

    // Clear existing content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';  

    // Create the form container
    const formContainer = document.createElement('div');
    formContainer.className = 'create-post-form-container';

    // Create the form element
    const form = document.createElement('form');
    form.id = 'edit-post-form';

    // Create the form elements
    const title = document.createElement('h2');
    title.textContent = 'Edit Post';
    form.appendChild(title);

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.value = postData.title;
    titleInput.required = true;
    titleLabel.appendChild(titleInput);
    form.appendChild(titleLabel);

    const contentLabel = document.createElement('label');
    contentLabel.textContent = 'Body';
    const contentTextarea = document.createElement('textarea');
    contentTextarea.name = 'body';
    contentTextarea.required = true;
    contentTextarea.value = postData.body;
    contentLabel.appendChild(contentTextarea);
    form.appendChild(contentLabel);

    const tagsLabel = document.createElement('label');
    tagsLabel.textContent = 'Tags';
    const tagsInput = document.createElement('input');
    tagsInput.type = 'text';
    tagsInput.name = 'tags';
    tagsInput.placeholder = 'Conservation, Nature, Sustainability, Technology, Wildlife';
    tagsInput.value = postData.tags.join(', ');
    tagsLabel.appendChild(tagsInput);
    form.appendChild(tagsLabel);

    const imageLabel = document.createElement('label');
    imageLabel.textContent = 'Image URL';
    const imageInput = document.createElement('input');
    imageInput.type = 'url';
    imageInput.name = 'image';
    imageInput.value = postData.media.url;
    imageLabel.appendChild(imageInput);
    form.appendChild(imageLabel);

    const altLabel = document.createElement('label');
    altLabel.textContent = 'Image Alt Text';
    const altInput = document.createElement('input');
    altInput.type = 'text';
    altInput.name = 'alt';
    altInput.value = postData.media.alt;
    altLabel.appendChild(altInput);
    form.appendChild(altLabel);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Update Post';
    form.appendChild(submitButton);

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        window.location.hash = 'dashboard';
    });
    form.appendChild(cancelButton);

    formContainer.appendChild(form);
    appContainer.appendChild(formContainer);

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = {
            title: formData.get('title'),
            body: formData.get('body'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()),
            media: {
                url: formData.get('image'),
                alt: formData.get('alt')
            }
        };

        // Validate tags
        if (data.tags.some(tag => !tag)) {
            alert('Tags cannot be empty. Please provide valid tags.');
            return;
        }

        try {
            const updatedPost = await updatePost(username, postId, data);
            alert('Post updated successfully!');
            window.location.hash = 'dashboard';
        } catch (error) {
            console.error('Error updating post:', error);
            alert('An error occurred while updating the post.');
        }
    });
};