const express = require('express');
const Router = express.Router;
const passport = require('passport');

const {
    getYourParticipant,
    getParticipants,
    putParticipant,
    deleteParticipant
} = require('../handlers/participantHandlers');

const router = new Router();

// CRUD operations of a participant no matter his role

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => getYourParticipant(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => putParticipant(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => deleteParticipant(req, res).catch(next));

router.route('/all')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => getParticipants(req, res).catch(next))

module.exports = router;
