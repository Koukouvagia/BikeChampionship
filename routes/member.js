const express = require('express');
const router = express.Router();
const handlers = require('../handlers/memberHandlers');

router.post('/cyclist', (req, res, next) => handlers.postCyclist(req, res).catch(next));

router.put('/cyclist', (req, res, next) => handlers.putCyclist(req, res).catch(next));

router.delete('/cyclist', (req, res, next) => handlers.deleteCyclist(req, res).catch(next));

router.post('/mechanic', (req, res, next) => handlers.postMechanic(req, res).catch(next));

module.exports = router;