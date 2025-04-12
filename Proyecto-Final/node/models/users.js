//La configuracion de la conexion, solo se hace una vez, porque una vez que se conecte ya estara conectado a los demas squemas o modelos

const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/ProyectoFinal';

mongoose.connect(DB_URI,{})

    .then(db=>console.log('DB CONECTADA'))
    .catch(err=>console.log(err))

//-----------------------------------------------------------------------------------

//Schema
let userSchema = new mongoose.Schema({
    nombre:{type:String,required:true},
    apellido1:{type:String,required:true},
    apellido2:{type:String,required:true},
    correo:{type:String,required:true,unique:true},
    identificacion:{type:String,required:true},
    telefono: Number,
    distrito:{type:String,required:true},
    detalles:{type:String,required:true},
    contrasena:{type:String,required:true},
    rol: { type: String, required: true } 
},{versionKey:false});

//Model

let user = new mongoose.model('users', userSchema);

module.exports = user;

