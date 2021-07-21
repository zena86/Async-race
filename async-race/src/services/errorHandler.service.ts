import { ErrorCode } from './constants';
import ServerError from './error';

export default class ErrorHandler {
  constructor(private response: Response, private errorOwner: string) {}

  static init(response: Response, errorOwner: string): ErrorHandler {
    return new ErrorHandler(response, errorOwner);
  }

  handle400(): ErrorHandler {
    if (this.response.status === 400)
      throw new ServerError(this.errorOwner, ErrorCode.badRequest);
    return this;
  }

  handle404(): ErrorHandler {
    if (this.response.status === 404)
      throw new ServerError(this.errorOwner, ErrorCode.notFound);
    return this;
  }

  handle429(): ErrorHandler {
    if (this.response.status === 429)
      throw new ServerError(this.errorOwner, ErrorCode.tooManyRequests);
    return this;
  }

  handle500(): ErrorHandler {
    if (this.response.status === 500)
      throw new ServerError(this.errorOwner, ErrorCode.internalServerError);
    return this;
  }

  handleUnknown(): void {
    throw new ServerError(this.errorOwner, ErrorCode.unknown);
  }
}
