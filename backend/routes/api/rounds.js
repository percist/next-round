const express = require("express")
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const {Round, User, Buddy} = require("../../db/models");
const user = require("../../db/models/user");

const router = express.Router();

router.get(
    `/:id(\\d+)`,
    asyncHandler(async (req, res) => {
        const roundId = req.params.id
        const round = await Round.findByPk(roundId)
        res.json({ round })
    })
)


module.exports = router;