const express = require('express');
const Router = express.Router;
const passport = require('passport');
const handlers = require('../handlers/mechanicHandlers');

const router = new Router();

// CRUD operations of mechanic

router.route('/all')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getMechanics(req, res).catch(next));

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.postMechanic(req, res).catch(next))
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getMechanic(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.putMechanic(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.deleteMechanic(req, res).catch(next));

router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getMechanicById(req, res).catch(next));

module.exports = router;