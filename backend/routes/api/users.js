const express = require('express');
const { Op } = require('sequelize')
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Round, Site, Item, Buddy } = require('../../db/models');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Please provide a first name.'),
  check('lastName')
    .exists({ checkFalsy: true })
    .isString()
    .withMessage('Please provide a last name.'),
  check('zip')
    .exists({ checkFalsy: true })
    .isInt()
    .isLength({ min: 5, max: 5 })
    .withMessage('Please provide a valid five digit zip code.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username').not().isEmail().withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  singleMulterUpload("image"), //receives req.file
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, username, zip } = req.body;
    let imgUrl;
    if (req.file) {
      imgUrl = await singlePublicFileUpload(req.file);
    }
    const user = await User.signup({
      email,
      password,
      imgUrl: imgUrl ? imgUrl : null,
      firstName,
      lastName,
      username,
      zip
    });

    if (!user) {
      const err = new Error('Registration failed');
      err.status = 401;
      err.title = 'Registration failed';
      err.errors = ['Something weird happened. Your registration was not processed. Please try again later.'];
      return next(err);
    }
    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

// Get a User by Id
router.get(
  `/:id(\\d+)`,
  asyncHandler(async (req, res) => {
    const userId = req.params.id
    const user = await User.findByPk(userId)
    res.json(user)
  })
)

// Get all User buddies with their Round/Item/Site info
router.get(
  `/:id(\\d+)/buddies`,
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const userWithBuddies = await User.findOne({
      where: { id: userId },
      include: [{
        model: User,
        as: "follower",
      }],
    });
    let followingIds = userWithBuddies.follower.map((followed => followed.dataValues.id));
    followingIds = [...followingIds];
    const buddiesArray = await Promise.all(followingIds.map(async (userId) => {
      const user = await User.findOne({
        where: {
          id: userId,
        }
      })
      return user
    }))

    res.json(buddiesArray)
  })
)

// GET Search Results
router.get(
  `/:query`,
  asyncHandler(async (req, res) => {
    const query = req.params.query;
    const sites = await Site.findAll({
      where: {
        [Op.or]: [
          { 'name': { [Op.iLike]: `%${query}%` } },
          { 'address': { [Op.iLike]: `%${query}%` } },
          { 'city': { [Op.iLike]: `%${query}%` } },
          { 'website': { [Op.iLike]: `%${query}%` } },
        ]
      },
      limit: 20,
    })
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { 'username': { [Op.iLike]: `%${query}%` } },
          { 'firstName': { [Op.iLike]: `%${query}%` } },
          { 'lastName': { [Op.iLike]: `%${query}%` } },
        ]
      },
      limit: 20,
    })
    const results = [...sites, ...users].sort((a, b) => a.updatedAt - b.updatedAt)
    res.json(results)
  })
)

// GET if follower
router.get(
  `/:userId(\\d+)/buddies/:buddyId(\\d+)`,
  asyncHandler(async (req, res) => {
    const {userId, buddyId} = req.params
    const buddy = await Buddy.findOne({
      where:{
        ownerId: userId,
        buddyId: buddyId
      }
    })
    return res.json({buddy})
  })
)

// POST new follow
router.post(
  `/:userId(\\d+)/buddies/:buddyId(\\d+)`,
  asyncHandler(async (req, res) => {
    const {userId, buddyId} = req.params
    const buddy = await Buddy.findOrCreate({
      where:{
        ownerId: userId,
        buddyId: buddyId
      }
    })
    return res.json({ 
      buddy 
    })
  })
)

//DELETE follower
router.delete(
  `/:userId(\\d+)/buddies/:buddyId(\\d+)`,
  asyncHandler(async (req, res) => {
    const {userId, buddyId} = req.params
    const buddy = await Buddy.findOne({
      where:{
        ownerId: userId,
        buddyId: buddyId
      }
    })
    await buddy.destroy();
    return res.json({ 
      message: "user unfollowed" 
    })
  })

)


module.exports = router;
