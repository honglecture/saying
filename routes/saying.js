const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Member, Sequelize: { Op } } = require('../models');

const router = express.Router();

router.get('/write', isLoggedIn , (req, res) => {
    res.render('saying/write', { member: req.user });
});

 
module.exports = router;