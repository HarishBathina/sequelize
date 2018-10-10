var Sequelize =require('sequelize');

var connection = require('../db');

var Tag=connection.define('tag',{
    tag:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    timestamps:false,
    // classMethods:{
    //     associate:function(models){
    //         Tag.belongsTo(models.Question,{foreignKey:'question_id'})
    //     }
    // },
})

module.exports=Tag;