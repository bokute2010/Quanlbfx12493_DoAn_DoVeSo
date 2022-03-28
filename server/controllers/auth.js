const User = require('../models/users');

exports.postRegisterUser = async (req, res) => {
    try {
        const newUser = new User({
            username: 'test',
            email: 'test@gmail.com',
            password: '123',
            historyChecks: []
        })
        await newUser.save();
    } catch (error) {
        console.log(error);
    }

}