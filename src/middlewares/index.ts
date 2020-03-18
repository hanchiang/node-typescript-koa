import { throwError, getHttpStatusFromCode, getCodeFromHttpStatus } from '../utils/errors';
import { ErrorCode } from '../types/errors';

export const catchAndPropagateError = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // errors may have either .code or .status
    const message = err.message;
    ctx.status = err.status || getHttpStatusFromCode(err.code);

    ctx.body = {
      error: {
        code: err.code || getCodeFromHttpStatus(err.status),
        message,
      },
    };

    // since we handled this manually we'll want to delegate to the regular app
    // level error handling as well so that centralized still functions correctly.
    ctx.app.emit('error', err, ctx);
  }
};

export const notFound = (ctx) => {
  throwError({
    code: ErrorCode.NOT_FOUND,
    message: `${ctx.request.url} is not found`,
  });
};
