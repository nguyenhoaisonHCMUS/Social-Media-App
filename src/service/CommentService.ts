import axios from 'axios';

export const getCommetByIDPost = async (postId: string, accessToken: string) => {
    try {
        const res = await axios.get('http://localhost:5000/api/post-comment', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                postId,
            },
        });

        return res.data;
    } catch (error) {
        return { error: error };
    }
};

export const addComment = async (
    postId: string,
    userId: string,
    content: string,
    parrent: string,
    accessToken: string,
) => {
    try {
        const res = await axios.post(
            'http://localhost:5000/api/add-comment',
            {
                postId,
                userId,
                content,
                parrent,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        );

        return res.data;
    } catch (error) {
        return { error: error };
    }
};
