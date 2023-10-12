const express = require('express')

const router = express.Router()

router.get('/', function(req,res) {
    res.render('../views/index.ejs')
})

router.get('/cadastrarItem', function(req,res) {
    res.render('../views/cadastrarItem.ejs')
})

var listaProdutos = []
router.get("/listaProdutos", function(req,res) {
    res.render('../views/listaProdutos.ejs', {listaProdutos : listaProdutos})
})

module.exports = router