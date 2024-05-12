import { RootState } from '@/redux/store';
import { addComment } from '@/service/app/CommentService';
import { Comment } from '@/types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from '../ui/use-toast';
import Loader from './Loader';

type CommentProp = {
    comment: Comment;
    postId: string;
};

function UserComment({ comment, postId }: CommentProp) {
    const [isRep, setIsRep] = useState(false);
    const userInfo = useSelector((state: RootState) => state.auth.currentUser);
    const [userComment, setUserComment] = useState('');
    const [checkComment, setCheckComment] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [parrent, setParrent] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserComment(e.target.value);
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            try {
                setIsLoading(true);
                const res = await addComment(postId, userInfo.user._id, userComment, parrent, userInfo.accessToken);
                if (!res.data) {
                    toast({ title: 'error with comment, so sorry!!' });
                    return;
                }
                setIsLoading(false);
                setUserComment('');
                setCheckComment(!checkComment);
                // onRestart();
            } catch (error) {
                console.log('error', error);
            }
        }
    };

    if (isLoading) {
        return (
            <div className=" flex h-full items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center gap-4 mt-5 w-full">
                <img className="w-9 h-9 lg:w-12 lg:h-12 rounded-full" src={comment.userId?.imgUrl} alt="avatar" />
                <p className="flex-1 px-[12px] py-[10px] border rounded-md bg-slate-900">{comment.content}</p>
            </div>
            <div className="flex flex-col gap-4 ml-[60px] mt-2">
                <p className="text-xs cursor-pointer" onClick={() => setIsRep(!isRep)}>
                    {!isRep ? 'Reply' : 'Cancel'}
                </p>
                {isRep && (
                    <div>
                        <div className="flex items-center gap-4 w-full">
                            <img
                                className="w-9 h-9 lg:w-12 lg:h-12 rounded-full"
                                src={userInfo.user.imgUrl}
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
                )}
            </div>
        </div>
    );
}

export default UserComment;
