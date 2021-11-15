const config = {
  /*client: {
    host: 'localhost',
    port: 8080
  },*/
  server: {
    host: process.env.SERVER_HOST || 'localhost',
    port: parseInt(process.env.SERVER_PORT) || 3000
  },
};
   
module.exports = config;