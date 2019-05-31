const express = require('express');
const Router = express.Router;
const passport = require('passport');

const {
    getParticipant,
    putParticipant,
    deleteParticipant
} = require('../handlers/participantHandlers');

const router = new Router();

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => getParticipant(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => putParticipant(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => deleteParticipant(req, res).catch(next));

module.exports = router;
