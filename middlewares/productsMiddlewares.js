// const Joi = require('joi');

// const newProduct = Joi.object({
//   name: Joi.string().min(5).required(),
// });

// const validation = (req, _res, next) => {
//   const { name } = req.body;
//   const { error } = newProduct.validate(name);
//   if (error) {
//     const status = error.message.includes('required') ? 400 : 422;
//     next({ status, message: error.message });
//   }
//   next();
// };

const validation = (req, res, next) => {
  const {
    name,
  } = req.body;
  if (!name) {
    return res.status(400).json({
      
        message: '"name" is required',
      
    });
  }
  if (name.length < 5) {
    return res.status(422).json({
      message: '"name" length must be at least 5 characters long',
    });
  }
  next();
};

const handleError = (status, message) => ({ status, message });

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};
module.exports = {
  validation,
  handleError,
  errorMiddleware,
};