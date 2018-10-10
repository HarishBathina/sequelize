var router =require('express').Router();
var Sequelize =require('sequelize');
var Tag = require('../models/Tag');
var Op = Sequelize.Op;

var Question=require('../models/Question');

//Manual posting of tags in tag table
router.post("/",function(req,res,next){

    const length=req.body.tag.length;
    const tags=req.body.tag.slice();
    //console.log(tags);
    for(i=0;i<length;i++){
        
        req.body.tag=tags[i];
         //console.log(req.body.tag);
        Tag.create(req.body)
        .then(function(tag){
        //res.send(tag);
        })
    }
    
})

//get all the tags along with their question and user information
router.get("/:id",function(req,res,next){
    Tag.findOne({
        where:{
           id:req.params.id,
        },
        include:[{all:true,include:[{all:true}]}]
    }).then(function(tag){
            res.send(tag);     
    })
})

router.get("/",function(req,res,next){
    Tag.findAll({
        include:[{
            all:true,
            include:[{
                all:true,
            }]
        }]
    }).then(res.send.bind(res))
})


//getUser functionality implemented

// router.get("/:id",function(req,res,next){
//     Tag.findOne({
//         where:{
//             id:req.params.id
//         },
//         include:[{
//             all:true
//         }]
//     }).then(function(tag){
//         tag.getQuestion().then(function(question){
//             question.getUser().then(function(user){
//             question.posed_by=Object.assign(user);
//             res.send(question);
//             })

//         })
//     })
// })


//retreiving question and tags base on userid...(join of 3 tables)

router.get('/user/:id',function(req,res,next){
    var arr=[];
    Question.findAll({
        where:{
            userId:req.params.id
        },attributes:['id']
    }).then(function(results){
        results.map(result=>{
            arr.push(result.dataValues.id)

        })
        console.log(arr);
    }).then(function(){

            console.log(arr);
            Tag.findAll({
                 where:{
            question_id:{
                [Op.in]:arr
            }
        },
        include:[
            {all:true,include:[{all:true}]}
        ]      
    }).then(res.send.bind(res))

        })
    })



module.exports=router;