const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonalInfo = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    idNumber: String
},
{
    timestamps: true
});

module.exports = mongoose.model('PersonalInfo', PersonalInfo, 'PersonalInfos');
