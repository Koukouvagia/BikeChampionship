const express = require('express');
const router = express.Router();
const handlers = require('../handlers/participantHandlers');

router.get('/', (req, res, next) => handlers.getParticipant(req, res).catch(next));

router.put('/', (req, res, next) => handlers.putParticipant(req, res).catch(next));

router.delete('/', (req, res, next) => handlers.deleteParticipant(req, res).catch(next));

module.exports = router;
