const router = require('express').Router();
const { Comment } = require('../../models');
const auth = require('../../utils/auth');

//* /api/comment endpoint

// Handles creating comments
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(commentData)
    } catch (err) {
        res.status(400).json(err)
    }
})

// Handles deleting comments
router.delete('/:id', auth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!commentData) {
            res.status(404).json('Comment Not Found')
        };

        res.status(200).json('Comment Deleted')
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;