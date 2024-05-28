import { displayBlogFeedPage } from '/Exam-project/js/page/BlogFeedPage.mjs';
import { displayBlogPostPage } from '/Exam-project/js/page/BlogPostPage.mjs';
import { displayRegisterPage } from '/Exam-project/js/page/AccountRegisterPage.mjs';
import { displayLoginPage } from '/Exam-project/js/page/AccountLoginPage.mjs';
import { displayDashboardPage } from '/Exam-project/js/page/BlogPostAdminPage.mjs';
import { displayCreatePostPage } from '/Exam-project/js/page/BlogPostCreatePage.mjs';
import { displayEditPostPage } from '/Exam-project/js/page/BlogPostEditPage.mjs';

export async function router() {
    
    const url = new URL(window.location.href);
    const hash = url.hash.slice(1);

    const routes = [
        { path: /^#?$/, controller: displayBlogFeedPage },
        { path: /^post\/index.html\/([^\/]+)$/, controller: displayBlogPostPage },
        { path: /^account\/register.html$/, controller: displayRegisterPage },
        { path: /^account\/login.html$/, controller: displayLoginPage },
        { path: /^dashboard$/, controller: requireAuth(displayDashboardPage) },
        { path: /^posts\/create.html$/, controller: requireAuth(displayCreatePostPage) },
        { path: /^posts\/edit.html$/, controller: requireAuth(displayEditPostPage) }
    ];

    const route = routes.find(route => route.path.test(hash));
    if (route) {
        await route.controller();
    } else {
        console.error("No matching route found");
    }
}

window.addEventListener('hashchange', router);


//Authentication of accessToken to view page
function requireAuth(controller) {
    return () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            alert('You must be logged in to view this page.');
            window.location.hash = '#account/login.html';
        } else {
            controller();
        }
    };
}