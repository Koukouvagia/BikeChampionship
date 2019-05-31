const httpError = require('../utils/httpError');
const Participant = require('../models/Participant.model');

async function registerParticipant(req, res) {
    const { username, password, email, fullname, age } = req.body;

    const participantObj = { username, password, email, fullname, age };

    if (username === null || username === undefined)
        throw new httpError('Username not specified', 400);

    let participant = await Participant.findOne({ username });

    console.log(participant);

    if (participant !== null && participant !== undefined)
        throw new httpError('Already registered', 409);

    participant = await Participant.create(participantObj);
    
    res.json(participant);
}


async function getParticipant(req, res) {
    const participant = await Participant.findById(req.participant);

    res.json(participant);
}

async function putParticipant(req, res) {

    const fields = [
        'fullname',
        'age',
        'contactInfo'
    ];

    const updates = {};

    for (let key in req.body) {
        if (fields.indexOf(key) !== -1) updates[key] = req.body[key];
    }

    Participant.findByIdAndUpdate(req.participant, updates, { new: true, runValidators: true })
            .then(updatedParticipant => {
                if (updatedParticipant === null || updatedParticipant === undefined)
                    throw new httpError('Participant not found', 404);
                return res.json(updatedParticipant);
            })
            .catch(console.log);
}

async function deleteParticipant(req, res) {
    const participant = await Participant.findById(req.participant);

    res.json(participant);
}

module.exports = {
    registerParticipant,
    getParticipant,
    putParticipant,
    deleteParticipant
};