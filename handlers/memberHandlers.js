const httpError = require('../utils/httpError');
const Participant = require('../models/Participant.model');
const Cyclist = require('../models/Cyclist.model');
const Mechanic = require('../models/Mechanic.model');
const Medical = require('../models/Medical.model');
const Team = require('../models/Team.model');

async function postCyclist(req, res) {
    const { shirtNumber, style } = req.body;    
    
    if (shirtNumber === null || shirtNumber === undefined) throw new httpError('Shirt number not specified', 400);

    if (style === null || style === undefined) throw new httpError('Riding style not specified', 400);

    if (style !== 'Sprinter' && style !== 'Climber' && style !== 'All-rounder' && style !== 'Puncher')
        throw new httpError('Must be a \'Sprinter\', \'Climber\', \'All-rounder\', or \'Puncher\'', 400);
    
    const participant = await Participant.findById(req.participant);

    const cyclist = await Cyclist.findOne({ participant: participant._id });

    if (cyclist !== null && cyclist !== undefined) throw new httpError('Cyclist already exists');

    const response = await Cyclist.create({ participant, shirtNumber, style });

    participant.role = 'cyclist';
    await participant.save();

    return res.json(response);
}

async function getCyclists(req ,res) {
    
    const cyclists = await Cyclist.find();

    res.json(cyclists);
}

async function putCyclist(req, res) {

    const cycl = await Cyclist.findOne({ participant: req.participant });

    if (cycl === null || cycl === undefined) throw new httpError('You are not in Cyclists', 404);
    const fields = [
        'shirtNumber',
        'style'
    ];

    const updates = {};

    for (let key in req.body) {
        if (fields.indexOf(key) !== -1) updates[key] = req.body[key];
    }

    const response = await Cyclist.findOneAndUpdate({ participant: req.participant }, updates, { new: true }).populate('participant');

    return res.json(response);

}

async function deleteCyclist(req, res) {

    const participant = await Participant.findById(req.participant);

    if (participant.role !== 'cyclist') throw new httpError(`You are not "cyclist" but "${ participant.role }" `, 400);

    const team = await Team.findById(participant.team._id);

    const cyclist = await Cyclist.findOneAndDelete({ participant: req.participant });

    participant.role = '';
    const response = await participant.save();

    const index = team.cyclists.indexOf(cyclist._id);
    team.cyclists.splice(index, 1);

    await team.save();

    return res.json(response);
}

async function postMechanic(req, res) {
    const { workingField, vehicle } = req.body;    
    

    if (workingField === null || workingField === undefined) throw new httpError('Working field not specified', 400);

    if (workingField !== 'runtime' && workingField !== 'backteam');

    if (vehicle === null || vehicle === undefined) throw new httpError('Vehicle not specified', 400);

    if (vehicle !== 'bike' && vehicle !== 'car') throw new httpError('Vehicle \'bike\' or \'car\'', 400);

    const participant = await Participant.findById(req.participant);
    
    const mechanic = await Mechanic.findOne({ participant: participant._id });

    if (mechanic !== null && mechanic !== undefined) throw new httpError('Cyclist already exists');

    const response = await Mechanic.create({ participant, workingField, vehicle });

    participant.role = 'mechanic';
    await participant.save();

    return res.json(response);
}



async function putMechanic(req, res) {

    const mech = await Mechanic.findOne({ participant: req.participant });

    if (mech === null || mech === undefined) throw new httpError('You are not in Mechanics', 404);
    const fields = [
        'workingField',
        'vehicle'
    ];

    const updates = {};

    for (let key in req.body) {
        if (fields.indexOf(key) !== -1) updates[key] = req.body[key];
    }

    const response = await Mechanic.findOneAndUpdate({ participant: req.participant }, updates, { new: true }).populate('participant');

    return res.json(response);

}

async function deleteMechanic(req, res) {

    const participant = await Participant.findById(req.participant);

    if (participant.role !== 'mechanic') throw new httpError(`You are not "mechanic" but "${ participant.role }" `, 400);

    const team = await Team.findById(participant.team._id);

    const mechanic = await Mechanic.findOneAndDelete({ participant: req.participant });

    participant.role = '';
    const response = await participant.save();

    const index = team.mechanics.indexOf(mechanic._id);
    team.mechanics.splice(index, 1);

    await team.save();

    return res.json(response);
}

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

async function putMedical(req, res) {

    const mech = await Medical.findOne({ participant: req.participant });

    if (mech === null || mech === undefined) throw new httpError('You are not in Mechanics', 404);
    const fields = [
        'speciality',
        'vehicle'
    ];

    const updates = {};

    for (let key in req.body) {
        if (fields.indexOf(key) !== -1) updates[key] = req.body[key];
    }

    const response = await Mechanic.findOneAndUpdate({ participant: req.participant }, updates, { new: true }).populate('participant');

    return res.json(response);

}

async function deleteMedical(req, res) {

    const participant = await Participant.findById(req.participant);

    if (participant.role !== 'medical') throw new httpError(`You are not "medical" but "${ participant.role }" `, 400);

    const team = await Team.findById(participant.team._id);

    const medical = await Mechanic.findOneAndDelete({ participant: req.participant });

    participant.role = '';
    const response = await participant.save();

    const index = team.medicals.indexOf(medical._id);
    team.medicals.splice(index, 1);

    await team.save();

    return res.json(response);
}


module.exports = { 
    postCyclist,
    getCyclists,
    putCyclist,
    deleteCyclist,
    postMechanic,
    putMechanic,
    deleteMechanic,
    postMedical,
    putMedical,
    deleteMedical
};