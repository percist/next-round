const express = require('express');
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');

const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

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
    .isLength({min: 5, max: 5})
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
  validateSignup,
  asyncHandler(async (req, res) => {
    const body = req.body;
    const user = await User.signup(body);

    await setTokenCookie(res, user);

    return res.json({
      user
    });
  })
);

module.exports = router;
