import { Loader, PostCard, UserCard } from '@/components/shared';
import { PostCardProps, User } from '../../types/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getAll } from '@/service/app/PostService';

// import { checkTokenExpiration } from '@/service/auth';

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
    const [posts, setPosts] = useState<PostCardProps[]>([]);
    console.log(posts);
    const isUserLoading = false;
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const [restart, setRestart] = useState(false);

    const onRestart = () => {
        setRestart(!restart);
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await getAll();
            // console.log(res);
            if (res.status === 200 && res.data) {
                setPosts(res.data.data);
            } else {
                setPosts([]);
            }
        };
        setIsPostLoading(true);
        fetchApi();
        setIsPostLoading(false);
    }, [user.accessToken, restart]);

    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
                    {isPostLoading && !posts ? (
                        <Loader />
                    ) : (
                        <ul className="flex flex-col flex-1 gap-9 w-full ">
                            {posts.length > 0 &&
                                posts.map((post, index) => (
                                    <li key={index} className="flex justify-center w-full">
                                        <PostCard post={post} onRestart={onRestart} />
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
