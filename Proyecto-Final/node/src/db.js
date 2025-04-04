//Conexion a base de datos: esto (linea 1 a 10) solo se hace una vez

const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/EjemploM';

mongoose.connect(DB_URI,{})

    .then(db => console.log("DB CONECTADA"))
    .catch(err => console.log(err))


//Cuando creamos una coleccion hay que hacer estos 2 pasos: crear un schema y crear el modelo
//Schema

//-------------------------- Usuarios -------------------------- 

const UsuariosSchema = mongoose.Schema({
    nombre:String,
    apellido1:String,
    apellido2:String,
    correo:String,
    identificacion:String,
    telefono: Number,
    distrito:String,
    detalles:String,
    contrasena:String
},{versionKey:false});

//Coleccion Model

const UsuarioModel = mongoose.model('Usuarios', UsuariosSchema);

//-------------------------- Iniciativas --------------------------  

const IniciativasSchema = mongoose.Schema({
    descripcion:String,
    nombre:String,
    propuestoPor:String
},{versionKey:false});

//Coleccion Model

const IniciativasModel = mongoose.model('Iniciativas', IniciativasSchema);

//-------------------------- Avisos --------------------------  

const AvisosSchema = mongoose.Schema({
    titulo:String,
    fecha:String,
    descripcion:String
},{versionKey:false});

//Coleccion Model

const AvisosModel = mongoose.model('Avisos', AvisosSchema);



// CRUD

// C = Create -----------------------------------------------------------------------------------------------------------------------

const crear = async()=>{
    const Usuarios = new UsuarioModel({
        nombre:"Maria",
        apellido1:"Benavides",
        apellido2:"Arias",
        correo:"laly@gmail.com",
        identificacion:"117350735",
        telefono: 83547366,
        distrito:"San Pedro",
        detalles:"Calle 23, Avenida 12, Barrio Los Robles, San Pedro, Montes de Oca, San José, Costa Rica.",
        contrasena:"1234"
    })
    await Usuarios.save();
}


// R = Read -------------------------------------------------------------------------------------------------------------------------

const mostrar = async() => {
    const usuarios = await UsuarioModel.find();
    console.log(usuarios[1].distrito); //para atraer el primer arreglo y solo la direccionn
    //Usuarios--- Nos devuelve un arreglo
}

// U = Update ------------------------------------------------------------------------------------------------------------------------

const actualizar = async(id)=>{
    await UsuarioModel.updateOne({_id:id},
        {
            $set:{
                nombre:"Steph",
                telefono: 77777
            }
        }
    );
}

// D = Delete -----------------------------------------------------------------------------------------------------------------------
const eliminar=async(id)=>{
    await  UsuarioModel.deleteOne({_id:id});
}

//Llamadas de funciones -------------------------------------------------------------------------------------------------------------

//crear();
//mostrar ();
//actualizar('67ec05419ccf170bda6c0b98');
eliminar('67ed67c7034d28a7d55d19c8');