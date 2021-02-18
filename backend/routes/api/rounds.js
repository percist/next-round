const express = require("express")
const { sequelize } = require("../../db/models");
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
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

// GET rounds user has not yet been claimed
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
      ]
    })
    res.json(rounds)
  })
)

// GET rounds user (buddy) has claimed
router.get(
  `/users/:id(\\d+)/claimed`,
  asyncHandler(async (req, res, next) => {
    const user = await req.params.id
    const rounds = await Round.findAll({
      where: {
        receiverId: user.id,
        status: {
          exclude: ["userPaid"]
          }
        },
      include: [{
        model: Item,
        include: {
          model: Site
        },
      },
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
          as: "follower",
        },
      ],
    });
    //array of userIds for buddies of which the user is a follower
    let followingIds = user.follower.map((followed => followed.dataValues.id));
    followingIds = [...followingIds];
    const roundsArray = await Promise.all(followingIds.map(async (receiverId) => {
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
      return rounds
    }))
    const payload = roundsArray.flat().slice(0, 20).sort((a, b) => a.createdAt - b.createdAt)
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

    const roundsArray = await Promise.all(itemIds.map(async (itemId) => {
      const item = await RoundItem.findAll({
        where: { itemId: itemId },
        include: {
          model: Round,
          include: [{
            model: User
          }]
        },
      })
      return item;
    }))
    // returns an array for each item with an array of each item round containing round and user data
    const allItems = roundsArray.flat()
    const allRounds = allItems.map(item => item.Round)
    const payload = allRounds.slice(0, 20).sort((a, b) => a.createdAt - b.createdAt)
    // returns an array of rounds (including nulls)
    res.json(payload);
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

// GET roundItem by roundId
router.get(
  `/rounditems/:id(\\d+)`,
  asyncHandler(async (req, res) => {
    const roundId = req.params.id
    const roundItem = await RoundItem.findOne({
      where: {
        roundId: roundId
      },
      include: {
        model: Item
      }
    })
    res.json({ roundItem })
  })
)

// PATCH Update round to status "claimed" and add optional comment
router.patch(
  `/:id(\\d+)`,
  singleMulterUpload("image"),
  restoreUser,
  asyncHandler(async (req, res) => {
    const roundId = req.params.id
    const { comment, status } = req.body
    const imgUrl = await singlePublicFileUpload(req.file);
    const round = await Round.findByPk(roundId)
    if (round) {
      if (comment) {
        await round.update({
          comment: comment,
          status: status,
          imgUrl: imgUrl
        })
      } else {
        await round.update({
          status: status
        })
      }
      res.json({ round })
    }
  }))

// TODO: Form Validation
// Create one round and accompanying roundItem
router.post(
  `/`,
  restoreUser,
  asyncHandler(async (req, res) => {
    const user = await req.user.toJSON()
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