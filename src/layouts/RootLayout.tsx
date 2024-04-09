import { BottomBar, LeftSidebar, TopBar } from '@/components/shared';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RootLayout = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector((state: RootState) => state.auth.currentUser);
    const xxx = false;
    return (
        <>
            {isLoggedIn ? (
                <div className="w-full md:flex h-full">
                    <LeftSidebar userData={user.user} />
                    <TopBar userData={user.user} />
                    <section className="flex flex-1 h-full">
                        <Outlet />
                    </section>

                    <BottomBar />
                </div>
            ) : (
                <Navigate to="/sign-in" />
            )}
        </>
    );
};

export default RootLayout;
