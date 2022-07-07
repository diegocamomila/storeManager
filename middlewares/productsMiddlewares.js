const Joi = require('joi');

const PRODUCT = Joi.object({
  name: Joi.string().min(5).required(),
});

const validation = (req, _res, next) => {
  const { name } = req.body;
  const { error } = PRODUCT.validate(name);
  if (error) {
    const status = error.message.includes('required') ? 400 : 422;
    next({ status, message: error.message });
  }
  next();
};

module.exports = { validation };