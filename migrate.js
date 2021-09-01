const Users = require('./app/user/model');
const Photos = require('./app/photo/model');

// write table relation below this line
Users.hasMany(Photos);
Photos.belongsTo(Users);

// sync table to database
const syncDB = async () => {
  try {
    await Users.sync({ force: true });
    await Photos.sync({ force: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
};

syncDB();
