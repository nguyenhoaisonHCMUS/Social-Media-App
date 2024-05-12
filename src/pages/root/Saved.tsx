import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { icons } from '@/assets/icons';
import { GridPostList, Loader } from '@/components/shared';
import { RootState } from '@/redux/store';
import { POSTS, PostCardProps } from '@/types';
import { getAll } from '@/service/app/PostService';

const Saved = () => {
    const userInfo = useSelector((state: RootState) => state.auth.currentUser);
    const currentUser = userInfo.user;

    const [savedPosts, setSavedPosts] = useState<POSTS[]>([]);

    useEffect(() => {
        const fetchApi = async () => {
            const data = await getAll(userInfo.accessToken);
            if (!data.data) {
                return (
                    <>
                        <Loader />
                    </>
                );
            }
            setSavedPosts(data.data.filter((post: PostCardProps) => post.saveds.includes(currentUser._id)));
        };
        fetchApi();
    }, [userInfo.accessToken]);

    return (
        <div className="saved-container">
            <div className="flex gap-2 w-full max-w-5xl">
                <img src={icons.save} width={36} height={36} alt="edit" className="invert-white" />
                <h2 className="h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
            </div>

            {!currentUser ? (
                <Loader />
            ) : (
                <ul className="w-full flex justify-center max-w-5xl gap-9">
                    {savedPosts?.length === 0 ? (
                        <p className="text-light-4">No available posts</p>
                    ) : (
                        <GridPostList posts={savedPosts} showStats={true} />
                    )}
                </ul>
            )}
        </div>
    );
};

export default Saved;
