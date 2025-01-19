export const generalErrorMessage = "Something went wrong";

export class HttpError extends Error {
  constructor(
    message: string = generalErrorMessage,
    public status: number = 500
  ) {
    super(message);
    this.name = "HttpError";
  }

  public toJSON() {
    return {
      message: this.message
    };
  }

  public toString() {
    return `${this.name}: ${this.message}`;
  }
}
