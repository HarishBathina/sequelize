var router = require("express").Router();
var User = require("../models/User");
var Question = require("../models/Question");
const verifyToken = require("../verifyToken");
var Tag = require("../models/Tag");
var Comment = require("../models/Comment");
var Answer = require("../models/Answer");

module.exports = router;

//post answer for a question
router.post("/", verifyToken, function(req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      Answer.create(req.body).then(function(answer) {
        res.send(answer);
      });
    }
  });
});

//get all the answers in the database along with their questionId's and userId's
router.get("/", verifyToken, function(req, res, next) {
  jwt.verify(req.token, "secretKey", (err, authData) => {
    if (err) {
      res.status(403).send("Invalid Token");
    } else {
      Answer.findAll({
        include: [
          {
            all: true
          }
        ]
      }).then(res.send.bind(res));
    }
  });
});
