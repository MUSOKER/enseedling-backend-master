const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  },
);

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;
