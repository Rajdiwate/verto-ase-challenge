import Ajv, { ErrorObject } from 'ajv';
import ajvErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../utils';

const ajvInstance = new Ajv({ allErrors: true, coerceTypes: true });
// formats
addFormats(ajvInstance);
// Custom Error Messages
ajvErrors(ajvInstance);

// custom formats
ajvInstance.addFormat('jwt', /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
ajvInstance.addFormat(
  'password',
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
); // password format: min 8 chars, at least 1 lowercase, 1 uppercase, 1 digit, 1 special char

export type ValidationErrorObject = {
  field: string;
  message: string;
  in: 'body' | 'params' | 'query';
};

type Schema = object;

const runValidation = (
  data: unknown,
  schema: Schema,
  where: 'body' | 'params' | 'query'
): ValidationErrorObject[] => {
  const validateFn = ajvInstance.compile(schema);
  const valid = validateFn(data);
  if (valid) {
    return [];
  }
  const formattedErrors: ValidationErrorObject[] = (validateFn.errors || []).map(
    (err: ErrorObject) => {
      const field = err.instancePath.replace('/', '') ?? 'unknown';
      const message = err.message ?? 'Invalid Input';
      return {
        field,
        message,
        in: where,
      };
    }
  );

  return formattedErrors;
};

export type ValidationSchemas = {
  body?: Schema;
  params?: Schema;
  query?: Schema;
};

export const validate =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction): void => {
    let errors: ValidationErrorObject[] = [];

    if (schemas.params) {
      errors = errors.concat(runValidation(req.params, schemas.params, 'params'));
    }
    if (schemas.query) {
      errors = errors.concat(runValidation(req.query, schemas.query, 'query'));
    }
    if (schemas.body) {
      errors = errors.concat(runValidation(req.body, schemas.body, 'body'));
    }
    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors,
      });
    } else {
      next();
    }
  };
