const express = require('express');
const Router = express.Router;
const passport = require('passport');
const handlers = require('../handlers/memberHandlers');

const router = new Router();

router.route('/cyclist')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.postCyclist(req, res).catch(next))
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getCyclists(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.putCyclist(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.deleteCyclist(req, res).catch(next));
    
router.route('/mechanic')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.postMechanic(req, res).catch(next))
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getMechanics(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.putMechanics(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.putMechanic(req, res).catch(next));

router.route('/medical')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.postMedical(req, res).catch(next))
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getMedicals(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.putMedicals(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.deleteMedical(req, res).catch(next));

module.exports = router;