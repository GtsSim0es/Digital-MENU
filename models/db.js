const Sequelize = require('sequelize');

const sequelize = new Sequelize('cardapio', 'root', '12345', {
    host: "localhost",
    dialect: 'mysql',
    query:{raw:true}
    })

    module.exports = 
    {
        Sequelize: Sequelize,
        sequelize: sequelize
    }
