const express = require('express');
const router = express.Router();

router.get('/realtimeproducts', (req, res) =>{
    products.getProducts().then(productos => res.send(productos))
    res.render('realTimeProducts', {productos})
})

module.exports = routerView;