const express=require('express')
const mongoose= require('mongoose');
const path=require('path');
const dotenv =require('dotenv');
const ProductData= require('./ProductData.js')
const cors=require('cors');
const  mainRouter = require('./routes/mainRoutes');
const  productRouter = require('./routes/productRotes');
const userRoutes = require('./routes/userRoutes.js');
const orderRouter = require('./routes/OrderRouter.js');
const adminRouter = require('./routes/adminRoutes.js');

//to  fetch the variable in dotenv file
dotenv.config();
//process.env variable to store  Mongodb uri
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log("Connected to db");
})
.catch((err)=>{
    console.log("error",err);
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
const port = 4000;

//  sandboax
// app.get('/api/keys/paypal',(req,res)=>{
//     res.send(process.env.PAYPAL_CLIENT_ID || 'sandbox');
// })
app.get('/api/keys/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sandbox');
});

app.use('/api/admin', adminRouter)


// mainRouter
app.use('/api/main',mainRouter);


//http://localhost:4000/api/products
app.use('/api/products',productRouter);

app.use('/api/users',userRoutes);
app.use('/api/orders', orderRouter);


// const __dirname=path.resolve();
// app.use(express.static(path.join(__dirname,'/frontend/build')));
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'/frontend/build/index.html'));

// });


// define expressAynchandler logic
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
});






app.listen(port, ()=>{
    console.log('listening on port http://localhost:',port);
});