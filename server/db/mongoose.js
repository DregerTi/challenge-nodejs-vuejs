const mongoose = require('mongoose');
const databaseConfig = require("./database");

NODE_ENV = process.env.NODE_ENV || "development";

mongoose.connect(databaseConfig.mongooseUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });
