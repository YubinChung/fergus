import Joi from 'joi'

const create = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
  title: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string(),
  note: Joi.string()
});

const update = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().required(),
  title: Joi.string().required(),
  phone: Joi.string(),
  email: Joi.string(),
  note: Joi.string()
});


export default { create, update };