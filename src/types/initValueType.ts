import { User, PostCardProps, POSTS } from '.';

export const INIT_USER: User = {
    _id: '',
    name: '',
    username: '',
    email: '',
    imgUrl: '',
};
export const INIT_POST_CARD: PostCardProps = {
    _id: '',
    caption: '',
    tags: '',
    imgUrl: '',
    location: '',
    cre_at: new Date(),
    creator: {
        _id: '',
        name: '',
        username: '',
        email: '',
        imgUrl: '',
    },
    likes: [],
};
export const INIT_STATE_POST: POSTS = [INIT_POST_CARD];
