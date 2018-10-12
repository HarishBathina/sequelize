var router = require("express").Router();
var User = require("../models/User");
var Question = require("../models/Question");
var Sequelize = require("sequelize");
var Tag = require("../models/Tag");
var Op = Sequelize.Op;
var Comment = require("../models/Comment");
var Answer = require("../models/Answer");
const FuzzySearch = require('fuzzy-search');

module.exports=router;

router.get('/:searchQuery',function(req,res,next){
    Question.findAll({
        include:[{
            all:true,
        }]
    }).then(function(results){
        const searcher = new FuzzySearch(results,['questionTitle','questionBody'],{
            caseSensitive:false,
        });
        const searchResults = searcher.search(req.params.searchQuery);
    
        res.send(searchResults)
    })
})

