//Post blogPost to the API

export const createPost = async (data) => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user'));
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${user.name}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return response;
};