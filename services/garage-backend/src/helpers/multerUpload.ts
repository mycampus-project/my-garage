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

  filename(req: any, file: any, cb: any) {
    const filename = file.originalname;
    const filenameParts = filename.split('.');
    const fileExtension = filenameParts[filenameParts.length - 1];
    cb(null, `${randomUUID()}.${fileExtension}`);
  },
});
const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Image uploaded is not of type jpg/jpeg or png'), false);
  }
};
const upload = multer({ storage, fileFilter });

export default upload;
