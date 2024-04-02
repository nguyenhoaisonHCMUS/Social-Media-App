import { icons } from '@/assets/icons';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { User } from '@/types';

function UserCard({ user }: { user: User }) {
    return (
        <Link to={`/profile/${user.id}`} className="user-card">
            <img
                src={user.imgUrl || icons.profile_placeholder}
                alt={user.name} // Alt attribute should be descriptive
                className="rounded-full w-14 h-14"
            />

            <div className="flex-center flex-col gap-1">
                <p className="base-medium text-light-1 text-center line-clamp-1">{user.name}</p>
                <p className="small-regular text-light-3 text-center line-clamp-1">@{user.username}</p>
            </div>

            <Button type="button" size="sm" className="shad-button_primary px-5">
                Follow
            </Button>
        </Link>
    );
}

export default UserCard;
