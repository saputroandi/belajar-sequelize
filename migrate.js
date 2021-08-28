const Users = require('./app/user/model');

// sync table to database
const syncDB = async () => {
  try {
    await Users.sync({ force: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
};

syncDB();
