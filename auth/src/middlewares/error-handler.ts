
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error,req: Request,res: Response,next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });  //status code and error msg taken from RequestValidationError
  }

  //in other cases
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};
