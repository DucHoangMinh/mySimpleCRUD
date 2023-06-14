const express = require('express');
const userDataRoute = express.Router();

const userDataListModel = require('./userDataList.model');

//show API
userDataRoute.get('/', function (req, res) {
    userDataListModel
        .find({ onGarbage: false })
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

//Xử lý request ở trang home,trả về danh sách sản phẩm tương ứng không để trong thùng rác
userDataRoute.get('/:slug', function (req, res) {
    userDataListModel
        .find({ owner: `${req.params.slug}`, onGarbage: false })
        .lean()
        .then((userdatalist) => res.json(userdatalist));
});
//Xử lý request ở trang garbage,trả về danh sách sản phẩm tương ứng trong thùng rác
userDataRoute.get('/trash/:slug', function (req, res) {
    userDataListModel
        .find({ owner: `${req.params.slug}`, onGarbage: true })
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
userDataRoute.put('/owner/update/:slug', function (req, res) {
    userDataListModel
        .updateOne(
            { slug: `${req.params.slug}` },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
            },
        )
        .then((result) => console.log(result))
        .catch((err) => {
            console.error(err);
        });
});
//soft delete
userDataRoute.put('/softdelete/:slug', function (req, res) {
    userDataListModel
        .updateOne(
            { slug: `${req.params.slug}` },
            {
                onGarbage: req.body.onGarbage,
            },
        )
        .then((result) => console.log(result))
        .catch((err) => {
            console.error(err);
        });
});
//permanently delete
userDataRoute.delete('/trash/delete/:slug', function (req, res) {
    userDataListModel
        .deleteOne({ slug: `${req.params.slug}` })
        .then((result) => console.log(result))
        .catch((err) => {
            console.error(err);
        });
});
userDataRoute.put('/trash/restore/:slug', function (req, res) {
    userDataListModel.updateOne(
        {
            slug: `${req.params.slug}`,
        },
        { onGarbage: req.body.onGarbage },
    );
});
module.exports = userDataRoute;
