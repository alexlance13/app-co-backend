"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
async function errorHandler(err, req, res, next) {
    switch (err.name) {
        case 'JsonWebTokenError':
            res.status(401).send('Invalid token');
            break;
        case 'ValidationError':
            res.status(400).send('Validation error');
            break;
        case 'CastError':
            res.status(400).send('Validation error');
            break;
        case 'MulterError':
            res.status(400).send('Image too large');
            break;
        default:
            console.error(err);
            res.sendStatus(err.status || 500);
            break;
    }
}
function validationCheck(req, res, next) {
    var _a, _b, _c, _d;
    try {
        console.log(req.url);
        switch (req.url.substr(0, 6)) {
            case '/users':
                if (typeof ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) !== 'number' || typeof ((_b = req.query) === null || _b === void 0 ? void 0 : _b.itemsPerPage) !== 'number')
                    throw new Error('Page or items per page');
                break;
            case '/user/':
                if (typeof req.params.id !== 'number')
                    throw new Error('Id is not valid');
                if (((_c = req.query) === null || _c === void 0 ? void 0 : _c.fromDate) && !helpers_1.checkIsDateFormatValid(req.query.fromDate))
                    throw new Error('fromDate is not valid');
                if (((_d = req.query) === null || _d === void 0 ? void 0 : _d.toDate) && !helpers_1.checkIsDateFormatValid(req.query.toDate))
                    throw new Error('toDate is not valid');
                break;
        }
    }
    catch (error) {
        console.error(error);
        throw new helpers_1.ValidationError(error);
    }
    next();
}
exports.default = {
    validationCheck,
    errorHandler
};
//# sourceMappingURL=index.js.map