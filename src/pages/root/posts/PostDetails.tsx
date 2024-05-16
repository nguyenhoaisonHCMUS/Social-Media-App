import { Link, useNavigate, useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Loader } from '@/components/shared';
import { PostStats } from '@/components/shared';

import { multiFormatDateString } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { PostCardProps } from '@/types';
// import { INIT_POST_CARD } from '@/types/initValueType';
import { GetPostOfID } from '@/service/app/PostService';
import { toast } from '@/components/ui/use-toast';
import { icons } from '@/assets/icons';

const PostDetails = () => {
    const navigate = useNavigate();
    const userInfo = useSelector((state: RootState) => state.auth.currentUser);
    const { _id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [post, setPost] = useState<PostCardProps>();
    const [restart, setRestart] = useState(false);

    const onRestart = () => {
        setRestart(!restart);
    };
    useEffect(() => {
        const fetchPostById = async () => {
            try {
                const res = await GetPostOfID(_id as string);
                if (res && res.status === 200) {
                    setPost(res.data?.data[0]);
                } else {
                    toast({ title: 'Failed! There seems to be a network problem' });
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                toast({ title: 'Failed to fetch post' });
            }
        };
        setIsLoading(true);
        fetchPostById();
        setIsLoading(false);
    }, [_id, restart]);

    return (
        <div className="post_details-container">
            <div className="hidden md:flex max-w-5xl w-full">
                <Button onClick={() => navigate(-1)} variant="ghost" className="shad-button_ghost">
                    <img src={icons.back} alt="back" width={24} height={24} />
                    <p className="small-medium lg:base-medium">Back</p>
                </Button>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="post_details-card">
                    <img src={post?.imgUrl} alt="creator" className="post_details-img" />

                    <div className="post_details-info">
                        <div className="flex-between w-full">
                            <Link to={`/profile/${post?.creator._id}`} className="flex items-center gap-3">
                                <img
                                    src={post?.creator.imgUrl || icons.profile_placeholder}
                                    alt="creator"
                                    className="w-8 h-8 lg:w-12 lg:h-12 rounded-full"
                                />
                                <div className="flex gap-1 flex-col">
                                    <p className="base-medium lg:body-bold text-light-1">{post?.creator.name}</p>
                                    <div className="flex-center gap-2 text-light-3">
                                        <p className="subtle-semibold lg:small-regular ">
                                            {multiFormatDateString(post?.cre_at.toString())}
                                        </p>
                                        <p className="subtle-semibold lg:small-regular">{post?.location}</p>
                                    </div>
                                </div>
                            </Link>

                            <div className="flex-center gap-4">
                                <Link
                                    to={`/post/${post?._id}/update`}
                                    className={`${userInfo.user._id !== post?.creator._id && 'hidden'}`}
                                >
                                    <img src={icons.edited} alt="edit" width={24} height={24} />
                                </Link>

                                <Button
                                    // onClick={handleDeletePost}
                                    variant="ghost"
                                    className={`ost_details-delete_btn ${
                                        userInfo.user._id !== post?.creator._id && 'hidden'
                                    }`}
                                >
                                    <img src={icons.deleted} alt="delete" width={24} height={24} />
                                </Button>
                            </div>
                        </div>

                        <hr className="border w-full border-dark-4/80" />

                        <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                            <p>{post?.caption}</p>
                            <ul className="flex gap-1 mt-2">
                                {post &&
                                    post.tags &&
                                    post.tags.split(',').map((tag: string, index: number) => (
                                        <li key={index} className="text-light-3 small-regular">
                                            #{tag}
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {post && (
                            <div className="w-full">
                                <PostStats
                                    post={post}
                                    userId={userInfo.user._id}
                                    showComment={true}
                                    onRestart={onRestart}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="w-full max-w-5xl">
                <hr className="border w-full border-dark-4/80" />

                <h3 className="body-bold md:h3-bold w-full my-10">More Related Posts</h3>
                {/* {isUserPostLoading || !relatedPosts ? <Loader /> : <GridPostList posts={relatedPosts} />} */}
            </div>
        </div>
    );
};

export default PostDetails;
