import { Link } from 'react-router-dom';

import { Loader, PostStats } from '@/components/shared';
import { PostCardProps } from '@/types';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { icons } from '@/assets/icons';

type GridPostListProps = {
    posts: PostCardProps[];
    showUser?: boolean;
    showStats?: boolean;
    onRestart?: () => void;
};

const GridPostList = ({ posts, showUser = true, showStats = true, onRestart }: GridPostListProps) => {
    const user = useSelector((state: RootState) => state.auth.currentUser.user);

    if (!posts) {
        return <Loader />;
    }
    return (
        <ul className="grid-container">
            {posts.map((post) => (
                <li key={post._id} className="relative min-w-80 h-80">
                    <Link to={`/post/${post._id}`} className="grid-post_link">
                        <img src={post.imgUrl} alt="post" className="h-full w-full object-cover" />
                    </Link>

                    <div className="grid-post_user">
                        {showUser && (
                            <div className="flex items-center justify-start gap-2 flex-1">
                                <img
                                    src={post.creator.imgUrl || icons.profile_placeholder}
                                    alt="creator"
                                    className="w-8 h-8 rounded-full"
                                />
                                <p className="line-clamp-1">{post.creator.name}</p>
                            </div>
                        )}
                        {showStats && (
                            <PostStats post={post} userId={user._id} showComment={false} onRestart={onRestart} />
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default GridPostList;
