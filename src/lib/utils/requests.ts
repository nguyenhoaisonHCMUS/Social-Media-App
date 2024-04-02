import axios from 'axios';

const request = axios.create({
    baseURL: 'https://660a870eccda4cbc75db1c5b.mockapi.io',
});

export const get = async (path: string, option = {}) => {
    const response = await request.get(path, option);
    return response;
};

export const post = async (path: string, data: object) => {
    const response = await request.post(path, data);
    return response;
};
