const express = require('express');
const Router = express.Router;
const passport = require('passport');
const handlers = require('../handlers/cyclistHandlers');

const router = new Router();

router.route('/:_id')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getCyclistById(req, res).catch(next))

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.postCyclist(req, res).catch(next))
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getCyclists(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.putCyclist(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.deleteCyclist(req, res).catch(next));
    
module.exports = router;