const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
    fullname: {
        type: String,
        unique: true,
        required: true 
    },
    age: {
        type: Number,
        required: true,
    },
    contactInfo: String,
    role: String
});

const participantModel = mongoose.model('Participant', ParticipantSchema, 'Participants');

module.exports = participantModel;