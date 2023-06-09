const express = require('express');
const userDataRoute = express.Router();

const userDataListModel = require('./userDataList.model');

//show API
userDataRoute.get('/', function (req, res) {
    userDataListModel
        .find({})
        .lean()
        .then((userdatalist) => res.json(userdatalist));
});

//add
userDataRoute.route('/add').post(function (req, res) {
    let userData = new userDataListModel(req.body);
    userData
        .save()
        .then((userInfor) => {
            res.status(200).json({ add: 'save to database succesfully' });
        })
        .catch((err) => {
            res.status(400).send('unable to save to database');
        });
});

//Xử lý request ở trang home,trả về danh sách sản phẩm tương ứng của tài khoản đó
userDataRoute.get('/:slug', function (req, res) {
    userDataListModel
        .find({ owner: `${req.params.slug}` })
        .lean()
        .then((userdatalist) => res.json(userdatalist));
});

//Xử lý request trả về đối tượng có slug tương ứng
userDataRoute.get('/owner/:slug', function (req, res) {
    userDataListModel
        .find({ slug: `${req.params.slug}` })
        .lean()
        .then((userdatalist) => res.json(userdatalist));
});
module.exports = userDataRoute;
