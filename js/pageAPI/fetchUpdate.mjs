//Get data to edit posts

export const getSinglePost = async (username, postId) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }

    const result = await response.json();
    return result.data;
};

//Put post data into edit page

export const updatePost = async (username, postId, data) => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Failed to update post');
    }

    const result = await response.json();
    return result.data;
};