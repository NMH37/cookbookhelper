const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
  items: {
    type: [String],
    required: [true, 'Enter title!'],
    trim: true
  },
  ingredient_belongs_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', ingredientSchema);
