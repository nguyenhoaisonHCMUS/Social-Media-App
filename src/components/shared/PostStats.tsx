import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// import { checkIsLiked } from '@/lib/utils';
import { icons } from '@/assets/icons';
import { PostCardProps } from '@/types';
import { likePost, savePost, unLikePost, unSavePost } from '@/service/app/UserService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { toast } from '../ui/use-toast';
import { MessageCircle } from 'lucide-react';
import ListComment from './ListComment';

type PostStatsProps = {
    post: PostCardProps;
    userId: string;
    showComment: boolean;
    onRestart: () => void;
};

const PostStats = ({ post, userId, showComment = false, onRestart }: PostStatsProps) => {
    const location = useLocation();
    const [likes, setLikes] = useState<string[]>(post.likes);
    const [comments, setComments] = useState<string[]>(post.comments);

    const [isSaved, setIsSaved] = useState(false);

    //handle get saved
    useEffect(() => {
        if (post._id === '') {
            setIsSaved(false);
        } else {
            if (post.saveds.includes(userId)) {
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }
        }
    }, [post.saveds]);

    useEffect(() => {
        setLikes(post.likes);
    }, [post.likes]);

    useEffect(() => {
        setComments(post.comments);
    }, [post.comments]);

    const userInfo = useSelector((state: RootState) => state.auth.currentUser);

    const handleLikePost = async () => {
        try {
            if (!userId || userId === '' || post._id === '') {
                toast({ title: 'Please fill in all information!!' });
                return;
            }
            let likesArray = [...likes];
            if (likesArray.includes(userId)) {
                const fetchUnLikeApi = await unLikePost(userId, post._id, userInfo.accessToken);
                console.log(fetchUnLikeApi);
                likesArray = likesArray.filter((Id) => Id !== userId);
                if (!fetchUnLikeApi) {
                    toast({ title: 'error' });
                }
            } else {
                const fetchLikeApi = await likePost(userId, post._id, userInfo.accessToken);
                likesArray.push(userId);
                if (!fetchLikeApi.data) {
                    toast({ title: 'error' });
                }
            }
            setLikes(likesArray);
            onRestart();
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
            onRestart();
        } catch (error) {
            console.log(error);
            toast({ title: "Looks like there's a network problem." });
        }
    };

    const containerStyles = location.pathname.startsWith('/profile') ? 'w-full' : '';

    return (
        <div>
            <div className={`flex justify-between items-center z-20 ${containerStyles}`}>
                <div className="flex gap-5 mr-5">
                    <div className="flex items-center gap-2">
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
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-[20px] h-[20px] text-blue-600" />
                        <p className="small-medium lg:base-medium">{comments.length}</p>
                    </div>
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
            {showComment && (
                <div className=" mt-5 w-full">
                    <ListComment postId={post._id} onRestart={onRestart} />
                </div>
            )}
        </div>
    );
};

export default PostStats;
