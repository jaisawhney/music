import {Router} from 'express';
import jwt from 'jsonwebtoken';
import models from '../db/models';

const router = Router()
router.get('/login', (req, res) => {
    res.render('login', {layout: 'registration'});
});

router.post('/login', async (req, res) => {
    const user = await models.User.findOne({where: {username: req.body.username}});
    if (!user) return res.redirect('/login');

    const match = user.validatePassword(req.body.password);
    if (!match) return res.redirect('/login');

    const token = jwt.sign({id: user.id, username: user.username}, process.env.JWT_SECRET as string, {
        expiresIn: '30d'
    });
    res.cookie('jwt', token, {httpOnly: true, secure: true, maxAge: 30 * 24 * 60 * 60 * 1000}); //30 days

    res.redirect('/');
});

router.get('/signup', (req, res) => {
    res.render('signup', {layout: 'registration'});
});

router.post('/signup', async (req, res) => {
    const user = await models.User.findOne({where: {username: req.body.username}});
    if (user) return res.redirect('/login');

    if (!req.body.username || !req.body.password)
        return res.redirect('/signup');

    models.User.create({
        username: req.body.username,
        password: req.body.password
    });
    res.redirect('/login');
});


router.get('/logout', (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/login');
});

export default router;
