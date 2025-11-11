/**
 * Error Handling Middleware
 */

const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: 'error.log'}),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

/**
 * Global error handler
 */
function errorHandler(err, req, res, next) {
  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    userId: req.user?.id,
  });

  // Send error response
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {stack: err.stack}),
  });
}

module.exports = {
  errorHandler,
};

