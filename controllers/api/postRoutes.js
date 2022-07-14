const router = require('express').Router();
const { Post } = require('../../models');
const auth = require('../../utils/auth');

//* /api/post endpoint

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.sesion.user_id
        });

        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!postData) {
            res.status(404).json('Post Not Found')
        };

        res.status(200).json('Post Deleted')
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;