export type User = {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    imgUrl: string;
};

export type PostCardProps = {
    caption: string;
    tags: string[];
    imgUrl: string;
    location: string;
    id: string;
    creator: User;
    likes: string[];
};
