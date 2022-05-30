import axios from 'axios';
export const roomService = {
    getRoomList(params = null) {
        return axios.get('/api/rooms/me');
    },
    detail(slug) {
        return axios.get(`/api/rooms/${slug}`);
    }
}