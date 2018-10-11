var router =require('express').Router();
var User=require('../models/User');
var Question = require('../models/Question');

var Tag=require('../models/Tag');
var Comment = require('../models/Comment');
var Answer = require('../models/Answer');

module.exports=router;

//post answer for a question
router.post('/',function(req,res,next){
    Answer.create(req.body)
    .then(function(answer)
    {
        res.send(answer)
    })
})

//get all the answers in the database along with their questionId's and userId's
router.get('/',function(req,res,next){
    Answer.findAll({
        include:[{
            all:true,
        }]
    }).then(res.send.bind(res))
})

