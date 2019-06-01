const HttpError = require('../utils/httpError');
const PersonalInfo = require('../models/PersonalInfo');
const Participant = require('../models/Participant.model');

async function postPersonal(req, res) {
    const { name, surname, age, idNumber } = req.body;

    const participant = await Participant.findById(req.participant);

    const personal = await PersonalInfo.create({ participant: req.participant, name, surname, age, idNumber });

    participant.personalInfo = personal;

    await participant.save();
    
    res.json(personal);
}

async function getPersonal(req, res) {
    const personal = await PersonalInfo.findOne({ participant: req.participant });

    if (personal === null || personal === undefined)
        throw new HttpError('Personal info not found', 404);

    res.json(personal);
}

async function putPersonal(req, res) {
    const updates = { name, surname, age, idNumber } = req.body;

    let personal = await PersonalInfo.findOne({ participant: req.participant });

    for (const key in updates) {
        if (!updates.hasOwnProperty(key)) continue;
        personal[key] = updates[key];
    };

    personal = await personal.save();

    res.json(personal);

async function deletePersonal(req, res) {
    const participant = await Participant.findById(req.participant);

    await PersonalInfo.deleteOne({ participant: req.participant });

    await Participant.updateOne({ _id: participant._id }, { $unset: { personalInfo: '' }});

    await participant.save();
    
    res.json({ message: 'Personal info deleted'});
}

module.exports = {
    postPersonal,
    getPersonal,
    putPersonal,
    deletePersonal
};