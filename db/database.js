require('dotenv').config();

const mongoose = require('mongoose');

const connect = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose
        .connect(process.env.DB_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log('Successfully connected to the DB');
        });
    } catch (err) {
      console.error('App starting error:', err.stack);
      // process.exit(1);
    }
  }
};

const truncate = async () => {
  if (mongoose.connection.readyState !== 0) {
    const { collections } = mongoose.connection;

    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({})
    );

    await Promise.all(promises);
  }
};

const disconnect = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
};

module.exports = {
  connect,
  truncate,
  disconnect,
};
