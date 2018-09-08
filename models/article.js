//dependencies
const mongoose = require('mongoose');

//Create a reference to the Schema constructor
const Schema = mongoose.Schema;

//Create a new UserSchema object
let ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    summary: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },

    img: {
        type: String,
        required: true
    }
});

//Create the model using mongoos's model method
const Article = mongoose.model('Article', ArticleSchema);

//Export the model
module.exports = Article;