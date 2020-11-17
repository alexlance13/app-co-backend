import { NextFunction, Request, Response } from 'express';
import HttpException from '../helpers/errors/httpexception';
declare function errorHandler(err: HttpException, req: Request, res: Response, next: any): Promise<void>;
declare function validationCheck(req: Request, res: Response, next: NextFunction): void;
declare const _default: {
    validationCheck: typeof validationCheck;
    errorHandler: typeof errorHandler;
};
export default _default;
