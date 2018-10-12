var router = require("express").Router();
var Sequelize = require("sequelize");
var Tag = require("../models/Tag");
var Op = Sequelize.Op;
const verifyToken = require("../verifyToken");
var Question = require("../models/Question");

//Manual posting of tags in tag table
router.post("/", verifyToken, function(req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      const length = req.body.tag.length;
      const tags = req.body.tag.slice();
      //console.log(tags);
      for (i = 0; i < length; i++) {
        req.body.tag = tags[i];
        //console.log(req.body.tag);
        Tag.create(req.body).then(function(tag) {
          //res.send(tag);
        });
      }
    }
  });
});

//get all the tags along with their question and user information
router.get("/:id", verifyToken, function(req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      Tag.findOne({
        where: {
          id: req.params.id
        },
        include: [{ all: true, include: [{ all: true }] }]
      }).then(function(tag) {
        res.send(tag);
      });
    }
  });
});

router.get("/", verifyToken, function(req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      Tag.findAll({
        include: [
          {
            all: true,
            include: [
              {
                all: true
              }
            ]
          }
        ]
      }).then(res.send.bind(res));
    }
  });
});

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

router.get("/user/:id", verifyToken, function(req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      var arr = [];
      Question.findAll({
        where: {
          userId: req.params.id
        },
        attributes: ["id"]
      })
        .then(function(results) {
          results.map(result => {
            arr.push(result.dataValues.id);
          });
          console.log(arr);
        })
        .then(function() {
          console.log(arr);
          Tag.findAll({
            where: {
              question_id: {
                [Op.in]: arr
              }
            },
            include: [{ all: true, include: [{ all: true }] }]
          }).then(res.send.bind(res));
        });
    }
  });
});

module.exports = router;
