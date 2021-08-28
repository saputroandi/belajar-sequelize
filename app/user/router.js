const router = require('express').Router();
const multer = require('multer');

const Users = require('./model');

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
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
