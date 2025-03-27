const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      // Use environment variable for MongoDB connection string
      const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://parto:Kavya2005@cluster0.1g7iq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
      
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error.message);
      // Exit process with failure
      process.exit(1);
    }
  };
  
  module.exports = connectDB;