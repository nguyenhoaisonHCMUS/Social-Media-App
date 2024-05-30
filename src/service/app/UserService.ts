import { LogoutType, User, updatedUserType } from '@/types';
import { instance } from '.';
import { ApiResponse } from '..';

export const getUserByIdApi = async (userId: string) => {
    try {
        const response: ApiResponse<User> = await instance.get('/get-user-id', {
            params: {
                userId: userId,
            },
        });
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('get User by Id failed');
        }
    } catch (error) {
        throw new Error('get User by Id failed:' + error);
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

export type updateUserReqType = {
    data: updatedUserType;
    _id: number;
};
export const updateProfile = async (data: updateUserReqType) => {
    try {
        const response: ApiResponse<User> = await instance.patch(`/user/${data._id}`, data.data);
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('update profile failed!!');
        }
    } catch (error) {
        throw new Error('update profile failed!!: ' + error);
    }
};

export const logoutApi = async () => {
    try {
        const response: ApiResponse<LogoutType> = await instance.post('/logout');
        if ('data' in response && response.data) {
            return response;
        } else {
            throw new Error('update profile failed!!');
        }
    } catch (error) {}
};
