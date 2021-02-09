const express = require("express")
const { check } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { Site, Payment, Round, Item } = require("../../db/models");

const router = express.Router();

// TODO: get routes for data: 
router.get(
    '/:siteId/:dateRange',
    asyncHandler(async (req, res, next) => {
        const siteId = req.params.siteId
        const dateRange = req.params.dateRange
        const salesData = await Site.findOne({
            where: { siteId },
            include: [{
                model: Item,
                include: [{
                    model: Round,
                    include: [{
                        model: Payment
                    }]

                }]
            }]
        })
        console.log("SALES DATA: ", salesData)
        const filteredData = filterDataByDateRange(salesData, dateRange);
        res.json(filteredData)
    })
)

module.exports = router;