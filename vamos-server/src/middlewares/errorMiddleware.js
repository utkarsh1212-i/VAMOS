import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const globalErrorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  // Set default values if missing
  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  // For production, avoid sending stack traces
  const isProduction = process.env.NODE_ENV === 'production';

  // Response to the frontend
  res.status(statusCode).json({
    success: false,
    status,
    message: err.message,
    ...(isProduction ? null : { stack: err.stack }), // Show stack only in development
  });
};

export default globalErrorHandler;
