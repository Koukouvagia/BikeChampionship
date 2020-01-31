var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JwtAuth = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        token: {
            type: String
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model('JWT', JwtAuth);


