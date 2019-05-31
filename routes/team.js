const express = require('express');
const Router = express.Router;
const passport = require('passport');

const {
    createTeam,
    getTeams,
    joinTeam,
    deleteTeam
} = require('../handlers/teamHandlers');

const router = new Router();

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => createTeam(req, res).catch(next))
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => getTeams(req, res).catch(next));

router.route('/join/:teamId')
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => joinTeam(req, res).catch(next));

router.route('/:teamId')
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => deleteTeam(req, res).catch(next));

module.exports = router;