const HttpError = require('../utils/httpError');
const personInfo = require('../models/personInfo');
const Participant = require('../models/Participant.model');

// Create new personal info in current participant

async function postPersonal(req, res) {
    const { name, surname, age, idNumber, allergies } = req.body;

    const participant = await Participant.findById(req.participant);

    const personal = await personInfo.create({ participant: req.participant, name, surname, age, idNumber, allergies });

    participant.personInfo = personal;

    await participant.save();
    
    return res.json(personal);
}

// Get current personal info 

async function getPersonal(req, res) {
    const personal = await personInfo.findOne({ participant: req.participant });

    if (personal === null || personal === undefined)
        throw new HttpError('Personal info not found', 404);

    return res.json(personal);
}

// Put current participant personal info

async function putPersonal(req, res) {
    const { updates } = req.body;
    
    let personal = await personInfo.findOne({ participant: req.participant });

    for (const key in updates) {
        if (!updates.hasOwnProperty(key)) continue;
        personal[key] = updates[key];
    }

    personal = await personal.save();

    return res.json(personal);
}

// Delete current participant personal info

async function deletePersonal(req, res) {
    const participant = await Participant.findById(req.participant);

    await personInfo.deleteOne({ participant: req.participant });

    await Participant.updateOne({ _id: participant._id }, { $unset: { personInfo: '' }});

    await participant.save();
    
    return res.json({ message: 'Personal info deleted'});
}

module.exports = {
    postPersonal,
    getPersonal,
    putPersonal,
    deletePersonal
};