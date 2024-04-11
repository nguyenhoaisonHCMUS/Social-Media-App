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
};
export type POSTS = [PostCardProps];
export type USERS = [User];
