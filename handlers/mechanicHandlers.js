const httpError = require('../utils/httpError');
const Participant = require('../models/Participant.model');
const Mechanic = require('../models/Mechanic.model');
const Team = require('../models/Team.model');

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

async function getMechanics(req, res) {
    const {page} = req.query;
  
    const PAGE_RESULTS = 20;
  
    const query = Mechanic.find().sort({createdAt: -1});

    if (page === null || page === undefined) {
      const mechanics = await query;

      if (mechanics.length === 0) throw new httpError('Cyclists not found', 404);
      
      return res.json(mechanics);
    }
  
    const mechanics = await query.skip(page * PAGE_RESULTS).limit(PAGE_RESULTS);
    return res.json(mechanics);
}

async function getMechanic(req, res) {

    const mechanic = await Mechanic.findOne({ participant: req.participant });

    if (mechanic === null || mechanic === undefined)
        throw new httpError('Mechanic not found', 404);

    return res.json(mechanic);
}

async function getMechanicById(req, res) {
    const { mechanic: id } = req.params;

    const mechanic = await Mechanic.findById(id);

    if (mechanic === null || mechanic === undefined)
        throw new httpError('Mechanic not found', 404);

    return res.json(mechanic);
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

module.exports = {
    postMechanic,
    getMechanicById,
    getMechanic,
    getMechanics,
    putMechanic,
    deleteMechanic
};
