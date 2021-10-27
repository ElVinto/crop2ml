let express = require('express')
let mongoose = require ('mongoose')
let bodyParser = require('body-parser')
let cors = require('cors')
let path = require('path')
let dbConfig = require('./config/dbConfig');

// Connecting mongoDB
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

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
const mongodbServices = require('./api/routes/mongodb-services');
app.use('/mongodb-services', mongodbServices);

const files = require('./api/routes/files');
app.use('/files', files);

const cropModels = require('./api/routes/cropModels');
app.use('/cropmodels', cropModels);

const community = require('./api/routes/community');
app.use('/community', community);

const auth = require('./api/routes/auth');
app.use('/auth', auth);

const user = require('./api/routes/user');
app.use('/user', user);


// Create port
const port = process.env.PORT || 5000;


// Connecting port
const server = app.listen(port, () => {
    console.log('Server started on port ' + port)
})

// Handle production in Heroku
// CMZ comment
// if(process.env.NODE_ENV === 'production'){
//     // Static folder 
//     app.use(express.static(__dirname+'/public'));// __dirname means . (i.e., current directory)

//     // Handle Single Page application
//     // for any other routes redirect it to index.html
//     app.get(/.*/,(req,res)=> res.sendFile(__dirname+'/public/index.html'));
// }

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
});

// Static build location
app.use(express.static(path.join(__dirname, 'dist')));
*/

//module.exports =app;