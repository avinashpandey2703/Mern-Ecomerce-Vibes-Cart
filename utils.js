const  jwt = require('jsonwebtoken');
const dotenv =require('dotenv');

//to  fetch the variable in dotenv file
dotenv.config();


 const generateToken = (userdata) => {
    return jwt.sign(
        {
            _id:userdata._id,
            name:userdata.name,
            email:userdata.email,
            isAdmin:userdata.isAdmin,
        },

      
      process.env.JWT_KEY,
      {
        expiresIn: '30d',
      }
    );
  };

  




const isAuth=(req,res,next)=>{
  const authorization=req.headers.authorization ;
  if(authorization){
    const token=authorization.slice(7,authorization.length);
    jwt.verify(
      token,
      process.env.JWT_KEY,
      (err,decode)=>{
        if(err){
          res.status(401).send({message:'Invalid Token'});
        }
        else{
          req.user=decode;
          next();
        }
      }
    );

  }
  else{
    res.status(401).send({message:'No Token'});
  }
}
//  const isAuth = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   if (authorization) {
//     const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
//     jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         res.status(401).send({ message: 'Invalid Token' });
//       } else {
//         req.user = decode;
//         next();
//       }
//     });
//   } else {
//     res.status(401).send({ message: 'No Token' });
//   }
// };

module.exports=generateToken;