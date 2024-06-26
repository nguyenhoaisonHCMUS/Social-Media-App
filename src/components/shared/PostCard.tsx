import { Link } from 'react-router-dom';
import { Loader, PostStats } from '@/components/shared';
import { multiFormatDateString } from '@/lib/utils';
import { icons } from '@/assets/icons';
import { PostCardProps } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type PostCard = {
    post: PostCardProps;
    onRestart: () => void;
};

const PostCard = ({ post, onRestart }: PostCard) => {
    const user = useSelector((state: RootState) => state.persistedReducer.auth.currentUser);
    const currentUser = user.user;
    if (post._id === '') return <Loader />;

    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator._id}`}>
                        <img
                            src={post.creator.imgUrl || icons.profile_placeholder}
                            alt="creator"
                            className="w-12 lg:h-12 rounded-full"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                        <div className="flex-center gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular ">
                                {multiFormatDateString(post?.cre_at.toString())}
                            </p>
                            <p className="subtle-semibold lg:small-regular">{post.location}</p>
                        </div>
                    </div>
                </div>

                {/* Conditional rendering for edit link */}
                {currentUser._id === post.creator._id && (
                    <Link to={`/post/${post._id}/update`}>
                        <img src={icons.edited} alt="edit" width={20} height={20} />
                    </Link>
                )}
            </div>

            <div>
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags &&
                            typeof post.tags === 'string' &&
                            post.tags.split(',').map((tag: string, index: number) => (
                                <li key={`${tag}${index}`} className="text-light-3 small-regular">
                                    #{tag}
                                </li>
                            ))}
                    </ul>
                </div>

                <Link to={`/post/${post._id}`}>
                    <img src={post.imgUrl || icons.profile_placeholder} alt="post image" className="post-card_img" />
                </Link>
            </div>

            {/* Passing currentUser.id instead of user.id */}
            {post && <PostStats post={post} userId={currentUser._id} showComment={false} onRestart={onRestart} />}
        </div>
    );
};

export default PostCard;
