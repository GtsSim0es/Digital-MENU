const db = require('./db')

const Post = db.sequelize.define('menus', {
    imagem: {
        type: db.Sequelize.STRING
    },
    nome: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    texto: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
});

//Post.sync({ force: true })

module.exports = Post;