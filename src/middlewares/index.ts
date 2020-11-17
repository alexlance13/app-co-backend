import { NextFunction, Request, Response } from 'express';
import { checkIsDateFormatValid } from '../helpers';
import ValidationError from '../helpers/errors/validation.error';
import HttpException from '../helpers/errors/httpexception';

async function errorHandler(err: HttpException, req: Request, res: Response, next): Promise<void> {
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

function validationCheck(req: Request, res: Response, next: NextFunction): void {
  try {
    const { page, itemsPerPage, fromDate, toDate } = req.query;
    switch (req.url.substr(0, 6)) {
      case '/users':
        // @ts-ignore
        if ((page && +page != page) || (itemsPerPage && +itemsPerPage != itemsPerPage)) {
          throw new Error('Page or items per page');
        }
        break;
      case '/user/':
        if (req.params.id && typeof +req.params.id !== 'number') throw new Error('Id is not valid');
        if (fromDate && !checkIsDateFormatValid(fromDate as string)) throw new Error('fromDate is not valid');
        if (toDate && !checkIsDateFormatValid(toDate as string)) throw new Error('toDate is not valid');
        break;
    }
  } catch (error) {
    console.error(error);
    throw new ValidationError(error);
  }
  next();
}

export default {
  validationCheck,
  errorHandler,
};
