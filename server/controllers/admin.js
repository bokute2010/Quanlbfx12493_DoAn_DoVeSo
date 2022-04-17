const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Province = require('../models/provinces');
const User = require('../models/users');
const nodemailer = require('nodemailer');
const Admin = require('../models/admins')
const md5 = require('md5');

exports.updateUser = async (req, res) => {
    try {
        const { _id, name, email, isAdmin, phone } = req.body;

        // Check nếu client bỏ trống
        if (!name || !phone || !email) {
            return res.status(500).json({ alertMess: 'Cập nhật user/admin thất bại!' })
        }

        if (isAdmin) {
            // The case user update to admin
            Admin.findById(_id)
                .then(adminId => {
                    //Not find in admin collection
                    if (!adminId) {
                        //Delete in user collection
                        User.findByIdAndDelete(_id)
                            .then(userDeleted => {
                                //Add to admin collection
                                const newAdmin = new Admin({
                                    username: userDeleted.username,
                                    email: userDeleted.email,
                                    password: userDeleted.password,
                                    name: userDeleted.name,
                                    phone: userDeleted.phone,
                                    historyChecks: userDeleted.historyChecks
                                });
                                newAdmin.save();
                                //Load user data again  => we need to response newUser
                                return res.status(200).json({ alertMess: 'Cập nhật admin thành công!', newUser: newAdmin })
                            })
                    }
                    else {
                        Admin.findOne({ email: email })
                            .then(adminEmail => {
                                if (adminId.username === adminEmail.username) {
                                    Admin.findByIdAndUpdate(_id, { email: email, phone: phone, name: name })
                                        .then(admin => {
                                            return res.status(200).json({ alertMess: 'Cập nhật admin thành công!', newAdmin: admin })
                                        })
                                } else {
                                    return res.status(500).json({ alertMess: 'Email đã tồn tại!' })
                                }
                            })
                    }

                })

        } else {
            User.findById(_id)
                .then(userId => {
                    // find user has email which submit
                    User.findOne({ email: email })
                        .then(userEmail => {
                            // If has a user which that email submit
                            if (userEmail) {
                                // Compare username 
                                // If same username => can update
                                if (userId.username === userEmail.username) {
                                    User.findByIdAndUpdate(_id, { phone: phone, name: name })
                                        .then(user => {
                                            return res.status(200).json({ alertMess: 'Cập nhật user thành công!', newUser: user })
                                        })
                                }
                                // Not same username => email has been duplicate
                                else {
                                    return res.status(500).json({ alertMess: 'Email đã tồn tại!' })
                                }
                            }
                            //if not exist email in User => update with new email
                            else {
                                User.findByIdAndUpdate(_id, { email: email, phone: phone, name: name })
                                    .then(user => {
                                        return res.status(200).json({ alertMess: 'Cập nhật user thành công!', newUser: user })
                                    })
                            }

                        })


                })
        }
    } catch (error) {
        return res.status(500).json({ alertMess: 'Cập nhật user/admin thất bại!' })
    }
}
exports.createUser = async (req, res) => {
    try {
        const { name, username, email, password, isAdmin, phone } = req.body;
        if (isAdmin) {
            await Admin.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            })
                .then(admin => {
                    if (admin) {
                        return res.status(500).json({ alertMess: 'Username/Email đã tồn tại!' })
                    } else {
                        const newAdmin = new Admin({
                            username: username,
                            email: email,
                            password: md5(password),
                            name: name,
                            phone: phone
                        })
                        newAdmin.save();
                        return res.status(200).json({ alertMess: 'Tạo admin thành công!' })
                    }
                })
        } else {
            await User.findOne({
                $or: [
                    { username: username },
                    { email: email }
                ]
            })
                .then(user => {
                    if (user) {
                        return res.status(500).json({ alertMess: 'Username/Email đã tồn tại!' })
                    } else {
                        const newUser = new User({
                            username: username,
                            email: email,
                            password: md5(password),
                            name: name,
                            phone: phone,
                            historyChecks: []
                        })
                        newUser.save();
                        return res.status(200).json({ alertMess: 'Tạo user thành công!' })
                    }
                })
        }
    } catch (error) {
        return res.status(500).json({ alertMess: 'Tạo user thất bại!' })
    }

}

