const express = require('express');
const cartsRoutes = require('../src/routes/carts.routes');
const productsRoutes = require('../src/routes/products.routes');
const viewsRoutes = require('../src/routes/views.routes');
const handlebars = require('express-handlebars');
const __dirname = require('.utils.js/');
const Server = require('socket.io');



const app = express();
const PORT = 8080; 

//Configuracion Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Configuracion de Acceso a la carpeta public
app.use(express.static(__dirname+'/public'));


//Configuracion del servidor para recibir JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Creamos los enrutadores
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/realTimePorducts', viewsRoutes);

app.get('*', function (req, res) {
    res.send({status: "error", description: `ruta ${req.url} no encontrada`})
});

const httpServer = app.listen(PORT, ()=>{
    console.log(`Funcionando en puerto ${PORT}`);
})

//Instanciamos Socket del lado del Server
const socketServer = new Server(httpServer);
socketServer.on('connection', socket =>{
    socket.on('mensaje1', data =>{
        console.log(data);
    })

    socket.broadcast.emit('mensaje2', "Producto Eliminado")

})
