let express = require('express')
let mongoose = require ('mongoose')
let bodyParser = require('body-parser')
let cors = require('cors')
let path = require('path')
let config = require('./config');

// Connecting mongoDB
if (config.db.protocol === "mongodb+srv") {
    mongoose.connect(`${config.db.protocol}://${config.db.user}:${config.db.password}@${config.db.host}/${config.db.name}?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
} else {
    mongoose.connect(`${config.db.protocol}://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}?authSource=admin`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

let db = mongoose.connection;
db.once('open', function() {
    console.log('Database connected')
})
db.on('error', function(err) {
    console.log(err)
})

// Setting up express
const app = express();
app.use(bodyParser.json());
app.use(cors()); 


// API

const files = require('./api/routes/fileRoutes');
app.use('/files', files);

const cropModels = require('./api/routes/modelRoutes');
app.use('/models', cropModels);

const community = require('./api/routes/communityRoutes');
app.use('/community', community);

const auth = require('./api/routes/authRoutes');
app.use('/auth', auth);

const user = require('./api/routes/userRoutes');
app.use('/user', user);

// Connecting port
const server = app.listen(config.server.port, () => {
    console.log('Server started on port ' + config.server.port)
})

// Static folder 
app.use('/static', express.static(__dirname+'/../public'));// __dirname means . (i.e., current directory)
//app.use(express.static(path.join(__dirname, 'dist')));
app.use('/community_images', express.static(__dirname+'/../data/community_images'));
app.use('/packages', express.static(__dirname+'/../data/packages'));
// Handle Single Page application
// for any other routes redirect it to index.html
app.get(/.*/,(req,res)=> res.sendFile(__dirname+'/../public/index.html'));

/* CMZ : get from boilerplate
// Find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});


// Index Route
app.get('/', (req, res) => {
    res.send('invalid endpoint');
});


// error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});*/

//module.exports =app;