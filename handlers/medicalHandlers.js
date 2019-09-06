const httpError = require('../utils/httpError');
const Participant = require('../models/Participant.model');
const Medical = require('../models/Medical.model');
const Team = require('../models/Team.model');

// Create a new medical participant

async function postMedical(req, res) {
    const { speciality, vehicle } = req.body;    

    if (speciality === null || speciality === undefined) throw new httpError('Speciality not specified', 400);

    if (speciality !== 'emergency' && speciality !== 'physiotherapist')
        throw new httpError('Must be \'emergency\' or \' physiotherapist\'');

    if (vehicle === null || vehicle === undefined) throw new httpError('Vehicle not specified', 400);

    if (vehicle !== 'bike' && vehicle !== 'car') throw new httpError('Vehicle \'bike\' or \'car\'', 400);

    const participant = await Participant.findById(req.participant);
    
    const medical = await Medical.findOne({ participant: participant._id });

    if (medical !== null && medical !== undefined) throw new httpError('Cyclist already exists');

    const response = await Medical.create({ participant, speciality, vehicle });

    participant.role = 'medical';
    await participant.save();

    return res.json(response);
}

// Get all medical participants

async function getMedicals(req, res) {
    const {page} = req.query;
  
    const PAGE_RESULTS = 20;
  
    const query = Medical.find().sort({createdAt: -1});
    if (page === null || page === undefined) {
      const medicals = await query;

      if (medicals.length === 0) throw new httpError('Cyclists not found', 404);
      
      return res.json(medicals);
    }
  
    const medicals = await query.skip(page * PAGE_RESULTS).limit(PAGE_RESULTS);
    return res.json(medicals);
}

// Get a specific medical participant by ID
async function getMedicalById(req, res) {
    const { medicalId } = req.params;

    const medical = await Medical.findById(medicalId);

    if (medical === null || medical === undefined)
        throw new httpError('Medical not found', 404);

    return res.json(medical);
}

// Get current medical participant

async function getMedical(req, res) {

    const medical = await Medical.findOne({ participant: req.participant });

    if (medical === null || medical === undefined)
        throw new httpError('Medical not found', 404);

    return res.json(medical);
}

// Put current medical participant

async function putMedical(req, res) {

    const mech = await Medical.findOne({ participant: req.participant });

    if (mech === null || mech === undefined) throw new httpError('You are not in Medicals', 404);
    const fields = [
        'speciality',
        'vehicle'
    ];

    const updates = {};

    for (let key in req.body) {
        if (fields.indexOf(key) !== -1) updates[key] = req.body[key];
    }

    const response = await Medical.findOneAndUpdate({ participant: req.participant }, updates, { new: true }).populate('participant');

    return res.json(response);

}

// Delete current medical participant

async function deleteMedical(req, res) {

    const participant = await Participant.findById(req.participant);

    if (participant.role !== 'medical') throw new httpError(`You are not "medical" but "${ participant.role }" `, 400);

    const team = await Team.findById(participant.team._id);

    const medical = await Medical.findOneAndDelete({ participant: req.participant });

    participant.role = '';
    const response = await participant.save();

    const index = team.medicals.indexOf(medical._id);
    team.medicals.splice(index, 1);

    await team.save();

    return res.json(response);
}

module.exports = {
    postMedical,
    putMedical,
    getMedical,
    getMedicalById,
    getMedicals,
    deleteMedical
};