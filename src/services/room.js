import axios from 'axios';
export const roomService = {
    getRoomList(params = null) {
        return axios.get('/api/rooms/me');
    },
    detail(id) {
        return axios.get(`/api/rooms/${id}`);
    },
    postMessage(idRoom, textMessage) {
        return axios.post(`/api/rooms/send-messages/${idRoom}`, { textMessage: textMessage });
    },
    findRoom(idFriend) {
        return axios.get(`/api/rooms/find/${idFriend}`);
    },
    createRoom(idFriend) {
        return axios.post(`/api/rooms/create`, { idFriend: idFriend });
    }
}