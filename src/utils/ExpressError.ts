export class ExpressError extends Error {
  private error;
  constructor(message: string, status: number, error?: any) {
    super(message);
    this.error = this.message;
    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, ExpressError.prototype);
    Object.defineProperty(this, "statusCode", {
      value: status,
    });
  }

  public getError() {
    return {
      message: this.message,
      error: this.error,
    };
  }
}
