import {Router} from 'express';
import fs from 'fs';
import path from 'path';
import models from '../db/models';
import mm from 'music-metadata';

const router = Router()


router.get('/stream/:song_id', async (req, res) => {
    const songInfo = await models.AudioTrack.findByPk(req.params.song_id);
    if (!songInfo) return res.sendStatus(404);

    const songLocation: string = path.join(__dirname, '..', songInfo.filePath);

    if (!fs.existsSync(songLocation))
        return res.sendStatus(404);

    const stat = fs.statSync(songLocation);
    res.header({
        'Content-Type': 'audio/mpeg',
        'Accept-Ranges': 'bytes',
        'Content-Length': stat.size
    });
    const readStream = await fs.createReadStream(songLocation);
    readStream.pipe(res);
});

router.put('/:song_id/favorites', async (req, res) => {
    const songInfo = await models.AudioTrack.findByPk(req.params.song_id);
    if (!songInfo) return res.sendStatus(404);

    models.Favorite.findOrCreate({
        where: {
            userId: req.user.id,
            trackId: req.params.song_id
        },
        defaults: {
            userId: req.user.id,
            trackId: req.params.song_id
        }
    });

    return res.sendStatus(200);
});

router.delete('/:song_id/favorites', async (req, res) => {
    const songInfo = await models.AudioTrack.findByPk(req.params.song_id);
    if (!songInfo) return res.sendStatus(404);

    const result = await models.Favorite.findOne({
        where: {
            userId: req.user.id,
            trackId: req.params.song_id
        }
    });
    if (result) result.destroy();

    return res.sendStatus(200);
});

router.post('/refresh', async (req, res) => {
    const storedSongs = await models.AudioTrack.findAll({attributes: ['filePath']});
    const library: string[] = fs.readdirSync(path.join(__dirname, '..', 'music'));
    const songs: string[] = library.filter(song => path.extname(song) === '.mp3');

    for (const song of songs) {
        const filePath: string = path.join('music', song);
        if (storedSongs.find((existingSong: any) => existingSong.filePath === filePath))
            continue;

        const metadata = await mm.parseFile(path.join(__dirname, '..', 'music', song));
        const albumArt = metadata.common?.picture?.find((coverArt: { format: string; }) => coverArt.format === 'image/jpeg');
        let albumArtPath: string | null = null;
        if (albumArt) {
            albumArtPath = path.join('music', path.parse(song).name + '.jpg');
            fs.writeFileSync(path.join(__dirname, '..', albumArtPath), albumArt.data, 'binary');
        }
        await models.AudioTrack.create({
            title: metadata.common?.title || path.parse(song).name,
            artist: metadata.common?.artist || null,
            album: metadata.common?.album || null,
            albumArt: albumArtPath,
            filePath: filePath
        });
    }
    res.redirect('/');
});

export default router;
