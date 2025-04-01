import { formatDistanceToNow } from 'date-fns';

export const timeAgo = (date: string): string => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};
