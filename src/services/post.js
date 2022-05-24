import axios from 'axios';
export const postService = {
    find() {
        return axios.get('/api/posts');
    },
}