const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = passportJWT.Strategy;
const Participant = require('../models/Participant.model');
const JwtAuth = require('../models/JwtAuth');
const jwtOptions = {};

/* --- Authorization Headers on request
If null return special message --- */

jwtOptions.jwtFromRequest = req => {
    const { authorization } = req.headers;
    if (authorization === null || authorization === undefined)
        throw new httpError('No token provided', 401);

    const jwt = authorization.split(' ')[1];
    return jwt;
}
jwtOptions.passReqToCallback = true;
jwtOptions.secretOrKey = process.env.TOKEN_SECRET;
const httpError = require('../utils/httpError');

function jwtStrategy(req, jwt_payload, done) {
    const header = req.headers.authorization;
    let token;
    
    // Grab header split it by spaces and keep second segment with the JWT token
    if (header !== undefined) {
        const bearer = header.split(' ');
        token = bearer[1];
    }

    /* Search in db, in JwtAuth collection if someone has been register with this token 
        and who participant this is */

    JwtAuth.findOne({ token })
        .then(participant => {
            if (participant) {
                return Participant.findOne({'_id': jwt_payload.id})
                    .then(participant => {
                        if (participant) {
                            req.participant = participant._id.toString();
                            done(null, participant);
                        } else {
                            done(null, false);
                        }
                    })
                } else {
                    done(null, false);
                }
        })
        .catch(done);
}

// Search in db, in Participant collection, the participant with the specific username and password fields
function localStrategy(username, password, done) {
    Participant.findOne({$or: [{email: username}, {username: username}]})
        .then(participant => {
            if (!participant) {
                done(null, false, {message: 'Invalid credentials'});
                return;
            }

            participant.checkPassword(password)
                .then(pass => {
                    if (!pass) done(null, false, {message: 'Invalid credentials'});
                    done(null, participant);
                })
                .catch(err => done(err));
            
        }).catch(err => {
        done(err);
    });
}

// If there is participant with the specific fields login is successfull , otherwise there is error or he is signed up and created right now

function login(req, res, next) {
    passport.authenticate('local', (err, participant) => {
        if (err) {
            next(new httpError('Login failed', 401));
        }
        else if (!participant) {
            console.log(participant);
            next(new httpError('Participant not found', 401));
        } else {
            const token = jwt.sign({'id': participant._id}, process.env.TOKEN_SECRET, {
                expiresIn: '1 day'
            });
            JwtAuth.create({ userId: participant._id, token: token }).catch(error => console.log(error));
            const message = {success: true, token: token};
            return res.status(200).json(message);
        }
    })(req, res, next);
    `1`
}

/*-- Logout function searches in db and Participant collection, the participant using his _id and when find him it delete his jwtauthorization document.
    If participant wants to make some request he needs to login again so new JwtAuth doc will be created */

function logout(req, res, next) {
    Participant.findById(req.participant)
        .then(user => {
            if (!user) {
                next(new httpError('Logout failed', 404));
            }
            JwtAuth.deleteOne({userId: req.participant}).catch(error => console.log(error));
            return res.status(200).send({message: 'Logout successful'});
        })
        .catch(err => {
            next(err)
        });
}

passport.use(new JwtStrategy(jwtOptions, jwtStrategy));
passport.use(new LocalStrategy({usernameField: 'email'}, localStrategy));

module.exports.login = login;
module.exports.logout = logout;
