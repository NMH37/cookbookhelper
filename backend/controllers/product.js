const Product = require('./../models/product');

exports.fetchProducts = (req, res) => {
  Product.find().sort({ "type": -1 })
    .then((documents) => {
      res.status(200).json({
        Products: documents,
        message: 'Recipes Fetched from DB'
      });
    })
    .catch(() => {
      res.status(500).json({ message: 'Fetching Recipe lists failed !' })
    });
}
exports.createProduct = (req, res) => {
  console.log(req.body)
  product = new Product({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    ingredient1: req.body.ingredient1,
    ingredient2: req.body.ingredient2,
    ingredient3: req.body.ingredient3
  });
  product.save().then((product) => {
    res.status(201).json(product);
  })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message)
      res.status(500).json({ message: 'Creating a new Recipe failed', errors })
    });
}

exports.getOneProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (product) {
        res.status(200).json(product);

      } else {
        res.status(401).json({ message: 'Recipe not found' })
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Fetching Recipe failed !' })
    });
}

exports.updateProduct = (req, res) => {
  Product.updateOne({ _id: req.params.id }, req.body, { new: true }).then((result) => {

    if (result.nModified > 0) {
      res.status(200).json({ message: ' updated one' });
    }


  })
    .catch((error) => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message)

      res.status(500).json({ message: "Recipe can't be updated" }, errors)
    })
}
exports.removeProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id })
    .then((response) => {
      // console.log(response, 'checking delete method')
      if (response.n > 0) {
        res.status(200).json({ message: 'Recipe deleted' });
      } else {
        res.status(401).json({ message: 'Not available anymore!' })
      }

    })
    .catch(() => {
      res.status(500).json({ message: 'deleting is not an available option for this Recipe !' });
    });



}
