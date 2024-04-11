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
        return { error };
    }
};

export const getAllUser = async (accessToken: string) => {
    try {
        const response = await axios.get('http://localhost:5000/api/users', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const likePost = async (userId: string, postId: string, accessToken: string) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/like-post',
            { userId, postId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const unLikePost = async (userId: string, postId: string, accessToken: string) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/unlike-post',
            { userId, postId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const savePost = async (userId: string, postId: string, accessToken: string) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/save-post',
            { userId, postId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const unSavePost = async (userId: string, postId: string, accessToken: string) => {
    try {
        const response = await axios.post(
            'http://localhost:5000/api/unsave-post',
            { userId, postId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        return { error };
    }
};
