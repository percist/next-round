const express = require("express")
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth');
const {Round, User, Buddy} = require("../../db/models");

const router = express.Router();

router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const roundId = req.params.id
        const round = await Round.findByPk(roundId)
        res.json({ round })
    })
)

// Of all rounds by buddies, fetch the most recent with buddy info
router.get(
    `/buddies/recent`,
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = await req.user.toJSON()
        const userWithBuddies = await User.findOne({
            where: { id: user.Id },
            include: [
                {
                    model: User,
                    as: "following",
                },
            ],
        });
        let followingIds = user.following.map((followed => followed.dataValues.id));
        followingIds = [...followingIds];
        const rounds = await RoundsSideba
    })
)


module.exports = router;