var router = require("express").Router();
var User = require("../models/User");
var Question = require("../models/Question");
const verifyToken = require("../verifyToken");
var Tag = require("../models/Tag");
var Comment = require("../models/Comment");
var Answer = require("../models/Answer");
const jwt = require('jsonwebtoken');

module.exports = router;

router.post("/", verifyToken, function(req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      Comment.create(req.body).then(res.send(req.body));
    }
  });
});

router.get("/", verifyToken, function(req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      Comment.findAll({
        include: [
          {
            all: true,
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
          }
        ]
      }).then(res.send.bind(res));
    }
  });
});

router.get('/:questionId',function(req,res,next){
    Comment.findAll({
        where:{
            questionId:req.params.questionId
        }
    }).then(res.send.bind(res));
})