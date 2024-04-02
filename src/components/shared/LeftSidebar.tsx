import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { sidebarLinks } from '@/constants';
import { Loader } from '.';
import { Button } from '../ui/button';
import imgs from '@/assets/images';
import { icons } from '@/assets/icons';

const user = {
    name: 'Randall Parisian',
    username: 'Lawson_Gleichner66',
    email: 'Thelma6@gmail.com',
    password: 'dgsYrL3f3M3mc_E',
    imgUrl: 'https://loremflickr.com/640/480',
    id: '1',
};

function LeftSidebar() {
    const isLoading = false;
    // const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <nav className=" leftsidebar">
            <div className="flex flex-col gap-11">
                <Link to="/" className="flex gap-3 items-center">
                    <img src={imgs.logo} alt="logo" width={170} height={36} />
                </Link>

                {isLoading || !user.email ? (
                    <div className="h-14">
                        <Loader />
                    </div>
                ) : (
                    <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
                        <img
                            src={user.imgUrl || icons.profile_placeholder}
                            alt="profile"
                            className="h-14 w-14 rounded-full"
                        />
                        <div className="flex flex-col">
                            <p className="body-bold">{user.name}</p>
                            <p className="small-regular text-light-3">@{user.username}</p>
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

            <Button variant="ghost" className="shad-button_ghost">
                <img src={icons.logout} alt="logout" />
                <p className="small-medium lg:base-medium">Logout</p>
            </Button>
        </nav>
    );
}

export default LeftSidebar;
