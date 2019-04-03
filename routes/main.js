const express = require('express');

const { Member, Saying, Category, Slike, Bookmark } = require('../models');

const router = express.Router();

router.get('', async (req, res) => {

    // const saying = await Member.findAll({
    //     attributes: ['photo'],
    //     where: { id }
    // });

    res.render('index', { member: req.user });

});

router.get('/saying-list', async(req, res) => {
    const user = req.user;
    const sayingLike = await Saying.findAll({
        include: [
            {
                model: Slike,
                required : false,
            }
        ],
    });
    if(user==undefined){
        const saying = await Saying.findAll({
            include: {
                model: Member,
                attributes: ['nickname'],
            }
        });
        return res.status(200).json({
            sayingList : saying,
            sayingLike : sayingLike
        });    
    }

    const saying = await Saying.findAll({
        include: [
            {
                model: Member,
                attributes: ['nickname'],
                required : false,
            },
            {
                model : Slike,
                where : {
                    memberId : user.id
                },
                required : false
            },
            {
                model : Bookmark,
                where : {
                    memberId : user.id
                },
                required : false
            },
        ],
    });
    
    return res.status(200).json({
        sayingList : saying,
        sayingLike : sayingLike
    });    
       
});

router.get('/set-like', async (req, res) => {
    const { sayingId, flag } = req.query;
    const user = req.user;
    if(user == undefined){
        return res.status(200).json({
            result: false
        });
    }
    if(flag=='true'){
        await Slike.create({
            memberId : user.id,
            sayingId
        });
    } else {
        await Slike.destroy({
            where : {
                memberId : user.id,
                sayingId
            }
        })
    }

    const likeCnt = await Slike.findAll({
        where : {
            sayingId
        }
    });

    return res.status(200).json({
        result: true,
        likeCnt
    });      
});


router.get('/set-bookmark', async (req, res) => {
    const { sayingId, flag } = req.query;
    const user = req.user;
    if(user == undefined){
        return res.status(200).json({
            result: false
        });
    }
    if(flag=='true'){
        await Bookmark.create({
            memberId : user.id,
            sayingId
        });
    } else {
        await Bookmark.destroy({
            where : {
                memberId : user.id,
                sayingId
            }
        })
    }

    return res.status(200).json({
        result: true
    });      
});

module.exports = router;