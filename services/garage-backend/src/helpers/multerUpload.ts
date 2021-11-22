import multer from 'multer';
import * as fs from 'fs';
import { randomUUID } from 'crypto';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = './uploads/';
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => cb(error, dir));
      }
      return cb(null, dir);
    });
  },

  filename(req, file, cb) {
    const filename = file.originalname;
    const filenameParts = filename.split('.');
    const fileExtension = filenameParts[filenameParts.length - 1];
    cb(null, `${randomUUID()}.${fileExtension}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Image uploaded is not of type jpg/jpeg or png'));
    }
  },
});

export default upload;
