//Fetch post data form the API

const API_URL = 'https://v2.api.noroff.dev/blog/posts/forestinsights';

export async function fetchPosts() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    const result = await response.json();
    return result.data;
}