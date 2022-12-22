const { BadRequestError, InternalServerError, ForbiddenError } = require('./errors/api-errors');
const stripeErrorHandler = (err) => {
  let error = err;

  switch (err.type) {
    case 'StripeCardError':
      error = new BadRequestError([err.message]);
      break;
    case 'StripeRateLimitError':
      error = new BadRequestError(['Too many requests made to the API too quickly']);
      break;
    case 'StripeInvalidRequestError':
      error = new BadRequestError(["Invalid parameters were supplied to Stripe's API"]);
      break;
    case 'StripeAPIError':
      error = new InternalServerError(["An error occurred internally with Stripe's API"]);
      break;
    case 'StripeConnectionError':
      error = new InternalServerError([
        'Some kind of error occurred during the HTTPS communication',
      ]);
      break;
    case 'StripeAuthenticationError':
      error = new ForbiddenError(['You probably used an incorrect API key']);
      break;
    default:
      break;
  }

  return error;
};

module.exports = {
  stripeErrorHandler,
};
