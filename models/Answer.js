var Sequelize =require('sequelize');

var connection = require('../db');

var Answer = connection.define('answer',{
    
    
    
    answer:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        },

    }

},{
    id:'answer_id',
    timestamps:false,
    // classMethods:{
    //     associate:function(models){
    //         Answer.belongsTo(models.User,{foreignKey:'author_id'})
    //     }
    // },
    // classMethods:{
    //     associate:function(models){
    //         Answer.belongsTo(models.Question,{foreignKey:'question_id'})
    //     }
    // },
    
})



module.exports=Answer;