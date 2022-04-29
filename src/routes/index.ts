import * as express from 'express';

import mainRoutes from './main';
import trackRoutes from './tracks';

const router = express.Router();

router.use('/', mainRoutes);
router.use('/tracks', trackRoutes);

export default router;