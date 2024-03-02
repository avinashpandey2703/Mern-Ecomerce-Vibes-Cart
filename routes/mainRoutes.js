const express = require('express');
// export schema
const Product = require('../models/productModel');
const ProductData = require('../ProductData');
const Userinfo = require('../models/UserModule');


const mainRouter = express.Router();
//http://localhost:4000/api/main/
mainRouter.get('/', async (req, res) => {
  // Remove all the previous record in the product model
  //{} means retur all the parameter inside the product model
  await Product.deleteMany();
  const NewProducts = await Product.insertMany(ProductData.products);

  await Userinfo.deleteMany();
  const NewUser = await Userinfo.insertMany(ProductData.users);
  res.send({ NewProducts, NewUser });

});

// export default mainRouter;
module.exports = mainRouter;