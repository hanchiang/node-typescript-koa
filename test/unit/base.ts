import { expect } from 'chai';
import sinon from 'sinon';

import { catchAndPropagateError, notFound } from '../../src/middlewares';
import { ErrorCode, HttpStatus } from '../../src/types/errors';
import * as errors from '../utils/errors';

describe('Base unit tests', () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      app: {
        emit: sinon.spy(),
      },
      status: undefined,
      body: {
        error: {
          code: undefined,
          message: undefined,
        },
      },
      request: {
        url: '/url',
      },
    };
  });

  afterEach(() => {
    ctx.app.emit.resetHistory();
  });

  describe('catchAndPropagateError()', () => {
    const expectError = (
      ctx: any,
      httpStatus: number,
      errorCode: ErrorCode,
      errorMessage: string
    ) => {
      expect(ctx.status).to.equal(httpStatus);
      expect(ctx.body.error.code).to.equal(errorCode);
      expect(ctx.body.error.message).to.equal(errorMessage);
      expect(ctx.app.emit.called).to.equal(true);
    };

    it('bad request by code', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.badRequestError.byCode));
      expectError(ctx, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST, errors.badRequestMessage);
    });

    it('bad request by status', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.badRequestError.byStatus));
      expectError(ctx, HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST, errors.badRequestMessage);
    });

    it('internal server error by code', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.internalServerError.byCode));
      expectError(
        ctx,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        errors.internalServerErrorMessage
      );
    });

    it('internal server error by status', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.internalServerError.byStatus));
      expectError(
        ctx,
        HttpStatus.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        errors.internalServerErrorMessage
      );
    });

    it('forbidden by code', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.forbiddenError.byCode));
      expectError(ctx, HttpStatus.FORBIDDEN, ErrorCode.FORBIDDEN, errors.forbiddenMessage);
    });

    it('forbidden by status', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.forbiddenError.byStatus));
      expectError(ctx, HttpStatus.FORBIDDEN, ErrorCode.FORBIDDEN, errors.forbiddenMessage);
    });

    it('not found by code', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.notFoundError.byCode));
      expectError(ctx, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND, errors.notFoundMessage);
    });

    it('not found by status', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.notFoundError.byStatus));
      expectError(ctx, HttpStatus.NOT_FOUND, ErrorCode.NOT_FOUND, errors.notFoundMessage);
    });

    it('conflict by code', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.conflictError.byCode));
      expectError(ctx, HttpStatus.CONFLICT, ErrorCode.CONFLICT, errors.conflictMessage);
    });

    it('conflict by status', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.conflictError.byStatus));
      expectError(ctx, HttpStatus.CONFLICT, ErrorCode.CONFLICT, errors.conflictMessage);
    });

    it('unauthorized by code', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.unauthorizedError.byCode));
      expectError(ctx, HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, errors.unauthorizedMessage);
    });

    it('unauthorized by status', async () => {
      await catchAndPropagateError(ctx, sinon.stub().throws(errors.unauthorizedError.byStatus));
      expectError(ctx, HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED, errors.unauthorizedMessage);
    });

    it('success', async () => {
      await catchAndPropagateError(ctx, sinon.stub().resolves());
      expect(ctx.status).to.equal(undefined);
      expect(ctx.body.error.code).to.equal(undefined);
      expect(ctx.body.error.message).to.equal(undefined);
    });
  });

  it('notFound()', async () => {
    let error;
    try {
      await notFound(ctx);
    } catch (e) {
      error = e;
    } finally {
      expect(error.code).to.equal(ErrorCode.NOT_FOUND);
      expect(error.message).to.equal(`${ctx.request.url} is not found`);
    }
  });
});
