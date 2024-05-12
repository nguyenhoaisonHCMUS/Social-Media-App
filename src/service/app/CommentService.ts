import { instance } from '.';

export const getCommetByIDPost = async (postId: string) => {
    try {
        const res = await instance.get('/post-comment', {
            params: {
                postId,
            },
        });

        return res.data;
    } catch (error) {
        return { error: error };
    }
};

export const addComment = async (postId: string, userId: string, content: string, parrent: string) => {
    try {
        const res = await instance.post('/add-comment', {
            postId,
            userId,
            content,
            parrent,
        });

        return res.data;
    } catch (error) {
        return { error: error };
    }
};