exports.resetPassword = async (req, res) => {
    try {
        const userId = req.query.userId;

        function sentMail(user, alertMess) {
            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD
                }
            })

            let mailOption = {
                from: process.env.MAIL_FROM,
                to: user.email,
                subject: 'Reset password notification!',
                html: `
                <div className="email" style="border: 1px solid black; padding: 20px;
                    font-family: sans-serif;
                    line-height: 2;
                    font-size: 20px;">
                <h2>Đây là mật khẩu mới của bạn!</h2>

                <p>${newPassword}</p>

                <p>All the best, Quanlb</p>
                </div>
            `
            }

            transport.sendMail(mailOption, function (err, data) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email Sent');
                }
            })
            return res.status(200).json({ alertMess: alertMess });
        }

        const newPassword = Math.floor(Math.random() * 9000) + 1000;
        User.findByIdAndUpdate(userId, { password: md5(newPassword.toString()) })
            .then(user => {
                if (user) {
                    return sentMail(user, `Reset mật khẩu của ${user.name} thành công`);
                }
                else {
                    Admin.findByIdAndUpdate(userId, { password: md5(newPassword) })
                        .then(admin => {
                            if (admin) {
                                sentMail(admin, `Reset mật khẩu của ${admin.name} thành công`);
                            }
                            else {
                                return res.status(500).json();
                            }
                        })
                }
            })
        // await bcrypt.hash(newPassword.toString(), 12)
        //     .then(hashPassword => {

        //     })
    } catch (error) {
        return res.status(500).json();
    }
}

exports.deleteUser = async (req, res) => {
    const page = + req.query.page || 1;
    const userId = req.query.userDeleteId;
    try {
        await User.findByIdAndRemove(userId)
            .then(() => {
                User.find()
                    .then(users => {
                        let usersLimit = []
                        for (let i = 1; i <= users.length; i++) {
                            if (i <= (page * 10) && (i > (page - 1) * 10)) {
                                usersLimit.push(users[i - 1]);
                            }
                        }
                        const totalPages = Math.ceil(users.length / 10);
                        return res.status(200).json({ users: usersLimit, totalPages: totalPages });
                    })
            })
    } catch (error) {
        User.find()
            .then(users => {
                let usersLimit = []
                for (let i = 1; i <= users.length; i++) {
                    if (i <= (page * 10) && (i > (page - 1) * 10)) {
                        usersLimit.push(users[i - 1]);
                    }
                }
                const totalPages = Math.ceil(users.length / 10);
                return res.status(500).json({ users: usersLimit, totalPages: totalPages });
            })
    }

}

exports.getUser = async (req, res) => {
    try {
        console.log(req.session.isLoggedIn);
        const page = + req.query.page || 1;
        const { searchValue, searchType, isAdmin } = req.query;

        //When have search request
        if (searchValue && searchType) {
            const search = {};
            search[searchType] = searchValue;

            //Check user search or admin search
            if (isAdmin === 'true') {
                await Admin.findOne(search)
                    .then((admin => {
                        //console.log(admins);

                        res.status(200).json([null, { admins: [admin], totalPages: 1 }]);
                    }))
            } else {
                await User.find(search)
                    .then((users => {

                        let usersLimit = []
                        for (let i = 1; i <= users.length; i++) {
                            if (i <= (page * 10) && (i > (page - 1) * 10)) {
                                usersLimit.push(users[i - 1]);
                            }
                        }

                        res.status(200).json([{ users: users, totalPages: 1 }, null]);
                    }))
            }

        }
        else {
            await User.find()
                .then(users => {
                    let usersLimit = []
                    for (let i = 1; i <= users.length; i++) {
                        if (i <= (page * 10) && (i > (page - 1) * 10)) {
                            usersLimit.push(users[i - 1]);
                        }
                    }
                    const totalPages = Math.ceil(users.length / 10);
                    return { users: usersLimit, totalPages: totalPages };

                })
                .then(userData => {
                    Admin.find()
                        .then(admins => {
                            let adminsLimit = []
                            for (let i = 1; i <= admins.length; i++) {
                                if (i <= (page * 10) && (i > (page - 1) * 10)) {
                                    adminsLimit.push(admins[i - 1]);
                                }
                            }
                            const totalPages = Math.ceil(admins.length / 10);
                            return { admins: adminsLimit, totalPages: totalPages };
                        })
                        .then(adminData => {
                            res.status(200).json([userData, adminData, { isAuthenticated: req.session.isLoggedIn }]);
                        })
                })
        }
    } catch (error) {
        console.log(error);
    }

}

