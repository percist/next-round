const express = require("express")
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Site, Owner, Item } = require("../../db/models"
)
const router = express.Router();

const validateSignup = [
    check('name')
      .exists({ checkFalsy: true })
      .isString()
      .isLength({min: 1, max: 200})
      .withMessage('Please provide a name.'),
    check('address')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide an address.'),
    check('city')
      .exists({ checkFalsy: true })
      .isString()
      .withMessage('Please provide an city.'),
    check('state')
      .exists({ checkFalsy: true })
      .isString()
      .isLength({min: 2, max:2})
      .withMessage('Please choose a state.'),
    check('zip')
      .exists({ checkFalsy: true })
      .isInt()
      .isLength({min: 5, max: 5})
      .withMessage('Please provide a valid five digit zip code.'),
    check('website')
      .exists({ checkFalsey: false })
      .isString()
      .isURL()
      .withMessage('Please provide a valid web address.'),
    handleValidationErrors
  ];

const validateItemCreation = [
  check("name")
    .exists({ checkFalsy: true})
    .isString()
    .isLength({ min: 1, max: 200 })
    .withMessage('Please provide a name for your item.'),
  check("description")
    .exists({ checkFalsy: true})
    .isString()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Please provide a description for your item.'),
  check("price")
    .exists({ checkFalsy: true})
    .isInt()
    .isLength({ min: 100, max: 100000 })
    .withMessage('Please provide a price for your item.'),
    handleValidationErrors
];

// Get one site by ID
router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const siteId = req.params.id
        const site = await Site.findOne({
            where: {id: siteId},
            include: [
                {
                    model: Item
                }
            ]
        })
        res.json({ site })
    })
)

// Get owner of site
router.get(
  `/:id(\\d+)/owners`,
  asyncHandler(async (req, res) => {
    const siteId = req.params.id
    const siteOwners = await Owner.findAll({
      where: {siteId: siteId}
    })
    res.json( {siteOwners} )
  })
)

// Create a new site
router.post(
    `/`,
    restoreUser,
    singleMulterUpload("image"), //receives req.file
    validateSignup,
    asyncHandler(async (req, res) => {
        const user = await req.user.toJSON();
        const { name, address, city, state, website, active, zip } = req.body;
        const imgUrl = await singlePublicFileUpload(req.file);
        const site = await Site.create({ name, address, imgUrl, city, state, website, active, zip });
        await Owner.create({
            siteId: site.id,
            userId: user.id
        })
        return res.json({
            site
        });
    })
);

// Get all items from one site
router.get(
  `/:id(\\d+)/items`,
  asyncHandler(async (req, res) => {
      const siteId = req.params.id
      const site = await Site.findOne({
          where: {id: siteId},
          include: [
              {
                  model: Item
              }
          ]
      })
      res.json({ site })
  })
)

// Delete an item
router.delete(
  `/:siteId(\\d+)/items/:itemId(\\d+)`,
  asyncHandler(async (req, res) => {
    const itemId = req.params.itemId;
    const item = await Item.findByPk(itemId);
    await item.destroy();
  })
)

// Create an item
router.post(
  `/:siteId(\\d+)/items`,
  validateItemCreation,
  singleMulterUpload("image"), 
  asyncHandler(async (req, res) => {
    console.log("ROUTE HIT*******")
    const siteId = req.params.siteId;
    const { name, description, price } = req.body
    const imgUrl = await singlePublicFileUpload(req.file);
    const item = await Item.create({name, description, price, imgUrl});
    await Menu.create({
      siteId,
      itemId: item.id
    });
    return res.json({item})
  })
)

module.exports = router;