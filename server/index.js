const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); 


var mongodbServices = require('./routes/api/mongodb-services');
// li nk the route /mongodb-services to the router mongodb-services
app.use('/mongodb-services', mongodbServices);

var fileSystemServices = require('./routes/api/fileSystem-services');
// link the route /fileSystem-services to the router fileSystem
app.use('/fileSystem-services', fileSystemServices);



// Handle production in Heroku
if(process.env.NODE_ENV === 'production'){
    // Static folder 
    app.use(express.static(__dirname+'/public'));// __dirname means . (i.e., current directory)

    // Handle Single Page application
    // for any other routes redirect it to index.html
    app.get(/.*/,(req,res)=> res.sendFile(__dirname+'/public/index.html'));
}


// Heroku will use pross.env.PORT otherwise locally we use 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports =app;