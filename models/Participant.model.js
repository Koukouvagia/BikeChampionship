const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const ParticipantSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    role: {
        type: String,
        enum: ['cyclist', 'medical', 'mechanic']
    }
},
{
    timestamps: true
});

ParticipantSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    let saltRounds = 13;
  
    this.password = await bcrypt.hash(this.password, saltRounds);
});

ParticipantSchema.methods.checkPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Participant', ParticipantSchema, 'Participants');
