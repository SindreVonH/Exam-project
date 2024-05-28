//This was made to make sure the site didnt get duplication stylesheets or more stylesheets in the index. So it could have a seperate stylesheet for each page.

export function clearAndLoadCSS(hrefs) {
    // Convert hrefs to an array if it's not already
    if (!Array.isArray(hrefs)) {
        hrefs = [hrefs];
    }

    // Ensure header.css is always included
    if (!document.querySelector('link[href="Exam-project/styles/header.css"]')) {
        const headerLink = document.createElement('link');
        headerLink.rel = 'stylesheet';
        headerLink.href = 'Exam-project/styles/header.css';
        document.head.appendChild(headerLink);
    }

    // Ensure footer.css is always included
    if (!document.querySelector('link[href="Exam-project/styles/footer.css"]')) {
        const footerLink = document.createElement('link');
        footerLink.rel = 'stylesheet';
        footerLink.href = 'Exam-project/styles/footer.css';
        document.head.appendChild(footerLink);
    }

    // Ensure Google Fonts is always included
    if (!document.querySelector('link[href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Merriweather:wght@300;400&display=swap"]')) {
        const fontsLink = document.createElement('link');
        fontsLink.rel = 'stylesheet';
        fontsLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Merriweather:wght@300;400&display=swap';
        document.head.appendChild(fontsLink);
    }

    // Clear other existing stylesheets, but not header.css, footer.css, or Google Fonts
    const existingLinks = document.querySelectorAll('link[rel="stylesheet"]:not([href="Exam-project/styles/header.css"]):not([href="Exam-project/styles/footer.css"]):not([href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Merriweather:wght@300;400&display=swap"])');
    existingLinks.forEach(link => link.parentNode.removeChild(link));

    // Load the new stylesheets
    hrefs.forEach(href => {
        // Avoid duplicating links
        if (!document.querySelector(`link[href="${href}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        }
    });
}
