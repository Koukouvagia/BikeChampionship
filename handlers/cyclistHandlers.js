const httpError = require('../utils/httpError');
const Participant = require('../models/Participant.model');
const Cyclist = require('../models/Cyclist.model');
const Team = require('../models/Team.model');

async function postCyclist(req, res) {
    const { shirtNumber, style } = req.body;    
    
    if (shirtNumber === null || shirtNumber === undefined) throw new httpError('Shirt number not specified', 400);

    if (style === null || style === undefined) throw new httpError('Riding style not specified', 400);

    if (style !== 'Sprinter' && style !== 'Climber' && style !== 'All-rounder' && style !== 'Puncher')
        throw new httpError('Must be a \'Sprinter\', \'Climber\', \'All-rounder\', or \'Puncher\'', 400);
    
    const participant = await Participant.findById(req.participant);

    const cyclist = await Cyclist.findOne({ participant: participant._id });

    if (cyclist !== null && cyclist !== undefined) throw new httpError('Cyclist already exists', 409);

    const response = await Cyclist.create({ participant, shirtNumber, style });

    participant.role = 'cyclist';
    await participant.save();

    return res.json(response);
}

async function getCyclists(req, res) {
    const {page} = req.query;
  
    const PAGE_RESULTS = 20;
  
    if (page === null || page === undefined) {
      const cyclists = await Cyclist.find();

      if (cyclists.length === 0) throw new httpError('Cyclists not found', 404);

      return res.json(cyclists);
    }
  
    const cyclists = await Cyclist.find().sort({createdAt: -1}).skip(page * PAGE_RESULTS).limit(PAGE_RESULTS);
    return res.json(cyclists);
}

async function getCyclist(req, res) {

    const cyclist = await Cyclist.findOne({ participant: req.participant });

    if (cyclist === null || cyclist === undefined)
        throw new httpError('Cyclist not found', 404);

    return res.json(cyclist);
}

async function getCyclistById(req, res) {
    const { cyclistId } = req.params;

    const cyclist = await Cyclist.findById(cyclistId);

    if (cyclist === null || cyclist === undefined)
        throw new httpError('Cyclist not found', 404);

    return res.json(cyclist);
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

module.exports = {
    postCyclist,
    getCyclist,
    getCyclistById,
    getCyclists,
    putCyclist,
    deleteCyclist
};