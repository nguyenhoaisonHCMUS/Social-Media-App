import { PostCardProps, PostType } from '@/types';
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
        const response = await instance.get('/post-number-of-user', {
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
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('GetAll faild!');
        }
    } catch (error) {
        return { message: error };
    }
};

type GetPostOfIDType = {
    data: PostCardProps[];
    message: string;
};

export const GetPostOfID = async (postId: string) => {
    try {
        const response: ApiResponse<GetPostOfIDType> = await instance.get('/search-post-id', {
            params: {
                postId,
            },
        });
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('GetAll faild!');
        }
    } catch (error) {
        throw new Error(`Get post by ID faild! ${error}`);
    }
};
type updadtePostType = {
    data: {
        location?: string;
        tags?: string;
        caption?: string;
        image_post?: File;
    };
    _id: string;
};

export const updatePost = async (data: updadtePostType) => {
    try {
        const response: ApiResponse<PostType> = await instance.patch(`/post/${data._id}`, data.data);
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('GetAll faild!');
        }
    } catch (error) {
        throw new Error(`Get post by ID faild! ${error}`);
    }
};
