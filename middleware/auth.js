const httpError = require('../utils/httpError');
const Participant = require('../models/Participant.model');
const jwt = require('jsonwebtoken');

async function middleware(req, res, next) {
    let token, decoded;

    if (req.headers.authorization === null || req.headers.authorization === undefined) {
        throw new httpError('No token', 403);
    }

    const bearer = req.headers.authorization.split(' ');

    token = bearer[0];
    console.log(token);
    decoded = jwt.verify(token, '@secretKey');
    const participant = await Participant.findOne(decoded.payload._id);
    req.participant = participant._id;
    console.log(req.participant);
    
    next();
}


const authMiddleware = (req, res, next) => {
    console.log('lalallala');
    middleware(req, res, next).catch(next);
};

module.exports = authMiddleware;