/**
 * Request Logging Middleware
 */

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({filename: 'combined.log'}),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});

function logRequest(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userId: req.user?.id,
    });
  });

  next();
}

module.exports = {
  logRequest,
};

