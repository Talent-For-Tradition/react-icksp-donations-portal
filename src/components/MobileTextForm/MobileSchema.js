import Joi from 'joi';

const schema = Joi.object({
  hour: Joi.string()
    .min(6)
    .max(7)
    .required(),
  mobile: Joi.string()
    .alphanum()
    .min(10)
    .max(42)
    .required(),
  timezone: Joi.string()
    .min(2)
    .max(3)
    .required()
});

export default schema;
