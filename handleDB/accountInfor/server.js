// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose')
const userInforRoute = require('./userInfor.route')
const userDataRoute = require('../userData/userDataList.route')

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/my_simple_crud', { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);
    
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/userinfor',userInforRoute)
app.use('/userdata',userDataRoute)

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});
