const dotenv = require('dotenv');
const path = require('path')
dotenv.config({path: path.resolve(__dirname, '../../.env')});

const env = process.env.NODE_ENV; // 'dev' or 'prod'

const config = {
  client: {
    host: process.env.CLIENT_HOST || 'localhost',
    port: parseInt(process.env.CLIENT_PORT) || 8080
  },
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: parseInt(process.env.SERVER_PORT) || 3000
  },
  db: {
    protocol: process.env.DB_PROTOCOL || 'mongodb', //'mongodb+srv'
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 27017,
    name: process.env.DB_NAME || 'dev',
    user: process.env.DB_USER || 'devInfoAtlas',
    password: process.env.DB_PASSWORD,
  },
  //db: `mongodb+srv://devInfoAtlas:devInfoAtlasPwd@crop2mlcluster.6pf0x.mongodb.net/dev`,
  //db: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
  //db: `mongodb://root:password@localhost:27017/test?authSource=admin`
  email: {
    sender: process.env.EMAIL_SENDER,
    password: process.env.EMAIL_PASSWORD
  }
 };
 
 module.exports = config;
  