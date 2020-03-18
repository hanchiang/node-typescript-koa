/* eslint-disable no-unused-vars */

export enum ErrorCode {
  BAD_REQUEST = 'badRequest',
  INTERNAL_SERVER_ERROR = 'internalServerError',
  FORBIDDEN = 'forbidden',
  NOT_FOUND = 'notFound',
  CONFLICT = 'conflict',
  UNAUTHORIZED = 'unauthorized',
}

export enum HttpStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

// TODO: Update other codes
export enum OsStatusCode {
  SUCCESS = 0,
}

/**
 * Can either throw an error by ErrorCode or http status
 */
export interface ThrowError {
  message: string;
  code?: ErrorCode;
  status?: HttpStatus;
  devMessage?: string;
}
