const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const favicon = require('serve-favicon');
const passport = require('passport');
const helmet = require('helmet');
const RedisStore = require('connect-redis')(session);
const hpp = require('hpp');

require('dotenv').config();

const mainRouter = require('./routes/main');
const memberRouter = require('./routes/member');
const sayingRouter = require('./routes/saying');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

const logger = require('./logger');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8000);

if(process.env.NODE_ENV === 'production'){
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        pass: process.env.REDIS_PASSWORD,
        logErrors: true,
    }),
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/', mainRouter);
app.use('/member', memberRouter);
app.use('/saying', sayingRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    logger.info('hello');
    logger.error(err.message);
    next(err);
});

app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});