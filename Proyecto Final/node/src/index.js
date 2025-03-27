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