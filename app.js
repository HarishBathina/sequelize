var express = require('express');
var volleyball =require('volleyball');
var app = express();
var bodyParser = require('body-parser');
var connection = require('./db');
var questionRouter=require('./routes/questionRouter');
var userRouter=require('./routes/userRouter');
var tagRouter=require('./routes/tagRouter');
var answerRouter=require('./routes/answerRouter');
var commentRouter=require('./routes/commentRouter');
var searchRouter=require('./routes/searchRouter');

app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.use(volleyball);
app.use(bodyParser.json());
app.use('/question',questionRouter);
app.use('/user',userRouter);
app.use('/tag',tagRouter);
app.use('/answer',answerRouter);
app.use('/comment',commentRouter);
app.use('/search',searchRouter);

// app.use(express.static('/'))

// app.get('/',function(req,res,next){
//     res.send(question);
// })
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


var server =app.listen(5000,function(){
    console.log('listening on port',server.address().port)
    connection.sync({force:false}).then(function(){
          connection.sync().then(message=>{
        console.log('db is synced')
    })
})
})