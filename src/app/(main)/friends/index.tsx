import { FriendsList } from './components/friends-list';
import { FriendRequests } from './components/friend-requests';

export function FriendsPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <FriendsList />
            <FriendRequests />
        </div>
    );
}