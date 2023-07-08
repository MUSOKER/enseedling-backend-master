const chai = require('chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
const {
  describe, it, beforeEach, afterEach,
} = require('mocha');
const app = require('../src/app');
const Contact = require('../src/models/contact.models');

chai.use(chaiHttp);

describe('Contact API tests', () => {
  let contactId = null;
  beforeEach(async () => {
    const contact = await Contact.create({
      name: 'rog7',
      email: 'rog7@gmail.com',
      createdOn: '10/2/2023',
      contactNumber: '+2567045673178',
      message: 'yes ofcourse',
    });
    contactId = contact._id;
  });
  afterEach(async () => {
    // delete the contact created in beforeEach hook
    await Contact.deleteOne({ _id: contactId });
  });
  it('should create a new contact', (done) => {
    const contact = {
      name: 'rog7',
      email: 'rog7@gmail.com',
      createdOn: '10/2/2023',
      contactNumber: '+2567045673178',
      message: 'yes ofcourse',
    };
    chai.request(app).post('/contact/create').send(contact).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data.contact).to.have.property('_id');
      expect(res.body.data.contact.name).to.equal(contact.name);
      done();
    });
  });
  it('Should get a contact by id', (done) => {
    chai.request(app).get(`/contact/${contactId}`).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data.contact).to.have.property('_id');
      expect(res.body.data.contact.name).to.equal('rog7');
      done();
    });
  });
  it('Should not get contact but rather an error for invalid id', (done) => {
    chai.request(app).get('/contact/643f1035c514f636cd61e5cb').end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error.key).to.equal('NotFound');
      expect(res.body.error.message).to.equal('Contact');
      done();
    });
  });

  it('should delete contact by id', (done) => {
    chai.request(app).delete(`/contact/${contactId}`).end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should not delete contact for non existing contact (invalid) id', (done) => {
    chai.request(app).delete('/contact/643f1035c514f636cd61e5cb').end((err, res) => {
      expect(res.body.data.deletedContact).to.equal(null);
      done();
    });
  });
  it('should bring an error when creating  contact for invalid Name', (done) => {
    const invalidNameContact = {
      name: ['rog7'],
      email: 'rog7@gmail.com',
      createdOn: '10/2/2023',
      contactNumber: '+2567045673178',
      message: 'yes ofcourse',
    };
    chai.request(app).post('/contact/create').send(invalidNameContact).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('name');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Name" must be a string');
      done();
    });
  });
  it('should bring an error when creating  contact for invalid email', (done) => {
    const invalidNameContact = {
      name: 'rog7',
      email: 'rog7@gmail.yes',
      createdOn: '10/2/2023',
      contactNumber: '+2567045673178',
      message: 'yes ofcourse',
    };
    chai.request(app).post('/contact/create').send(invalidNameContact).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('email');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Email" must be a valid email');
      done();
    });
  });
  it('should bring an error when creating  contact for invalid date', (done) => {
    const invalidNameContact = {
      name: 'rog7',
      email: 'rog7@gmail.com',
      createdOn: ['10/2/2023'],
      contactNumber: '+2567045673178',
      message: 'yes ofcourse',
    };
    chai.request(app).post('/contact/create').send(invalidNameContact).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('createdOn');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Created On" must be a valid date');
      done();
    });
  });
  it('should bring an error when creating  contact for invalid phone number', (done) => {
    const invalidNameContact = {
      name: 'rog7',
      email: 'rog7@gmail.com',
      createdOn: '10/2/2023',
      contactNumber: +2567045673178,
      message: 'yes ofcourse',
    };
    chai.request(app).post('/contact/create').send(invalidNameContact).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('contactNumber');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Contact Number" must be a string');
      done();
    });
  });
  it('should bring an error when creating  contact for invalid message', (done) => {
    const invalidNameContact = {
      name: 'rog7',
      email: 'rog7@gmail.com',
      createdOn: '10/2/2023',
      contactNumber: '+2567045673178',
      message: 67756,
    };
    chai.request(app).post('/contact/create').send(invalidNameContact).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('message');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Message" must be a string');
      done();
    });
  });
});
