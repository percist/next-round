const express = require("express")
const { check } = require('express-validator');
const { Op } = require("sequelize")
const { sequelize } = require("../../db/models");
const asyncHandler = require('express-async-handler');
const { requireAuth, restoreUser } = require('../../utils/auth');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Round, User, RoundItem, Item, Site, RoundComment } = require("../../db/models");

const router = express.Router();


const validateRoundCreation = [
  check('receiverId')
    .exists()
    .withMessage('Please choose a buddy.'),
  check('itemId')
    .exists()
    .withMessage('Please choose an item.'),
]

const validateCommentCreation = [
  check('userId')
    .exists()
    .withMessage('What exactly are you trying to do?'),
  check('itemId')
    .exists()
    .withMessage('Where did this come from even?'),
  check('body')
    .exists()
    .withMessage('Please write a comment.')
]

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
    const id = await req.params.id
    const rounds = await Round.findAll({
      where: {
        receiverId: id,
        status: {
          [Op.ne]: "userPaid"
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
    const payload = roundsArray.flat()
                                .slice(0, 20)
                                .sort((a, b) => a.createdAt - b.createdAt)
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
    let itemIds = site.Items.map((item => item.id));
    itemIds = [...itemIds];
    // query for all rounds associated with the items

    const roundsArray = await Promise.all(itemIds.map(async (itemId) => {
      const item = await RoundItem.findAll({
        where: { itemId: itemId },
        include: {
          model: Round,
        },
      })
      return item;
    }))
    const claimedRounds = roundsArray.flat()
                                      .map(item => item.Round)
                                      .filter(round => round.status !== "userPaid")
    await Promise.all(claimedRounds.map(async (round, i) => {
      const recipient = await User.findByPk(round.receiverId);
      claimedRounds[i].receiverId = recipient.dataValues;
    }))
    const payload = claimedRounds.slice(0, 20)
                                  .sort((a, b) => a.createdAt - b.createdAt)
    // returns an array of rounds (may include nulls)
    res.json(claimedRounds);
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

// ******** Create and Update Rounds

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

// Create one round and accompanying roundItem
router.post(
  `/`,
  restoreUser,
  validateRoundCreation,
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

// ******** Comments

//GET all round comments
router.get(
  `/:id(\\d+)/comments`,
  asyncHandler(async (req, res) => {
    const roundId = req.params.id;
    const roundComments = await RoundComment.findAll({
      where: { roundId }
    })
    return res.json( { roundComments })
  })
)

//POST a new comment
router.post(
  `/:id(\\d+)/comments`,
  validateRoundCreation,
  asyncHandler(async (req, res) => {
    const { userId, roundId, body } = req.body.newCommentData
    const roundComment = await RoundComment.create({
      userId: userId,
      roundId: roundId,
      body: body
    })
    if (!roundComment) {
      const err = new Error('Comment failed');
      err.status = 401;
      err.title = 'Comment failed';
      err.errors = ['Something weird happened. Your comment was not posted. Please try again later'];
      return next(err);
    }
    return res.json({ roundComment })
  })
)

//EDIT an existing comment
router.patch(
  `/:roundId(\\d+)/comments/:commentId(\\d+)`,
  restoreUser,
  asyncHandler(async (req, res) => {
    const user = await req.user.toJSON();
    const { roundId, commentId } = req.params
    const { body } = req.body.newCommentData

    const comment = await RoundComment.findByPk(commentId);
    if (comment) {
      await comment.update({
        body: body
      })
    } 
    return res.json({ comment })
  })
)

//DELETE a comment
router.delete(
  `/:roundId(\\d+)/comments/:commentId(\\d+)`,
  restoreUser,
  asyncHandler(async (req, res) => {
    const user = await req.user.toJSON();
    const { roundId, commentId } = req.params
    const comment = await RoundComment.findByPk(commentId);
    if (comment) {
      await comment.destroy();
    } 
    res.json({ message: "comment deleted" })
  })
)

module.exports = router;