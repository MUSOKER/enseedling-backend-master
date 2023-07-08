const { ContactModel } = require('../../models');

const createContact = async ({
  name,
  email,
  createdOn,
  contactNumber,
  message,
}) => ContactModel.create({
  name,
  email,
  createdOn,
  contactNumber,
  message,
});

const getContacts = async () => ContactModel.find({});

const getContact = async ({ contactId }) => ContactModel.findById(contactId);
const deleteContact = async (contactId) => ContactModel.findByIdAndDelete(contactId);

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
};
