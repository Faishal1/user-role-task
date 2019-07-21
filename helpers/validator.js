import Joi from "joi";

// define the validation schema
export default {
  schema: Joi.object({
    body: Joi.object({
      // name is required
      // name must be unique
      name: Joi.string().required(),
      // email is required
      // email must be a valid email string
      email: Joi.string()
        .required()
        .regex(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
      // mobile_number is required
      // and must be a string of the format XXXXXXXXXX
      // where digit (0-9)
      mobile_number: Joi.string()
        .regex(/^\d{10}$/)
        .required(),
      // full_address is required
      full_address: Joi.string().required(),
      // role is optional only for the first user
      role: Joi.string()
    })
  })
};
