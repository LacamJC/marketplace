const Sequelize = require('sequelize')
const sequelize = require('./conexao')
const database = require('./conexao')

const produtos = database.define('produtos', {
    idProduto:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nome:{
        type: Sequelize.STRING(30),
        allowNull: false, 
        
    },
    estoque:{
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    descricao:{
        type: Sequelize.TEXT,
        defaultValue: "Insira descrição"
    },
    valor:{
        type: Sequelize.DECIMAL(5,2)
    },
    validade:{
        type: Sequelize.DATE
    }
})

//Criação do IFNotExists para evitar sobrecriação de tabelas
// produtos.sync({force: true, ifNotExists: true}).then(() => {
//     console.log("Tabela 'produtos' criada com sucesso");
// }).catch(err => {
//     console.error('Erro ao criar a tabela "produtos"', err);
// });

// produtos.sync({force: true})

module.exports = produtos
