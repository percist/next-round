const express = require("express")
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { restoreUser } = require('../../utils/auth');
const { Round, User, Post } = require("../../db/models");

const router = express.Router();

// GET all comments on a post
router.get(
    `/:id(\\d+)/comments`,
    asyncHandler(async (req, res) => {
        const postId = req.params.id
        const comments = await Comment.findAll({
            where: {
                id: postId
            }
        })
        res.json({ comments })
    })
)

// POST a new comment on a post
router.post(
    `/:id(\\d+)/comments`,
    asyncHandler(async (req, res) => {
        const postId = req.params.id
        const comment = await Comment.create(req.body);
        res.json(comment)
    })
);

module.exports = router;