const express = require('express');
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config({ path: __dirname + '/.env' });

// Routes
const docs = require('./routes/documentation');
const indexRouter = require('./routes/index');
const teamRouter = require('./routes/team');
const participantRouter = require('./routes/participant');
const cyclistRouter = require('./routes/cyclist');
const mechanicRouter = require('./routes/mechanic');
const medicalRouter = require('./routes/medical');
const personalRouter = require('./routes/personalInfo');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());

// Routes
app.use('/api-docs', docs);

app.use('/', indexRouter);
app.use('/participant', participantRouter);
app.use('/team', teamRouter);
app.use('/cyclist', cyclistRouter);
app.use('/mechanic', mechanicRouter);
app.use('/medical', medicalRouter);
app.use('/personal', personalRouter);


app.use((error, req, res, next) => {
    let status = error.status;
    if (status === null || status === undefined) status = 500;
    res.status(status).json({ error: error.message });
    console.log(error);
});


module.exports = app;