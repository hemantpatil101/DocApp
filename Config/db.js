const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
       await mongoose.connect(process.env.MONGO_URL);
       console.log('MongoDB connected');
    }
    catch(error)
    {
        console.log("MongoDB Connection Error " + error);
    }
}

module.exports = connectDB;