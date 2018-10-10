var Sequelize =require('sequelize');

var connection = require('../db');

console.log('in question');

var Question=connection.define('question',{
     
          
          questionTitle:{
              type:Sequelize.STRING,
              allowNull:false,
              validate:{
                  notEmpty:true
              }
          },
          questionBody:{
              type:Sequelize.TEXT,
              allowNull:false
          }
      },{
           timestamps:false,
        //    classMethods:{
               
        //        associate:function(models){
        //            Question.belongsTo(models.User)
        //        }
        //    },
      })

module.exports=Question;