// -------------> Pagination
exports.getLottery = async (req, res) => {
    try {
        const provinceId = req.query.provinceId;
        const page = + req.query.page || 1;
        //console.log(req.query)
        await Province.findById(provinceId)
            .then(province => {
                let lotteryLimit = []
                for (let i = 1; i < province.lottery.length; i++) {
                    if (i <= (page * 10) && (i > (page - 1) * 10)) {
                        lotteryLimit.push(province.lottery[i - 1]);
                    }
                }

                const provinceLimit = province;
                const totalRows = province.lottery.length;
                provinceLimit.lottery = lotteryLimit;

                return res.status(200).json({ province: provinceLimit, totalRows: totalRows });
            })
    } catch (error) {
        console.log(error)
    }
}

exports.deleteMultiLottery = async (req, res) => {
    try {
        const data = req.body;

        // Lọc ra các tỉnh
        let provinceIds = []

        for (let item of data) {
            provinceIds.push(item.provinceId)
        }

        const uniqueProvinceIds = [...new Set(provinceIds)];

        const newData = [];
        //Tạo ra object chứa dữ liệu theo format mong muốn
        for (let item of uniqueProvinceIds) {
            newData.push({ provinceId: item, lottery: [] });
        }

        for (let item of newData) {
            for (let lottery of data) {
                if (lottery.provinceId === item.provinceId) {
                    item.lottery.push(lottery.lotteryId)
                }
            }
        }

        // ------------------------
        for (let item of newData) {
            await Province.findById(item.provinceId)
                .then(province => {
                    return province.deleteMultiLottery(item.lottery);
                })
        }


        await Province.find()
            .then(provinces => {
                res.status(200).json(provinces);
            });

    } catch (error) {
        console.log(error);
        await Province.find()
            .then(provinces => {
                return res.status(500).json(provinces);
            });
    }
}

exports.updateLottery = async (req, res) => {
    try {
        console.log(req.body);
        const updatedLottery = req.body;
        updatedLottery._id = mongoose.Types.ObjectId(req.body._id);

        await Province.findById(req.query.provinceId)
            .then(province => {
                return province.updateLottery(updatedLottery)
            })
            .then(() => {
                Province.find()
                    .then(provinces => {
                        return res.status(200).json(provinces);
                    });
            })
    } catch (error) {
        console.log(error)
        await Province.find()
            .then(provinces => {
                return res.status(500).json(provinces);
            });
    }
}

exports.deleteLottery = async (req, res) => {
    try {
        //console.log(req.query)
        const provinceId = await req.query.provinceId;
        const lotteryId = req.query.lotteryId;

        await Province.findById(provinceId)
            .then((province) => {
                return province.deleteLottery(lotteryId)
            })
            .then(() => {
                Province.find()
                    .then(provinces => {
                        return res.status(200).json(provinces);
                    });
            })

    } catch (error) {
        console.log(error);
        await Province.find()
            .then(provinces => {
                return res.status(500).json(provinces);
            });
    }
}

