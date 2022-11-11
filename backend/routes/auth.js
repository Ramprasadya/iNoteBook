const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body ,validationResult} = require('express-validator')
const  bcrypt = require('bcryptjs');
var  jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

const JWT_SECRET  = 'ramisagood$oy'
// Route 1 - Create a user using : POST "/api/auth/createuser" . Doesnt require Auth
router.post('/createuser' ,[
    body('name' , 'Enter a valid name').isLength({ min: 3 }),
    body('email' , 'Enter a valid email').isEmail(),
    body('password').isLength({ min: 5 }),
],  async (req,res)=>{
    //if there are error  , return bad requested and errors ;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // cheak wheater the same email exist already
    try {
      
    
    let user = await  User.findOne({email : req.body.email});
    if(user){
      return res.status(400).json({error : "sorry a user with this email id already exist"})
    }
      const salt = await bcrypt.genSalt(10)
      const secPass = await bcrypt.hash(req.body.password , salt) 
    // create anew user
        user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });

      const data = {
        user:{
          id : user.id
        }

      }
      const authtoken = jwt.sign(data , JWT_SECRET)
      res.json({authtoken})
    // res.json(user)
    // catch errors
    }catch (error) {
      console.error(error.message)
      res.status(500).send(" Internal some error occured")
    }
    
})

// Route 2 - Authenticating  a user using : POST "/api/auth/login" . no login require

router.post('/login' ,[
  body('email' , 'Enter a valid email').isEmail(),
  body('password' , 'password can not be empty').exists()
], async (req , res) =>{
  // if there are a bad request then return error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email ,password} = req.body;

  try {
    let user =  await User.findOne({email})
    if(!user){
      return res.status(400).json({error : "please try to login with correct credential"})

    }
    const passwordCompare =  await bcrypt.compare(password ,user.password)
    if(!passwordCompare){
      return res.status(400).json({error : "please try to login with correct credential"})
    }
    const data = {
      user:{
        id : user.id
      }

    }
    const authtoken = jwt.sign(data , JWT_SECRET)
      res.json({authtoken})
  } catch (error) {
    console.error(error.message)
      res.status(500).send("Internal some error occured")
  }
})

//Route 3 - get logged inuser detail using : POST "/api/auth/getuser" .  login require
router.post('/getuser', fetchuser, async (req , res) =>{
try {
  userId = req.user.id
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error) {
  console.error(error.message)
  res.status(500).send("Internal some error occured")
}

})

module.exports  = router;