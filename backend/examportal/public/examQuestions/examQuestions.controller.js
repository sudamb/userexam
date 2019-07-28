var response = require('../response');
var config = require('../../config');

var examQuestionsController = {
    getQuestions: function(req,res,next){
        config.connectToDB.then(function(db){
            var collection = db.collection('exam_questions');
            var docs = [];
            if(req.params.subject == 'ALL'){
                collection.find({},function(err,result){
                    if(err == null){
                        docs = result;
                    } else{
                        res.json(response(501,{},'Failed o get user'));
                        next();
                    }
                });
            } else{
                collection.find({'subject':req.params.subject},function(err,result){
                    if(err ==  null){
                        docs = result;
                    } else{
                        res.json(response(501,{},'Failed o get user'));
                        next();
                    }
                });
            }
            var users = [];
            result.each(function(err,docs){
                console.log(docs);
                if(docs == null){
                    res.json(response(200,users,'Questions of '+req.params.subject));
                } else{
                    users.push(docs);
                }
            });
        })
    },
    addQuestions: function(req,res,next){
        config.connectToDB.then(function(db){
            var collection = db.collection('exam_questions');
            collection.insertMany(req.body,function(err,result){
                if(result != null){
                    res.json(response(200,{},'Questions added successfully'));
                } else{
                    res.json(response(501,{},'Failed to add Questions'));
                }
            });
        },function(err){
            res.json(response(500,{},'Internal server error'));
        });
    }
};

module.exports = examQuestionsController;