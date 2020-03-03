const express = require('express');
const Router = express.Router;
const passport = require('passport');
const {
    postPersonal,
    getPersonal,
    putPersonal,
    deletePersonal
} = require('../handlers/personInfoHandlers');

const router = new Router();

// CRUD operations of a participant about his personal info

router.route('/')
    .post(passport.authenticate('jwt', {session: false}), (req, res, next) => postPersonal(req, res).catch(next))
    .get(passport.authenticate('jwt', {session: false}), (req, res, next) => getPersonal(req, res).catch(next))
    .put(passport.authenticate('jwt', {session: false}), (req, res, next) => putPersonal(req, res).catch(next))
    .delete(passport.authenticate('jwt', {session: false}), (req, res, next) => deletePersonal(req, res).catch(next))

module.exports = router;