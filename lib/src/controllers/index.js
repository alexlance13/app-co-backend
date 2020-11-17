"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../db/entities/User");
const typeorm_1 = require("typeorm");
const UserStatistic_1 = require("../db/entities/UserStatistic");
async function getUsersWithStatistic(req, res) {
    try {
        const { page = 0, itemsPerPage = 50 } = req.query;
        const users = await typeorm_1.getRepository(User_1.User)
            .createQueryBuilder("user")
            .select("user")
            .addSelect("SUM(user_statistic.clicks)", "total_clicks")
            .addSelect("SUM(user_statistic.page_views)", "total_page_views")
            .leftJoin("user.user_statistic", "user_statistic")
            .groupBy("user_id")
            .offset(itemsPerPage * page)
            .limit(itemsPerPage)
            .getRawMany();
        res.send(users);
    }
    catch (error) {
        console.error(error);
    }
}
;
async function getStatisticByUserId(req, res) {
    var _a;
    try {
        const id = (_a = req.params) === null || _a === void 0 ? void 0 : _a.id;
        const { fromDate, toDate } = req.query;
        console.log(id, fromDate, toDate);
        const statistic = await typeorm_1.getRepository(UserStatistic_1.UserStatistic)
            .createQueryBuilder("user_statistic")
            .select("user_statistic")
            .where(`user_statistic.user_id = ${id}`)
            .andWhere(`date(user_statistic.date) >= date("${fromDate ? fromDate : '1970-01-01'}")`)
            .andWhere(`date(user_statistic.date) <= date("${toDate ? toDate : 'now'}")`)
            .getRawMany();
        res.send(statistic);
    }
    catch (error) {
        console.error(error);
    }
}
;
exports.default = {
    getUsersWithStatistic,
    getStatisticByUserId
};
//# sourceMappingURL=index.js.map