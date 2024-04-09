import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import imgs from '@/assets/images';
import { icons } from '@/assets/icons';
import { User } from '@/types';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/AuthSlice';

const Topbar = ({ userData }: { userData: User }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/sign-in');
    };
    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <img src={imgs.logo} alt="logo" width={130} height={325} />
                </Link>

                <div className="flex gap-4">
                    <Button variant="ghost" className="shad-button_ghost" onClick={handleLogout}>
                        <img src={icons.logout} alt="logout" />
                    </Button>
                    <Link to={`/profile/${userData._id}`} className="flex-center gap-3">
                        <img
                            src={userData.imgUrl || icons.profile_placeholder}
                            alt="profile"
                            className="h-8 w-8 rounded-full"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Topbar;
