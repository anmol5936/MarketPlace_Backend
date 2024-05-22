const express = require('express');
const cors = require('cors');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const authroute = require('./routes/authroute')
const dotenv = require('dotenv').config();


connectDb();
const app = express();
app.use(express.json());

app.use(
    cors({
      origin: "*",
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );

const PORT = process.env.PORT|5001;

app.use('/api/users',authroute);

app.use(errorHandler);

app.listen(PORT,()=>{

console.log(`Server is listening on port ${PORT}`);

})