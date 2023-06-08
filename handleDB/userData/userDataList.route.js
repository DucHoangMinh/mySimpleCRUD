const express = require('express')
const userDataRoute = express.Router()

const userDataListModel = require('./userDataList.model')

//show API
userDataRoute.get('/',function(req,res){
    userDataListModel.find({}).lean()
        .then(userdatalist => res.json(userdatalist))
})

//add
userDataRoute.route('/add').post(function(req,res){
    let userData = new userDataListModel(req.body);
    userData.save()
    .then(userInfor => {
        res.status(200).json({'add' : 'save to database succesfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
})
module.exports = userDataRoute