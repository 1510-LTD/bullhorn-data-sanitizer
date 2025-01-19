import { HttpError, generalErrorMessage } from "./http";

export class InternalServerError extends HttpError {
  constructor(message = generalErrorMessage) {
    super(message, 500);
    this.name = "InternalServerError";
  }
}
