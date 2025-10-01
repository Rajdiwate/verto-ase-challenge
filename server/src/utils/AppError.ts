// Custom Error Class
export class AppError extends Error {
    public success: boolean;
    public statusCode: number;
    public data?: unknown;
  
    constructor(
      message: string, 
      statusCode: number = 400, 
      data?: unknown
    ) {
      super(message);
      this.success = false;
      this.statusCode = statusCode;
      this.data = data;
      this.name = this.constructor.name;
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }