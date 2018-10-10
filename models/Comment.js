var Sequelize =require('sequelize');

var connection = require('../db');

var Comment = connection.define('comment',{
    comment:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
},{
    timestamps:false,
    // classMethods:{
    //     associate:function(models){
    //         Comment.belongsTo(models.User,{foreignKey:'author_id'})
    //     }
    // },
    // classMethods:{
    //     associate:function(models){
    //         Comment.belongsTo(models.Question,{foreignKey:'question_id'})
    //     }
    // },
})

module.exports=Comment;