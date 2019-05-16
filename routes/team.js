const express = require('express');
const router = express.Router();
const handlers = require('../handlers/teamHandlers');

router.post('/', (req, res, next) => handlers.createTeam(req, res).catch(next));

router.get('/', (req, res, next) => handlers.getTeams(req, res).catch(next));

router.put('/join/:teamId', (req, res, next) => handlers.joinTeam(req, res).catch(next));

router.delete('/:teamId', (req, res, next) => handlers.deleteTeam(req, res).catch(next));

module.exports = router;