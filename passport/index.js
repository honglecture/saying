const local = require('./localStrategy');

const { Member } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((member, done)=>{
        done(null, member.id);
    });

    passport.deserializeUser((id, done)=>{
        Member.findOne({where : {id}})
            .then(member => done(null, member))
            .catch(err => done(err));
    });
    local(passport);
};

