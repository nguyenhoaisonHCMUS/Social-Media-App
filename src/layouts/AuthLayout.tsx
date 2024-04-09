import imgs from '@/assets/images';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function AuthLayout() {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <>
            {isLoggedIn ? (
                <Navigate to="/" />
            ) : (
                <section className="flex">
                    <div className="flex-1 flex items-center justify-center">
                        <Outlet />
                    </div>
                    <img src={imgs.side_img} alt="sideimg" className=" h-screen object-cover hidden md:block" />
                </section>
            )}
        </>
    );
}

export default AuthLayout;
