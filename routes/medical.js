const express = require('express');
const Router = express.Router;
const passport = require('passport');
const handlers = require('../handlers/medicalHandlers');

const router = new Router();

router.route('/')
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getMedicalById(req, res).catch(next))

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.postMedical(req, res).catch(next))
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.getMedicals(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.putMedical(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => handlers.deleteMedical(req, res).catch(next));
    
module.exports = router;