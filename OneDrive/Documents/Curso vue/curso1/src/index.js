//requiriendo modulos
const express = require('express');

require('./database');

const mongoose = require('mongoose');
require('dotenv').config()

const app = express();

// capturar body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conexión a Base de datos


// import routes 
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// route middlewares

app.use('/api/user', userRoutes)
app.get('/', (req, res)=>{
  res.json({
  estado: true, 
  mensaje: 'funciona super!'
  })
});

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);


// iniciar server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})
