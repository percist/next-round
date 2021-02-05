const router = require('express').Router();

router.post('/', async (req, res) =>{
    console.log(req.url);
    res.json({ message: "hi"})
} );

module.exports = router;