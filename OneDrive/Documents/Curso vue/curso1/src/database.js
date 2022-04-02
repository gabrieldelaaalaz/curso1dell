
const mongoose = require('mongoose');
require('dotenv').config();
const {USER,PASSWORD,DBNAME}= process.env;

// Conexión a Base de datos
const uri = `mongodb+srv://${USER}:${PASSWORD}@cluster0.odqg2.mongodb.net/${DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e));

