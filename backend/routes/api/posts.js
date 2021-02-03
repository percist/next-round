const express = require("express")
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const {Round, User, Buddy} = require("../../db/models");
const user = require("../../db/models/user");
const { route } = require("./users");

const router = express.Router();

route.get(
    `/buddies/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const user = await User.findOne({
            where: { id },
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

module.exports = router;