exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated())
        next();
    else
        res.redirect('/member/login');
};


exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated())
        next();
    else    
        res.redirect('/');
}
