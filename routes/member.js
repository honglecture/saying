const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { Member, Saying, Sequelize: { Op } } = require('../models');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/account-photo');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/login', isNotLoggedIn , (req, res) => {
    res.render('member/login');
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local', (authError, member, info) => {
        if(authError){
            return res.status(200).json({
                result: false
            });
        }
        if(!member){
            return res.status(200).json({
                result: false
            });
        }
        return req.login(member, (loginError) => {
            if(loginError){
                return res.status(200).json({
                    result: false 
                });
            }
            return res.status(200).json({
                result: true
            });
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) =>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.get('/reg', isNotLoggedIn , (req, res) => {
    res.render('member/reg');
});

router.get('/duplicated/:field', isNotLoggedIn, async (req, res) => {
    const field = req.params.field;
    const value = req.query.value;

    let keyname = '';
    let param = { };
    param[keyname + field] = value;

    try {
        const isDuplicated = await Member.findOne({ where: param });
        if (isDuplicated) {
            console.log('파워중복');
            return res.status(200).json({
                result: true
            });
        } else{
            console.log('중복아니');
            return res.status(200).json({
                result: false
            });            
        }
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false
        });
    }
});


router.post('/reg', isNotLoggedIn , async (req, res) => {
    const { id, nickname, password, email } = req.body;
    try {
        const isDuplicated = await Member.findOne({ 
            where: {
                [Op.or] : [
                    {id},
                    {nickname},
                    {email}
                ]}
            });
        if (isDuplicated) {
            return res.status(200).json({
                result: false
            });
        }
        const hash = await bcrypt.hash(password, 12);
        await Member.create({
            id,
            password: hash,
            nickname,
            email
          });
          return res.status(200).json({
            result: true
          });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            result: false
        });
    }
});

router.get('/complete', isNotLoggedIn , (req, res) => {
    res.render('member/complete');
});

router.get('/profile', isLoggedIn , (req, res) => {
    res.render('member/profile', { member: req.user });
});

router.post('/change-photo', isLoggedIn , upload.single('img'), async (req, res) => {

    const newFileName = req.file.filename; // 새로운 파일 이름
    const id = req.user.id;

    try {
        const member = await Member.findOne({
            attributes: ['photo'],
            where: { id }
        });
        // 파일 지우기
        if(member.photo != 'default'){
            fs.unlink('uploads/' + member.photo, function (err) { 
                if (err) throw err; 
                console.log('successfully deleted'); 
            });
        }

        await Member.update({
            photo: 'account-photo/'+newFileName
        }, {
            where: { id }
        });


        await Saying.update({
            photo: 'account-photo/'+newFileName
        }, {
            where: { 
                writerId : id,
                [Op.or]: [
                    { photo : 'default' },
                    { photo : { [Op.like] : 'account%' } }
                ]
            }
        });








        return res.status(200).json({
            result: true
        });

    } catch (error) {
        console.error(error);
        return res.status(400).json({
          success: false, message: error
        });
    }
});
 
module.exports = router;