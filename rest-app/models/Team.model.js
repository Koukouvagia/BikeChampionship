const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    motto: String,
    teamLeader: {
        type: String,
        unique: true
    },
    cyclists: [{ type: Schema.Types.ObjectId, ref: 'Cyclist' }],
    medicals: [{ type: Schema.Types.ObjectId, ref: 'Medical' }],
    mechanics: [{ type: Schema.Types.ObjectId, ref: 'Mechanic' }]
},
{
    timestamps: true
});

const teamModel = mongoose.model('Team', TeamSchema, 'Teams');

module.exports = teamModel;