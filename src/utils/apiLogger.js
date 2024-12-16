// logger.js
const morgan = require('morgan');
const chalk = require('chalk');

// Define custom tokens for colored status codes
morgan.token('statusColored', (req, res) => {
  const status = res.statusCode;
  if (status >= 500) return chalk.red(status);    // 5xx errors
  if (status >= 400) return chalk.yellow(status); // 4xx errors
  if (status >= 200) return chalk.green(status);  // 2xx success
  return status;
});

// Define the custom format for Morgan using the colored status token
const format = ':method :url :statusColored :response-time ms - :res[content-length]';

// Export the Morgan middleware with the custom format
const logger = morgan(format);

module.exports = logger;
