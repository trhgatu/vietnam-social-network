import { User } from './user';

export interface Friendship {
  _id: string;
  requester: User;
  recipient: User;
  status: 'pending' | 'accepted' | 'rejected' | 'removed';
  createdAt: string;
  updatedAt: string;
}
