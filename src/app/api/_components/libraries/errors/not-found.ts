import { HttpError } from "./http";

export class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
