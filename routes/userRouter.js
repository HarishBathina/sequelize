var router =require('express').Router();

var User = require('../models/User');
var Tag = require('../models/Tag');
var Question = require('../models/Question');

const jwt = require('jsonwebtoken');
const crypto = require ('crypto');

const verifyToken=require('../verifyToken');

//check if the user already exists and store the credentrials of previously non-existent users...
router.post("/signup", function(req, res, next) {

    // const password = crypto
    // .createHash("md5")
    // .update(req.body.password)
    // .digest("hex");

    User.findById(req.body.Userid)
    .then(function(user){
        if(user) res.status(409).send('User Already Exists');
        else User.create(req.body).then(res.status(201).send('Account Created Successfully'));
    })

})


//Get the information of user asssociated with the given userId
router.get("/home/:userId",verifyToken,  (req, res, next) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
      if (err) {
        res.status(403).send("Invalid Token");
      } else {
          User.findById(req.params.userId)
          .then(function(user){
              if(!user) res.status(404).send("No Entry Found")
              else res.status(200).send(user)
          })
      }
    })
})

//Authenticating the user
router.post("/login",function(req,res,next){
    User.findOne({
        where:{
            Userid:req.body.Userid,
            password:req.body.password
        },
    }).then(function(user){
        if(user){
            tokenUserData={
                Userid:user.Userid,
                firstName:user.firstName,
                lastName:user.lastName,
                password:user.password
            };
            jwt.sign(tokenUserData,'secretKey',function(err,token){
                res.json({token})
            });
        }
        else{
            res.send("Kindly sign up before logging in ")
        }
    })
})


//
// router.get('/:id',function(req,res,next){
//     Question.findOne({
//         where:{
//             userId:req.params.id,
//         },
//         include:[{
//             all:true,
//         }]
//       }).then(function(question){
//           Tag.findAll({
//             where:{
//                 question_id:question.id
//             }
//           })
//       })

// })

module.exports=router;