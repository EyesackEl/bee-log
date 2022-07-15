const router = require('express').Router();
const { Post } = require('../../models');
const auth = require('../../utils/auth');

//* /api/post endpoint

router.post('/', auth, async (req, res) => {
    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(postData)
    } catch (err) {
        res.status(400).json(err)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id)
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!postData) {
            res.status(404).json('Post Not Found');
        };

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// router.delete('/:id', auth, async (req, res) => {
//     try {
//       const projectData = await Project.destroy({
//         where: {
//           id: req.params.id,
//           user_id: req.session.user_id,
//         },
//       });
  
//       if (!projectData) {
//         res.status(404).json({ message: 'No project found with this id!' });
//         return;
//       }
  
//       res.status(200).json(projectData);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

module.exports = router;