const httpError = require('../utils/httpError');
const Participant = require('../models/Participant.model');
const Cyclist = require('../models/Cyclist.model');
const Medical = require('../models/Medical.model');
const Mechanic = require('../models/Mechanic.model');

// Assure app is working- sample get page
const getIndex = (req, res) => {
    res.send("Bike tournament is working");
};
// Create a new participant

async function postParticipant(req, res) {
    const { username, password, email } = req.body;

    const participantObj = { username, password, email };

    if (username === null || username === undefined)
        throw new httpError('Username not specified', 400);

    if (password === null || password === undefined)
        throw new httpError('Password not specified', 400);
    
    if (email === null || email === undefined)
        throw new httpError('Password not specified', 400);

    let participant = await Participant.findOne({ email });

    if (participant !== null && participant !== undefined)
        throw new httpError(`Already registered with ${email}`, 409);

    participant = await Participant.create(participantObj);
    
    res.json(participant);
}

// Get current participant

async function getYourParticipant(req, res) {

    const participant = await Participant.findById(req.participant);

    return res.json(participant);
}

// Get all participants

async function getParticipants(req, res) {
    const {page} = req.query;
  
    const PAGE_RESULTS = 20;
  
    const query = Participant.find().sort({createdAt: -1});

    if (page === null || page === undefined) {
      const participants = await query;

      if (participants.length === 0) throw new httpError('Participants not found', 404);

      return res.json(participants);
    }
  
    const participants = await query.skip(page * PAGE_RESULTS).limit(PAGE_RESULTS);
    return res.json(participants);
}

// Put current participant

async function putParticipant(req, res) {

    const participant = await Participant.findOne({ participant: req.participant });

    if (participant === null || participant === undefined) throw new httpError('Participant not found', 404);

    const fields = [
        'username',
        'password',
        'email'
    ];

    const updates = {};

    for (let key in req.body) {
        if (fields.indexOf(key) !== -1) updates[key] = req.body[key];
    }

    const response = await Participant.findOneAndUpdate({ participant: req.participant }, updates, { new: true });

    return res.json(response);
}

// Delete current participant

async function deleteParticipant(req, res) {
    const participant = await Participant.findByIdAndDelete(req.participant);

    if (participant.role === 'cyclist') await Cyclist.deleteOne({ participant: participant._id });
    else if (participant.role === 'medical') await Medical.deleteOne({ participant: participant._id });
    else if (participant.role === 'mechanic') await Mechanic.deleteOne({ participant: participant._id });

    return res.json({ message: 'Your event participation was deleted!' });
}

module.exports = {
    getIndex,
    postParticipant,
    getYourParticipant,
    getParticipants,
    putParticipant,
    deleteParticipant
};