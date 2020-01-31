const mongoose = require('mongoose');

const options = {
    auto_reconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 3000,
    promiseLibrary: require('bluebird'),
    useNewUrlParser: true,
    dbName: 'BikeChampionship',
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    useUnifiedTopology: true
};

// Database connection establishing below
const connectionRestart = () => {
    mongoose.connect('mongodb://mongodb:27017', options)
        .then(() => {
            console.log('MongoDb is connected!');
            let db = mongoose.connection;

            db.on('open', () => {
                console.info('Connected to Database!');
            });

            db.on('error', (error) => {
                console.error('Connection Error:', error.message);
            });

            db.on('disconnected', () => {
                console.log('Disconnected');
            });
        })
        .catch(error => {
            console.log('MongoDb is disconnected, retry after 2 seconds');
            setTimeout(connectionRestart(), 2000);
        });
    };

connectionRestart();

module.exports = mongoose;