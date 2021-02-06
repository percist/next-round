const express = require("express")
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth');
const {Round, User, Buddy} = require("../../db/models");

const router = express.Router();

// GET a user by Id
router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const roundId = req.params.id
        const round = await Round.findByPk(roundId)
        res.json({ round })
    })
)

// GET a random round sent by a buddy
router.get(
    `/buddies/recent`,
    restoreUser,
    asyncHandler(async (req, res, next) => {
        const user = await req.user.toJSON()
        const userWithBuddies = await User.findOne({
            where: { id: user.id },
            include: [
                {
                    model: User,
                    as: "following",
                },
            ],
        });
        let followingIds = userWithBuddies.following.map((followed => followed.dataValues.id));
        followingIds = [...followingIds];
        const randomFollowingPosition = Math.floor(Math.random() * followingIds.length)
        const randomFollowingId = followingIds[randomFollowingPosition]
        const randomBuddyRound = await User.find({
            where: {
                id: randomFollowingId
            },
            include: [{
                model: Round,
                include: [{
                    model: User,
                    where: { senderId: randomFollowingId}
                }]
            }],
            order: [["createdAt", "DESC"]],
            limit: 1,
        })
        res.json({randomBuddyRound});
    })
)

// GET number of rounds current user has not yet claimed
router.get(
    `/user/total`,
    restoreUser,
    asyncHandler(async (req, res, next) => {
        const user = await req.user.toJSON()
        const rounds = await Round.findAll({
            where: {
                receiverId: user.id,
                status: "userPaid"
            }
        })
        const numRounds = Object.keys(rounds).length
        console.log("NUM ROUNDS: ", numRounds)
        res.json(numRounds)
    })
)
module.exports = router;