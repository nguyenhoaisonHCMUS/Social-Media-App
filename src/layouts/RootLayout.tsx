import { BottomBar, LeftSidebar, TopBar } from '@/components/shared';
import { Outlet } from 'react-router-dom';
// import { TopBar, LeftSidebar, BottomBar } from '../components/shared';
const RootLayout = () => {
    return (
        <div className="w-full md:flex">
            <LeftSidebar />
            <TopBar />
            <section className="flex flex-1 h-full">
                <Outlet />
            </section>

            <BottomBar />
        </div>
    );
};

export default RootLayout;
