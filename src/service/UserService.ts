import axios from 'axios';

export const loginApi = async (email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5000/api/login', { email, password });
        return response.data;
    } catch (error) {
        return { message: 'failed' };
    }
};

export const registerApi = async (name: string, username: string, email: string, password: string) => {
    try {
        const response = await axios.post('http://localhost:5000/api/register', { name, username, email, password });
        return response.data;
    } catch (error) {
        return { message: 'failed: ' + error };
    }
};

export const getUserByIdApi = async (userId: string, accessToken: string) => {
    try {
        const response = await axios.get('http://localhost:5000/api/get-user-id', {
            params: {
                userId: userId,
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
