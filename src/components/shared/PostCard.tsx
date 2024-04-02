import { Link } from 'react-router-dom';
import { PostStats } from '@/components/shared';
import { multiFormatDateString } from '@/lib/utils';
import { icons } from '@/assets/icons';
import { User, PostCardProps } from '@/types';

const PostCard = ({ post }: { post: PostCardProps }) => {
    const currentUser = {} as User;

    if (!post.creator) return null;

    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator.id}`}>
                        <img
                            src={post.creator.imgUrl || icons.profile_placeholder}
                            alt="creator"
                            className="w-12 lg:h-12 rounded-full"
                        />
                    </Link>

                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                        <div className="flex-center gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular ">{multiFormatDateString(post.createdAt)}</p>
                            •<p className="subtle-semibold lg:small-regular">{post.location}</p>
                        </div>
                    </div>
                </div>

                {/* Conditional rendering for edit link */}
                {currentUser.id === post.creator.id && (
                    <Link to={`/update-post/${post.id}`}>
                        <img src={icons.edited} alt="edit" width={20} height={20} />
                    </Link>
                )}
            </div>

            <Link to={`/posts/${post.id}`}>
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags.map((tag: string, index: number) => (
                            <li key={`${tag}${index}`} className="text-light-3 small-regular">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>

                <img src={post.imgUrl || icons.profile_placeholder} alt="post image" className="post-card_img" />
            </Link>

            {/* Passing currentUser.id instead of user.id */}
            <PostStats post={post} userId={currentUser.id} />
        </div>
    );
};

export default PostCard;
