const { addContact } = require('./contact.controller');
const { findContacts } = require('./contact.controller');
const { findContact } = require('./contact.controller');
const { removeContact } = require('./contact.controller');

module.exports = {
  addContact, findContacts, findContact, removeContact,
};
