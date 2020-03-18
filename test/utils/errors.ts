import { ErrorCode, HttpStatus } from '../../src/types/errors';
import { _generateError } from '../../src/utils/errors';

export const badRequestMessage = 'bad request';
export const internalServerErrorMessage = 'internal server error';
export const forbiddenMessage = 'forbidden';
export const notFoundMessage = 'not found';
export const conflictMessage = 'conflict';
export const unauthorizedMessage = 'unauthorized';

export const badRequestError = {
  byCode: _generateError({
    code: ErrorCode.BAD_REQUEST,
    message: badRequestMessage,
  }),
  byStatus: _generateError({
    status: HttpStatus.BAD_REQUEST,
    message: badRequestMessage,
  }),
};

export const internalServerError = {
  byCode: _generateError({
    code: ErrorCode.INTERNAL_SERVER_ERROR,
    message: internalServerErrorMessage,
  }),
  byStatus: _generateError({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: internalServerErrorMessage,
  }),
};

export const forbiddenError = {
  byCode: _generateError({ code: ErrorCode.FORBIDDEN, message: forbiddenMessage }),
  byStatus: _generateError({ status: HttpStatus.FORBIDDEN, message: forbiddenMessage }),
};

export const notFoundError = {
  byCode: _generateError({ code: ErrorCode.NOT_FOUND, message: notFoundMessage }),
  byStatus: _generateError({ status: HttpStatus.NOT_FOUND, message: notFoundMessage }),
};

export const conflictError = {
  byCode: _generateError({ code: ErrorCode.CONFLICT, message: conflictMessage }),
  byStatus: _generateError({ status: HttpStatus.CONFLICT, message: conflictMessage }),
};

export const unauthorizedError = {
  byCode: _generateError({
    code: ErrorCode.UNAUTHORIZED,
    message: unauthorizedMessage,
  }),
  byStatus: _generateError({
    status: HttpStatus.UNAUTHORIZED,
    message: unauthorizedMessage,
  }),
};
