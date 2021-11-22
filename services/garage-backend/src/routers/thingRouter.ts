import express from 'express';
import multer from 'multer';
import * as fs from 'fs';

import {
  createThing,
  findThingById,
  updateThing,
  findAllThings,
  deleteThing,
  restoreThing,
} from '../controllers/thingController';
import { requireAuth } from '../middlewares/auth';

const router = express.Router();
router.use(requireAuth());

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
    const fileExtension = filename.split('.')[1];
    cb(null, `${Date.now()}.${fileExtension}`);
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

router.get('/', findAllThings);
router.get('/:thingId', findThingById);
router.post('/', requireAuth('admin'), upload.single('image'), createThing);
router.put('/:thingId', requireAuth('admin'), updateThing);
router.delete('/:thingId', requireAuth('admin'), deleteThing);
router.put('/:thingId/restore', requireAuth('admin'), restoreThing);

export default router;
