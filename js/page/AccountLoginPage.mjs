import { loginUser } from '../pageAPI/fetchlogin.mjs';
import { addHeader } from '../pageElementes/header.mjs';
import { addFooter } from '../pageElementes/footer.mjs';
import { clearAndLoadCSS} from '../pageElementes/stylesManager.mjs';
import { loadCSS} from '../pageElementes/stylesLoader.mjs';

//Function to create login page
export const displayLoginPage = async () => {
    try {
        await loadCSS('../../styles/accountForm.css');
    } catch (error) {
        console.error('Error loading CSS:', error);
        return;
    }

    //Import pageElements
    clearAndLoadCSS('../../styles/accountForm.css');

    addHeader();
    addFooter();

    // Clear existing content
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';  

    // Create the form container
    const formContainer = document.createElement('section');
    formContainer.className = 'login-form-container';

    // Create html for the form
    const form = document.createElement('form');
    form.id = 'login-form';

    const title = document.createElement('h2');
    title.textContent = 'Login';
    form.appendChild(title);

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
    passwordLabel.appendChild(passwordInput);
    form.appendChild(passwordLabel);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Login';
    form.appendChild(submitButton);

    // Button for redirect to register
    const registerLink = document.createElement('a');
    registerLink.href = '#account/register.html';
    registerLink.textContent = 'Create account';
    formContainer.appendChild(form);
    formContainer.appendChild(registerLink);

    appContainer.appendChild(formContainer);

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await loginUser(data);
            if (response.ok) {
                const result = await response.json();
                console.log('User logged in:', result);
                localStorage.setItem('accessToken', result.data.accessToken);
                localStorage.setItem('user', JSON.stringify(result.data));
                alert('Login successful!');
                window.location.hash = 'dashboard';
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                alert('Login failed: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
        }
    });
};