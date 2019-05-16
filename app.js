const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const signRouter = require('./routes/sign');
const teamRouter = require('./routes/team');
const participantRouter = require('./routes/participant');
const memberRouter = require('./routes/member');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// Sign Up
app.use('/index', signRouter);

// Middleware
app.use(authMiddleware);

// Routes
app.use('/participant', participantRouter);
app.use('/team', teamRouter);
app.use('/member', memberRouter);

app.use((error, req, res, next) => {
    let status = error.status;
    if (status === null || status === undefined) status = 500;
    res.status(status).json({ error: error.message });
    console.log(error);
});


module.exports = app;