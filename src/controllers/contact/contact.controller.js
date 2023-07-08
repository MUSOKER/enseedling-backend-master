const { error, success } = require('@Enseedling/enseedling-lib-handler');
const { contactValidation } = require('../../validations');
const { contactServices } = require('../../services');

const addContact = async (req, res, next) => {
  try {
    const {
      name,
      email,
      createdOn,
      contactNumber,
      message,
    } = await contactValidation.addContactValidation.validateAsync(req.body);

    const contact = await contactServices.createContact({
      name,
      email,
      createdOn,
      contactNumber,
      message,
    });
    return success.handler({ contact }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const findContacts = async (req, res, next) => {
  try {
    const contacts = await contactServices.getContacts();
    return success.handler({ contacts }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

const findContact = async (req, res, next) => {
  try {
    const contactId = await contactValidation.contactIdValidation.validateAsync(req.params);
    const contact = await contactServices.getContact(contactId);
    if (!contact) {
      throw error.throwNotFound({ message: 'Contact' });
    }
    return success.handler({ contact }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};
const removeContact = async (req, res, next) => {
  try {
    const { contactId } = await contactValidation.contactIdValidation.validateAsync(req.params);
    const deletedContact = await contactServices.deleteContact(contactId);
    return success.handler({ deletedContact }, req, res, next);
  } catch (err) {
    return error.handler(err, req, res, next);
  }
};

module.exports = {
  addContact, findContacts, findContact, removeContact,
};
