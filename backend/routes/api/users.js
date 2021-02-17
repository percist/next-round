const express = require('express');
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
  // check('imgUrl')
  //   .exists({ checkFalsey: false })
  //   .isString()
  //   .isURL()
  //   .withMessage('Please provide a valid web address to a profile picture.'),
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
    const imgUrl = await singlePublicFileUpload(req.file);
    const user = await User.signup({ email, password, imgUrl, firstName, lastName, username, zip });
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
    const userId = req.params.id
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

module.exports = router;
