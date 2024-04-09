import { Loader, PostCard, UserCard } from '@/components/shared';
import { POSTS, User } from '../../types/index';
import { useEffect, useState } from 'react';
import { getAll } from '@/service/PostService';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { INIT_STATE_POST } from '@/types/initValueType';

const creators: User[] = [
    {
        _id: '1',
        name: 'Randall Parisian',
        username: 'Lawson_Gleichner66',
        email: 'Thelma6@gmail.com',
        imgUrl: 'https://loremflickr.com/640/480',
    },
    {
        _id: '2',
        name: 'Lucia Murray III',
        username: 'Minnie_Zieme',
        email: 'Herminio76@yahoo.com',
        imgUrl: 'https://loremflickr.com/640/480',
    },
    {
        _id: '3',
        name: 'Belinda Stark',
        username: 'Dora95',
        email: 'Vladimir_Schimmel@hotmail.com',
        imgUrl: 'https://loremflickr.com/640/480',
    },
    {
        _id: '4',
        name: 'Al Braun',
        username: 'Nyasia98',
        email: 'Thelma6@gmail.com',
        imgUrl: 'https://loremflickr.com/640/480',
    },
];

function Home() {
    const [isPostLoading, setIsPostLoading] = useState(true);
    const [posts, setPosts] = useState<POSTS>(INIT_STATE_POST);
    const isUserLoading = false;
    const user = useSelector((state: RootState) => state.auth.currentUser);
    // console.log('home: ', user);
    useEffect(() => {
        const fetchApi = async () => {
            const data = await getAll(user.accessToken);
            if (!data.data) {
                return (
                    <>
                        <Loader />
                    </>
                );
            }
            setPosts(data.data);
        };
        setIsPostLoading(true);
        fetchApi();
        setIsPostLoading(false);
    }, [user.accessToken]);

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
                    {isPostLoading && !posts ? (
                        <Loader />
                    ) : (
                        <ul className="flex flex-col flex-1 gap-9 w-full ">
                            {posts.map((post, index) => (
                                <li key={index} className="flex justify-center w-full">
                                    <PostCard post={post} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="home-creators">
                <h3 className="h3-bold text-light-1">Top Creators</h3>
                {isUserLoading && !creators ? (
                    <Loader />
                ) : (
                    <ul className="grid 2xl:grid-cols-2 gap-6">
                        {creators.map((creator, index) => (
                            <li key={index}>
                                <UserCard user={creator} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Home;
