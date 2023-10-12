/*
        Modulos que uso 

 * npm install express 

 * npm install ejs 

 * npm install sequelize

 * npm install mysql2

*/

var express = require("express")// Criar o objeto modulo express

var aplicacao = express() // Executar o express

const rotas = require('./routes/router') // Fazer include do modulo router


// Criar o objeto bodyParser para ler os dados do formulario
const bodyParser = require('body-parser')
const produtos = require('./database/produtos.js')


/*
express.json() analisa os dados do formulario que  ficam no corpo de solicitação (POST),
também chamado de request de entrada, para ser enviado ao servidor web
 */
aplicacao.use(express.json())

/* utiliza o objeto rotas que define os caminhos das páginas*/
aplicacao.use('/', rotas)

/* bodyParser serve para trabalhar com os dados vindo do formulario, ou seja, ele transforma
e formata esse pacote de dados para o formato de objeto Javacript
 */
aplicacao.use(bodyParser.urlencoded({extended:false}))

/* include (utilizar) um arquivo externo */
aplicacao.use(express.static(__dirname +'/public'))

/* desmontrar que será utilizado o objeto ejs para interpretarvo template HTML no servidor web */
aplicacao.set('view engine', 'ejs')

/* servidor web fica na escuta da solicitação do cliente (computador q possui navegador) na  porta 3000 */
aplicacao.listen(3000, function(req, res) {
    console.log("##########")
    console.log("Servidos aberto")
    console.log("##########")
})

// 
// 
// 
// 
// 

aplicacao.post('/cadastrarProduto', function(req,res) {
    console.log("CADASTRANDO PRODUTO NO BANCO DE DADOS")
    //Declarando as variaveis, e pegando os valores do formulario

    let nomeProduto = req.body.nomeProduto

    let descricaoProduto = req.body.descricaoProduto

    let valorProduto = req.body.valorProduto

    let estoqueProduto = req.body.estoqueProduto

    let validadeProduto = req.body.validadeProduto 

    var a = [nomeProduto, descricaoProduto, valorProduto, estoqueProduto, validadeProduto]

    console.log(a)

    //Criando tabela com as informações acima
    var criarTabela = false
    for(i=0;i<a.length;i++) 
    {
        if(a[i].length == 0)
        {
            criarTabela = false
            console.log("Campo inválido")
            break;
        }
        else 
        {
            criarTabela = true
            console.log("INFORMAÇÂO VALIDA")
        }

    }

    console.log("CRIAR TABELA :"+criarTabela)
    if(criarTabela == true)
    {
        produtos.create({
            nome : nomeProduto,
            estoque : estoqueProduto,
            descricao : descricaoProduto,
            valor : valorProduto,
            validade : validadeProduto
        })

        res.render('../views/cadastrarItem.ejs')
    }
    /* No código acima tem um FOR para verificar se há algum campo vazio por garantia, para evitar cadastrar com campos vazios */

})



aplicacao.get("/listaProdutosbtn", function(req,res) {
    console.log("MOSTRANDO LISTRA DE PRODUTOS CADASTRADOS")
    
    produtos.findAll({
        attributes: ['idProduto', 'nome', 'estoque', 'descricao', 'valor', 'validade']
    }).then(listaProdutos => {
        console.log(listaProdutos.length)
        
        res.render('../views/listaProdutos.ejs', {listaProdutos : listaProdutos})

    }).catch(err => {
        console.error("Erro ao procurar database"+err)

        
    })

})


//TEstando github