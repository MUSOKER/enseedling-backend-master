const { createContact } = require('./contact.service');
const { getContacts } = require('./contact.service');
const { getContact } = require('./contact.service');
const { deleteContact } = require('./contact.service');

module.exports = {
  createContact, getContacts, getContact, deleteContact,
};
