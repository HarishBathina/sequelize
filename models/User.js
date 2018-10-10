var Sequelize =require('sequelize');

var connection = require('../db');
console.log('in user');

var User=connection.define('user',{
    Userid:{
        type:Sequelize.STRING,
        primaryKey:true,
        allowNull:false,
        
   },
    firstName:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    lastName:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
},{
    timestamps:false
})

module.exports=User;