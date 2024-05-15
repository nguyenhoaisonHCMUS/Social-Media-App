import { PostCardProps } from '@/types';
import { instance } from '.';
import { ApiResponse } from '..';

type getAllType = {
    data: PostCardProps[];
};

export const getAll = async () => {
    try {
        const response: ApiResponse<getAllType> = await instance.get('/posts');
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('GetAll faild!');
        }
    } catch (error) {
        throw new Error(`GetAll faild! ${error}`);
    }
};

export const createPost = async (data: FormData) => {
    try {
        const response: ApiResponse<PostCardProps> = await instance.post('/create-post', data);
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('GetAll faild!');
        }
    } catch (error) {
        throw new Error(`GetAll faild! ${error}`);
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
