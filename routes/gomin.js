const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const {  } = require('../models');
const router = express.Router();

router.get('/list', async (req, res) => {
    // const pg = req.params.pg;
    res.render('gomin/list', { member: req.user,});
});

module.exports = router;