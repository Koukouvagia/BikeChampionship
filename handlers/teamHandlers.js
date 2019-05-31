const httpError = require('../utils/httpError');
const Participant = require('../models/Participant.model');
const Team = require('../models/Team.model');
const Cyclist = require('../models/Cyclist.model');
const Medical = require('../models/Medical.model');
const Mechanic = require('../models/Mechanic.model');

async function createTeam(req, res) {
    const { teamName, motto } = req.body;

    const team = await Team.findOne({ name: teamName });

    if (team !== null && team !== undefined) throw new httpError('Team already exists with this fullname', 400);

    if (teamName === null || teamName === undefined) throw new httpError('Name is required', 400);

    const participant = await Participant.findById(req.participant);

    const newTeam = await Team.create({ name: teamName, motto, teamLeader: participant.fullname });

    res.json(newTeam);
}

async function joinTeam(req, res) {
    const { teamId } = req.params;

    let participant = await Participant.findById(req.participant);

    const team = await Team.findById({ _id: teamId });

    if (team === null || team === undefined) throw new httpError('Team not found', 404);

    if (participant.role === 'cyclist') {
        const cyclist = await Cyclist.findOne({ participant: req.participant });

        const index = team.cyclists.findIndex(cycl => cycl === cyclist._id );

        if (index !== -1) throw new httpError(`Already member in '${ team.name }' team`);
        team.cyclists.push(cyclist);

        await team.save();

        participant.teamId = teamId;

        await participant.save();

        return res.json(team);
    }

    if (participant.role === 'medical') {
        const medical = await Medical.findOne({ participant: req.participant });

        const index = team.cyclists.findIndex(cycl => cycl === medical._id );

        if (index !== -1) throw new httpError(`Already member in '${ team.name }' team`);

        team.medicals.push(medical);
        
        await team.save();

        participant.teamId = teamId;

        await participant.save();

        return res.json(team);
    }

    if (participant.role === 'mechanic') {
        const mechanic = await Mechanic.findOne({ participant: req.participant });

        const index = team.cyclists.findIndex(cycl => cycl === mechanic._id );

        if (index !== -1) throw new httpError(`Already member in '${ team.name }' team`);

        team.mechanics.push(mechanic);
        
        await team.save();

        participant.teamId = teamId;

        await participant.save();

        return res.json(team);
    }
}


async function getTeams(req, res) {
    const teams = await Team.find();

    res.json(teams);
}

async function leaveTeam(req, res) {

    let participant = await Participant.findById(req.participant);

    if (participant.role === 'Cyclist') {

        const team = await Team.findById(participant.team._id);

        const cyclist = await Cyclist.findOne({ participant: req.participant });

        const index = team.cyclists.indexOf(cyclist._id);

        team.mechanic.splice(index, 1);

        const currentTeam = await team.save();

        participant.teamId = '';

        await participant.save();
        
        return res.json(currentTeam);

    }

    if (participant.role === 'Mechanic') {

        const team = await Team.findById(participant.team._id);

        const cyclist = await Cyclist.findOne({ participant: req.participant });

        const index = team.cyclists.indexOf(cyclist._id);

        team.mechanic.splice(index, 1);

        const currentTeam = await team.save();

        participant.teamId = '';

        await participant.save();

        return res.json(currentTeam);

    }

    if (participant.role === 'Medical') {

        const team = await Team.findById(participant.team._id);

        const cyclist = await Cyclist.findOne({ participant: req.participant });

        const index = team.cyclists.indexOf(cyclist._id);

        team.mechanic.splice(index, 1);

        const currentTeam = await team.save();

        participant.teamId = '';

        await participant.save();

        return res.json(currentTeam);
    }
}

async function deleteTeam(req, res) {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);

    if (team === null || team === undefined) throw new httpError('Team not found', 404);
    
    await team.deleteOne({ _id: team._id });

    const participant = await Participant.findById(req.participant);

    participant.teamId = '';

    await participant.save();

    return res.json(team);
}

module.exports = { 
    createTeam,
    joinTeam,
    getTeams,
    leaveTeam,
    deleteTeam
};