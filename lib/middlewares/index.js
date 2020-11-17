"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const validation_error_1 = __importDefault(require("../helpers/errors/validation.error"));
async function errorHandler(err, req, res, next) {
    switch (err.name) {
        case 'ValidationError':
            res.status(400).send('Validation error');
            break;
        case 'CastError':
            res.status(400).send('Validation error');
            break;
        default:
            console.error(err);
            res.sendStatus(err.status || 500);
            break;
    }
}
function validationCheck(req, res, next) {
    try {
        const { page, itemsPerPage, fromDate, toDate } = req.query;
        switch (req.url.substr(0, 6)) {
            case '/users':
                if ((page && +page != page) || (itemsPerPage && +itemsPerPage != itemsPerPage)) {
                    throw new Error('Page or items per page');
                }
                break;
            case '/user/':
                if (req.params.id && typeof +req.params.id !== 'number')
                    throw new Error('Id is not valid');
                if (fromDate && !helpers_1.checkIsDateFormatValid(fromDate))
                    throw new Error('fromDate is not valid');
                if (toDate && !helpers_1.checkIsDateFormatValid(toDate))
                    throw new Error('toDate is not valid');
                break;
        }
    }
    catch (error) {
        console.error(error);
        throw new validation_error_1.default(error);
    }
    next();
}
exports.default = {
    validationCheck,
    errorHandler,
};
//# sourceMappingURL=index.js.map