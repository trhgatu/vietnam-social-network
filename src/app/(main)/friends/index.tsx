import { FriendsList } from './components/friends-list';
import { FriendRequests } from './components/friend-requests';

export function FriendsPage() {
    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-6">Bạn bè</h1>
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-3/5">
                    <FriendsList />
                </div>
                <div className="lg:w-2/5">
                    <FriendRequests />
                </div>
            </div>
        </div>
    );
}