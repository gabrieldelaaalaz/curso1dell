const mongoose = require('mongoose');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const resetT= require('../libs/resetToken.js');

exports.users = async (req, res) => {
    const data = await User.find({},{first_name:1, last_name:1, _id:1})
    resetT.rToken (req, res, data, "lista de usuarios")
};
