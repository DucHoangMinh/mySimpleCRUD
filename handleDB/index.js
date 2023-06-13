// index.js
const uri =
    'mongodb+srv://hoangminhduc4125:hoangminhduc04122003@cluster0.s8cgc8w.mongodb.net/?retryWrites=true&w=majority';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const userInforRoute = require('./accountInfor/userInfor.route');
const userDataRoute = require('./userData/userDataList.route');

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true }).then(
    () => {
        console.log('Database is connected');
    },
    (err) => {
        console.log('Can not connect to the database' + err);
    },
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/userinfor', userInforRoute);
app.use('/userdata', userDataRoute);
app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳');
});
app.listen(PORT, function () {
    console.log('Server is running on Port:', PORT);
});
module.exports = app;
