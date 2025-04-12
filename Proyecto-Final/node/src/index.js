const express = require('express');

const app = express();
const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');

const bodyParser = require('body-parser');

app.use(bodyParser.json()); //req.body
app.use(bodyParser.urlencoded({extended:false}));

//Configuración de Express Session
const session = require('express-session');
app.use(session({
    secret: 'LALYAPP',
    resave: false,
    saveUninitialized: false,
}))


//Modelos
const user = require('../models/users.js');
const iniciativas = require('../models/iniciativas.js');
const avisos = require('../models/avisos.js');
const { findSourceMap } = require('module');


/*

{
    llave : valor
    -------------
     name : value
     -------------
     "colorName": "Amarillo",
     "categoryColor": "Secundario"
}

console.log(req.body)----- // {"colorName": "Amarillo","categoryColor": "Secundario"}
*/

//require('./db'),

//Archivos staticos
app.use(express.static(path.join(__dirname,'public')));


//Encender servidor

app.listen(3000,()=>{
    console.log("Se conecto el puerto");
})


// verificar la sesión función (middleware)
function verificarSesion(req, res, next) {
    if (req.session.usuario) {
        console.log('logueado correctamente')
        return next(); // Si hay sesión, continua 
    } else {
        console.log('usuario no logueado redireccionando')
        res.redirect('/inicioSesion'); // Redirigir al login si no hay sesión
    }
}



//RUTAS
//      nombre de la ruta, acción
//PRACTICA EN CLASE
app.get('/',(req,res)=>{
    res.render('paginaInicio.html');
});


//RUTAS PAGINAS COMPAÑEROS

app.get('/cambioCorreo',(req,res)=>{
    res.render('cambioCorreo.html');
});

app.get('/comiteCantonal',(req,res)=>{
    res.render('comiteCantonal.html');
});

app.get('/controlVial',(req,res)=>{
    res.render('controlVial.html');
});

app.get('/Denuncias',(req,res)=>{
    res.render('Denuncias.html');
});

app.get('/feriaSalud',(req,res)=>{
    res.render('feriaSalud.html');
});

app.get('/inicioSesion',(req,res)=>{
    res.render('inicioSesion.html');
});

app.get('/paginaNoticia2',(req,res)=>{
    res.render('paginaNoticia2.html');
});

app.get('/reciclaje',(req,res)=>{
    res.render('reciclaje.html');
});

app.get('/recuperar',(req,res)=>{
    res.render('recuperar.html');
});




// Rutas de mis funcionalidades

app.get('/administradorIniciativas',  verificarSesion,  async (req, res) => {
    try {
        const listaIniciativas = await iniciativas.find(); // trae todas las iniciativas
        res.render('administradorIniciativas.ejs', { iniciativas: listaIniciativas });
    } catch (err) {
        console.error('Error al cargar iniciativas:', err);
        res.status(500).send('Error al obtener las iniciativas');
    }
});

app.get('/consejoTablaDenuncias',(req,res)=>{
    res.render('consejoTablaDenuncias.html');
});

app.get('/editarPerfil', verificarSesion, async (req,res)=>{
    try {
        const usuario = await user.findOne({ correo: req.session.usuario });
        if (!usuario) {
            return res.redirect('/inicioSesion');
        }
        const usuarioLogueado = req.session.usuario || null;
        const rol = req.session.rol || null;
        res.render('editarPerfil.ejs', { usuario, usuarioLogueado, rol }); // Asegurate que sea .ejs si vas a usar variables
    } catch (err) {
        console.error('Error al obtener el usuario', err);
        res.status(500).send('Error del servidor');
    }
});

app.get('/formularioAvisosAdministrador', verificarSesion, (req,res)=>{
    const usuarioLogueado = req.session.usuario || null;
    const rol = req.session.rol || null;
    res.render('formularioAvisosAdministrador.ejs', { usuarioLogueado, rol });
});

app.get('/formularioIniciativas',(req,res)=>{
    res.render('formularioIniciativas.html');
});

app.get('/index', (req, res) => {
    const usuarioLogueado = req.session.usuario || null;
    const rol = req.session.rol || null;
    res.render('index.ejs', { usuarioLogueado, rol });
});


app.get('/iniciativa',(req,res)=>{
    res.render('iniciativa.html');
});

app.get('/paginaServicios',(req,res)=>{
    res.render('paginaServicios.html');
});

app.get('/perfilUsuariosCiudadanos',(req,res)=>{
    res.render('perfilUsuariosCiudadanos.html');
});

app.get('/registroDeUsuario',(req,res)=>{
    res.render('registroDeUsuario.html');
});

app.get('/servicios',(req,res)=>{
    res.render('servicios.html');
});

app.get('/usuarioIniciativas', (req, res) => {
    const usuarioLogueado = req.session.usuario || null;
    const rol = req.session.rol || null;
    res.render('usuarioIniciativas.ejs', { usuarioLogueado, rol });
});

app.get('/usuarioTablaDenuncias',(req,res)=>{
    res.render('usuarioTablaDenuncias.html');
});






//POST

// Practica en clase ----------------------------------------------------------------------------------------------
app.post('/addCategory',(req,res)=>{
    console.log(req.body.colorName, req.body.categoryColor, req.body);
    let color = "Verde";
    if(req.body.colorName===color){
        console.log("Son iguales");
        res.redirect('/');
    }else{
        console.log("Se equivoco");
        res.redirect('/formulario');
    }
    
})



//Usuarios


