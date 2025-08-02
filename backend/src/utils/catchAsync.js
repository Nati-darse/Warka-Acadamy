/**
 * Async Error Handler Wrapper
 * Wraps async functions to catch errors and pass them to the global error handler
 * 
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - Express middleware function
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
