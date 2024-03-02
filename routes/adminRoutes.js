const express = require('express');
const Userinfo = require('../models/UserModule');
const bcrypt = require('bcryptjs');
const isAuth = require('../MiddleWare/isAuth');
const Order = require('../models/OrderModel');
const expressAsyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const isAdmin = require('../MiddleWare/isAdmin');

const adminRouter = express.Router();


// users route
adminRouter.get('/getallusers',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
  const users = await Userinfo.find({});
  res.send(users);
})
);

adminRouter.put('/updateuser/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
  const user = await Userinfo.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.send({ message: 'User Updated', user: updatedUser });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);
adminRouter.get('/getuser/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
  const user = await Userinfo.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);
adminRouter.delete('/deleteuser/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
  const user = await Userinfo.findById(req.params.id);
  if (user) {
    if (user.email === 'admin@example.com') {
      res.status(400).send({ message: 'Can Not Delete Admin User' });
      return;
    }
    await user.deleteOne();
    res.send({ message: 'User Deleted' });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
})
);

adminRouter.get('/summary', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    try {
        const ordersData = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: '$totalprice' },
                },
            },
        ]);

        const usersData = await Userinfo.aggregate([
            {
                $group: {
                    _id: null,
                    numUsers: { $sum: 1 },
                },
            },
        ]);

        const dailyOrdersData = await Order.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    orders: { $sum: 1 },
                    sales: { $sum: '$totalprice' },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const productCategoriesData = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                },
            },
        ]);

        const summary = {
            users: usersData[0] || { numUsers: 0 }, // If no users found, default to 0
            orders: ordersData[0] || { numOrders: 0, totalSales: 0 }, // If no orders found, default to 0
            dailyOrders: dailyOrdersData,
            productCategories: productCategoriesData,
        };

        res.send(summary);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Something went wrong" });
    }
}));


// Create New Product
adminRouter.post('/addproduct',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    slug: req.body.slug,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    brand: req.body.brand,
    countInStock: req.body.countInStock,
    rating: 0,
    numReviews: 0,
    description: req.body.description,
  });
  const product = await newProduct.save();
  res.send({ message: 'Product Created', product });
})
);



// get Product List
const PAGE_SIZE = 3;

adminRouter.get('/productlist',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
  const { query } = req;
  const page = query.page || 1;
  const pageSize = query.pageSize || PAGE_SIZE;

  const products = await Product.find()
    .skip(pageSize * (page - 1))
    .limit(pageSize);
  const countProducts = await Product.countDocuments();
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
})
);

// delete product
adminRouter.delete('/deleteproduct/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.send({ message: 'Product Deleted' });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
})
);

// Edit Product
adminRouter.put('/editproduct/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: 'Product Updated' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

// order routes
adminRouter.get('/orders', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name');
    res.send(orders);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching orders', error });
  }
}));




adminRouter.delete(
'/deleteorder/:id',
isAuth,
isAdmin,
expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    await order.deleteOne();
    res.send({ message: 'Order Deleted' });
  } else {
    res.status(404).send({ message: 'Order Not Found' });
  }
})
);

module.exports = adminRouter;
