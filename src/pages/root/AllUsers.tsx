import { Loader, UserCard } from '@/components/shared';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getAllUser } from '@/service/UserService';
import { USERS } from '@/types';
import { INIT_STATE_USER } from '@/types/initValueType';
import { toast } from '@/components/ui/use-toast';

const AllUsers = () => {
    const userInfo = useSelector((state: RootState) => state.auth.currentUser);
    const [isErrorCreators, setIsErrorCreators] = useState(true);
    const [creators, setCreators] = useState<USERS>(INIT_STATE_USER);

    useEffect(() => {
        const fetchGetAllUser = async () => {
            const res = await getAllUser(userInfo.accessToken);
            console.log(res.data.dataUser);
            if (!res || !res.data) {
                toast({ title: 'Not get data' });
                return;
            }
            setIsErrorCreators(false);
            setCreators(res.data.dataUser);
        };
        fetchGetAllUser();
    }, []);

    return (
        <div className="common-container">
            <div className="user-container">
                <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>
                {!creators ? (
                    <Loader />
                ) : (
                    <ul className="user-grid">
                        {creators?.map((creator) => (
                            <li key={creator?._id} className="flex-1 min-w-[200px] w-full  ">
                                <UserCard user={creator} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AllUsers;
