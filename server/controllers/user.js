const User = require('../models/users');

exports.addHistoryCheck = async (req, res) => {
    try {
        const user = await User.findOne();
        user.addHistory({
            date: new Date(),
            number: 012345,
            province: 'Vung Tau'
        })

        await user.save();
    } catch (error) {
        console.log(error);
    }


}