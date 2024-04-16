import { User, PostCardProps, POSTS, USERS, COMMENTS, Comment } from '.';

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
    cre_at: new Date(''),
    creator: {
        _id: '',
        name: '',
        username: '',
        email: '',
        imgUrl: '',
    },
    likes: [],
    saveds: [],
    comments: [],
};

export const INIT_COMMENT: Comment = {
    _id: '',
    postId: '',
    content: '',
    parrent: '',
    userId: {
        _id: '',
        imgUrl: '',
        name: '',
    },
};
export const INIT_STATE_POST: POSTS = [INIT_POST_CARD];
export const INIT_STATE_USER: USERS = [INIT_USER];
export const INIT_STATE_COMMENT: COMMENTS = [INIT_COMMENT];
