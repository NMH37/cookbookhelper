const mongoose = require('mongoose');
const check_valid = require('mongoose-unique-validator');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter Recipe name!'],
    min: [3, ' Name of the Recipe needs to be atleast 3 charcters'],
    trim: true,
    unique: true
  },
  type: {
    type: String,
    required: [true, 'Enter type, it has to be atleast 3 characters long!'],
    min: [3, 'Type cannot be less than 3 characters'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Enter description of your Recipe'],
    min: [3, ' At least 3 characters for description'],
    trim: true
  },
  ingredient1: {
    type: String,
    trim: true
  },
  ingredient2: {
    type: String,
    trim: true
  },
  ingredient3: {
    type: String,
    trim: true
  },
  likes: Number,
}, { timestamps: true });
productSchema.plugin(check_valid, { message: 'Name already exists, give a new name!' });
module.exports = mongoose.model('Product', productSchema);
