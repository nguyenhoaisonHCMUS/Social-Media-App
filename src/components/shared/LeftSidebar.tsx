import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '@/constants';
import { Loader } from '.';
import { Button } from '../ui/button';
import imgs from '@/assets/images';
import { icons } from '@/assets/icons';
import { User } from '@/types';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/AuthSlice';

function LeftSidebar({ userData }: { userData: User }) {
    const isLoading = false;
    const location = useLocation();
    const { pathname } = location;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/sign-in');
    };

    return (
        <nav className=" leftsidebar sticky top-0 z-10">
            <div className="flex flex-col gap-11">
                <Link to="/" className="flex gap-3 items-center">
                    <img src={imgs.logo} alt="logo" width={170} height={36} />
                </Link>

                {isLoading || !userData.email ? (
                    <div className="h-14">
                        <Loader />
                    </div>
                ) : (
                    <Link to={`/profile/${userData._id}`} className="flex gap-3 items-center">
                        <img
                            src={userData.imgUrl || icons.profile_placeholder}
                            alt="profile"
                            className="h-14 w-14 rounded-full"
                        />
                        <div className="flex flex-col">
                            <p className="body-bold">{userData.name}</p>
                            <p className="small-regular text-light-3">@{userData.username}</p>
                        </div>
                    </Link>
                )}

                <ul className="flex flex-col gap-6">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.route;

                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                                <NavLink to={link.route} className="flex gap-4 items-center p-4">
                                    <img
                                        src={link.imgURL}
                                        alt={link.label}
                                        className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                                    />
                                    {link.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <Button variant="ghost" className="shad-button_ghost" onClick={handleLogout}>
                <img src={icons.logout} alt="logout" />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
        </nav>
    );
}

export default LeftSidebar;