exports.createLottery = async (req, res) => {

    try {
        const provinceId = req.body.province;
        const date = new Date(req.body.date);
        const special_prize = parseInt(req.body.special_prize);
        const g1 = parseInt(req.body.g1);
        //Check nếu là vé số miền Bắc.
        if (req.body.region === 'north') {
            const g2_1 = parseInt(req.body.g2_1);
            const g2_2 = parseInt(req.body.g2_2);
            const g3_1 = parseInt(req.body.g3_1);
            const g3_2 = parseInt(req.body.g3_2);
            const g3_3 = parseInt(req.body.g3_3);
            const g3_4 = parseInt(req.body.g3_4);
            const g3_5 = parseInt(req.body.g3_5);
            const g3_6 = parseInt(req.body.g3_6);
            const g4_1 = parseInt(req.body.g4_1);
            const g4_2 = parseInt(req.body.g4_2);
            const g4_3 = parseInt(req.body.g4_3);
            const g4_4 = parseInt(req.body.g4_4);
            const g5_1 = parseInt(req.body.g5_1);
            const g5_2 = parseInt(req.body.g5_2);
            const g5_3 = parseInt(req.body.g5_3);
            const g5_4 = parseInt(req.body.g5_4);
            const g5_5 = parseInt(req.body.g5_5);
            const g5_6 = parseInt(req.body.g5_6);
            const g6_1 = parseInt(req.body.g6_1);
            const g6_2 = parseInt(req.body.g6_2);
            const g6_3 = parseInt(req.body.g6_3);
            const g7_1 = parseInt(req.body.g7_1);
            const g7_2 = parseInt(req.body.g7_2);
            const g7_3 = parseInt(req.body.g7_3);
            const g7_4 = parseInt(req.body.g7_4);

            await Province.findById(provinceId)
                .then((province) => {
                    if (province) {
                        return province.addLottery({
                            date: date,
                            special_prize: special_prize,
                            g1: g1,
                            g2: [g2_1, g2_2],
                            g3: [g3_1, g3_2, g3_3, g3_4, g3_5, g3_6],
                            g4: [g4_1, g4_2, g4_3, g4_4],
                            g5: [g5_1, g5_2, g5_3, g5_4, g5_5, g5_6],
                            g6: [g6_1, g6_2, g6_3],
                            g7: [g7_1, g7_2, g7_3, g7_4]
                        })

                    } else {
                        throw error;
                    }
                })
                .then(() => {
                    return Province.find()
                        .then(provinces => {
                            res.status(200).json(provinces)
                        });
                })

            //res.status(200).json(provinces)
        }
        //Check nếu là vé số miền Trung hoặc Nam.
        else {

            const g2 = parseInt(req.body.g2);

            const g3_1 = parseInt(req.body.g3_1);
            const g3_2 = parseInt(req.body.g3_2);

            const g4_1 = parseInt(req.body.g4_1);
            const g4_2 = parseInt(req.body.g4_2);
            const g4_3 = parseInt(req.body.g4_3);
            const g4_4 = parseInt(req.body.g4_4);
            const g4_5 = parseInt(req.body.g4_5);
            const g4_6 = parseInt(req.body.g4_6);
            const g4_7 = parseInt(req.body.g4_7);

            const g5 = parseInt(req.body.g5);

            const g6_1 = parseInt(req.body.g6_1);
            const g6_2 = parseInt(req.body.g6_2);
            const g6_3 = parseInt(req.body.g6_3);

            const g7 = parseInt(req.body.g7);
            const g8 = parseInt(req.body.g8);

            //Tìm xem đã tồn tại record province chưa.
            await Province.findById(provinceId)
                .then(province => {
                    if (province) {
                        console.log(province)
                        province.addLottery({
                            date: date,
                            special_prize: special_prize,
                            g1: g1,
                            g2: [g2],
                            g3: [g3_1, g3_2],
                            g4: [g4_1, g4_2, g4_3, g4_4, g4_5, g4_6, g4_7],
                            g5: [g5],
                            g6: [g6_1, g6_2, g6_3],
                            g7: [g7],
                            g8: [g8]
                        })

                    } else {
                        console.log(province)
                        var error = new Error();
                        throw error;
                    }
                })
                .then(() => {
                    return Province.find()
                        .then(provinces => {
                            res.status(200).json(provinces)
                        });
                })
        }
    } catch (error) {
        console.log(error);
        await Province.find()
            .then(provinces => {
                return res.status(500).json(provinces);
            });
    }
}

exports.getProvinces = async (req, res) => {
    try {
        await Province.find()
            .then(provinces => {
                return res.status(200).json(provinces);
            });

    } catch (error) {
        console.log(error);
    }
}

