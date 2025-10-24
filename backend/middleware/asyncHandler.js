// THE ASYNCHANDLER FUNCTION - used with mongoose methods in our controllers - vid24 mern-ecommerce
// allows us to avoid using try/catch block for async functions when using mongoose methods like finding data from database. Async functions returns a promise. When you look in the controllers, where we use mongoose methods, we do so without the use of try/catch.

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
