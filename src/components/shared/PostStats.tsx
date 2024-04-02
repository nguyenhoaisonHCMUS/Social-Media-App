import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { checkIsLiked } from '@/lib/utils';
import { icons } from '@/assets/icons';
import { PostCardProps } from '@/types';

type PostStatsProps = {
    post: PostCardProps;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    const location = useLocation();
    const likesList = post.likes ? post.likes.map((userId) => userId) : [];
    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        let likesArray = [...likes];

        if (likesArray.includes(userId)) {
            likesArray = likesArray.filter((Id) => Id !== userId);
        } else {
            likesArray.push(userId);
        }

        setLikes(likesArray);
    };

    const handleSavePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();
        setIsSaved(true);
    };

    const containerStyles = location.pathname.startsWith('/profile') ? 'w-full' : '';

    return (
        <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={`${checkIsLiked(likes, userId) ? icons.liked : icons.like}`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={(e) => handleLikePost(e)}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:base-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                <img
                    src={isSaved ? icons.saved : icons.save}
                    alt="share"
                    width={20}
                    height={20}
                    className="cursor-pointer"
                    onClick={(e) => handleSavePost(e)}
                />
            </div>
        </div>
    );
};

export default PostStats;
