const enseedlingValidations = require('@Enseedling/enseedling-validations');
const Joi = require('joi');
const { BLOGS_STATUS } = require('../../const');

const addBlogValidation = Joi.object().keys({
  title: enseedlingValidations.generic.string.medium.required().label('Title'),
  smallDescription: enseedlingValidations.generic.string.any
    .required()
    .label('Small Description'),
  description: enseedlingValidations.generic.string.any
    .required()
    .label('Description'),
  createdBy: enseedlingValidations.generic.string.any
    .required()
    .label('Created By'),
  authorImage: enseedlingValidations.generic.string.any
    .required()
    .label('Author Image'),
  createdOn: Joi.date().required().label('Created On'),
  category: Joi.array()
    .items(enseedlingValidations.generic.string.small)
    .required()
    .label('Category'),
  thumbnail: enseedlingValidations.generic.string.any.label('Thumbnail'),
  isScheduled: enseedlingValidations.generic.boolean
    .valid(true, false)
    .label('Is Scheduled'),
  scheduledOn: Joi.date().label('Scheduled On'),
  publicationStatus: enseedlingValidations.generic.number.integer
    .valid(BLOGS_STATUS.DRAFT, BLOGS_STATUS.LIVE, BLOGS_STATUS.UNLIVE)
    .label('Publication Status'),
});

const getBlogsValidation = Joi.object().keys({
  title: enseedlingValidations.generic.string.medium.label('Title'),
  category: Joi.array()
    .items(enseedlingValidations.generic.string.small)
    .label('Category'),
  publicationStatus: enseedlingValidations.generic.number.integer
    .valid(BLOGS_STATUS.DRAFT, BLOGS_STATUS.LIVE, BLOGS_STATUS.UNLIVE)
    .label('Publication Status'),
});

const blogIdValidation = Joi.object().keys({
  blogId: enseedlingValidations._id.required().label('Blog Id'),
});

const updateBlogValidation = Joi.object().keys({
  title: enseedlingValidations.generic.string.medium.label('Title'),
  smallDescription: enseedlingValidations.generic.string.any
    .label('Small Description'),
  description: enseedlingValidations.generic.string.any
    .label('Description'),
  createdBy: enseedlingValidations.generic.string.any
    .label('Created By'),
  authorImage: enseedlingValidations.generic.string.any
    .label('Author Image'),
  createdOn: Joi.date().label('Created On'),
  category: Joi.array()
    .items(enseedlingValidations.generic.string.small)
    .label('Category'),
  thumbnail: enseedlingValidations.generic.string.any.label('Thumbnail'),
  isScheduled: enseedlingValidations.generic.boolean
    .valid(true, false)
    .label('Is Scheduled'),
  scheduledOn: Joi.date().label('Scheduled On'),
  publicationStatus: enseedlingValidations.generic.number.integer
    .valid(BLOGS_STATUS.DRAFT, BLOGS_STATUS.LIVE, BLOGS_STATUS.UNLIVE)
    .label('Publication Status'),
});

module.exports = {
  addBlogValidation,
  getBlogsValidation,
  blogIdValidation,
  updateBlogValidation,
};
