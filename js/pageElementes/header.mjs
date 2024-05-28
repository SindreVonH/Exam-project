export function addHeader() {
    // Check if header already exists
    if (document.querySelector('header')) {
        return;
    }

    // Create link element for the CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './styles/header.css';
    document.head.appendChild(link);

    // Create header element
    const header = document.createElement('header');

    const logo = document.createElement('div');
    logo.className = 'logo';
    logo.textContent = 'FOREST INSIGHT';
    logo.style.cursor = 'pointer'; 
    logo.tabIndex = 0; 
    logo.addEventListener('click', () => {
        window.location.hash = '#'; 
    });
    logo.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            window.location.hash = '#'; 
        }
    });

    header.appendChild(logo);

    const appContainer = document.getElementById('app');
    document.body.insertBefore(header, appContainer);
}