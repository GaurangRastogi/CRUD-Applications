
const axios=require('axios');
const { application } = require('express');
//This module helps us to give request

//This file allow us to render different files using router
exports.homeRoutes = (req,res)=>{
    //make a get request to api users
    axios.get('http://localhost:3000/api/users')            //this is same is find crud operation
    .then(function(response){
        // console.log(response.data);
        res.render('index',{users:response.data});
    })
    .catch(err=>{
        res.send(err);
    })

}


exports.addUser=(req,res)=>{
    res.render('add_user');
}


exports.updateUser=(req,res)=>{
    axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}})
    .then(function(userData){
        res.render('update_user',{user:userData.data});
    })
    .catch(err=>{
        res.send(err);
    })
}

