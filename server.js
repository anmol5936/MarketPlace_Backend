const express = require('express');
const cors = require('cors');
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const authRoute = require('./routes/authroute');
const productRoute = require('./routes/productroute');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');

dotenv.config(); 

connectDb();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*", 
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

const PORT = process.env.PORT || 5001;

app.use('/api/users', authRoute);
app.use('/api/products', productRoute);





app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
