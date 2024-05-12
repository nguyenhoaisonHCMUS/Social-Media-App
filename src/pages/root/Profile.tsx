import { Link, Outlet, useParams, useLocation, Route, Routes } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/shared';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { POSTS, User } from '@/types';
import { useEffect, useState } from 'react';
import { getUserByIdApi } from '@/service/app/UserService';
import { icons } from '@/assets/icons';
import { toast } from '@/components/ui/use-toast';
import { countPostOfNumberApi } from '@/service/app/PostService';
import GridPostList from '@/components/shared/GridPostList';
import { INIT_USER, INIT_STATE_POST } from '@/types/initValueType';

interface StabBlockProps {
    value: string | number;
    label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
    <div className="flex-center gap-2">
        <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
        <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
);

const Profile = () => {
    const { _id } = useParams();
    const { pathname } = useLocation();
    const [user, setUser] = useState<User>(INIT_USER);
    const [posts, setPosts] = useState<POSTS>(INIT_STATE_POST);
    const users = useSelector((state: RootState) => state.auth.currentUser);
    const currentUser = users.user;

    useEffect(() => {
        const fetchGetUserApi = async () => {
            const res = await getUserByIdApi(_id, users.accessToken);
            if (res && res.data) {
                setUser(res.data);
            } else {
                return;
            }
        };
        fetchGetUserApi();
    }, [_id, users.accessToken]);

    useEffect(() => {
        const fetchGetPostNumber = async () => {
            try {
                const res = await countPostOfNumberApi(user._id, users.accessToken);
                if (res && res.data) {
                    setPosts(res.data);
                } else {
                    return;
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGetPostNumber();
    }, [user._id, users.accessToken]);

    if (!currentUser) {
        return (
            <div className="flex-center w-full h-full">
                <Loader />
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-inner_container">
                <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
                    <img
                        src={user.imgUrl || icons.profile_placeholder}
                        alt="profile"
                        className="w-28 h-28 lg:h-36 lg:w-36 rounded-full"
                    />
                    <div className="flex flex-col flex-1 justify-between md:mt-2">
                        <div className="flex flex-col w-full">
                            <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">{user.name}</h1>
                            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                                @{user.username}
                            </p>
                        </div>

                        <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                            <StatBlock value={posts.length} label="Posts" />
                            <StatBlock value={20} label="Followers" />
                            <StatBlock value={20} label="Following" />
                        </div>
                    </div>

                    <div className="flex justify-center gap-4">
                        <div className={`${user._id !== currentUser._id && 'hidden'}`}>
                            <Link
                                to={`/update-profile/${currentUser._id}`}
                                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                                    user._id !== currentUser._id && 'hidden'
                                }`}
                            >
                                <img src={icons.edited} alt="edit" width={20} height={20} />
                                <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
                            </Link>
                        </div>
                        <div className={`${currentUser._id === _id && 'hidden'}`}>
                            <Button type="button" className="shad-button_primary px-8">
                                Follow
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex max-w-5xl w-full">
                <Link
                    to={`/profile/${_id}`}
                    className={`profile-tab rounded-l-lg ${pathname === `/profile/${_id}` && '!bg-dark-3'}`}
                >
                    <img src={icons.posts} alt="posts" width={20} height={20} />
                    Posts
                </Link>
                <div
                    // to={`/profile/${_id}/liked-posts`}
                    className={`profile-tab rounded-r-lg cursor-pointer ${
                        pathname === `/profile/${_id}/liked-posts` && '!bg-dark-3'
                    }`}
                    onClick={() => toast({ title: 'undeveloped feature' })}
                >
                    <img src={icons.liked} alt="like" width={20} height={20} />
                    Liked Posts
                </div>
            </div>

            <GridPostList posts={posts} showUser={false} />
        </div>
    );
};

export default Profile;
