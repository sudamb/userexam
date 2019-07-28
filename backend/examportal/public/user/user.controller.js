var response = require('../response');
var config = require('../../config');

var userController = {
    addUser: function(req,res,next){
        config.connectToDB.then(function(db){
            var collection = db.collection('users');
            collection.insertOne(req.body,function(err,result){
                console.log(result);
                if(result != null){
                    res.json(response(200,{},'User added successfully'));
                } else{
                    res.json(response(501,{},'Failed to insert user'));
                }
            });
        },function(err){
            res.json(response(500,{},'Internal server error'));
        });
    },

    updateUser: function(req,res,next){
        config.connectToDB.then(function(db){
            var collection = db.collection('users');
            collection.findOneAndUpdate(
                {
                    "_id": new config.objectId(req.params.id)
                },{
                    "$set":{
                        'name':req.body.name,
                        'contNumber':req.body.contNumber,
                        'email':req.body.email,
                        'examDate':req.body.examDate,
                        'examTime':req.body.examTime,
                        'examMark':req.body.examMark
                    }
                },function(err,result){
                    if(result != null){
                        res.json(response(200,{},'User info updated successfully'));
                    } else{
                        res.json(response(501,{},'Failed to update user info'));
                    }
                })
        },function(err){
            res.json(response(500,{},'Internal server error'));
        })
    },

    getUser: function(req,res,next){
        config.connectToDB.then(function(db){
            var collection = db.collection('users');
            collection.find({},function(err,result){
                console.log("-----------------");
                console.log('Error '+err);
                if(err ==  null){
                    var users = [];
                    result.each(function(err,docs){
                        console.log(docs);
                        if(docs == null){
                            res.json(response(200,users,'list of user'));
                        } else{
                            users.push(docs);
                        }
                    });
                } else{
                    res.json(response(501,{},'Failed o get user'));
                }
            });
        },function(err){
            res.json(response(500,{},'Internal server error'));
        });
    }
};

module.exports = userController;