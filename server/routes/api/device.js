const express = require('express')
const route = express.Router();
const { check, validationResult } = require('express-validator');

const Device = require('../../../models/Device')

// @route    POST api/devices
// @desc     Create a Device
// @access   Public
route.post(
  '/',
  [
    check('brand', 'Brand name is required')
      .not()
      .isEmpty(),
    check('model', 'Model name is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {

    const {
      brand,
      model
    } = req.body

    try {
      let device = await Device({ brand: brand.toLowerCase(), model: model.toLowerCase() })
      device.save()
      return res.json({ msg: "Device created successfully" })
    } catch (error) {
      return res.status(500).res.json({ msg: "Error in Device creation" })
    }    
  }
)

// @route    GET api/devices/brands
// @desc     Get all Brands
// @access   Public
route.get(
  '/brands',
  async (req, res) => {
    try {
      let brands = await Device.distinct('brand')
      return res.status(200).json(brands)
    } catch (error) {
      return res.status(500).res.json({ msg: "Server Error" })
    }
  }
)

// @route    GET api/devices/models/:brand_name
// @desc     Get all Models of a brand
// @access   Public
route.get(
  '/models/:brand_name',
  async (req, res) => {
    try {
      let Bname = req.params.brand_name
      console.log(Bname)
      let models = await Device.distinct('model',{ brand: Bname })
      return res.status(200).json(models)
    } catch (error) {
      return res.status(500).res.json({ msg: "Server Error" })
    }
  }
)

module.exports = route;