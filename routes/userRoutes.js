const express =require('express')
const Userinfo = require('../models/UserModule');
const expressAsyncHandler=require('express-async-handler')
const bcrypt=require('bcryptjs');
const  generateToken  = require('../utils');
const isAuth = require('../MiddleWare/isAuth');
const userRoutes=express.Router();



userRoutes.post('/signin',expressAsyncHandler(async (req,res)=>{
    const userdata=await Userinfo.findOne({email:req.body.email});
    if(userdata){
        // req.body.password  is plane text password
        // userdata.password is encrypted password in the database
        if(bcrypt.compareSync(req.body.password, userdata.password)){

            res.send({
             _id:userdata._id,
            name:userdata.name,
            email:userdata.email,
            isAdmin:userdata.isAdmin,
            token:generateToken(userdata),
            });
            return ;
        }
    }
    res.status(401).send({ message: 'Invalid email or password' });

})
);
userRoutes.post('/signup', expressAsyncHandler(async (req, res) => {
    const newUser = new Userinfo({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    const user = await newUser.save();
    const data = {
        _id: user._id,
        username: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user)
    }
    res.json(data);
}));


userRoutes.put(
    '/profile',
    isAuth,expressAsyncHandler(async(req,res)=>{
        const user=await Userinfo.findById(req.user._id);
        if(user){
            user.name=req.body.name||user.name;
            user.email=req.body.email||user.email;
            if(req.body.password){
                user.password=bcrypt.hashSync(req.body.password,8);
            }
            const updatedUser=await user.save();
            res.send({
                _id:updatedUser._id,
                name:updatedUser.name,
                email:updatedUser.email,
                isAdmin:updatedUser.isAdmin,
                token:generateToken(updatedUser),
            });
        }
        else{
            res.status(404).send({message : "User Not Found"})
        }
    })
)

module.exports = userRoutes;