const mongoose = require('mongoose');
const User = require('../models/users');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {ACCESS_TOKEN, REFRESH_TOKEN, TIME_AT, TIME_RT}= process.env;

exports.login = async (req, res) => {
    res.json({
        estado: "mostrar vista de formulario login",
    });
};

exports.loginpost = async (req, res) => {
    const schemaSignin = Joi.object({
        username: Joi.string().min(6).max(50).required().label('Nombre de usuario'),
        password: Joi.string().min(6).max(200).required().label('Contraseña')
    })  

//validate user
    const {error} = schemaSignin.validate(req.body)
    if (error){
        return res.status(400).json(
            {error: error.details[0].message}
          )
    }
    //consultar en MongoDB

    const user = await User.findOne({username: req.body.username});
    if(!user) return res.status(400).json({error: 'usuario inexistente'} ) 

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({error: 'contraseña inválida' });

    // create token, pero tenemos que volver esto en funcion
    const access_token = jwt.sign({first_name: user.first_name, _id: user._id}, gitACCESS_TOKEN, {expiresIn : (TIME_AT)})
    const refresh_token = jwt.sign({first_name: user.first_name, _id: user._id}, REFRESH_TOKEN, {expiresIn : (TIME_RT)})
    //const user_login = ({first_name: user.first_name, last_name: user.last_name, _id: user._id})
    
    res.header({
        'access_token': access_token,'refresh_token': refresh_token
       })
      .json({
        error: null,
        message: 'Usuario logueado',
        //access_token
       })
    };

exports.register = async (req, res) => {
    res.json({
        estado: "mostrar formulario de registro",
    });
};

exports.registerpost = async (req, res) => {
    const schemaAddUser = Joi.object({
        first_name: Joi.string().min(3).max(50).required().label('Nombre'),
        last_name: Joi.string().min(3).max(50).required().label('Apellido'),
        doc_id: Joi.string().min(5).max(50).required().label('Cédula'),
        phone: Joi.number().integer().min(100000).max(99999999).required().label('Teléfono'),
        email: Joi.string().min(6).max(100).required().email(),
        username: Joi.string().min(6).max(20).required().label('Nombre de usuario'),
        password: Joi.string().min(6).max(1024).required().label('Contraseña')
    })    

    // validate user
    const { error } = schemaAddUser.validate(req.body)
   
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }

    const isUserNameExist = await User.findOne({ username: req.body.username });
    if (isUserNameExist) {
        return res.status(400).json(
            {error: 'Nombre de usuario ya registrado, pruebe otro'}
            
        )
    }

    const isEmailExist = await User.findOne({ email: req.body.email});
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
            
        )
    }

    const isDocIdExist = await User.findOne({ doc_id: req.body.doc_id });
    if (isDocIdExist) {
        return res.status(400).json(
            {error: 'Carnet de identidad ya registrado'}
            
        )
    }
    
    const dataUser = {first_name, last_name, doc_id, phone, email, username, password} = req.body;
   
    const salt = await bcrypt.genSalt(10);
    dataUser.password = await bcrypt.hash(req.body.password, salt);
    dataUser.state = 0;

    const user = new User (dataUser);
    try {
        const saveUser = await user.save();
        res.status(200).json({
                user: saveUser,
                message: 'Usuario registrado',
                success: true
            });
    } catch (error) {
        res.status(400).json({
                user: saveUser,
                message: 'Error al guardar usuario',
                success: false
            });
    }

};

exports.recover = async (req, res) => {
    res.json({
        estado: "mostrar vista de recuperar cuenta",
    });
};

exports.recoverpost = async (req, res) => {
    res.json({
        estado: "enviar datos de recuperar cuenta",
    });
};
