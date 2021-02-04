const express = require("express")
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const {Round, User, Reply} = require("../../db/models");

const router = express.Router();

router.get(
    `/buddies/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const userId = req.params.id;
        const user = await User.findOne({
            where: { userId },
            include: [
                {
                    model: User,
                    as: "following",
                },
            ],
        });
        let followingIds = user.following.map((followed => followed.id));
        followingIds = [...followingIds, id];
        const posts = await this.post.findAll({
            where: {
                userId: followingIds,
            },
            order: [["createdAt", "DESC"]],
            limit: 20,
        });
        res.json({ posts });
        
    })
);

router.get(
    `/:id(\\d+)/replies`,
    asyncHandler(async (req, res) => {
        const postId = req.params.id
        const replies = await Reply.findAll({
            where: {
                postId
            }
        })
        res.json({ replies })
    })
)

router.post(
    `/:id(\\d+)/comments`,
    asyncHandler(async (req, res) => {
        const postId = req.params.id
        const comment = await Comment.create(req.body);
        res.json(comment)
    })
);

module.exports = router;