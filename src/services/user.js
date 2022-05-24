import axios from 'axios';
export const userService = {
    getAll() {
        return axios.get('/api/users/all');
    },
}