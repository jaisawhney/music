import {Router} from 'express';
import models from '../db/models';

const router = Router()
router.get('/', async (req, res) => {
    try {
        const songs = await models.AudioTrack.findAll({
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
            include: {
                model: models.User,
                as: 'favoritedBy',
                attributes: ['id'],
                through: {attributes: []},
                required: false,
                where: {id: req.user.id},
            }
        });
        return res.render('index', {songs: songs})
    } catch (err) {
        console.error(err);
        return res.sendStatus(500);
    }
});

router.get('/favorites', async (req, res) => {
    try {
        const songs = await models.AudioTrack.findAll({
            raw: true,
            nest: true,
            include: {
                model: models.User,
                as: 'favoritedBy',
                attributes: ['id'],
                through: {attributes: []},
                where: {id: req.user.id}
            }
        });
        return res.render('index', {songs: songs})
    } catch (err) {
        console.log(err)
        return res.sendStatus(500);
    }
});

export default router;
