import { Request, Response } from 'express';
declare function getUsersWithStatistic(req: Request, res: Response): Promise<void>;
declare function getStatisticByUserId(req: Request, res: Response): Promise<void>;
declare const _default: {
    getUsersWithStatistic: typeof getUsersWithStatistic;
    getStatisticByUserId: typeof getStatisticByUserId;
};
export default _default;
