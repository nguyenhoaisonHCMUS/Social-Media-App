import axios from 'axios';

export const getAll = async (accessToken: string) => {
    try {
        const response = await axios.get('http://localhost:5000/api/posts', {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Sử dụng accessToken được truyền vào
            },
        });
        return response.data;
    } catch (error) {
        return { message: 'failed' };
    }
};

export const createPost = async (data: FormData, accessToken: string) => {
    try {
        const response = await axios.post('http://localhost:5000/api/create-post', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error };
    }
};

export const countPostOfNumberApi = async (creator: string, accessToken: string) => {
    try {
        const response = await axios.get('http://localhost:5000/api/post-number-of-user', {
            params: {
                creator: creator,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error };
    }
};
