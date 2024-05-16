import { RootState } from '@/redux/store';
import { addComment, getCommetByIDPost } from '@/service/app/CommentService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';
import { COMMENTS } from '@/types';
import { INIT_STATE_COMMENT } from '@/types/initValueType';
import { toast } from '../ui/use-toast';
import UserComment from './UserComment';
import { icons } from '@/assets/icons';
type ListComments = {
    postId: string;
    onRestart: () => void;
};

function ListComment({ postId, onRestart }: ListComments) {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<COMMENTS>(INIT_STATE_COMMENT);
    const [userComment, setUserComment] = useState('');
    const [checkComment, setCheckComment] = useState(false);
    // console.log(comments);

    const userInfo = useSelector((state: RootState) => state.auth.currentUser);

    useEffect(() => {
        if (!postId) {
            setIsLoading(true);
            return;
        }
        const fetchGetCommentBYPossID = async () => {
            const res = await getCommetByIDPost(postId, userInfo.accessToken);
            // console.log('res', res.data);
            setComments(res.data);
        };
        setIsLoading(true);
        fetchGetCommentBYPossID();
        setIsLoading(false);
    }, [postId, checkComment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserComment(e.target.value);
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                setIsLoading(true);
                const res = await addComment(postId, userInfo.user._id, userComment, '', userInfo.accessToken);
                if (!res.data) {
                    toast({ title: 'error with comment, so sorry!!' });
                    return;
                }
                setIsLoading(false);
                setUserComment('');
                setCheckComment(!checkComment);
                onRestart();
            } catch (error) {
                console.log('error', error);
            }
        }
    };

    return (
        <div className="min-w-full">
            <div className="">
                <p>Comment</p>
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <Loader />
                </div>
            ) : (
                <div>
                    {comments.map((comment) => {
                        return (
                            <div key={comment._id}>
                                <UserComment comment={comment} postId={postId} />
                            </div>
                        );
                    })}
                </div>
            )}
            <div className="flex items-center gap-4 mt-9 w-full">
                <img
                    className="w-9 h-9 lg:w-12 lg:h-12 rounded-full"
                    src={userInfo.user.imgUrl || icons.profile_placeholder}
                    alt="avatar"
                />
                <input
                    placeholder="Enter your comment..."
                    value={userComment}
                    onChange={(e) => handleChange(e)}
                    onKeyDown={(e) => handleKeyPress(e)}
                    type="text"
                    className="text-dark-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>
        </div>
    );
}

export default ListComment;
