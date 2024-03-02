const mongoose = require("mongoose");


// mongosse .schema accpet two parameters fiels and options
const OrderSchema = new mongoose.Schema(
    {
        orderItems: [
            {
                slug: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },

            },
        ],
        shippingAddress: {
            fullname: {
                type: String,
                required: true
            },
            Address: {
                type: String,
                required: true
            },
            City: {
                type: String,
                required: true
            },
            postal: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            },
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentResult: {
            id: String,
            status: String,
            upadate_time: String,
            email_Address: String,
        },
        itemprice: {
            type: Number,
            required: true

        },
        shippingprice: {
            type: Number,
            required: true

        },
        taxprice: {
            type: Number,
            required: true

        },
        totalprice: {
            type: Number,
            required: true

        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        isPaid:{
            type:Boolean,
            default:false
        },
        paidAt:{
            type:Date
        },
        isDelivered:{
            type:Boolean,
            default:false
        },
        deliveredAt:{
            type:Date
        },



    },

    {
        timestamps: true
    }

);

// craete a model of schema
const Order = mongoose.model('Orders', OrderSchema);
// export default Product;
module.exports = Order;