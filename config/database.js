const mongoose = require('mongoose');


const CONNECTION_STRING = process.env.DATABASE_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/bookme';

module.exports = async (app) => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(CONNECTION_STRING, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log('Database connected');
  } catch (error) {
    console.error('Error initializing database');
    console.error(error.message);
    process.exit(1);
  }
};