const express = require('express');

const { Member, Saying, Category, Slike, Bookmark, Reply,  Sequelize: { Op, fn, col } } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('', async (req, res) => {

    const category = await Category.findAll({order: [['id', 'DESC']]});

    res.render('index', { 
        member: req.user,
        category
    });

});

router.get('/saying-list', async(req, res) => {

    const { page, field, value, category, sDate, sBookmark, sMy } = req.query;

    const user = req.user;

    let whereOption = {};
    let nicknameWhereOption = {};

    let myRequiredOption = {}
    let bookmarkRequiredOption = {
         model : Bookmark,
        // where : {
        //     memberId : user.id
        // },
         required : false,
    }

    if(user!=undefined && sMy=='true'){
        myRequiredOption = { id : user.id };
    }
    
    if(user!=undefined && sBookmark=='true'){
        bookmarkRequiredOption = {
            model : Bookmark,
            where : {
                memberId : user.id
            },
            required : true,
        }
    }
    
    let dateFlag = sDate == 'true' ? 'DESC' : 'ASC';
    
    let orderOption = [
        ['regDate', dateFlag],
        [Reply, 'regDate', 'DESC']
    ];
    
    
    if(field!='nickname'){
        whereOption[field] = {
            [Op.like] : '%'+value+'%'
        }
    } else{
        nicknameWhereOption[field] = {
            [Op.like] : '%'+value+'%'
        }
    }

    if(category != 99){
        whereOption['categoryId'] = category;
    }

    let offset = 0;

    if(page > 1) {
        offset = 5 * (page -1);
    }


    if(user==undefined){
        const sayingLike = await Saying.findAll({
            include: [
                {
                    model: Member,
                    attributes: ['nickname'],
                    where : nicknameWhereOption
    
                },
                {
                    model: Slike,
                    required : false,
                },
                {
                    model : Reply,
                    required : false,
                },  
            ],
            where : whereOption,
            offset: offset,
            limit: 5,
            order: orderOption
        });
        const saying = await Saying.findAll({
            include: [
            {
                model: Member,
                attributes: ['nickname'],
                where : nicknameWhereOption
            },
            {
                model : Reply,
                required : false,
                include : [
                    {
                        model : Member,
                        attributes: ['nickname'],
                        required : false,
                    }
                ]
            }],
            where : whereOption,
            offset: offset,
            limit: 5
            ,
            order: orderOption

        });
        return res.status(200).json({
            sayingList : saying,
            sayingLike : sayingLike
        });    
    }

    const sayingLike = await Saying.findAll({
        include: [
            {
                model: Member,
                attributes: ['nickname'],
                where : {
                    [Op.and]: [nicknameWhereOption , myRequiredOption]
                } 
            },
            {
                model: Slike,
                required : false,
            },
            {
                model : Reply,
                required : false,
            },
            bookmarkRequiredOption,
        ],
        where : whereOption,
        offset: offset,
        limit: 5,
        order: orderOption
    });

    const saying = await Saying.findAll({
        include: [
            {
                model: Member,
                attributes: ['nickname'],
                where : {
                    [Op.and]: [nicknameWhereOption , myRequiredOption]
                } 
            },
            {
                model : Slike,
                where : {
                    memberId : user.id
                },
                required : false
            },
            bookmarkRequiredOption,

            {
                model : Reply,
                required : false,
                include : [
                    {
                        model : Member,
                        attributes: ['nickname'],
                        required : false,
                    }
                ]
            },
        ],
        where : whereOption,
        offset: offset,
        limit: 5,
        order: orderOption
    });
    
    return res.status(200).json({
        sayingList : saying,
        sayingLike : sayingLike,
        nickname : user.nickname
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

router.get('/replylist', async (req, res) => {

    const { sayingId } = req.query;
    let member = req.user ? {
        id : req.user.id,
        nickname : req.user.nickname,
        photo : req.user.photo,
    } : undefined;

    const replyList = await Reply.findAll({
        where : {
            sayingId
        },
        include : {
            model: Member,
            attributes: ['nickname', 'photo'],
            required : false,
        },
        order: [
            ['regDate', 'DESC'],
        ],
    });

    return res.status(200).json({
        result: replyList,
        member: member
    });      
});


router.post('/reg-reply', isLoggedIn , async (req, res) => {

    const { sayingId, content } = req.body;
    const id = req.user.id;

    await Reply.create({
        sayingId,
        content,
        writerId : id
    });
    
    return res.status(200).json({
        result: true
    });

});


router.post('/delete-reply', isLoggedIn , async (req, res) => {

    const { replyId } = req.body;

    await Reply.destroy({
        where : {
            id : replyId
        }
    })
    
    return res.status(200).json({
        result: true
    });

});



module.exports = router;