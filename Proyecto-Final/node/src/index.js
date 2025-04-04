const express = require('express');

const app = express();
const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');

const bodyParser = require('body-parser');

app.use(bodyParser.json()); //req.body
app.use(bodyParser.urlencoded({extended:false}));

//Modelos
const user = require('../models/users.js');
const iniciativas = require('../models/iniciativas.js');
const avisos = require('../models/avisos.js');


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


//RUTAS
//      nombre de la ruta, acción
//PRACTICA EN CLASE
app.get('/',(req,res)=>{
    res.render('paginaInicio.html');
});

app.get('/registro',(req,res)=>{
    res.render('registro.html');
});

app.get('/formulario',(req,res)=>{
    res.render('formulario.html');
});

app.get('/loginPractica',(req,res)=>{
    res.render('loginPractica.html');
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

app.get('/administradorIniciativas',(req,res)=>{
    res.render('administradorIniciativas.html');
});

app.get('/consejoTablaDenuncias',(req,res)=>{
    res.render('consejoTablaDenuncias.html');
});

app.get('/editarPerfil',(req,res)=>{
    res.render('editarPerfil.html');
});

app.get('/formularioAvisosAdministrador',(req,res)=>{
    res.render('formularioAvisosAdministrador.html');
});

app.get('/formularioIniciativas',(req,res)=>{
    res.render('formularioIniciativas.html');
});

app.get('/index',(req,res)=>{
    res.render('index.html');
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

app.get('/usuarioIniciativas',(req,res)=>{
    res.render('usuarioIniciativas.html');
});

app.get('/usuarioTablaDenuncias',(req,res)=>{
    res.render('usuarioTablaDenuncias.html');
});

// Rutas practicas en clase

app.get('/loginPracticaClase',(req,res)=>{
    res.render('loginPracticaClase.html')
})





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



// Practica login en clase ----------------------------------------------------------------------------------------
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
        contrasena:req.body.contrasena
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
