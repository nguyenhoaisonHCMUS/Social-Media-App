import { Link, useNavigate } from 'react-router-dom';
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

const Topbar = () => {
    const navigate = useNavigate();

    return (
        <section className="topbar">
            <div className="flex-between py-4 px-5">
                <Link to="/" className="flex gap-3 items-center">
                    <img src={imgs.logo} alt="logo" width={130} height={325} />
                </Link>

                <div className="flex gap-4">
                    <Button variant="ghost" className="shad-button_ghost" onClick={(e) => e.preventDefault()}>
                        <img src={icons.logout} alt="logout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        <img
                            src={user.imgUrl || icons.profile_placeholder}
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
