const express = require("express")
const { Op } = require("sequelize");
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Round, User, RoundItem, Item, Site } = require("../../db/models");

const router = express.Router();

// GET a round by Id
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
                    where: { senderId: randomFollowingId }
                }]
            }],
            order: [["createdAt", "DESC"]],
            limit: 1,
        })
        res.json({ randomBuddyRound });
    })
)

// GET rounds user has not yet claimed
router.get(
    `/users/:id(\\d+)`,
    restoreUser,
    asyncHandler(async (req, res, next) => {
        const user = await req.user.toJSON()
        const rounds = await Round.findAll({
            where: {
                receiverId: user.id,
                status: "userPaid"
            },
            include: [{
                model: Item,
                include: {
                    model: Site
                },
            },
            // {
            //     model: User,
            //     where: {
            //         id: senderId //user.id == round.senderId 
            //     },
            //     as: "HasReceivedRoundsFrom"
            // }
        ]
        })
        res.json(rounds)
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
                {
                    model: User,
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
                },
                include: [{
                    model: Item,
                    include: [{
                        model: Site
                    }]
                }],
                order: [["createdAt", "DESC"]],
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
            include: { model: Item },
        });
        //array of itemIds
        let itemIds = site.Items.map((item => item.dataValues.id));
        itemIds = [...itemIds];
        // query for all rounds associated with the items

        // rounds -> include round items where item.Id = itemId
        const roundsArray = await Promise.all(itemIds.map(async (itemId) => {
            const item = await Item.findOne({
                where: { id: itemId },
                include: {
                    model: Round,
                    include: [{
                        model: User
                    }]
                },
            })
            return item.dataValues.Rounds;
        }))
        const allRounds = roundsArray.flat()
        const idValuesArray = []
        const rounds = allRounds.filter(round => {
            if (idValuesArray.includes(round.dataValues.id)) return
            console.log(round.dataValues.id)
            idValuesArray.push(round.dataValues.id)
            return round
        })
        res.json(rounds);
    })
);

// GET item by itemId
router.get(
    `/items/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const itemId = req.params.id
        const roundItem = await Item.findByPk(itemId)
        res.json({ roundItem })
    })
)

router.put(
    `/:id(\\d+)`,
    restoreUser,
    asyncHandler(async (req, res) => {
        const roundId = req.params.id
        const { comment, status } = req.body
        const round = await Round.findByPk(roundId)
        if (comment){
            await round.update({
                comment: comment,
                status: status
            })
        }else{
            await round.update({
                status: status
            })
        }
        return round;
    }))

// TODO: Form Validation
// Create one round and accompanying roundItem
router.post(
    `/`,
    restoreUser,
    asyncHandler(async (req, res) => {
        const user = await req.user.toJSON()
        console.log(user)
        const { receiverId, itemId } = req.body;
        const round = await Round.create({
            status: "userPaid",
            receiverId: parseInt(receiverId),
            senderId: user.id
        })
        await RoundItem.create({
            roundId: round.id,
            itemId: itemId
        })
        return res.json({
            round
        })
    })
)


module.exports = router;