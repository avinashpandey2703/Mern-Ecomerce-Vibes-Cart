const express = require('express')
const Userinfo = require('../models/UserModule');
const expressAsynHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const isAuth = require('../MiddleWare/isAuth');
const Order = require('../models/OrderModel');
const expressAsyncHandler = require('express-async-handler');

const userRoutes = express.Router();


const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const neworder = new Order({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemprice: req.body.itemprice,
        shippingprice: req.body.shippingprice,
        taxprice: req.body.taxprice,
        totalprice: req.body.totalprice,
        user: req.user._id,

    });
    const order = await neworder.save();
    res.status(201).send({ message: 'New Order Created', order });


}))

//orderhistory route
orderRouter.get('/orderhistory', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.find({user:req.user._id});
    
        res.send(order);
    })
)


orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.send(order);
    } else {
        res.status(404).send({ message: 'Order Not Found' });
    }



})
)




orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_Address: req.body.email_Address,
        };
        const updatedOrder=await order.save();
        res.send({message:'Order is Paid',order:updatedOrder});

    }else{
        res.status(404).send({message:'Order Not Found'});
    }
})
);








module.exports = orderRouter;