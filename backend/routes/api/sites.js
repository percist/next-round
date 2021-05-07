const express = require("express")
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Site, Owner, Item, Menu, Round } = require("../../db/models"
);
const { round } = require("lodash");
const router = express.Router();

const validateSignup = [
  check('name')
    .exists({ checkFalsy: true })
    .isString()
    .isLength({ min: 1, max: 200 })
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
    .isLength({ min: 2, max: 2 })
    .withMessage('Please choose a state.'),
  check('zip')
    .exists({ checkFalsy: true })
    .isInt()
    .isLength({ min: 5, max: 5 })
    .withMessage('Please provide a valid five digit zip code.'),
  check('website')
    .exists({ checkFalsey: false })
    .isString()
    .isURL()
    .withMessage('Please provide a valid web address.'),
  handleValidationErrors
];

const validateItemCreation = [
  check('name')
    .isString()
    .withMessage('Please ensure input is a string')
    .isLength({ min: 1, max: 200 })
    .withMessage('Please provide a name for your item.'),
  check("description")
    .isString()
    .withMessage('Please ensure input is a string')
    .isLength({ min: 1, max: 2000 })
    .withMessage('Please provide a description for your item.'),
  check("price")
    .isString()
    .withMessage('Please ensure input is a string')
    .isLength({ min: 3, max: 5 })
    .withMessage('Please provide a price for your item.'),
  handleValidationErrors
];

// Get one site by ID
router.get(
  `/:id(\\d+)`,
  asyncHandler(async (req, res) => {
    const siteId = req.params.id
    const site = await Site.findOne({
      where: { id: siteId },
      include: [
        {
          model: Item
        }
      ]
    })
    res.json({ site })
  })
)

// Get all sites
router.get(
  `/`,
  asyncHandler(async (req, res) => {
    const sites = await Site.findAll({
      include: [
        {
          model: Item
        }
      ]
    })
    res.json({ sites })
  })
)

// Get all sites owned by current user
router.get(
  `/user`,
  restoreUser,
  asyncHandler(async (req, res) => {
    const user = await req.user.toJSON();
    const sites = await Owner.findAll({
      where: {
        userId: user.id
      },
      include: [{
        model: Site,
      }]
    })
    res.json({ sites })
  })
)

// Get owner of site
router.get(
  `/:id(\\d+)/owners`,
  asyncHandler(async (req, res) => {
    const siteId = req.params.id
    const siteOwners = await Owner.findAll({
      where: { siteId: siteId }
    })
    res.json({ siteOwners })
  })
)

// Create a new site
router.post(
  `/`,
  singleMulterUpload("image"), //receives req.file
  restoreUser,
  validateSignup,
  asyncHandler(async (req, res) => {
    const user = await req.user.toJSON();
    const { name, address, city, state, website, active, zip } = req.body;
    let imgUrl;
    if (req.file) {
      imgUrl = await singlePublicFileUpload(req.file);
    }
    const site = await Site.create({
      name,
      address,
      imgUrl: imgUrl ? imgUrl : null,
      city,
      state,
      website,
      active,
      zip
    });
    await Owner.create({
      siteId: site.id,
      userId: user.id
    })
    if (!site) {
      const err = new Error('Registration failed');
      err.status = 401;
      err.title = 'Registration failed';
      err.errors = ['Something weird happened. Your business could not be created at this time.'];
      return next(err);
    }
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
      where: { id: siteId },
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
    const siteId = req.params.siteId;
    const menu = await Menu.findOne({
      where: {
        itemId: itemId
      }
    });
    const round = await Round.findAll({
      where: {
        itemId: itemId
      }
    })
    if (!round) {
      await menu.destroy();
      const item = await Item.findByPk(itemId);
      await item.destroy();
      res.json({ message: "item deleted" })
    }else{
      const err = new Error('Item Delete Falied');
      err.status = 403;
      err.title = 'Item Delete failed';
      err.errors = ['It looks like someone has posted about this item before. Best you can do is hide it from your menu.'];
      return next(err);
    }

  })
)

// Create an item
router.post(
  `/:siteId(\\d+)/items`,
  singleMulterUpload("image"),
  validateItemCreation,
  asyncHandler(async (req, res) => {
    const siteId = req.params.siteId;
    const { name, description, price, isActive } = req.body
    let imgUrl;
    if (req.file) {
      imgUrl = await singlePublicFileUpload(req.file);
    }    
    const item = await Item.create({
      name,
      description,
      price: parseInt(price),
      isActive: isActive,
      imgUrl: imgUrl ? imgUrl : null,
    });
    await Menu.create({
      siteId,
      itemId: item.id
    });
    if (!item) {
      const err = new Error('Item creation failed');
      err.status = 401;
      err.title = 'Item creation failed';
      err.errors = ['Something weird happened. Your item was not created. Please try again later.'];
      return next(err);
    }
    res.json(item)
  })
)

// Edit an item
router.patch(
  `/:siteId(\\d+)/items/:itemId(\\d+)`,
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const itemId = req.params.itemId;
    
    const { name, description, price, isActive } = req.body
     
    const item = await Item.findByPk(itemId)
    if (!item) {
      const err = new Error('Item update failed');
      err.status = 401;
      err.title = 'Item update failed';
      err.errors = ['Something weird happened. That item could not be found. Please try again later.'];
      return (err);
    }

    if (name) item.name = name;
    if (description) item.description = description;
    if (isActive) item.isActive = isActive;
    if (price) item.price = parseInt(price);
    if (req.file) item.imgUrl = await singlePublicFileUpload(req.file);

    await item.save();
 
    res.json(item);
  })
);

// Edit order of items
router.patch(
  '/:siteId(\\d+)/items',
  asyncHandler(async (req, res) => {
    const { siteId } = req.params;
    const { ids } = req.body; //receives an array of ids with the index = new order
    console.log(ids)
    const site = await Site.findOne({
      where: {id: siteId},
      include: [
        {
          model: Item
        }
      ]
    });
    const items = site.Items;
    if (!items || items.length !== ids.length) {
      const err = new Error('Unable to reorder items at this time. Please try again later');
      err.status = 401;
      err.title = 'Item reorder failed';
      err.errors = ['Something weird happened. The items could not be reordered.'];
      return (err);
    };
    console.log(items.forEach(item=> item.id))
    const updatedItems = await Promise.all(items.map(async (item) => {
      const updatedItem = await Item.findByPk(item.id)
      updatedItem.order = ids.findIndex(id => id === item.id) + 1;
      if (updatedItem.order !== item.order) await updatedItem.save();
    }))

    res.json(updatedItems);
  })
);

module.exports = router;