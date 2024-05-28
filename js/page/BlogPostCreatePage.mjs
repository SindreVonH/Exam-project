import { createPost } from '../pageAPI/fetchCreate.mjs';
import { addHeader } from '../pageElementes/header.mjs';
import { addFooter } from '../pageElementes/footer.mjs';
import { clearAndLoadCSS} from '../pageElementes/stylesManager.mjs';
import { loadCSS} from '../pageElementes/stylesLoader.mjs';

//Function to create postCreatePage
export const displayCreatePostPage = async () => {
    try {
        await loadCSS('./styles/postForm.css');
    } catch (error) {
        console.error('Error loading CSS:', error);
        return;
    }

    //Import pageElements
    clearAndLoadCSS('./styles/postForm.css');
    
    addHeader();
    addFooter();

    // Clear existing content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';  

    // Create the form container
    const formContainer = document.createElement('div');
    formContainer.className = 'create-post-form-container';

    // Create the form element
    const form = document.createElement('form');
    form.id = 'create-post-form';

    // Create the form elements
    const title = document.createElement('h2');
    title.textContent = 'Create New Post';
    form.appendChild(title);

    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title';
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.name = 'title';
    titleInput.required = true;
    titleLabel.appendChild(titleInput);
    form.appendChild(titleLabel);

    const contentLabel = document.createElement('label');
    contentLabel.textContent = 'Body';
    const contentTextarea = document.createElement('textarea');
    contentTextarea.name = 'body';
    contentTextarea.required = true;
    contentLabel.appendChild(contentTextarea);
    form.appendChild(contentLabel);

    const tagsLabel = document.createElement('label');
    tagsLabel.textContent = 'Tags';
    const tagsInput = document.createElement('input');
    tagsInput.type = 'text';
    tagsInput.name = 'tags';
    tagsInput.placeholder = 'Conservation, Nature, Sustainability, Technology, Wildlife';
    tagsLabel.appendChild(tagsInput);
    form.appendChild(tagsLabel);

    const imageLabel = document.createElement('label');
    imageLabel.textContent = 'Image URL';
    const imageInput = document.createElement('input');
    imageInput.type = 'url';
    imageInput.name = 'image';
    imageLabel.appendChild(imageInput);
    form.appendChild(imageLabel);

    const altLabel = document.createElement('label');
    altLabel.textContent = 'Image Alt Text';
    const altInput = document.createElement('input');
    altInput.type = 'text';
    altInput.name = 'alt';
    altLabel.appendChild(altInput);
    form.appendChild(altLabel);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create Post';
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
            const response = await createPost(data);
            if (response.ok) {
                const result = await response.json();
                console.log('Post created:', result);
                alert('Post created successfully!');
                window.location.hash = 'dashboard';
            } else {
                const errorData = await response.json();
                console.error('Post creation failed:', errorData);
                alert('Post creation failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during post creation.');
        }
    });
};