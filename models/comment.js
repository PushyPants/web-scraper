//dependencies
var mongoose = require('mongoose');

//Create a reference to the Schema constructor
var Schema = mongoose.Schema;

//Create a new UserSchema object
var CommentSchema = new Schema({
    Comment: {
        type: String,
        required: true,
        unique: true
    },
});

//Create the model using mongoos's model method
var Comment = mongoose.model('Comment', CommentSchema);

//Export the model
module.exports = Comment;