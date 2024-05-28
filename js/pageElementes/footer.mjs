export function addFooter() {
    // Check if footer already exists
    if (document.querySelector('footer')) {
        return;
    }

    // Create link element for the CSS file
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './styles/footer.css';
    document.head.appendChild(link);

    // Create footer element
    const footer = document.createElement('footer');

    const footerContent = document.createElement('section');
    footerContent.className = 'footer-content';
    footerContent.innerHTML = `
        <p>&copy; 2024 Forest Insight. All rights reserved.</p>
    `;
    footer.appendChild(footerContent);

    // Append footer to the body
    document.body.appendChild(footer);
}