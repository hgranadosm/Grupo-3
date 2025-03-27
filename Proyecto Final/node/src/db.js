//Conexion a base de datos: solo se hace una vez

const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/PruebaM';

mongoose.connect(DB_URI,{})

    .then(db => console.log("DB CONECTADA"))
    .catch(err => console.log(err))

//Schema

const usuariosSchema = mongoose.Schema({
    nombre:String,
    telefono: Number,
    direccion:String
},{versionKey:false});

//Coleccion Model

const usuarioModel = mongoose.model('usuarios', usuariosSchema);

// CRUD:
// C = Create
// R = Read
// U = Update
// D = Delete