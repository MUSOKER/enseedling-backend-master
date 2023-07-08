const express = require('express');
const contactController = require('../../controllers/contact');

const contactsRoutes = express.Router();

contactsRoutes.post('/create', contactController.addContact);
contactsRoutes.get('/getAll', contactController.findContacts);
contactsRoutes.get('/:contactId', contactController.findContact);
contactsRoutes.delete('/:contactId', contactController.removeContact);
module.exports = contactsRoutes;
