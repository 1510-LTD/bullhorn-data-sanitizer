import { HttpError } from "./http";

export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

export class AuthorizationError extends ForbiddenError {}
