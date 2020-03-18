import { ErrorCode, HttpStatus, ThrowError } from '../types/errors';

const ERROR_CODE_TO_HTTP_STATUS = {
  [ErrorCode.BAD_REQUEST]: HttpStatus.BAD_REQUEST,
  [ErrorCode.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  [ErrorCode.FORBIDDEN]: HttpStatus.FORBIDDEN,
  [ErrorCode.NOT_FOUND]: HttpStatus.NOT_FOUND,
  [ErrorCode.CONFLICT]: HttpStatus.CONFLICT,
  [ErrorCode.INTERNAL_SERVER_ERROR]: HttpStatus.INTERNAL_SERVER_ERROR,
};

const HTTP_STATUS_TO_ERROR_CODE = {
  [HttpStatus.BAD_REQUEST]: ErrorCode.BAD_REQUEST,
  [HttpStatus.UNAUTHORIZED]: ErrorCode.UNAUTHORIZED,
  [HttpStatus.FORBIDDEN]: ErrorCode.FORBIDDEN,
  [HttpStatus.NOT_FOUND]: ErrorCode.NOT_FOUND,
  [HttpStatus.CONFLICT]: ErrorCode.CONFLICT,
  [HttpStatus.INTERNAL_SERVER_ERROR]: ErrorCode.INTERNAL_SERVER_ERROR,
};

// For testing
export const _generateError = (data: ThrowError) => {
  const { code, status, message, devMessage } = data;
  const retVal: any = new Error(message);
  retVal.status = status;
  retVal.code = code;
  retVal.devMessage = devMessage;
  return retVal;
};

export const throwError = (data: ThrowError) => {
  throw _generateError(data);
};

export const getHttpStatusFromCode = (code: ErrorCode): number =>
  ERROR_CODE_TO_HTTP_STATUS[code] || HttpStatus.INTERNAL_SERVER_ERROR;

export const getCodeFromHttpStatus = (status: number): ErrorCode =>
  HTTP_STATUS_TO_ERROR_CODE[status] || ErrorCode.INTERNAL_SERVER_ERROR;
