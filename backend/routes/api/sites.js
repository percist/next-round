const express = require("express")
const asyncHandler = require('express-async-handler');
const { Site } = require("../../db/models"
)
const router = express.Router();

router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const siteId = req.params.id
        const site = await Site.findByPK(siteId)
        res.json({ site })
    })
)

module.exports = router;