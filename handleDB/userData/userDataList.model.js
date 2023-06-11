const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
let userDataList = new Schema(
    {
        name: {
            type: String,
        },
        owner: {
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: String,
        },
        photoURL: {
            type: String,
            default: '',
        },
        onGarbage: {
            type: Boolean,
            default: false,
        },
        //Tự động tạo slug
        slug: {
            type: String,
            slug: ['name', 'owner'],
            unique: true,
        },
    },
    {
        collection: 'userDataList',
    },
);
module.exports = mongoose.model('userDataList', userDataList);
