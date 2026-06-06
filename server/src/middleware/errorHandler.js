function notFoundHandler(request, response) {
  response.status(404).json({
    success: false,
    error: {
      message: `Route ${request.method} ${request.originalUrl} was not found.`,
    },
  });
}

function errorHandler(error, _request, response, _next) {
  const statusCode = error.statusCode || 500;

  response.status(statusCode).json({
    success: false,
    error: {
      message: error.message || 'Something went wrong.',
      details: error.details || null,
    },
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
