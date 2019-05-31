const PersonalInfo = require('../models/PersonalInfo');

async function postPersonal(req, res) {
    const infoObj = { name, surname, age, idNumber } = req.body;

    const personal = await PersonalInfo.create(infoObj);

    res.json(personal);
}

async function postPersonal(req, res) {
    
}

async function postPersonal(req, res) {
    
}

async function postPersonal(req, res) {
    
}

module.exports = {
    postPersonal,
    getPersonal,
    putPersonal,
    deletePersonal
}