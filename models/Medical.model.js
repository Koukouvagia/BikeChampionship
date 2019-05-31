const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MedicalSchema = new Schema({
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'Participant',
        unique: true,
        required: true
    },
    speciality: {
        type: String,
        enum: ['emergency', 'physiotherapist'],
        required: true
    },
    vehicle: String
},
{
    timestamps: true
});

const medicalModel = mongoose.model('Medical', MedicalSchema, 'Medicals');

module.exports = medicalModel;