const express = require('express');
const morgan =  require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./Config/db');
const cors = require('cors');

dotenv.config();

connectDB();
const app = express();
app.use(cors());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user',require('./Routes/userRoutes'));
app.use('/api/v1/admin',require('./Routes/adminRoutes'));
app.use('/api/v1/doctor',require('./Routes/doctorRoutes'));
const port = process.env.PORT || 8080;

app.listen(port,() => {
    console.log(`Server is Running on port ${port}`);
});
