import { instance } from '.';

export const getAll = async () => {
    try {
        const response = await instance.get('/posts');
        return response.data;
    } catch (error) {
        return { message: 'failed' };
    }
};

export const createPost = async (data: FormData) => {
    try {
        const response = await instance.post('/create-post', data);
        return response;
    } catch (error) {
        return { message: error };
    }
};

export const countPostOfNumberApi = async (creator: string) => {
    try {
        const response = await instance.get('http://localhost:5000/api/post-number-of-user', {
            params: {
                creator: creator,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error };
    }
};

export const GetPostOfCaption = async (caption: string) => {
    try {
        const response = await instance.get('http://localhost:5000/api/search-post', {
            params: {
                caption,
            },
        });
        return response.data;
    } catch (error) {
        return { message: error };
    }
};

export const GetPostOfID = async (postId: string) => {
    try {
        const response = await instance.get('http://localhost:5000/api/search-post-id', {
            params: {
                postId,
            },
        });
        return response;
    } catch (error) {
        return { message: error };
    }
};
