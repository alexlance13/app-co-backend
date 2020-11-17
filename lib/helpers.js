"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIsDateFormatValid = exports.fromSnakeToCamelCase = exports.insertDataFromTheFiles = void 0;
const typeorm_1 = require("typeorm");
const moment_1 = __importDefault(require("moment"));
async function insertDataFromTheFiles(tables) {
    try {
        for (const [tableName, fileName] of Object.entries(tables)) {
            const { default: data } = await Promise.resolve().then(() => __importStar(require(`../src/db/data/${fileName}.json`)));
            await Promise.all(data.map(async (row) => {
                const repository = await typeorm_1.getRepository(fromSnakeToCamelCase(tableName));
                const entity = repository.create(row);
                return repository.save(entity);
            }));
        }
        ;
    }
    catch (error) {
        console.error(`InsertingDataError: ${error}`);
    }
    ;
}
exports.insertDataFromTheFiles = insertDataFromTheFiles;
function fromSnakeToCamelCase(string) {
    return string.split('_').map(e => e[0].toUpperCase() + e.slice(1)).join('');
}
exports.fromSnakeToCamelCase = fromSnakeToCamelCase;
function checkIsDateFormatValid(date) {
    const newDate = date.split('%').join(' ');
    const allowedDateFormats = [moment_1.default.HTML5_FMT.DATE, moment_1.default.ISO_8601, moment_1.default.HTML5_FMT.DATETIME_LOCAL, moment_1.default.HTML5_FMT.DATETIME_LOCAL_MS,
        moment_1.default.HTML5_FMT.DATETIME_LOCAL_SECONDS, 'YYYY-MM-DD HH:MM', 'YYYY-MM-DD HH:MM:SS', 'YYYY-MM-DD HH:MM:SS.SSS'];
    return moment_1.default(newDate, allowedDateFormats, true).isValid();
}
exports.checkIsDateFormatValid = checkIsDateFormatValid;
//# sourceMappingURL=helpers.js.map