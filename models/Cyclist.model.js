const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./User.model');

const CyclistSchema = new Schema({
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'Participant'
    },
    shirtNumber: { 
        type: Number,
        require: true
    },
    style: {
        type: String,
        enum: ['Sprinter', 'Climber', 'All-rounder', 'Puncher'],
        required: true
    }
});

const cyclistModel = mongoose.model('Cyclist', CyclistSchema, 'Cyclists');

module.exports = cyclistModel;
