import { HttpError } from "./http";

export class ConflictError extends HttpError {
  constructor(message = "Conflict") {
    super(message, 409);
    this.name = "ConflictError";
  }
}
