const express = require("express")
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { restoreUser } = require('../../utils/auth');
const { Round, User, Post } = require("../../db/models");

const router = express.Router();

// GET all posts from buddies the user is following
router.get(
    `/buddies/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const userId = req.params.id;
        //users being followed
        const user = await User.findOne({
            where: { id: userId },
            include: [
                {
                    model: User,
                    as: "following",
                },
            ],
        });
        //array of following userIds
        let followingIds = user.following.map((followed => followed.dataValues.id));
        followingIds = [...followingIds];
        console.log(followingIds)

        const payload = [];

        await Promise.all(followingIds.map(async (receiverId) => {
            const rounds = await Round.findAll({
                where: {
                    receiverId
                },
                include: {
                    model: Post,
                },
                order: [["createdAt", "DESC"]],
                limit: 20
            })
            payload.push(rounds)
        }
        ))

        // const posts = await Post.findAll({
        //     where: {
        //         id: 
        //     }
        //     // include: Round,
        //     // include: [{
        //     //     model: Round,
        //         // where:{
        //         //     receiverId: followingIds,
        //         // },
        //     // //     required: true
        //     // }],
        //     order: [["createdAt", "DESC"]],
        //     limit: 20,
        // });
        console.log(payload)
        res.json({ payload });

    })
);

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