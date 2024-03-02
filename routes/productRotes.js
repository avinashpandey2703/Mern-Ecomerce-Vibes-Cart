const express = require('express')
const Product = require('../models/productModel.js');
const expressAsyncHandler = require('express-async-handler');

const productRouter = express.Router();


//http://localhost:4000/api/products
productRouter.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    }
    catch (err) {
        res.send({ error: "Something went wrong" })
    }

});


const PAGE_SIZE = 3;
productRouter.get('/search', expressAsyncHandler(async (req, res) => {
    try {
        const { query } = req;
        const pageSize = query.pageSize || PAGE_SIZE;
        const page = query.page || 1;
        const category = query.category || '';
        const price = query.price || '';
        const rating = query.rating || '';
        const order = query.order || '';
        const searchQuery = query.query || '';

        const queryFilter =
            searchQuery && searchQuery !== 'all'
                ? {
                    name: {
                        $regex: searchQuery,
                        $options: 'i',
                    },
                }
                : {};
        const categoryFilter = category && category !== 'all' ? { category } : {};
        const ratingFilter =
            rating && rating !== 'all'
                ? {
                    rating: {
                        $gte: Number(rating),
                    },
                }
                : {};
        const priceFilter =
            price && price !== 'all'
                ? {
                    // 1-50
                    price: {
                        $gte: Number(price.split('-')[0]),
                        $lte: Number(price.split('-')[1]),
                    },
                }
                : {};
        const sortOrder =
            order === 'featured'
                ? { featured: -1 }
                : order === 'lowest'
                    ? { price: 1 }
                    : order === 'highest'
                        ? { price: -1 }
                        : order === 'toprated'
                            ? { rating: -1 }
                            : order === 'newest'
                                ? { createdAt: -1 }
                                : { _id: -1 };

        const products = await Product.find({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        });
        res.send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });
    } catch (err) {
        res.status(500).send({ error: "Something went wrong" });
    }
}));


// API to get single produvt through slug
productRouter.get('/slug/:slug', async(req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    }
    catch (err) {
        res.send({ error: "Something went wrong" })
    }

})


productRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
      const categories = await Product.find().distinct('category');
      res.send(categories);
    })
  );


// When you  add to cart  then data fectch by id
productRouter.get('/:id', async(req, res) => {
    try {
        const product =  await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
    }
    catch (err) {
        res.send({ error: "Something went wrong" })
    }

})






module.exports = productRouter;