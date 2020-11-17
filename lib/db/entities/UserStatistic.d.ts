import User from './User';
export default class UserStatistic {
    id: number;
    user_id: number;
    date: string;
    page_views: number;
    clicks: number;
    user: User;
}
