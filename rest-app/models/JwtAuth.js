var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JwtAuth = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'Participant'
        },
        token: {
            type: String
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('JWT', JwtAuth);


