import { registerUser } from '../pageAPI/fetchregister.mjs';
import { addHeader } from '../pageElementes/header.mjs';
import { addFooter } from '../pageElementes/footer.mjs';
import { clearAndLoadCSS} from '../pageElementes/stylesManager.mjs';
import { loadCSS} from '../pageElementes/stylesLoader.mjs';

//Function to create register page
export const displayRegisterPage = async () => {
    try {
        await loadCSS('../styles/accountForm.css');
    } catch (error) {
        console.error('Error loading CSS:', error);
        return;
    }

    //Import pageElements
    clearAndLoadCSS('../styles/accountForm.css');

    addHeader();
    addFooter();

    // Clear existing content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';  // Clear existing content

    // Create the form container
    const formContainer = document.createElement('section');
    formContainer.className = 'register-form-container';

    // Create the form element
    const form = document.createElement('form');
    form.id = 'register-form';

    // Create html for the form
    const title = document.createElement('h2');
    title.textContent = 'Create account';
    form.appendChild(title);

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.name = 'name';
    nameInput.required = true;
    nameLabel.appendChild(nameInput);
    form.appendChild(nameLabel);

    // Email
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email Address';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.name = 'email';
    emailInput.required = true;
    emailLabel.appendChild(emailInput);
    form.appendChild(emailLabel);

    // Password
    const passwordLabel = document.createElement('label');
    passwordLabel.textContent = 'Password';
    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.required = true;
    passwordInput.minLength = 8;
    passwordLabel.appendChild(passwordInput);
    form.appendChild(passwordLabel);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Create';
    form.appendChild(submitButton);

    // Button for redirect to login
    const loginLink = document.createElement('a');
    loginLink.href = '#account/login.html';
    loginLink.textContent = 'Already have an account? Log in';
    loginLink.className = 'login-link';
    form.appendChild(loginLink);

    formContainer.appendChild(form);
    appContainer.appendChild(formContainer);

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await registerUser(data);
            if (response.ok) {
                const result = await response.json();
                console.log('User registered:', result);
                alert('User registered successfully!');
                window.location.hash = '#account/login.html';
            } else {
                console.error('Registration failed:', response.statusText);
                alert('Registration failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        }
    });
};