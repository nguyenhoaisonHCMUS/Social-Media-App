export type User = {
    _id: string;
    name: string;
    username: string;
    email: string;
    imgUrl: string;
};

export type PostCardProps = {
    _id: string;
    caption: string;
    tags: string;
    imgUrl: string;
    location: string;
    cre_at: Date;
    creator: User;
    likes: string[];
    saveds: string[];
    comments: string[];
};

export type Comment = {
    _id: string;
    postId: string;
    content: string;
    parrent: string;
    userId: {
        _is: string;
        imgUrl: string;
        name: string;
    };
};

export type POSTS = [PostCardProps];
export type USERS = [User];
export type COMMENTS = [Comment];
