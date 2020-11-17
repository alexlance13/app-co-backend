"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("dotenv");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const helpers_1 = require("./helpers");
const controllers_1 = __importDefault(require("./controllers"));
const middlewares_1 = __importDefault(require("./middlewares"));
const app = express_1.default();
let tables = { user: 'users', user_statistic: 'users_statistic' };
app.use(express_1.default.json());
app.get('/users', [middlewares_1.default.validationCheck, controllers_1.default.getUsersWithStatistic]);
app.get('/user/:id', [middlewares_1.default.validationCheck, controllers_1.default.getStatisticByUserId]);
app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use(middlewares_1.default.errorHandler);
(async () => {
    const connection = await typeorm_1.createConnection();
    const res = await connection.query(`SELECT name FROM sqlite_master WHERE type='table'`);
    const existedTables = res.map(({ name }) => name);
    Object.keys(tables).forEach(tableName => {
        if (existedTables.includes(tableName))
            delete tables[tableName];
    });
    await connection.synchronize();
    await helpers_1.insertDataFromTheFiles(tables);
    console.log('DB connected');
    app.listen({ port: process.env.PORT || 3000 }, () => console.log('Web Server is running on port 3000...'));
})();
//# sourceMappingURL=index.js.map