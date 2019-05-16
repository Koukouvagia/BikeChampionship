const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MechanicSchema = new Schema({
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'Participant',
        unique: true,
        required: true
    },
    workingField: {
        type: String,
        enum: ['runtime', 'backteam'],
        required: true
    },
    vehicle: String
});

const mechanicModel = mongoose.model('Mechanic', MechanicSchema, 'Mechanics');

module.exports = mechanicModel;