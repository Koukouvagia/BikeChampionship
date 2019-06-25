const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CyclistSchema = new Schema({
    participant: {
        type: Schema.Types.ObjectId,
        ref: 'Participant'
    },
    shirtNumber: { 
        type: Number,
        required: true
    },
    style: {
        type: String,
        enum: ['Sprinter', 'Climber', 'All-rounder', 'Puncher'],
        required: true
    }
},
{
        timestamps: true
});


const cyclistModel = mongoose.model('Cyclist', CyclistSchema, 'Cyclists');

module.exports = cyclistModel;
