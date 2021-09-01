const os = require('os');
const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const multer = require('multer');

const Photos = require('./model');
const config = require('../config');

const upload = multer({ dest: os.tmpdir() });

router.post(
  '/photos',
  // accept photos as object of array with photos as the key of the array
  // change to upload.array('photos', 12) if you want this route accept array of file of one name field only
  upload.fields([{ name: 'photos', maxCount: 4 }]),
  async (req, res, next) => {
    try {
      let UserId = req.body.userId;
      let arrPhotos = req.files.photos;

      let arrOriginalExtension = arrPhotos.map((photo, idx) => {
        // console.log(photo.originalname.split('.'));
        return photo.originalname.split('.')[
          photo.originalname.split('.').length - 1
        ];
      });

      let arrFileName = arrPhotos.map((photo, idx) => {
        return photo.filename + '.' + arrOriginalExtension[idx];
      });

      let arrTmpPath = arrPhotos.map((photo, idx) => {
        return photo.path;
      });

      let arrTargetPath = arrFileName.map((fileName, idx) => {
        return path.resolve(config.rootPath, `public/upload/${fileName}`);
      });

      let arrResponse = [];

      for (let i = 0; i < arrPhotos.length; i++) {
        let src = fs.createReadStream(arrTmpPath[i]);
        let dest = fs.createWriteStream(arrTargetPath[i]);

        src.pipe(dest);

        src.on('end', async () => {
          let { dataValues } = await Photos.create({
            fileName: arrFileName[i],
            UserId: Number(UserId),
          });

          // still can't push data to arr for response
          arrResponse.push(dataValues);
        });

        src.on('error', async (err) => {
          next(err);
        });
      }

      return res.json({
        message: 'upload success',
        count: arrPhotos.length,
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
