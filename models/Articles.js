//dependencies
var mongoose = require('mongoose');

//Create a reference to the Schema constructor
var Schema = mongoose.Schema;

//Create a new UserSchema object
var ArticleSchema = new Schema({
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
var Articles = mongoose.model('Articles', ArticleSchema);

//Export the model
module.exports = Articles;