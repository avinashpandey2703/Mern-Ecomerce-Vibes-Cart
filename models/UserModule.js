const mongoose=require("mongoose");


// mongosse .schema accpet two parameters fiels and options
const UserSchema=new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
       
    },
    email :{
        type:String,
        required:true,
        unique:true
       
    },
    password :{
        type:String,
        required:true,
        
       
    },
    isAdmin :{
        type:Boolean,
        default:false,
        required:true
       
       
    },
   
},

{
    timestamps:true
}

);

// craete a model of schema
const Userinfo=mongoose.model('User',UserSchema);
// export default Product;
module.exports = Userinfo;