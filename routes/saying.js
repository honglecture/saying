const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Tag ,Saying ,Category, Sequelize: { Op } } = require('../models');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/saying-photo');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

const router = express.Router();



router.get('/write', isLoggedIn , async (req, res) => {
    try {
        let category = await Category.findAll({order: [['id', 'DESC']]});
        res.render('saying/write', { member: req.user, category: category });
                        
    } catch (error) {
        console.error(error);
    }
});

router.post('/write', isLoggedIn , upload.single('img') , async (req, res) => {

    const { category, content, name, tag } = req.body;
    const id = req.user.id;
    const photo = req.user.photo;
    let fileName;
    if(req.file!=undefined){
        fileName = 'saying-photo/'+req.file.filename;
    } else {
        fileName = photo;
    }

    await Saying.create({
        photo : fileName,
        name,
        content,
        tag,
        categoryId: category,
        writerId : id
    });
    
    // saying.id 로 태그 list 만들기
    // Tag insert


    return res.status(200).json({
        result: true
    });

});

module.exports = router;