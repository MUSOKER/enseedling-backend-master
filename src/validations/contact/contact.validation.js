const enseedlingValidations = require('@Enseedling/enseedling-validations');
const Joi = require('joi');

const addContactValidation = Joi.object().keys({
  name: enseedlingValidations.generic.string.medium.required().label('Name'),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).label('Email'),
  createdOn: Joi.date().required().label('Created On'),
  contactNumber: Joi.string().regex(/^\+(?:[0-9] ?){6,14}[0-9]$/).required().label('Contact Number'),
  message: enseedlingValidations.generic.string.any.required().label('Message'),
});

const contactIdValidation = Joi.object().keys({
  contactId: enseedlingValidations._id.required().label('Contact Id'),
});
module.exports = {
  addContactValidation,
  contactIdValidation,

};
