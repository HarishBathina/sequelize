var router =require('express').Router();
var User=require('../models/User');
var Question = require('../models/Question');

var Tag=require('../models/Tag');
var Comment = require('../models/Comment');
var Answer = require('../models/Answer');

module.exports=router;

router.post('/',function(req,res,next){
    Comment.create(req.body)
    .then(res.send(req.body))
});

router.get('/',function(req,res,next){
    Comment.findAll({
        include:[{
            all:true,
        include:[{
            all:true,
            include:[{
                all:true
            }]
        }],
    }]
    }).then(res.send.bind(res));
})

