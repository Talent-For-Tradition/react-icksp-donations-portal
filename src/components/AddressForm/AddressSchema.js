import Joi from 'joi';

const schema = Joi.object({
  fullname: Joi.string()
    .min(3)
    .max(42)
    .required(),
  country: Joi.string()
    .alphanum()
    .min(2)
    .max(42)
    .required(),
  addr1: Joi.string()
    .min(3)
    .max(42)
    .required(),
  addr2: Joi.string().allow(''),
  city: Joi.string()
    .min(3)
    .max(42)
    .required(),
  zip: Joi.string()
    .alphanum()
    .max(12)
    .required(),
  state: Joi.string()
    .alphanum()
    .min(2)
    .max(2)
    .required(),
  email: Joi.string().email({ tlds: {allow: false} })
});

export default schema;
