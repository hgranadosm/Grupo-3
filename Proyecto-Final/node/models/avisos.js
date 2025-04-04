const mongoose = require('mongoose');

//Schema
let avisosSchema = new mongoose.Schema({
    titulo:{type:String,required:true},
    fecha:{type:String,required:true},
    descripcion:{type:String,required:true},
},{versionKey:false});

//Model

let avisos = new mongoose.model('avisos', avisosSchema);

module.exports = avisos;