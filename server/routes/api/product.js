const express = require('express')
const route = express.Router();
const { check, validationResult } = require('express-validator');
const multer = require('multer');

const Product = require('../../../models/Product')
const Device = require('../../../models/Device')

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function(req, file, callback) {
    callback(null, file.originalname.replace(/:/g, '-').replace(/ /g, '_'));
  }
});
const upload = multer({ storage: Storage })


// @route    GET api/products/:id
// @desc     Get the product by ID
// @access   Public
route.get('/:id', async (req,res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product){
      return res.json({ msg: "No Product found" })
    }
    return res.json(product);
  } catch (error) {
    if(error.kind === 'ObjectId') {
      return res.json({ msg: "No Product found" })
    }
    res.status(500).send('Server Error');
  }
})

// @route    POST api/products
// @desc     Create a Product
// @access   Public
route.post(
  '/',
  upload.single('product'),
  [
    check('title', 'Product title is required')
      .not()
      .isEmpty(),
    check('brand', 'Brand is required')
      .not()
      .isEmpty(),
    check('model', 'Model is required')
      .not()
      .isEmpty(),
    check('price', 'Price is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    
    const errors = validationResult(req);
    
		if (!errors.isEmpty()) {
			return res.status(400).json({ error: errors.array() });
    }
    
    try {
      const {
        title,
        brand,
        model,
        description,
        style,
        price,
        isFreeShipping
      } = req.body

      const device = await Device.findOne({ brand: brand, model: model })

      console.log(device)
      const ProductFields = {}
      ProductFields.title = title
      ProductFields.price = Number(price)
      ProductFields.device = device.id
      if(isFreeShipping) ProductFields.isFreeShipping = isFreeShipping
      if(description) ProductFields.description = description;
      if(style) ProductFields.style = style;
      ProductFields.productImage = req.file.path

      // console.log(ProductFields);
      Product.create(ProductFields, function (err, data) {
        if (err){
          console.log(err)
          return res.json({ msg: "Error in Creating Product" })
        } 
        // saved!
        console.log("saved")
        res.json({ msg: "Product Successfully created" })
      });
    } catch (error) {
      console.log(error)
      return res.send("Server Error");
    }
  }
)

// @route    GET api/products
// @desc     Get all Products
// @access   Public
route.get(
  '/',
  async (req, res) => {
    try {
      let products = await Product.find();
      return res.json(products)
    } catch (error) {
      return res.status(500).json({ msg: 'Server Error' })
    }
  }
)


module.exports = route;