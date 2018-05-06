const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    email: {
        type:String
    },
    message:{
        type: String
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
    
})


const Comment = mongoose.model('comment',commentSchema);
module.exports = Comment;