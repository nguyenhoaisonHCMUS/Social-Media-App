import axios from 'axios';

export const loginApi = (email: string, password: string) => {
    return axios.post('https://reqres.in/api/login', { email, password });
};