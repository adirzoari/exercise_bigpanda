const JWT = require('jsonwebtoken')
const _ = require('lodash');

const Comment = require('../models/comment');


module.exports = {

    index: async (req, res, next) => {
        const comments = await Comment.find({}).sort([['createdAt', -1]]);
        return res.status(200).send(comments);
    },

    // VALIDATION DONE
    createNewComment: async (req, res, next) => {
        // Email && Password
       
        const { email,message } = req.body;
        console.log('email',email)
        console.log('message',message)
        const newComment = await new Comment({email,message}).save();
       
        return res.status(200).send({newComment})

    },
   




}


