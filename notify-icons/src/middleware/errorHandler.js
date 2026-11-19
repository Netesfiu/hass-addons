/**
 * Global error handler middleware
 */
function errorHandler(err, req, res, next) {
  console.error('Error:', err.message);
  
  // Determine status code based on error type
  let statusCode = 500;
  let message = 'Internal Server Error';
  
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message || 'Invalid request parameters';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = err.message || 'Resource not found';
  } else if (err.name === 'FetchError') {
    statusCode = 502;
    message = 'Error fetching SVG from CDN';
  } else if (err.name === 'ConversionError') {
    statusCode = 500;
    message = 'Error converting SVG to PNG';
  }
  
  // Send error response
  res.status(statusCode).json({
    error: {
      message,
      status: statusCode
    }
  });
}

// Custom error classes
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class FetchError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FetchError';
  }
}

class ConversionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConversionError';
  }
}

module.exports = {
  errorHandler,
  ValidationError,
  NotFoundError,
  FetchError,
  ConversionError
};
