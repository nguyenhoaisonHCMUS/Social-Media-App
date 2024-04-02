import { Loader, PostCard, UserCard } from '@/components/shared';
import { User, PostCardProps } from '../../types/index';

const posts: PostCardProps[] = [
    {
        caption: 'Casper, Lindgren and Bailey',
        tags: ['tag1', 'tag2'],
        imgUrl: 'https://loremflickr.com/640/480',
        location: 'en_US',
        id: '1',
        creator: {
            name: 'Lucia Murray III',
            username: 'Minnie_Zieme',
            email: 'Herminio76@yahoo.com',
            password: 'x5rSIg1xDg5sgvh',
            imgUrl: 'https://loremflickr.com/640/480',
            id: '2',
        },
        likes: ['1', '2', '4'],
    },
    {
        caption: 'Miller - Pouros',
        tags: ['tag1', 'tag2'],
        imgUrl: 'https://loremflickr.com/640/480',
        location: 'ko',
        id: '2',
        creator: {
            name: 'Randall Parisian',
            username: 'Lawson_Gleichner66',
            email: 'Thelma6@gmail.com',
            password: 'dgsYrL3f3M3mc_E',
            imgUrl: 'https://loremflickr.com/640/480',
            id: '1',
        },
        likes: ['helo', 'name'],
    },
];

const creators: User[] = [
    {
        name: 'Randall Parisian',
        username: 'Lawson_Gleichner66',
        email: 'Thelma6@gmail.com',
        password: 'dgsYrL3f3M3mc_E',
        imgUrl: 'https://loremflickr.com/640/480',
        id: '1',
    },
    {
        name: 'Lucia Murray III',
        username: 'Minnie_Zieme',
        email: 'Herminio76@yahoo.com',
        password: 'x5rSIg1xDg5sgvh',
        imgUrl: 'https://loremflickr.com/640/480',
        id: '2',
    },
    {
        name: 'Belinda Stark',
        username: 'Dora95',
        email: 'Vladimir_Schimmel@hotmail.com',
        password: 'L8ubq1YV59YFnPs',
        imgUrl: 'https://loremflickr.com/640/480',
        id: '3',
    },
    {
        name: 'Al Braun',
        username: 'Nyasia98',
        email: 'Thelma6@gmail.com',
        password: 'dgsYrL3f3M3mc_E',
        imgUrl: 'https://loremflickr.com/640/480',
        id: '4',
    },
    {
        name: 'Leroy Hahn',
        username: 'Marques_Willms',
        email: 'Destiney.Mueller89@yahoo.com',
        password: 'fXFYjStuenvNkHt',
        imgUrl: 'https://loremflickr.com/640/480',
        id: '5',
    },
];

function Home() {
    const isPostLoading = false;
    const isUserLoading = false;
    return (
        <div className="flex flex-1">
            <div className="home-container">
                <div className="home-posts">
                    <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
                    {isPostLoading && !posts ? (
                        <Loader />
                    ) : (
                        <ul className="flex flex-col flex-1 gap-9 w-full ">
                            {posts.map((post) => (
                                <li key={post.id} className="flex justify-center w-full">
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
                        {creators.map((creator) => (
                            <li key={creator.id}>
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
