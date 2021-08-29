const router = require('express').Router();
const multer = require('multer');
const Sequelize = require('sequelize');

const Users = require('./model');
const { errorHandler } = require('../utils/handler');

router.get('/', async (req, res, next) => {
  try {
    const users = await Users.findAll();
    return res.json({
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post('/user', multer().none(), async (req, res, next) => {
  try {
    const payload = req.body;

    const user = await Users.create(payload);
    return res.json(user);
  } catch (e) {
    if (e instanceof Sequelize.ValidationError) {
      const errorMessages = errorHandler(e);

      return res.status(400).json({
        error: 1,
        messages: errorMessages,
      });
    }
    next(e);
  }
});

module.exports = router;
