const router = require('express').Router();
const { User, Comment, Post} = require('../models');
const auth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{model: User, attributes: ['name']}]
        });

        const posts = postData.map((post) => post.get({plain: true}));


        res.render('homepage', {
            logged_in: req.session.logged_in,
            posts: posts
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { 
                  model: User,
                  atttributes: ['name'],
                }
            ]
        });

        const commentData = await Comment.findAll(
            { 
            where: {post_id: req.params.id}, 
            include: [
                {
                  model: User,
                  attributes: ['name']
                }
            ]
        });

        const post = postData.get({ plain: true });

        const comments = commentData.map((comment) => comment.get({plain: true}));

        res.render('post', {
            post,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new-comment', auth, async (req, res) => {
    try {
        res.render('new-comment', {
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/dashboard', auth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {user_id: req.session.user_id}
        });

        const posts = postData.map((post) => post.get({plain: true}));

        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { 
                  model: User,
                  atttributes: ['name'],
                }
            ]
        });

        const commentData = await Comment.findAll({ where: {post_id: req.params.id}, 
            include: [
                {
                  model: User,
                  attributes: ['name']
                }
            ]
        });

        const post = postData.get({ plain: true });

        const comments = commentData.map((comment) => comment.get({plain: true}));

        res.render('post', {
            post,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard/new-post', auth, async (req, res) => {
    try {
        res.render('new-post', {
            logged_in: req.session.logged_in
        });
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
            res.render('login');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;