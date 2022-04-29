import {Router} from 'express';
import models from '../db/models';

const router = Router()
router.get('/', async (req, res) => {
    const songs = await models.AudioTrack.findAll({raw: true});
    res.render('index', {songs: songs})
});

export default router;