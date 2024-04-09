import axios from 'axios';

export const refreshToken = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/refreshtoken');
        return response.data;
    } catch (error) {
        return { message: 'failed' };
    }
};