app.post('/register', (req,res) => {
    let data = new user({
        nombre:req.body.nombre,
        apellido1:req.body.apellido1,
        apellido2:req.body.apellido2,
        correo:req.body.correo,
        identificacion:req.body.identificacion,
        telefono:req.body.telefono,
        distrito:req.body.menuDesplegable,
        detalles:req.body.detalle,
        contrasena:req.body.contrasena,
        rol:"usuario"
    })

    data.save()
    .then(()=>{
        console.log('Se guardo el usuario');
        res.statusMessage = 'Usuario registrado con éxito';
        res.status(201).json({ok: true})
    })
    .catch((err)=>{
        console.log('ERROR', err);
        if (err.code = 11000) {
            res.statusMessage = 'El correo ingresado ya se encuentra registrado';
        } else {
            res.statusMessage = 'Ocurrió un error al guardar el usuario, intenta más tarde';
        }
        res.status(500).json({ok: false})
    })
});

// Iniciativas ------------------------------------------------------------------------------------------------------



app.post('/iniciativas', (req,res) => {
    let data = new iniciativas({
        titulo:req.body.titulo,
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        estado:"Pendiente"
    })

    data.save()
    .then(()=>{
        console.log('Se guardo la iniciativa');
        res.statusMessage = 'Iniciativa registrada con éxito';
        res.status(201).json({ok: true})
    })
    .catch((err)=>{
        console.log('ERROR', err);
        res.statusMessage = 'Ocurrió un error al guardar la iniciativa, intenta más tarde';

        res.status(500).json({ok: false})
    })
});

app.post('/authenticate',(req,res)=>{
    //Paso 1: Obtener los datos que el usuario ingrese
    let data ={
        email: req.body.email,
        password: req.body.password
    }

    const usuarioExiste=async()=>{
    //Paso 2: Verificar si el usuario existe dentro de DB
        const usuario = await user.findOne({correo:data.email});
        //usuario = Dato - TRUE    null--False

        if(usuario!==null){
            //Paso 3: Verificar si el correo y las contraseñas coinciden
            if(usuario.password==data.password){
                console.log("Ingresó exitosamente");
                res.redirect('/')
            }else{
                console.log("Las contraseñas no coinciden")
                res.redirect('/loginPracticaClase')
            }
        }else{
            console.log("El usuario no está registrado");
            res.redirect('/loginPracticaClase')
        }   
 
    }
    usuarioExiste();

}) 


// Avisos ------------------------------------------------------------------------------------------------------------


app.post('/avisos', (req,res) => {
    let data = new avisos({
        titulo:req.body.titulo,
        fecha:req.body.fecha,
        descripcion:req.body.descripcion,
    })

    data.save()
    .then(()=>{
        console.log('Se guardo el aviso');
        res.statusMessage = 'Aviso registrado con éxito';
        res.status(201).json({ok: true})
    })
    .catch((err)=>{
        console.log('ERROR', err);
        res.statusMessage = 'Ocurrió un error al guardar el aviso, intenta más tarde';

        res.status(500).json({ok: false})
    })
});

//
app.post('/login',(req,res)=>{
    //Paso 1: Obtener los datos que el usuario ingrese
    let data ={
        correo: req.body.correo,
        password: req.body.password
    }

    const usuarioExiste=async()=>{
    //Paso 2: Verificar si el usuario existe dentro de DB
        const usuario = await user.findOne({correo:data.correo});
        //usuario = Dato - TRUE    null--False

        if(usuario!==null){
            //Paso 3: Verificar si el correo y las contraseñas coinciden
            if(usuario.contrasena==data.password){
                console.log("Ingresó exitosamente");
                req.session.usuario = usuario.correo; // guardado de la sesión
                req.session.rol = usuario.rol;
                res.status(201).json({ok: true})
            }else{
                console.log("Las contraseñas no coinciden")
                res.statusMessage = 'Credenciales incorrectas, intente nuevamente';
                res.status(500).json({ok: false})
            }
        }else{
            console.log("El usuario no está registrado");
            res.statusMessage = 'El usuario no se encuentra registrado';
            res.status(500).json({ok: false})
        }   
 
    }
    usuarioExiste();

}) 

app.post('/editProfile', async (req, res) => {
    if (!req.session.usuario) {
        return res.status(401).json({ ok: false, message: 'No autorizado' });
    }

    try {
        const actualizado = await user.findOneAndUpdate(
            { correo: req.session.usuario }, // Busco el usuario logueado
            {
                nombre: req.body.nombre,
                apellido1: req.body.apellido1,
                apellido2: req.body.apellido2,
                identificacion: req.body.identificacion,
                telefono: req.body.telefono,
                distrito: req.body.menuDesplegable,
                detalles: req.body.detalle,
            },
            { new: true } // asi es como en mongo devuelvo los datos ya actualizados
        );

        if (!actualizado) {
            return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
        }

        res.statusMessage = 'Perfil actualizado correctamente';
        res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Error al actualizar perfil:', err);
        res.statusMessage = 'Error al actualizar el perfil';
        res.status(500).json({ ok: false });
    }
});

app.post('/actualizarEstado/:id', async (req, res) => {
    const { id } = req.params;
    const { nuevoEstado } = req.body;

    try {
        await iniciativas.findByIdAndUpdate(id, { estado: nuevoEstado });
        res.status(200).json({ mensaje: 'Estado actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
        res.status(500).json({ mensaje: 'Error al actualizar el estado' });
    }
});

// Destrucción de la sesión
app.post('/logout',(req,res)=>{
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ ok: false });
        } else {
            console.log('cerrando sesión y redireccionando')
            res.redirect('/inicioSesion'); // Redirigir al login después de cerrar sesión
        }
    });
}) 