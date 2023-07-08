const mongoose = require('mongoose');
const { BLOGS_STATUS } = require('../const');

const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    smallDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      required: true,
    },
    publicationStatus: {
      type: Number,
      enum: [BLOGS_STATUS.DRAFT, BLOGS_STATUS.LIVE, BLOGS_STATUS.UNLIVE],
      required: true,
    },
    isScheduled: {
      type: Boolean,
      default: false,
    },
    scheduledOn: {
      type: Date,
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: Array,
      default: [],
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  },
);

const BlogModel = mongoose.model('blogs', blogSchema);

module.exports = BlogModel;
