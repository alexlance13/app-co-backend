"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../db/entities/User"));
const UserStatistic_1 = __importDefault(require("../db/entities/UserStatistic"));
async function getUsersWithStatistic(req, res) {
    try {
        const { page = 1, itemsPerPage = 50 } = req.query;
        const [, usersCount] = await typeorm_1.getRepository(User_1.default).findAndCount();
        const users = await typeorm_1.getRepository(User_1.default)
            .createQueryBuilder('user')
            .select('user')
            .addSelect('SUM(user_statistic.clicks)', 'total_clicks')
            .addSelect('SUM(user_statistic.page_views)', 'total_page_views')
            .leftJoin('user.user_statistic', 'user_statistic')
            .groupBy('user_id')
            .offset(+itemsPerPage * (+page - 1))
            .limit(+itemsPerPage)
            .getRawMany();
        res.send({ usersCount, users });
    }
    catch (error) {
        console.error(error);
    }
}
async function getStatisticByUserId(req, res) {
    var _a;
    try {
        const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
        const { fromDate, toDate } = req.query;
        const statistic = await typeorm_1.getRepository(UserStatistic_1.default)
            .createQueryBuilder('user_statistic')
            .select('user_statistic')
            .where(`user_statistic.user_id = ${id}`)
            .andWhere(`date(user_statistic.date) >= date("${fromDate || '2018-12-12'}")`)
            .andWhere(`date(user_statistic.date) <= date("${toDate || 'now'}")`)
            .getRawMany();
        res.send(statistic);
    }
    catch (error) {
        console.error(error);
    }
}
exports.default = {
    getUsersWithStatistic,
    getStatisticByUserId,
};
//# sourceMappingURL=index.js.map