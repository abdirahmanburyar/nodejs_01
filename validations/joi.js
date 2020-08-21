const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().min(8).max(254).lowercase().trim().required(),
    password: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().min(8).max(254).lowercase().trim().required(),
    password: Joi.string().required(),
})


  module.exports = {
      registerSchema,
      loginSchema
  }