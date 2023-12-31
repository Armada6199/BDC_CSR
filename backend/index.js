const {runServer}=require('./src/server');
require('dotenv').config();
const PORT =process.env.PORT;
runServer(PORT);