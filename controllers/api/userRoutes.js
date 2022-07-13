const router = require('express').Router();
const {User} = require('../../models')

//* /api/user endpoint

// Handles sign up requests
router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        console.log(userData);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Handles login requests
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: {email: req.body.email }});
        console.log(`\n\t${userData} CONSOLE.LOG`);
        if (!userData) {
            res.status(400).json('Incorrect login credentials');
            return;
        };

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json('Incorrect login credentials');
            return;
        };
        
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'Login Succesful!'})
        })
    } catch (err) {
        res.status(400).json(err)
    }
});

//; Call this when timer runs out to log out user after inactivity
// Handles logout requests
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else (err) => {
        res.status(404).json(err).end();
    }
});

module.exports = router;