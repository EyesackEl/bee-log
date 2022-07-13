const router = require('express').Router();
const { User, Comment, Post} = require('../models');
const auth = require('../utils/auth')

router.get('/', async (req, res) => {
    try {
        res.render('homepage', {
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    try {
        if(req.session.logged_in) {
            res.redirect('/dashboard');
            return;
        } else {
            res.render('login')
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', auth, async (req, res) => {
    try {
        const postData = User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password']},
            include: [{ model: Post}]
        })
        res.render('dashboard', {
            ...postData,
            logged_in: true
        })
    } catch (err) {
        res.status(500).json
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: Comment },
                { 
                    model: User,
                attributes: ['name']
                }
            ]
        })
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;