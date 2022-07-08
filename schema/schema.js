const Joi = require('joi');

const nameSchema = Joi.object({
  name: Joi.string().required().min(5).messages({
    'any.required': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

module.exports = {
  nameSchema,
};