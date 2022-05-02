import * as express from 'express';
import checkAuth from '../middleware/checkAuth'

import mainRoutes from './main';
import trackRoutes from './tracks';
import authRoutes from './auth';

const router = express.Router();

router.use('/', authRoutes);

router.use(checkAuth);
router.use('/', mainRoutes);
router.use('/tracks', trackRoutes);

export default router;