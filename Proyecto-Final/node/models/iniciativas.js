const mongoose = require('mongoose');

//Schema
let iniciativasSchema = new mongoose.Schema({
    titulo:{type:String,required:true},
    nombre:{type:String,required:true},
    descripcion:{type:String,required:true},
    estado: { type: String, required: true }
},{versionKey:false});

//Model

let iniciativas = new mongoose.model('iniciativas', iniciativasSchema);

module.exports = iniciativas;