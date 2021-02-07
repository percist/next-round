const express = require("express")
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth');
const {Round, User, Buddy, Item, Site} = require("../../db/models");

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
        res.json(numRounds)
    })
)

// GET most recent twenty rounds from all buddies
router.get(
    `/buddies/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const userId = req.params.id;
        //users being followed
        const user = await User.findOne({
            where: { id: userId },
            include: [
                {model: User,
                as: "following",
                },
            ],
        });
        //array of following userIds
        let followingIds = user.following.map((followed => followed.dataValues.id));
        followingIds = [...followingIds];
        const payload = [];
        await Promise.all(followingIds.map(async (receiverId) => {
            const rounds = await Round.findAll({
                where: {
                    receiverId: receiverId,
                    status: "recipientClaimed"
                },
                include: [{
                    model: Item,
                    include: [{
                        model: Site
                    }]
                }],
                order: [["createdAt", "DESC"]],
                limit: 20
            })
            payload.push(rounds)
        }))
        res.json({ payload });
    })
);

// GET most recent 20 rounds for a site
router.get(
    `/sites/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const siteId = req.params.id;
        //items from that site
        const site = await Site.findOne({
            where: { id: siteId },
            include: {model: Item},
        });
        //array of itemIds
        let itemIds = site.Items.map((item => item.dataValues.id));
        itemIds = [...itemIds];
        const roundsArray = [];
        await Promise.all(itemIds.map(async (itemId) => {
            const item = await Item.findOne({
                where: { id: itemId},
                include: {
                    model: Round,
                    where: {
                        status: "recipientClaimed" || "sitePaidOut"
                    }, 
                    include: [{
                        model: User
                    }]
                },
            })
            roundsArray.push(item.dataValues.Rounds)
        }))
        const rounds = roundsArray.flat()
        console.log(rounds[0].dataValues.receiverId, rounds[0].User)
        res.json( rounds );
    })
);



module.exports = router;