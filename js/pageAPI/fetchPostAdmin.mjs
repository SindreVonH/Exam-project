//Get post data to display on dashboard

export const getPosts = async (username) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }

    const result = await response.json();
    return result.data;
};

//Delete Post from the API

export const deletePost = async (username, postId) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to delete post');
    }

    return;
};