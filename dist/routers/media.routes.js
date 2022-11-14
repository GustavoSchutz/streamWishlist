import express from 'express';
import { getMedia, newCategory, newMedia } from '../controllers/media.controller.js';
var mediaRouter = express.Router();
mediaRouter.post('/media', newMedia);
mediaRouter.post('/category', newCategory);
mediaRouter.get('/media', getMedia);
export { mediaRouter };
