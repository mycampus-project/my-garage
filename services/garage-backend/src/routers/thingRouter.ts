import express from 'express';
import multer from 'multer';

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
    cb(null, './uploads/');
  },

  filename(req: any, file: any, cb: any) {
    cb(null, file.originalname);
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
router.put('/:thingId//restore', requireAuth('admin'), restoreThing);

export default router;
