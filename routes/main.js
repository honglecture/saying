const express = require('express');

const { Member, Saying, Category } = require('../models');

const router = express.Router();

router.get('', async (req, res) => {

    // const saying = await Member.findAll({
    //     attributes: ['photo'],
    //     where: { id }
    // });

    res.render('index', { member: req.user });

});

router.get('/saying-list', async(req, res) => {
    const saying = await Saying.findAll({
        include: {
            model: Member,
            attributes: ['nickname'],
        }
    });
    return res.status(200).json({
        result: saying
    });      
});
 
module.exports = router;