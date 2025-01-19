import { HttpError } from "./http";

export class BadRequestError extends HttpError {
  constructor(message = "Bad Request") {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

export class ValidationError extends BadRequestError {}
