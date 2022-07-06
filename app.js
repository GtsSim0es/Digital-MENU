const express = require("express");
const session = require('express-session')
const app = express();
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const multer = require("multer")
const path = require("path")
const sequelize = require('sequelize');
const { Sequelize } = require("./models/db");
const op = Sequelize.Op


var login = 'admin'
var password = '12345'

//CONFIGURAÇÕES
    //SESSION
    app.use(session({secret:'108ISHdnsahk&@#*kSdnjsad'}))   
    //CSS
    app.use(express.static('public'))
    //TEMPLATE ENGINE
    var handle = exphbs.create({
        defaultLayout: 'main'
        });
    app.engine('handlebars', handle.engine);
    app.set('view engine', 'handlebars');
    //BODY PARSER
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    //MULTER 
    const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "public/images/")
        },
        filename: function(req, file, cb){
            cb(null, file.originalname + Date.now() + path.extname(file.originalname))
        }
    })
    const upload = multer({storage})

    //ROTAS




        app.post('/cadastro', function(req, res){

            if(req.body.password == password && req.body.login == login){
                req.session.login = login
                Post.findAll().then
                (function(cardapio){res.render('cadastro', {cardapio:cardapio})})
            }else{
                res.render('/')
            }
        
        })
        
        app.get('/cadastro', function(req, res){
            if(req.session.login)
            {
                Post.findAll().then
                (function(cardapio){res.render('cadastro', {cardapio:cardapio})})
                
                console.log("Voce está logado como: " + req.session.login)
            }else
            {
                res.render('login')
            }
            
        })

    app.post('/add', upload.single("imagem"),function(req, res){
        if(req.session.login)
        {
            Post.create(
                {
                imagem: req.file.filename,
                nome: req.body.nome,
                texto: req.body.texto
            }).then(function(){
                //Função de sucesso
                res.redirect('/cadastro')
                
            }).catch(function(){
                //Função de erro
                res.send('Houve um erro na criação do Post')
            })
        }else
        {
            res.render('login')
        } });

        //criar cardapio

        app.get('/', function(req, res){
                Post.findAll().then
                (function(cardapio){res.render('cardapio', {cardapio:cardapio})})
        })

        //logoff
        app.get('/sair', function(req, res){
            req.session.login = null
            res.redirect('/')
        })

        //DELETAR
        app.get('/deletar/:id', function(req, res){
            if(req.session.login)
            {
                Post.destroy({where: {'id': req.params.id}}).then(function(){
                    res.redirect('/cadastro')
                    }).catch(function(erro){
                        res.send('Esta postagem não existe')
                    })
            }else
            {
                res.render('login', {layout: 'none'})
            } 
        })

        //Server connect
app.listen(8082, function(){
    console.log("Servidor rodando na porta 8082")
});