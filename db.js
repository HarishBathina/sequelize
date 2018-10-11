var Sequelize =require('sequelize');
var connection = new Sequelize('StackOverflow','sa','Welcome@1234',{
    host: 'ggku3ser2',
    dialect:'mssql',
    operatorsAliases: false,  
});

console.log('in db')


connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });





module.exports=connection;
var User=require('./models/User');
var Question = require('./models/Question');

var Tag=require('./models/Tag');
var Comment = require('./models/Comment');
var Answer = require('./models/Answer');

// console.log(Question);

console.log('here');
Question.belongsTo(User,{foreignKey:'userId'});

Answer.belongsTo(User,{foreignKey:'userId',as:'User',targetKey:'Userid'});
Comment.belongsTo(User,{foreignKey:'userId',as:'User',targetKey:'Userid'});
Comment.belongsTo(Answer,{foreignKey:'answerId',as:'Answer',targetKey:'id'});
Tag.belongsTo(Question,{foreignKey:'question_id',as:'Question',targetKey:'id'});
Answer.belongsTo(Question,{foreignKey:'questionId',as:'Question',})
  //var Question = require('./models/Question');

