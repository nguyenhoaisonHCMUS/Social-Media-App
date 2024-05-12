import { instance } from '.';

export const getUserByIdApi = async (userId: string) => {
    try {
        const response = await instance.get('/get-user-id', {
            params: {
                userId: userId,
            },
        });
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const getAllUser = async () => {
    try {
        const response = await instance.get('/users');
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const likePost = async (userId: string, postId: string) => {
    try {
        const response = await instance.post('/like-post', { userId, postId });
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const unLikePost = async (userId: string, postId: string) => {
    try {
        const response = await instance.post('/unlike-post', { userId, postId });
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const savePost = async (userId: string, postId: string) => {
    try {
        const response = await instance.post('/save-post', { userId, postId });
        return response.data;
    } catch (error) {
        return { error };
    }
};

export const unSavePost = async (userId: string, postId: string) => {
    try {
        const response = await instance.post('/unsave-post', { userId, postId });
        return response.data;
    } catch (error) {
        return { error };
    }
};
