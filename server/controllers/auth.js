const User = require('../models/users');
const Admin = require('../models/admins');
const md5 = require('md5')


exports.postLogin = async (req, res) => {
    req.session.isLoggedIn = true;
    try {
        const { isAdmin, username, password } = req.body;
        //if is User
        if (!isAdmin) {
            //Check User collection
            await User.findOne({ username: username })
                .then(user => {
                    if (user) {
                        if (user.password === md5(password)) {
                            res.status(200).json({ message: 'Đăng nhập thành công!' });
                        } else {
                            res.status(500).json({ message: 'Password không hợp lệ!' });
                        }
                    } else {
                        // If not find username in User => continue find in Admin
                        Admin.findOne({ username: username })
                            .then(admin => {
                                // Admin with username submit exist => Notification and redirect to admin login route
                                if (admin) {
                                    res.status(300).json({ message: 'Chuyển qua Admin login' });
                                } else {
                                    res.status(500).json({ message: 'Username chưa đăng ký!' })
                                }
                            })
                    }
                })
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi đăng nhập!' })
    }

}

exports.postRegisterUser = async (req, res) => {
    try {
        for (let i = 0; i < 31; i++) {
            let phone = '083' + (Math.floor(Math.random() * 900) + 100);
            const newUser = new User({
                username: `user${i}`,
                email: `user${i}@gmail.com`,
                password: '1234',
                name: `Nguyễn Văn ${i}`,
                phone: phone,
                historyChecks: []
            })
            await newUser.save();
        }
    } catch (error) {
        console.log(error);
    }
}

exports.postRegisterAdmin = async (req, res) => {
    try {
        for (let i = 11; i < 31; i++) {
            const newAdmin = new Admin({
                username: `admin${i}`,
                email: `admin${i}@gmail.com`,
                password: '1234',
                name: `Hoàng Van ${i}`
            })
            await newAdmin.save();
        }
    } catch (error) {
        console.log(error);
    }
}