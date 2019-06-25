const express = require('express');
const Router = express.Router;
const passport = require('passport');
const auth = require('../middleware/auth');

const {
    postParticipant
} = require('../handlers/participantHandlers');

const router = new Router();

router.route('/register')
    .post((req, res, next) => postParticipant(req, res, next).catch(next));

router.route('/login')
    .post((req, res, next) => auth.login(req, res, next));

router.route('/logout')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => auth.logout(req, res, next));

module.exports = router;