exports.addHardData = async (req, res) => {
    try {
        //#region North
        // await Province.find()
        //     .then(provinces => {
        //         for (let province of provinces) {
        //             if (province.region === 'north') {
        //                 for (let i = 0; i < 100; i++) {
        //                     //Random date
        //                     function randomDate(start, end) {
        //                         return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        //                     }
        //                     //randomDate(new Date("12-2-2020"), new Date())

        //                     //Random special_prize 
        //                     let randomSpecialPrize_G3 = Math.floor(Math.random() * 90000) + 10000;

        //                     //Random g1
        //                     let randomG1 = Math.floor(Math.random() * 90000) + 10000;

        //                     //Random g2
        //                     let randomG2_1 = Math.floor(Math.random() * 90000) + 10000;
        //                     let randomG2_2 = Math.floor(Math.random() * 90000) + 10000;

        //                     //Random g3
        //                     let randomG3_1 = Math.floor(Math.random() * 90000) + 10000;
        //                     let randomG3_2 = Math.floor(Math.random() * 90000) + 10000;
        //                     let randomG3_3 = Math.floor(Math.random() * 90000) + 10000;
        //                     let randomG3_4 = Math.floor(Math.random() * 90000) + 10000;
        //                     let randomG3_5 = Math.floor(Math.random() * 90000) + 10000;
        //                     let randomG3_6 = Math.floor(Math.random() * 90000) + 10000;


        //                     //Random g4
        //                     let randomG4_1 = Math.floor(Math.random() * 9000) + 1000;
        //                     let randomG4_2 = Math.floor(Math.random() * 9000) + 1000;
        //                     let randomG4_3 = Math.floor(Math.random() * 9000) + 1000;
        //                     let randomG4_4 = Math.floor(Math.random() * 9000) + 1000;

        //                     //Random g5
        //                     let randomG5_1 = Math.floor(Math.random() * 9000) + 1000;
        //                     let randomG5_2 = Math.floor(Math.random() * 9000) + 1000;
        //                     let randomG5_3 = Math.floor(Math.random() * 9000) + 1000;
        //                     let randomG5_4 = Math.floor(Math.random() * 9000) + 1000;
        //                     let randomG5_5 = Math.floor(Math.random() * 9000) + 1000;
        //                     let randomG5_6 = Math.floor(Math.random() * 9000) + 1000;

        //                     //Random g6
        //                     let randomG6_1 = Math.floor(Math.random() * 900) + 100;
        //                     let randomG6_2 = Math.floor(Math.random() * 900) + 100;
        //                     let randomG6_3 = Math.floor(Math.random() * 900) + 100;


        //                     //Random g7
        //                     let randomG7_1 = Math.floor(Math.random() * 90) + 10;
        //                     let randomG7_2 = Math.floor(Math.random() * 90) + 10;
        //                     let randomG7_3 = Math.floor(Math.random() * 90) + 10;
        //                     let randomG7_4 = Math.floor(Math.random() * 90) + 10;

        //                     province.addLottery({
        //                         date: randomDate(new Date("12-2-2020"), new Date()),
        //                         special_prize: randomSpecialPrize_G3,
        //                         g1: randomG1,
        //                         g2: [randomG2_1, randomG2_2],
        //                         g3: [randomG3_1, randomG3_2, randomG3_3, randomG3_4, randomG3_5, randomG3_6],
        //                         g4: [randomG4_1, randomG4_2, randomG4_3, randomG4_4],
        //                         g5: [randomG5_1, randomG5_2, randomG5_3, randomG5_4, randomG5_5, randomG5_6],
        //                         g6: [randomG6_1, randomG6_2, randomG6_3],
        //                         g7: [randomG7_1, randomG7_2, randomG7_3, randomG7_4]
        //                     })
        //                 }
        //             }
        //         }
        //     })
        //     .then(() => {
        //         res.json({});
        //     });
        // #endregion North

        //#region Central
        await Province.find()
            .then(provinces => {
                for (let province of provinces) {
                    if (province.region === 'central') {
                        for (let i = 0; i <= 100; i++) {
                            //Random date
                            function randomDate(start, end) {
                                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
                            }

                            //Random special_prize 
                            let randomSpecialPrize = Math.floor(Math.random() * 900000) + 100000;

                            //Random g1
                            let randomG1 = Math.floor(Math.random() * 90000) + 10000;

                            //Random g2
                            let randomG2 = Math.floor(Math.random() * 90000) + 10000;

                            //Random g3
                            let randomG3_1 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG3_2 = Math.floor(Math.random() * 90000) + 10000;

                            //Random g4
                            let randomG4_1 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG4_2 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG4_3 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG4_4 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG4_5 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG4_6 = Math.floor(Math.random() * 90000) + 10000;
                            let randomG4_7 = Math.floor(Math.random() * 90000) + 10000;

                            //Random g5
                            let randomG5 = Math.floor(Math.random() * 9000) + 1000;

                            //Random g6
                            let randomG6_1 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG6_2 = Math.floor(Math.random() * 9000) + 1000;
                            let randomG6_3 = Math.floor(Math.random() * 9000) + 1000;

                            //Random g7
                            let randomG7 = Math.floor(Math.random() * 900) + 100;

                            //Random g8
                            let randomG8 = Math.floor(Math.random() * 90) + 10;

                            province.addLottery({
                                date: randomDate(new Date("12-2-2020"), new Date()),
                                special_prize: randomSpecialPrize,
                                g1: randomG1,
                                g2: [randomG2],
                                g3: [randomG3_1, randomG3_2],
                                g4: [randomG4_1, randomG4_2, randomG4_3, randomG4_4, randomG4_5, randomG4_6, randomG4_7],
                                g5: [randomG5],
                                g6: [randomG6_1, randomG6_2, randomG6_3],
                                g7: [randomG7],
                                g8: [randomG8]
                            })
                        }
                    }
                }
            })
            .then(() => {
                res.json({})
            })
        //#endregion Central

        //#region Xóa dữ liệu
        // Province.find({ region: 'north' })
        //     .then(provinces => {
        //         for (let province of provinces) {
        //             province.resetData();
        //         }
        //     })
        // Province.find({ region: 'central' })
        //     .then(provinces => {
        //         for (let province of provinces) {
        //             province.resetData();
        //         }
        //     })
        //#endregion

    } catch (error) {
        console.log(error)
    }
}

