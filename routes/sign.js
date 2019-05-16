const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const httpError = require('../utils/httpError')
const Participant = require('../models/Participant.model');

const sign = async function(req, res) {
    const { fullname, age, contactInfo } = req.body;

    const part = await Participant.findOne({ fullname });

    if (part !== null && part !== undefined) throw new httpError('Already signed up', 400);

    let participantObj = {
        fullname,
        age,
        contactInfo
    };

    if (fullname === null || fullname === undefined) throw new httpError('Participant fullname is required', 400);
    
    const participant = await Participant.create(participantObj);

    const token = jwt.sign(participant._id.toString(), '@secretKey');

    console.log('accessToken ', token);

    res.json(participant);
}

router.post('/sign', (req, res, next) => sign(req, res).catch(next));


module.exports = router;