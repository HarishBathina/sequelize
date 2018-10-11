var router = require("express").Router();
var User = require("../models/User");
var Question = require("../models/Question");
var Sequelize = require("sequelize");
var Tag = require("../models/Tag");
var Op = Sequelize.Op;
var Comment = require("../models/Comment");
var Answer = require("../models/Answer");

module.exports = router;
var second = {};

//post the questions to the questions table and after completion post tags to tags table
router.post("/", function(req, res, next) {
  const length = req.body.tags.length;
  var tags = req.body.tags.slice();
  delete req.body.tags;
  Question.create(req.body)
    .then(function(question) {
      for (i = 0; i < length; i++) {
        second.tag = tags[i];
        second.question_id = question.id;

        Tag.create(second).then(function(tag) {});
      }
    })
    .then(res.send("success"));
});

//get all the questions in the questions table
router.get("/", function(req, res, next) {
  Question.findAll({ include: [{ all: true }] }).then(res.send.bind(res));
});
//     Question.findOne({
//         where:{
//             id:1
//         },
//         include:[{
//             all:true,
//         }]
//     }).then(function(question){
//     question.getUser().then(function(user){
//         res.send(user);
//     });
// })

//get the details of question and user associated with question_id
router.get("/:id", function(req, res, next) {
  Question.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        all: true
      }
    ]
  }).then(function(question) {
    if (!question) res.send("not found");
    else res.send(question);
  });
});

//get answers and comments associated with a question using questionId
router.get("/info/:questionId", function(req, res, next) {
  var arr = [];
  Answer.findAll({
    where: {
      questionId: req.params.questionId
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
      Comment.findAll({
        where: {
          answerId: {
            [Op.in]: arr
          }
        },
        include: [{ all: true, include: [{ all: true }] }]
      }).then(function(info) {
        Answer.findAll({
          where: {
            questionId: req.params.questionId
          },
          include: [
            {
              all: true
            }
          ]
        }).then(function(info1) {
          info.push(info1);
          res.send(info);
        });
      });
    });
});

// Question.findById(req.params.id)
//   .then(function(question){
//       res.send(question)
//   })
