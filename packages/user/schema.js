const Joi = require('joi');

const emailSchema = Joi.string()
  .email({ tlds: { allow: false } }) // Disallow top-level domains (TLDs) in the email address for stricter validation
  .required();

const passwordSchema = Joi.string()
  .min(8) // Minimum password length
  .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'password') // Password should contain at least one digit, one lowercase and one uppercase letter
  .required();

const userSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

module.exports = {
  userSchema
}
