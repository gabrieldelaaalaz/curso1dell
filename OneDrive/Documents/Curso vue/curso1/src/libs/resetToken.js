const mongoose = require('mongoose');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {ACCESS_TOKEN,TIME_AT}= process.env;
module.exports={

     rToken: (req, res, data, message) => {
          
     
     const user = jwt.verify(req.header('access_token'), ACCESS_TOKEN)
     const access_token = jwt.sign({first_name: user.first_name, _id: user._id},  ACCESS_TOKEN, {expiresIn : TIME_AT})
     res.header({'access_token': access_token,'refresh_token': req.header('refresh_token')})

          .json({
            error: null,
            data,
            message: message
         })
  }
}

     
     

