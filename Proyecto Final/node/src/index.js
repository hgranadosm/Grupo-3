const express = require('express');

const app = express();
const path = require('path');

app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');

const bodyParser = require('body-parser');

app.use(bodyParser.json()); //req.body
app.use(bodyParser.urlencoded({extended:false}));

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

require('./db'),

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









//POST

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

app.post('/login', (req, res) => {
    console.log(req.body.usuario, req.body.password);

    let usuarioCorrecto = "hilla";
    let passwordCorrecto = "1234";

    if (req.body.usuario === usuarioCorrecto && req.body.password === passwordCorrecto) {
        console.log("Usuario y contraseña correctos");
        return res.redirect('/'); 
    } else {
        console.log("Usuario o contraseña incorrectos");
        return res.redirect('/loginPractica');
    }
});