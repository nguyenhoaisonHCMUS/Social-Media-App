import { useState } from 'react';
import { useLocation } from 'react-router-dom';

// import { checkIsLiked } from '@/lib/utils';
import { icons } from '@/assets/icons';
import { PostCardProps } from '@/types';
import { likePost, savePost, unLikePost, unSavePost } from '@/service/UserService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from '../ui/use-toast';

type PostStatsProps = {
    post: PostCardProps;
    userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
    const location = useLocation();
    const likesList = post.likes;
    const [likes, setLikes] = useState<string[]>(likesList);
    const [isSaved, setIsSaved] = useState(() => {
        if (post._id === '') {
            return false;
        } else {
            if (post.saveds.includes(userId)) {
                return true;
            }
            return false;
        }
    });
    const userInfo = useSelector((state: RootState) => state.auth.currentUser);

    const handleLikePost = async () => {
        try {
            if (!userId || userId === '' || post._id === '') {
                toast({ title: 'Please fill in all information!!' });
                return;
            }
            let likesArray = [...likes];
            if (likesArray.includes(userId)) {
                console.log(1);
                const fetchUnSaveApi = await unLikePost(userId, post._id, userInfo.accessToken);
                likesArray = likesArray.filter((Id) => Id !== userId);
                if (!fetchUnSaveApi) {
                    toast({ title: 'error' });
                }
            } else {
                console.log(2);
                const fetchLikeApi = await likePost(userId, post._id, userInfo.accessToken);
                likesArray.push(userId);
                if (!fetchLikeApi.data) {
                    toast({ title: 'error' });
                }
            }
            setLikes(likesArray);
        } catch (error) {
            console.log(error);
            toast({ title: "Looks like there's a network problem." });
        }
    };

    const handleSavePost = async () => {
        try {
            if (!userId || userId === '' || post._id === '') {
                toast({ title: 'Please fill in all information!!' });
                return;
            }
            if (isSaved) {
                const fetchUnSaveApi = await unSavePost(userId, post._id, userInfo.accessToken);
                if (!fetchUnSaveApi) {
                    toast({ title: 'error' });
                    return;
                }
                setIsSaved(false);
            } else {
                const fetchsaveApi = await savePost(userId, post._id, userInfo.accessToken);
                if (!fetchsaveApi.data) {
                    toast({ title: 'error' });
                }
                setIsSaved(true);
            }
        } catch (error) {
            console.log(error);
            toast({ title: "Looks like there's a network problem." });
        }
    };

    const containerStyles = location.pathname.startsWith('/profile') ? 'w-full' : '';

    return (
        <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
            <div className="flex gap-2 mr-5">
                <img
                    src={likes.includes(userId) ? icons.liked : icons.like}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={() => handleLikePost()}
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
                    onClick={() => handleSavePost()}
                />
            </div>
        </div>
    );
};

export default PostStats;
