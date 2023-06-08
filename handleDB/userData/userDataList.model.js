const mongoose = require('mongoose')
const Schema = mongoose.Schema


let userDataList = new Schema({
    name : {
        type : String
    },
    owner : {
        type : String
    },
    description : {
        type : String
    },
    price : {
        type : String
    },
    photoURL : {
        type : String
    }
},{
    collection : 'userDataList'
})
module.exports = mongoose.model('userDataList',userDataList)