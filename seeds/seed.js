const {User, Post, Comment} = require('../models');
const sequelize = require('../config/connection');

const userData = require('./userData.json');
const postData = require('./projectData.json');
const commentData = require('./commentData.js');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true
    });

    await Post.bulkCreate(postData, {
        individualHooks: true,
    });

    await Comment.bulkCreate(commentData, {
        individualHooks: true,
    });

    process.exit(0);
};

seedDatabase();