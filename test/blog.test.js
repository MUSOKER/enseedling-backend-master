const chai = require('chai');
const chaiHttp = require('chai-http');
// const fs = require('fs');

const { expect } = chai;
const {
  describe, it, beforeEach, afterEach,
} = require('mocha');
const app = require('../src/app');
const Blog = require('../src/models/blog.models');

chai.use(chaiHttp);
describe('Blog API tests', () => {
  let blogId = null;
  beforeEach(async () => {
    const blog = await Blog.create({

      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOlivia Smith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    });
    blogId = blog._id;
  });

  afterEach(async () => {
    // delete the blog created in beforeEach hook
    await Blog.deleteOne({ _id: blogId });
  });
  it('should create a new blog', (done) => {
    const blog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(blog).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data.blog).to.have.property('_id');
      expect(res.body.data.blog.title).to.equal(blog.title);
      done();
    });
  });

  it('Should get a blog by id', (done) => {
    chai.request(app).get(`/blog/${blogId}`).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data.blog).to.have.property('_id');
      expect(res.body.data.blog.title).to.equal('effgjrjg');
      done();
    });
  });
  it('Should not get a blog but rather an error for invalid id', (done) => {
    chai.request(app).get('/blog/643f1035c514f636cd61e5cb').end((err, res) => {
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.error.key).to.equal('NotFound');
      expect(res.body.error.message).to.equal('Blog');
      done();
    });
  });

  it('Should update a blog by id', (done) => {
    const updatedBlog = {
      title: 'Updated Post',
      smallDescription: 'This post has been updated',
    };
    chai.request(app).put(`/blog/${blogId}`).send(updatedBlog).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body.data.message).to.equal('Blog updated successfully');
      done();
    });
  });
  it('Should not update a blog title by id with an invalid title', (done) => {
    const updatedBlog = {
      title: ['Updated Post'],
      smallDescription: 'This post has been updated',
    };
    chai.request(app).put(`/blog/${blogId}`).send(updatedBlog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('title');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Title" must be a string');
      done();
    });
  });
  it('Should not update a blog small description by id with an invalid small description', (done) => {
    const updatedBlog = {
      title: 'Updated Post',
      smallDescription: ['This post has been updated'],
    };
    chai.request(app).put(`/blog/${blogId}`).send(updatedBlog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('smallDescription');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Small Description" must be a string');
      done();
    });
  });
  it('should delete blog by id', (done) => {
    chai.request(app).delete(`/blog/${blogId}`).end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should not delete blog for non existing blog (invalid) id', (done) => {
    chai.request(app).delete('/blog/643f1035c514f636cd61e5cb').end((err, res) => {
      expect(res.body.data.deletedBlog).to.equal(null);
      done();
    });
  });

  it('should bring an error for invalid title', (done) => {
    const invalidTitleblog = {
      title: ['effgjrjg'],
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidTitleblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('title');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Title" must be a string');
      done();
    });
  });
  it('should bring an error for invalid smallDescription', (done) => {
    const invalidSmallDescriptionblog = {
      title: 'effgjrjg',
      smallDescription: ['dfvfgfdfd'],
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidSmallDescriptionblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('smallDescription');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Small Description" must be a string');
      done();
    });
  });
  it('should bring an error for invalid description', (done) => {
    const invalidDescriptionblog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: ['dddf'],
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidDescriptionblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('description');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Description" must be a string');
      done();
    });
  });
  it('should bring an error for invalid Date', (done) => {
    const invalidDateblog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: 'ffvdffg',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: 'fdfsdfffg',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidDateblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('createdOn');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Created On" must be a valid date');
      done();
    });
  });
  it('should bring an error for invalid publication status', (done) => {
    const invalidPubStatusblog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 'good',
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidPubStatusblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('publicationStatus');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Publication Status" must be one of [0, 1, 2]');
      done();
    });
  });
  it('should bring an error for invalid isScheduled', (done) => {
    const invalidisScheduledblog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: 2,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidisScheduledblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('isScheduled');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Is Scheduled" must be one of [true, false]');
      done();
    });
  });
  it('should bring an error for invalid thumbnail', (done) => {
    const invalidThumbnailblog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: ['NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall'],
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidThumbnailblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('thumbnail');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Thumbnail" must be a string');
      done();
    });
  });
  it('should bring an error for invalid create By', (done) => {
    const invalidCreatedByblog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: ['Kemal'],
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidCreatedByblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('createdBy');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Created By" must be a string');
      done();
    });
  });
  it('should bring an error for invalid author Image', (done) => {
    const invalidAuthorImageblog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: ['ddfgdfddff'],
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: ['best'],
    };
    chai.request(app).post('/blog/create').send(invalidAuthorImageblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('authorImage');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Author Image" must be a string');
      done();
    });
  });
  it('should bring an error for invalid category', (done) => {
    const invalidCategoryblog = {
      title: 'effgjrjg',
      smallDescription: 'dfvfgfdfd',
      description: 'dddf',
      createdBy: 'Kemal',
      authorImage: 'ddfgdfddff',
      createdOn: '03/04/2023',
      publicationStatus: 1,
      isScheduled: true,
      scheduledOn: '04/04/2023',
      thumbnail: 'NameOliviaSmith\nAge:28\nOccupation:ournalist\n\nOliviaisatall',
      category: 'best',
    };
    chai.request(app).post('/blog/create').send(invalidCategoryblog).end((err, res) => {
      expect(res).to.have.status(400);
      expect(res.body).to.have.an('object');
      expect(res.body.error.fields[0]).to.have.property('key').that.equals('category');
      expect(res.body.error.fields[0]).to.have.property('message').that.equals('"Category" must be an array');
      done();
    });
  });
  it('Should upload an image to Google Drive and return a public URL', (done) => {
    chai.request(app).post('/blog/upload').attach('image', './uploads/1682929844967.png').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.an('object');
      expect(res.body.data).to.have.property('webViewLink');
      done();
    });
  });
  it('Should return an error if no image is provided', (done) => {
    chai.request(app).post('/blog/upload').end((err, res) => {
      expect(res).to.have.status(500);
      expect(res.body.error.message).to.equal('Internal Server Error');
      done();
    });
  });
  // it('Should return an error if it is not an image provided', (done) => {
  //   chai.request(app).post('/blog/upload').attach('image', './uploads/communication.docx').end((err, res) => {
  //     expect(res).to.have.status(500);
  //     expect(res.body).to.have.property('error');
  //     expect(res.body.error.message).to.equal('Invalid type, Insert an image ');
  //     done();
  //   });
  // });
  // afterEach(() => {
  //   // Delete the test image file
  //   fs.unlinkSync('./uploads/1682928151212.png');
  // });
});
