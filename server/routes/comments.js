const express = require('express');
const router = require('express-promise-router')() // already include try catch block when using in async functions

const CommentController = require('../controllers/comment');

// get all users
router.route('/')
    .get(CommentController.index)


router.route('/createNewComment')
    .post(CommentController.createNewComment);



module.exports = router;