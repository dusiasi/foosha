const mongoose = require('./index');

// defining data structure
const Item = new mongoose.Schema ({
  title: String,
  description: String,
  owner: String,
  date: { type: Date, default: Date.now() },
  /*
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  */
  available: {type: Boolean, default: true},
  image:
    {
        data: Buffer,
        contentType: String
    },
  });

const ItemModel = mongoose.model('items', Item);
module.exports = ItemModel;
