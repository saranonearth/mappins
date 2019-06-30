const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PinSchema = new Schema(
  {
    title: String,

    content: String,
    image: String,
    latitude: Number,
    longitude: Number,
    author: { type: mongoose.Schema.ObjectId, ref: 'users' },
    comments: [
      {
        text: String,
        createdAt: {
          type: Date,
          default: Date.now
        },
        author: {
          type: mongoose.Schema.ObjectId,
          ref: 'users'
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = Pin = mongoose.model('pins', PinSchema);
