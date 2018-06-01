const express = require("express");
const path = require('path');
const router = express.Router();

const v1 = require("./v1");
router.use("/api/v1", v1);


router.get('/student/*', function (req, res) {
    return res.sendFile(path.join(__dirname, '..', 'public/index.html'))
});

router.get('/master/*', function (req, res) {
    return res.sendFile(path.join(__dirname, '..', 'public/index.html'))
});

router.get('/login', function (req, res) {
    return res.sendFile(path.join(__dirname, '..', 'public/index.html'))
});

module.exports = router;