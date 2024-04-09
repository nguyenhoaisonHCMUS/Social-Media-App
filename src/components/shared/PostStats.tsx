import { useState, useEffect } from 'react';
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
    const likesList = post.likes || {}; // Kiểm tra nếu likesList là null hoặc undefined, thì gán nó bằng một object rỗng
    const initialLikes = Array.isArray(likesList) ? likesList : Object.keys(likesList); // Kiểm tra nếu likesList là mảng, thì giữ nguyên, ngược lại chuyển đổi thành mảng
    const [likes, setLikes] = useState<string[]>(initialLikes);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Cập nhật likes khi post thay đổi
        const initialLikes = Array.isArray(likesList) ? likesList : Object.keys(likesList);
        setLikes(initialLikes);
    }, [post.likes]);

    const handleLikePost = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.stopPropagation();

        let updatedLikes = [...likes];

        if (checkIsLiked(updatedLikes, userId)) {
            updatedLikes = updatedLikes.filter((likeId) => likeId !== userId);
        } else {
            updatedLikes.push(userId);
        }

        setLikes(updatedLikes);
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
