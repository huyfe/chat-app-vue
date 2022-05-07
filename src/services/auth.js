import axios from 'axios';
export const authService = {
    profile(token) {
        return axios.post('/api/auth/profile', { token: token });
    },
    login(email, password) {
        return axios.post(`/api/auth/login`, {
            email: email,
            password: password,
        })
    },
    register(data) {
        return axios.post(`/api/auth/register`, data);
    }
}