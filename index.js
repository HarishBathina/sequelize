var Sequelize = require('sequelize');
var connection = new Sequelize('HarishBathina','sa','Welcome@1234',{
    host: 'ggku3ser2',
    dialect:'mssql',
    //server: 'ggku3ser2',
    //dialectModulePath: 'sequelize-msnodesqlv8',
    // dialectOptions: {
    //     instanceName: 'ggku3ser2',
    //     requestTimeout: 30000
    // },
    operatorsAliases: false,
    //port:4200
});

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var Article = connection.define('article',{
    slug:{
        type:Sequelize.STRING,
        
    },
    title:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        //defaultValue: 'Coming Soon...'
    }
},{
    timestamps:false
});

var Author = connection.define('author',{
   
    title:{
        type:Sequelize.STRING,
        
        allowNull:false,
        
    },
    Name:{
        type:Sequelize.STRING,
        //defaultValue: 'Coming Soon...'
    }
},{
    timestamps:false
});

var Subscriber = connection.define('subscriber',{
   
    title:{
        type:Sequelize.STRING,
        
        allowNull:false,
        
    },
    Name:{
        type:Sequelize.STRING,
        //defaultValue: 'Coming Soon...'
    }
},{
    timestamps:false
});

Author.belongsTo(Article,{foreignKey:'Book',targetKey:'title'});

Subscriber.belongsTo(Article,{foreignKey:'Name',targetKey:'title'});




connection.sync({force:true,
logging:console.log}).then(function(){

    Article.create({
        slug:'War-and-Peace',
        title:'War and Peace',
        body: 'Written By Leo Tolstoy'
    });
    Author.create({
       
        Book:'War and Peace',
        title:'Wars and Peace',
        Name: 'Leo Tolstoy'
    });
    Subscriber.create({
       
        //Name:'War and Peace',
        title:'War and Peace',
        Name: 'War and peace'
    });
   // Author.getArticle('Leo Tolstoy');
  }).catch(function(error){
    console.log(error);
})

