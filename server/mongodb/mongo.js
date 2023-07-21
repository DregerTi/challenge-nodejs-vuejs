const mongoose = require('mongoose');

const clientOptions = {
  useNewUrlParser   : true,
  dbName            : 'eventDatabase'
};

exports.initClientDbConnection = async () => {
  try {
    console.log('MONGO_URL', process.env.URL_MONGO);
    await mongoose.connect(process.env.URL_MONGO, clientOptions)
    console.log('Connected');
  } catch (error) {
    console.log(error);
    throw error;
  }
};