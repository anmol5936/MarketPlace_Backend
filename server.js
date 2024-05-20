const express = require('express');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const authroute = require('./routes/authroute')
const dotenv = require('dotenv').config();


connectDb();
const app = express();
app.use(express.json());


const PORT = process.env.PORT|5001;

app.use('/api/users',authroute);

app.use(errorHandler);

app.listen(PORT,()=>{

console.log(`Server is listening on port ${PORT}`);

})